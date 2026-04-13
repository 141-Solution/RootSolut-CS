import fs from "fs";
import path from "path";
import { parseGedcom, GedcomData } from "./gedcom-parser";

const GEDCOM_DIR = path.join(process.cwd(), "data/gedcom");

/** Load and parse all .ged files from the data/gedcom directory. */
export function loadGedcomData(): GedcomData {
  const combined: GedcomData = {
    persons: new Map(),
    families: new Map(),
  };

  if (!fs.existsSync(GEDCOM_DIR)) return combined;

  const files = fs.readdirSync(GEDCOM_DIR).filter((f) => f.endsWith(".ged"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(GEDCOM_DIR, file), "utf-8");
    const data = parseGedcom(content);
    for (const [id, person] of data.persons) combined.persons.set(id, person);
    for (const [id, family] of data.families) combined.families.set(id, family);
  }

  return combined;
}
