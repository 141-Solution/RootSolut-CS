import { loadGedcomData } from "@/lib/gedcom-loader";
import { GedcomPerson, GedcomFamily } from "@/lib/gedcom-parser";
import StammbaumClient from "@/components/StammbaumClient";

export default function StammbaumPage() {
  const data = loadGedcomData();

  const persons: GedcomPerson[] = Array.from(data.persons.values()).sort((a, b) => {
    const ya = parseInt(a.birthDate?.match(/\d{4}/)?.[0] ?? "0");
    const yb = parseInt(b.birthDate?.match(/\d{4}/)?.[0] ?? "0");
    if (ya !== yb) return yb - ya; // descending: youngest first
    return a.fullName.localeCompare(b.fullName, "de");
  });

  const families: GedcomFamily[] = Array.from(data.families.values());
  const personsMap: Record<string, GedcomPerson> = Object.fromEntries(data.persons);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Stammbaum</h1>
        <p className="text-gray-600">
          {persons.length} Personen und {families.length} Familien erfasst.
        </p>
      </div>

      <StammbaumClient persons={persons} families={families} personsMap={personsMap} />
    </div>
  );
}
