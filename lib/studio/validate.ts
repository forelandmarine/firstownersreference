/*
  Server-side schema validation for studio saves. The editor is the only
  writer, but the content files are the source for both editions, so every
  write is checked structurally before it reaches disk.
*/

export const READABLE_FAMILIES = [
  "sections",
  "lead-essays",
  "cases",
  "data-spreads",
  "checklists",
  "faqs",
  "guest-opinions",
] as const;

export const WRITABLE_FAMILIES = READABLE_FAMILIES;

type Errors = string[];

function isStr(x: unknown): x is string {
  return typeof x === "string";
}

function isObj(x: unknown): x is Record<string, unknown> {
  return !!x && typeof x === "object" && !Array.isArray(x);
}

function isStrArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every(isStr);
}

function checkKeys(
  obj: Record<string, unknown>,
  required: string[],
  optional: string[],
  where: string,
  errors: Errors
) {
  for (const k of required) {
    if (!(k in obj)) errors.push(`${where}: missing "${k}"`);
  }
  for (const k of Object.keys(obj)) {
    if (!required.includes(k) && !optional.includes(k)) {
      errors.push(`${where}: unknown key "${k}"`);
    }
  }
}

function checkStrings(
  obj: Record<string, unknown>,
  keys: string[],
  where: string,
  errors: Errors
) {
  for (const k of keys) {
    if (k in obj && !isStr(obj[k])) errors.push(`${where}: ${k} must be a string`);
  }
}

/* Root shape shared by most families: object keyed by chapter slug. */
function eachRecordEntry(
  data: unknown,
  errors: Errors,
  fn: (slug: string, value: unknown) => void
): void {
  if (!isObj(data)) {
    errors.push("root must be an object keyed by chapter slug");
    return;
  }
  for (const [slug, value] of Object.entries(data)) fn(slug, value);
}

/* --- lead essays ------------------------------------------------- */

function validateEssayBlock(b: unknown, where: string, errors: Errors) {
  if (isStr(b)) return;
  if (!isObj(b)) {
    errors.push(`${where}: block must be a string or a typed object`);
    return;
  }
  switch (b.type) {
    case "h2":
      checkKeys(b, ["type", "text"], [], where, errors);
      checkStrings(b, ["text"], where, errors);
      break;
    case "blockquote":
      checkKeys(b, ["type", "text"], ["attribution"], where, errors);
      checkStrings(b, ["text", "attribution"], where, errors);
      break;
    case "figure":
      checkKeys(b, ["type", "src", "alt", "caption"], ["credit"], where, errors);
      checkStrings(b, ["src", "alt", "caption", "credit"], where, errors);
      break;
    case "editorsNote":
      checkKeys(b, ["type", "text"], ["href", "linkText"], where, errors);
      checkStrings(b, ["text", "href", "linkText"], where, errors);
      break;
    case "webOnly":
      checkKeys(b, ["type", "paragraphs"], ["heading"], where, errors);
      checkStrings(b, ["heading"], where, errors);
      if (!isStrArray(b.paragraphs)) {
        errors.push(`${where}: webOnly paragraphs must be an array of strings`);
      }
      break;
    default:
      errors.push(`${where}: unknown block type "${String(b.type)}"`);
  }
}

function validateLeadEssays(data: unknown): Errors {
  const errors: Errors = [];
  eachRecordEntry(data, errors, (slug, essay) => {
    if (!isObj(essay)) {
      errors.push(`${slug}: essay must be an object`);
      return;
    }
    checkKeys(
      essay,
      ["slug", "title", "standfirst", "paragraphs", "readingTime"],
      ["closingNote"],
      slug,
      errors
    );
    if (essay.slug !== slug) errors.push(`${slug}: slug field does not match key`);
    checkStrings(essay, ["title", "standfirst", "readingTime"], slug, errors);
    if (!Array.isArray(essay.paragraphs)) {
      errors.push(`${slug}: paragraphs must be an array`);
    } else {
      essay.paragraphs.forEach((b, i) =>
        validateEssayBlock(b, `${slug}.paragraphs[${i}]`, errors)
      );
    }
    if ("closingNote" in essay) {
      if (!Array.isArray(essay.closingNote)) {
        errors.push(`${slug}: closingNote must be an array`);
      } else {
        essay.closingNote.forEach((b, i) => {
          if (isStr(b)) return;
          if (!isObj(b) || b.type !== "h2" || !isStr(b.text)) {
            errors.push(`${slug}.closingNote[${i}]: must be a string or an h2 block`);
          }
        });
      }
    }
  });
  return errors;
}

/* --- sections ---------------------------------------------------- */

const HERO_FOCUS = ["top", "center", "bottom", "left", "right"];

function validateSections(data: unknown): Errors {
  const errors: Errors = [];
  if (!Array.isArray(data)) return ["root must be an array of sections"];
  const seen = new Set<string>();
  data.forEach((s, i) => {
    const where = `sections[${i}]`;
    if (!isObj(s)) {
      errors.push(`${where}: must be an object`);
      return;
    }
    checkKeys(
      s,
      [
        "number",
        "slug",
        "title",
        "standfirst",
        "coordinates",
        "hero",
        "contributor",
        "contributorRole",
        "seoTitle",
        "seoDescription",
        "datePublished",
      ],
      ["heroFocus", "contributorLinkedIn", "dateModified"],
      where,
      errors
    );
    checkStrings(
      s,
      [
        "number",
        "slug",
        "title",
        "standfirst",
        "coordinates",
        "hero",
        "contributor",
        "contributorRole",
        "contributorLinkedIn",
        "seoTitle",
        "seoDescription",
        "datePublished",
        "dateModified",
      ],
      where,
      errors
    );
    if ("heroFocus" in s && !HERO_FOCUS.includes(s.heroFocus as string)) {
      errors.push(`${where}: heroFocus must be one of ${HERO_FOCUS.join("/")}`);
    }
    if (isStr(s.slug)) {
      if (seen.has(s.slug)) errors.push(`${where}: duplicate slug "${s.slug}"`);
      seen.add(s.slug);
    }
  });
  return errors;
}

/* --- cases ------------------------------------------------------- */

function validateCases(data: unknown): Errors {
  const errors: Errors = [];
  eachRecordEntry(data, errors, (slug, c) => {
    if (!isObj(c)) {
      errors.push(`${slug}: case must be an object`);
      return;
    }
    checkKeys(
      c,
      ["slug", "title", "standfirst", "meta", "paragraphs", "takeaways", "disclosure"],
      [],
      slug,
      errors
    );
    if (c.slug !== slug) errors.push(`${slug}: slug field does not match key`);
    checkStrings(c, ["title", "standfirst", "disclosure"], slug, errors);
    if (!Array.isArray(c.meta)) {
      errors.push(`${slug}: meta must be an array`);
    } else {
      c.meta.forEach((m, i) => {
        const where = `${slug}.meta[${i}]`;
        if (!isObj(m)) return errors.push(`${where}: must be an object`);
        checkKeys(m, ["label", "value"], [], where, errors);
        checkStrings(m, ["label", "value"], where, errors);
      });
    }
    if (!Array.isArray(c.paragraphs)) {
      errors.push(`${slug}: paragraphs must be an array`);
    } else {
      c.paragraphs.forEach((b, i) => {
        const where = `${slug}.paragraphs[${i}]`;
        if (isStr(b)) return;
        if (!isObj(b)) return errors.push(`${where}: must be a string or object`);
        if (b.type === "h2") {
          checkKeys(b, ["type", "text"], [], where, errors);
          checkStrings(b, ["text"], where, errors);
        } else if (b.type === "blockquote") {
          checkKeys(b, ["type", "text"], ["attribution"], where, errors);
          checkStrings(b, ["text", "attribution"], where, errors);
        } else {
          errors.push(`${where}: unknown block type "${String(b.type)}"`);
        }
      });
    }
    if (!isStrArray(c.takeaways)) {
      errors.push(`${slug}: takeaways must be an array of strings`);
    }
  });
  return errors;
}

/* --- data spreads ------------------------------------------------ */

function validateSpreadBlock(b: unknown, where: string, errors: Errors) {
  if (!isObj(b)) {
    errors.push(`${where}: block must be an object`);
    return;
  }
  switch (b.type) {
    case "h2":
    case "paragraph":
    case "note":
      checkKeys(b, ["type", "text"], [], where, errors);
      checkStrings(b, ["text"], where, errors);
      break;
    case "chart":
      checkKeys(b, ["type", "chartId"], [], where, errors);
      checkStrings(b, ["chartId"], where, errors);
      break;
    case "table": {
      checkKeys(b, ["type", "head", "rows"], ["caption", "sourceLine"], where, errors);
      checkStrings(b, ["caption", "sourceLine"], where, errors);
      if (!isStrArray(b.head)) {
        errors.push(`${where}: table head must be an array of strings`);
        break;
      }
      if (!Array.isArray(b.rows) || !b.rows.every(isStrArray)) {
        errors.push(`${where}: table rows must be arrays of strings`);
        break;
      }
      const n = b.head.length;
      b.rows.forEach((r: string[], i: number) => {
        if (r.length !== n)
          errors.push(`${where}.rows[${i}]: has ${r.length} cells, head has ${n}`);
      });
      break;
    }
    case "kv":
      checkKeys(b, ["type", "rows"], ["caption", "sourceLine"], where, errors);
      checkStrings(b, ["caption", "sourceLine"], where, errors);
      if (!Array.isArray(b.rows)) {
        errors.push(`${where}: kv rows must be an array`);
      } else {
        b.rows.forEach((r, i) => {
          const rw = `${where}.rows[${i}]`;
          if (!isObj(r)) return errors.push(`${rw}: must be an object`);
          checkKeys(r, ["label", "value"], ["note"], rw, errors);
          checkStrings(r, ["label", "value", "note"], rw, errors);
        });
      }
      break;
    default:
      errors.push(`${where}: unknown block type "${String(b.type)}"`);
  }
}

function validateDataSpreads(data: unknown): Errors {
  const errors: Errors = [];
  eachRecordEntry(data, errors, (slug, sp) => {
    if (!isObj(sp)) {
      errors.push(`${slug}: spread must be an object`);
      return;
    }
    checkKeys(sp, ["slug", "title", "standfirst", "blocks", "sources"], [], slug, errors);
    if (sp.slug !== slug) errors.push(`${slug}: slug field does not match key`);
    checkStrings(sp, ["title", "standfirst"], slug, errors);
    if (!Array.isArray(sp.blocks)) {
      errors.push(`${slug}: blocks must be an array`);
    } else {
      sp.blocks.forEach((b, i) =>
        validateSpreadBlock(b, `${slug}.blocks[${i}]`, errors)
      );
    }
    if (!Array.isArray(sp.sources)) {
      errors.push(`${slug}: sources must be an array`);
    } else {
      sp.sources.forEach((s, i) => {
        const where = `${slug}.sources[${i}]`;
        if (!isObj(s)) return errors.push(`${where}: must be an object`);
        checkKeys(s, ["label", "line"], ["url"], where, errors);
        checkStrings(s, ["label", "line", "url"], where, errors);
      });
    }
  });
  return errors;
}

/* --- checklists -------------------------------------------------- */

function validateChecklists(data: unknown): Errors {
  const errors: Errors = [];
  eachRecordEntry(data, errors, (slug, c) => {
    if (!isObj(c)) {
      errors.push(`${slug}: checklist must be an object`);
      return;
    }
    checkKeys(
      c,
      ["slug", "title", "standfirst", "intent", "groups", "printable"],
      [],
      slug,
      errors
    );
    if (c.slug !== slug) errors.push(`${slug}: slug field does not match key`);
    checkStrings(c, ["title", "standfirst", "intent", "printable"], slug, errors);
    if (!Array.isArray(c.groups)) {
      errors.push(`${slug}: groups must be an array`);
    } else {
      c.groups.forEach((g, i) => {
        const where = `${slug}.groups[${i}]`;
        if (!isObj(g)) return errors.push(`${where}: must be an object`);
        checkKeys(g, ["heading", "items"], [], where, errors);
        checkStrings(g, ["heading"], where, errors);
        if (!Array.isArray(g.items)) {
          errors.push(`${where}: items must be an array`);
        } else {
          g.items.forEach((it, j) => {
            const iw = `${where}.items[${j}]`;
            if (!isObj(it)) return errors.push(`${iw}: must be an object`);
            checkKeys(it, ["question"], ["detail"], iw, errors);
            checkStrings(it, ["question", "detail"], iw, errors);
          });
        }
      });
    }
  });
  return errors;
}

/* --- faqs -------------------------------------------------------- */

function validateFaqs(data: unknown): Errors {
  const errors: Errors = [];
  eachRecordEntry(data, errors, (slug, list) => {
    if (!Array.isArray(list)) {
      errors.push(`${slug}: must be an array of FAQ items`);
      return;
    }
    list.forEach((f, i) => {
      const where = `${slug}[${i}]`;
      if (!isObj(f)) return errors.push(`${where}: must be an object`);
      checkKeys(f, ["question", "answer"], [], where, errors);
      checkStrings(f, ["question", "answer"], where, errors);
    });
  });
  return errors;
}

/* --- guest opinions ---------------------------------------------- */

function validateGuestOpinions(data: unknown): Errors {
  const errors: Errors = [];
  eachRecordEntry(data, errors, (slug, list) => {
    if (!Array.isArray(list)) {
      errors.push(`${slug}: must be an array of opinions`);
      return;
    }
    list.forEach((o, i) => {
      const where = `${slug}[${i}]`;
      if (!isObj(o)) return errors.push(`${where}: must be an object`);
      checkKeys(
        o,
        ["slug", "contributor", "contributorRole", "questions"],
        ["contributorLinkedIn", "intro"],
        where,
        errors
      );
      if (o.slug !== slug) errors.push(`${where}: slug field does not match chapter key`);
      checkStrings(
        o,
        ["contributor", "contributorRole", "contributorLinkedIn", "intro"],
        where,
        errors
      );
      if (!Array.isArray(o.questions)) {
        errors.push(`${where}: questions must be an array`);
      } else {
        o.questions.forEach((q, j) => {
          const qw = `${where}.questions[${j}]`;
          if (!isObj(q)) return errors.push(`${qw}: must be an object`);
          checkKeys(q, ["question", "answer"], ["pullQuote"], qw, errors);
          checkStrings(q, ["question", "pullQuote"], qw, errors);
          if (!isStrArray(q.answer)) {
            errors.push(`${qw}: answer must be an array of strings`);
          }
        });
      }
    });
  });
  return errors;
}

export function validateFamily(family: string, data: unknown): Errors {
  switch (family) {
    case "lead-essays":
      return validateLeadEssays(data);
    case "sections":
      return validateSections(data);
    case "cases":
      return validateCases(data);
    case "data-spreads":
      return validateDataSpreads(data);
    case "checklists":
      return validateChecklists(data);
    case "faqs":
      return validateFaqs(data);
    case "guest-opinions":
      return validateGuestOpinions(data);
    default:
      return [`no validator for family "${family}"`];
  }
}
