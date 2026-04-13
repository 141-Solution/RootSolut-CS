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
    <div className="space-y-6 sm:space-y-8">
      <div className="section-shell rounded-[2rem] px-5 py-7 sm:px-8 sm:py-9">
        <h1 className="mb-2 text-5xl font-semibold text-[var(--brown-deep)] sm:text-6xl">Stammbaum</h1>
        <p className="text-base text-[rgba(45,36,23,0.78)] sm:text-lg">
          {persons.length} Personen und {families.length} Familien erfasst.
        </p>
      </div>

      <StammbaumClient persons={persons} families={families} personsMap={personsMap} />
    </div>
  );
}
