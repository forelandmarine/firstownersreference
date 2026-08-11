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

/* Families the editor can write. Extended per family as editing support
   lands (docs/studio-editor-plan.md, step 2 rollout order). */
export const WRITABLE_FAMILIES = ["lead-essays"] as const;

type Errors = string[];

function isStr(x: unknown): x is string {
  return typeof x === "string";
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

function validateParagraphBlock(b: unknown, where: string, errors: Errors) {
  if (isStr(b)) return;
  if (!b || typeof b !== "object" || Array.isArray(b)) {
    errors.push(`${where}: block must be a string or a typed object`);
    return;
  }
  const o = b as Record<string, unknown>;
  switch (o.type) {
    case "h2":
      checkKeys(o, ["type", "text"], [], where, errors);
      if (!isStr(o.text)) errors.push(`${where}: h2 text must be a string`);
      break;
    case "blockquote":
      checkKeys(o, ["type", "text"], ["attribution"], where, errors);
      if (!isStr(o.text)) errors.push(`${where}: blockquote text must be a string`);
      break;
    case "figure":
      checkKeys(o, ["type", "src", "alt", "caption"], ["credit"], where, errors);
      for (const k of ["src", "alt", "caption"]) {
        if (!isStr(o[k])) errors.push(`${where}: figure ${k} must be a string`);
      }
      break;
    case "editorsNote":
      checkKeys(o, ["type", "text"], ["href", "linkText"], where, errors);
      if (!isStr(o.text)) errors.push(`${where}: editorsNote text must be a string`);
      break;
    case "webOnly":
      checkKeys(o, ["type", "paragraphs"], ["heading"], where, errors);
      if (!Array.isArray(o.paragraphs) || !o.paragraphs.every(isStr)) {
        errors.push(`${where}: webOnly paragraphs must be an array of strings`);
      }
      break;
    default:
      errors.push(`${where}: unknown block type "${String(o.type)}"`);
  }
}

function validateLeadEssays(data: unknown): Errors {
  const errors: Errors = [];
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return ["root must be an object keyed by chapter slug"];
  }
  for (const [slug, essay] of Object.entries(data)) {
    const where = slug;
    if (!essay || typeof essay !== "object" || Array.isArray(essay)) {
      errors.push(`${where}: essay must be an object`);
      continue;
    }
    const e = essay as Record<string, unknown>;
    checkKeys(
      e,
      ["slug", "title", "standfirst", "paragraphs", "readingTime"],
      ["closingNote"],
      where,
      errors
    );
    if (e.slug !== slug) errors.push(`${where}: slug field does not match key`);
    for (const k of ["title", "standfirst", "readingTime"]) {
      if (k in e && !isStr(e[k])) errors.push(`${where}: ${k} must be a string`);
    }
    if (!Array.isArray(e.paragraphs)) {
      errors.push(`${where}: paragraphs must be an array`);
    } else {
      e.paragraphs.forEach((b, i) =>
        validateParagraphBlock(b, `${where}.paragraphs[${i}]`, errors)
      );
    }
    if ("closingNote" in e) {
      if (!Array.isArray(e.closingNote)) {
        errors.push(`${where}: closingNote must be an array`);
      } else {
        e.closingNote.forEach((b, i) => {
          if (isStr(b)) return;
          if (
            !b ||
            typeof b !== "object" ||
            (b as Record<string, unknown>).type !== "h2" ||
            !isStr((b as Record<string, unknown>).text)
          ) {
            errors.push(`${where}.closingNote[${i}]: must be a string or an h2 block`);
          }
        });
      }
    }
  }
  return errors;
}

export function validateFamily(family: string, data: unknown): Errors {
  switch (family) {
    case "lead-essays":
      return validateLeadEssays(data);
    default:
      return [`no validator for family "${family}"`];
  }
}
