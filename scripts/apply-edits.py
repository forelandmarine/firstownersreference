"""Apply an editing agent's edits file (docs/2027-study/edits/chNN.json) to the content files.

Usage: python3 scripts/apply-edits.py docs/2027-study/edits/ch03.json [--dry-run]

Each edit is one of:
  {"file", "old", "new"}                      exact, unique string replacement
  {"file", "deleteParagraph": {slug, startsWith}}
  {"file", "insertAfter": {slug, startsWith}, "new"}   new is a string or an object
All edits are checked first; nothing is written unless every edit applies.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def dump(d):
    return json.dumps(d, indent=2, ensure_ascii=False) + "\n"


def para_text(p):
    return p if isinstance(p, str) else p.get("text", "")


def find_para(doc, slug, start):
    entry = doc[slug]
    paras = entry["paragraphs"]
    hits = [i for i, p in enumerate(paras) if para_text(p).startswith(start)]
    if len(hits) != 1:
        raise ValueError(f"{slug}: startsWith {start[:50]!r} matched {len(hits)}")
    return paras, hits[0]


def main():
    path = Path(sys.argv[1])
    dry = "--dry-run" in sys.argv
    edits = json.loads(path.read_text())
    texts = {}

    def text(f):
        if f not in texts:
            texts[f] = (ROOT / f).read_text()
        return texts[f]

    # String edits first, then structural edits on the parsed JSON.
    for n, e in enumerate(edits):
        if "old" in e:
            t = text(e["file"])
            old, new = e["old"], e["new"]
            if e["file"].endswith(".json") and t.count(old) == 0:
                # The agent copied decoded text; match the JSON-escaped form.
                old = json.dumps(old, ensure_ascii=False)[1:-1]
                new = json.dumps(new, ensure_ascii=False)[1:-1]
            c = t.count(old)
            if c != 1:
                raise SystemExit(f"edit {n}: old occurs {c} times in {e['file']}: {e['old'][:80]!r}")
            texts[e["file"]] = t.replace(old, new)
    for n, e in enumerate(edits):
        if "old" in e:
            continue
        f = e["file"]
        doc = json.loads(text(f))
        if "deleteParagraph" in e:
            d = e["deleteParagraph"]
            paras, i = find_para(doc, d["slug"], d["startsWith"])
            del paras[i]
        elif "insertAfter" in e:
            d = e["insertAfter"]
            paras, i = find_para(doc, d["slug"], d["startsWith"])
            paras.insert(i + 1, e["new"])
        else:
            raise SystemExit(f"edit {n}: unknown edit shape")
        texts[f] = dump(doc)
    for f, t in texts.items():
        if f.endswith(".json"):
            json.loads(t)
        if "—" in t and "—" not in (ROOT / f).read_text():
            raise SystemExit(f"{f}: an edit introduced an em dash")
    if dry:
        print(f"ok (dry run): {len(edits)} edits across {', '.join(texts)}")
        return
    for f, t in texts.items():
        (ROOT / f).write_text(t)
    print(f"applied {len(edits)} edits across {', '.join(texts)}")


if __name__ == "__main__":
    main()
