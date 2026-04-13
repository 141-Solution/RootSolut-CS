"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { GedcomPerson, GedcomFamily } from "@/lib/gedcom-parser";
import PedigreeView from "@/components/PedigreeView";

interface Props {
  persons: GedcomPerson[];
  families: GedcomFamily[];
  personsMap: Record<string, GedcomPerson>;
}

export default function StammbaumClient({ persons, families, personsMap }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selected, setSelected] = useState<GedcomPerson | null>(null);

  // Debounce the search input (200 ms) to avoid per-keystroke filtering
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 200);
    return () => clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    if (!debouncedQuery) return persons;
    return persons.filter(
      (p) =>
        p.fullName.toLowerCase().includes(debouncedQuery) ||
        (p.birthPlace ?? "").toLowerCase().includes(debouncedQuery) ||
        (p.deathPlace ?? "").toLowerCase().includes(debouncedQuery)
    );
  }, [persons, debouncedQuery]);

  const handleNavigate = useCallback(
    (p: GedcomPerson) => setSelected(p),
    []
  );

  return (
    <div className="flex min-h-[70vh] flex-col gap-6 lg:flex-row">
      {/* ── Left panel: search list ────────────────────────────────────────────── */}
      <div className="flex-shrink-0 lg:w-80 xl:w-96">
        <div className="space-y-3 lg:sticky lg:top-24">
          {/* Search input */}
          <div className="paper-panel rounded-[1.75rem] p-4 sm:p-5">
            <input
              type="search"
              placeholder="Person, Ort suchen…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border border-amber-300 bg-white px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[var(--green-deep)] focus:border-transparent
                         placeholder:text-stone-400 shadow-sm"
            />
            <p className="px-1 pt-3 text-xs uppercase tracking-[0.18em] text-stone-500">
              {filtered.length === persons.length
                ? `${persons.length} Personen gesamt`
                : `${filtered.length} von ${persons.length} Personen`}
            </p>

            {/* Person list */}
            <ul className="mt-3 space-y-1 overflow-y-auto pr-1 lg:max-h-[calc(100vh-14rem)]">
            {filtered.map((person) => {
              const isActive = selected?.id === person.id;
              const byear = person.birthDate?.match(/\d{4}/)?.[0];
              const dyear = person.deathDate?.match(/\d{4}/)?.[0];

              return (
                <li key={person.id}>
                  <button
                    onClick={() => setSelected(person)}
                    className={`w-full rounded-2xl border px-3 py-3 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--green-deep)] text-white border-[var(--green-deep)] shadow-md"
                        : "bg-white/90 border-stone-200 hover:bg-[rgba(243,214,185,0.3)] hover:border-[var(--orange-deep)]"
                    }`}
                  >
                    <div className="font-medium truncate">
                      {person.sex === "M" ? "♂ " : person.sex === "F" ? "♀ " : ""}
                      {person.fullName}
                    </div>
                    {(byear || dyear) && (
                      <div
                        className={`text-[10px] font-mono mt-0.5 ${
                          isActive ? "text-amber-200" : "text-stone-400"
                        }`}
                      >
                        {byear ? `✦${byear}` : ""}
                        {byear && dyear ? "  " : ""}
                        {dyear ? `†${dyear}` : ""}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}

            {filtered.length === 0 && (
              <li className="text-center text-stone-400 text-sm py-8">Keine Treffer</li>
            )}
          </ul>
          </div>
        </div>
      </div>

      {/* ── Right panel: pedigree chart ────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {selected ? (
          <div className="overflow-visible lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <PedigreeView
              key={selected.id}
              person={selected}
              personsMap={personsMap}
              families={families}
              onNavigate={handleNavigate}
            />
          </div>
        ) : (
          <div className="section-shell flex min-h-[40vh] flex-col items-center justify-center rounded-[2rem] border-2 border-dashed text-center p-8">
            <div className="text-5xl mb-4 select-none opacity-40">🌳</div>
            <p className="font-semibold text-[var(--brown-deep)]">Person auswählen</p>
            <p className="mt-1 max-w-md text-sm text-stone-500">
              Suche links nach einer Person und klicke sie an, um ihren Stammbaum zu sehen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
