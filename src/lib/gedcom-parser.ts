/**
 * GEDCOM Parser
 * Parses GEDCOM 5.5.x files and extracts persons, families, and events.
 */

export interface GedcomPerson {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  sex?: "M" | "F" | "U";
  birthDate?: string;
  birthPlace?: string;
  deathDate?: string;
  deathPlace?: string;
  familiesAsSpouse: string[]; // FAMS xrefs
  familiesAsChild: string[];  // FAMC xrefs
  note?: string;
}

export interface GedcomFamily {
  id: string;
  husbandId?: string;
  wifeId?: string;
  childIds: string[];
  marriageDate?: string;
  marriagePlace?: string;
}

export interface GedcomData {
  persons: Map<string, GedcomPerson>;
  families: Map<string, GedcomFamily>;
}

export interface GedcomEvent {
  year: number;
  type: "birth" | "death" | "marriage";
  personId?: string;
  familyId?: string;
  description: string;
  date: string;
  place?: string;
}

/** Parse a GEDCOM date string into a readable format and extract year. */
function parseDate(raw: string): { formatted: string; year: number | null } {
  if (!raw) return { formatted: "", year: null };
  const cleaned = raw.trim().replace(/^(ABT|EST|CAL|BEF|AFT)\s+/i, "");
  const yearMatch = cleaned.match(/\b(\d{4})\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : null;
  return { formatted: raw.trim(), year };
}

/** Split a GEDCOM name into first and last parts. */
function parseName(raw: string): { firstName: string; lastName: string } {
  if (!raw) return { firstName: "Unbekannt", lastName: "" };
  // GEDCOM names: "Vorname /Nachname/"
  const surnameMatch = raw.match(/\/([^/]*)\//) ;
  const lastName = surnameMatch ? surnameMatch[1].trim() : "";
  const firstName = raw.replace(/\/[^/]*\//, "").trim();
  return { firstName: firstName || "Unbekannt", lastName };
}

/** Main GEDCOM parser function. */
export function parseGedcom(content: string): GedcomData {
  const persons = new Map<string, GedcomPerson>();
  const families = new Map<string, GedcomFamily>();

  const lines = content.split(/\r?\n/);

  let currentTag: string | null = null;
  let currentId: string | null = null;
  let currentType: "INDI" | "FAM" | null = null;
  let subTag: string | null = null;

  const getOrCreatePerson = (id: string): GedcomPerson => {
    if (!persons.has(id)) {
      persons.set(id, {
        id,
        firstName: "Unbekannt",
        lastName: "",
        fullName: "Unbekannt",
        familiesAsSpouse: [],
        familiesAsChild: [],
      });
    }
    return persons.get(id)!;
  };

  const getOrCreateFamily = (id: string): GedcomFamily => {
    if (!families.has(id)) {
      families.set(id, { id, childIds: [] });
    }
    return families.get(id)!;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    // Match: level [xref] tag [value]
    const match = line.match(/^(\d+)\s+(@[^@]+@)?\s*(\w+)\s*(.*)$/);
    if (!match) continue;

    const level = parseInt(match[1], 10);
    const xref = match[2]?.replace(/@/g, "");
    const tag = match[3];
    const value = match[4]?.trim() ?? "";

    if (level === 0) {
      currentId = xref ?? null;
      currentType = tag === "INDI" ? "INDI" : tag === "FAM" ? "FAM" : null;
      currentTag = null;
      subTag = null;
      continue;
    }

    if (!currentId || !currentType) continue;

    if (currentType === "INDI") {
      const person = getOrCreatePerson(currentId);

      if (level === 1) {
        currentTag = tag;
        subTag = null;
        switch (tag) {
          case "NAME": {
            const { firstName, lastName } = parseName(value);
            person.firstName = firstName;
            person.lastName = lastName;
            person.fullName = `${firstName} ${lastName}`.trim();
            break;
          }
          case "SEX":
            person.sex = value as "M" | "F" | "U";
            break;
          case "FAMS":
            person.familiesAsSpouse.push(value.replace(/@/g, ""));
            break;
          case "FAMC":
            person.familiesAsChild.push(value.replace(/@/g, ""));
            break;
          case "NOTE":
            person.note = value;
            break;
        }
      } else if (level === 2) {
        subTag = tag;
        if (currentTag === "BIRT") {
          if (tag === "DATE") person.birthDate = value;
          if (tag === "PLAC") person.birthPlace = value;
        } else if (currentTag === "DEAT") {
          if (tag === "DATE") person.deathDate = value;
          if (tag === "PLAC") person.deathPlace = value;
        }
      } else if (level === 3 && currentTag === "NOTE" && tag === "CONT") {
        person.note = (person.note ?? "") + "\n" + value;
      }
    } else if (currentType === "FAM") {
      const family = getOrCreateFamily(currentId);

      if (level === 1) {
        currentTag = tag;
        subTag = null;
        const refValue = value.replace(/@/g, "");
        switch (tag) {
          case "HUSB":
            family.husbandId = refValue;
            break;
          case "WIFE":
            family.wifeId = refValue;
            break;
          case "CHIL":
            family.childIds.push(refValue);
            break;
        }
      } else if (level === 2) {
        if (currentTag === "MARR") {
          if (tag === "DATE") family.marriageDate = value;
          if (tag === "PLAC") family.marriagePlace = value;
        }
      }
    }
  }

  return { persons, families };
}

/** Extract all notable events sorted by year. */
export function extractEvents(data: GedcomData): GedcomEvent[] {
  const events: GedcomEvent[] = [];

  for (const person of data.persons.values()) {
    if (person.birthDate) {
      const { formatted, year } = parseDate(person.birthDate);
      if (year) {
        events.push({
          year,
          type: "birth",
          personId: person.id,
          description: `Geburt von ${person.fullName}`,
          date: formatted,
          place: person.birthPlace,
        });
      }
    }
    if (person.deathDate) {
      const { formatted, year } = parseDate(person.deathDate);
      if (year) {
        events.push({
          year,
          type: "death",
          personId: person.id,
          description: `Tod von ${person.fullName}`,
          date: formatted,
          place: person.deathPlace,
        });
      }
    }
  }

  for (const family of data.families.values()) {
    if (family.marriageDate) {
      const { formatted, year } = parseDate(family.marriageDate);
      if (year) {
        events.push({
          year,
          type: "marriage",
          familyId: family.id,
          description: `Heirat`,
          date: formatted,
          place: family.marriagePlace,
        });
      }
    }
  }

  return events.sort((a, b) => a.year - b.year);
}
