"""Combine editing agents' edits files into one before/after CSV.

Usage: python3 scripts/edits-csv.py out.csv docs/2027-study/edits/sem-ch01-03.json [...]

Locations are found in the content as committed at HEAD (before the edits),
so run it against the commit the edits were written for. Test numbers and the
ARGUMENT flag come from the edit itself or, failing that, from the matching
row of the report (docs/2027-study/reports/<same name>.md).
"""
import csv
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def head(f):
    return subprocess.run(["git", "show", f"HEAD:{f}"], cwd=ROOT, capture_output=True, text=True).stdout


def locate(f, old, cache={}):
    """Return (slug, location) of the first string in the file containing old."""
    if not f.endswith(".json"):
        return "", f.split("/")[-1]
    if f not in cache:
        cache[f] = json.loads(head(f))
    doc = cache[f]
    for slug, entry in (doc.items() if isinstance(doc, dict) else enumerate(doc)):
        found = []
        heading = [""]

        def walk(o, path):
            if found:
                return
            if isinstance(o, dict):
                if o.get("type") in ("h2", "h3") and isinstance(o.get("text"), str):
                    heading[0] = o["text"]
                for k, v in o.items():
                    walk(v, path + [k])
            elif isinstance(o, list):
                for i, v in enumerate(o):
                    walk(v, path + [str(i)])
            elif isinstance(o, str) and old in o:
                found.append(".".join(path))

        walk(entry, [])
        if found:
            where = found[0]
            if heading[0] and "paragraphs" in where:
                where += f" (under “{heading[0]}”)"
            if isinstance(entry, dict) and "slug" in entry:
                slug = entry["slug"]
            return str(slug), where
    # old copied from the JSON source (e.g. '"text": "..."'): find it in the raw file.
    raw = head(f)
    i = raw.find(old)
    if i < 0:
        i = raw.find(json.dumps(old, ensure_ascii=False)[1:-1])
    if i < 0:
        return "", "not found at HEAD"
    before = raw[:i]
    keys = re.findall(r'^  "([^"]+)": [{\[]', before, re.M) or re.findall(r'"slug": "([^"]+)"', before)
    line = raw[before.rfind("\n") + 1:i + len(old)].strip()
    m = re.match(r'"(\w+)":', line) or re.match(r'"(\w+)":', old.strip())
    return (keys[-1] if keys else ""), (m.group(1) if m else "string")


def report_rows(edits_path):
    rep = ROOT / "docs/2027-study/reports" / (Path(edits_path).stem + ".md")
    rows = []
    if rep.exists():
        for line in rep.read_text().splitlines():
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if line.startswith("|") and len(cells) >= 5 and not set(cells[0]) <= set("-: "):
                rows.append(cells)
    return rows


def norm(s):
    return re.sub(r"\s+", " ", s.replace("**", "")).strip()


def main():
    out, paths = sys.argv[1], sys.argv[2:]
    with open(out, "w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["#", "Chapter", "File", "Slug", "Location", "Kind", "Tests", "Argument change", "Before", "After", "Reason"])
        n = 0
        for p in paths:
            rows = report_rows(p)
            for e in json.loads(Path(p).read_text()):
                f = e["file"]
                if "old" in e:
                    before, after = e["old"], e["new"]
                    slug, loc = locate(f, before)
                elif "deleteParagraph" in e:
                    d = e["deleteParagraph"]
                    slug, loc = d["slug"], "paragraph deleted"
                    paras = json.loads(head(f))[slug]["paragraphs"]
                    before = next(x if isinstance(x, str) else x.get("text", "") for x in paras
                                  if (x if isinstance(x, str) else x.get("text", "")).startswith(d["startsWith"]))
                    after = ""
                else:
                    d = e["insertAfter"]
                    slug, loc = d["slug"], f"inserted after “{d['startsWith'][:50]}…”"
                    before, after = "", e["new"] if isinstance(e["new"], str) else e["new"].get("text", "")
                tests, arg = e.get("tests", ""), e.get("argument", "")
                if isinstance(arg, bool):
                    arg = "yes" if arg else ""
                if not tests or not arg:
                    key = norm(before)[:40]
                    for r in rows:
                        if key and norm(r[1]).startswith(key):
                            tests = tests or r[3]
                            if "ARGUMENT" in r[4]:
                                arg = arg or norm(r[4]).replace("ARGUMENT", "").strip()
                            break
                chapter = e.get("chapter") or (slug[:2] if slug[:2].isdigit() else "site")
                n += 1
                w.writerow([n, chapter, f, slug, e.get("loc") or loc, e.get("kind", ""), tests, arg, before, after, e.get("reason", "")])
    print(f"wrote {n} rows to {out}")


if __name__ == "__main__":
    main()
