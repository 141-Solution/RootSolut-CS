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
    <div className="flex flex-col lg:flex-row gap-6 min-h-[70vh]">
      {/* ── Left panel: search list ────────────────────────────────────────────── */}
      <div className="lg:w-72 xl:w-80 flex-shrink-0">
        <div className="sticky top-4 space-y-3">
          {/* Search input */}
          <div className="relative">
            <input
              type="search"
              placeholder="Person, Ort suchen…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-amber-300 rounded-xl px-4 py-2.5 text-sm bg-white
                         focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                         placeholder:text-stone-400 shadow-sm"
            />
          </div>

          <p className="text-xs text-stone-400 px-1">
            {filtered.length === persons.length
              ? `${persons.length} Personen gesamt`
              : `${filtered.length} von ${persons.length} Personen`}
          </p>

          {/* Person list */}
          <ul className="space-y-1 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1 scrollbar-thin">
            {filtered.map((person) => {
              const isActive = selected?.id === person.id;
              const byear = person.birthDate?.match(/\d{4}/)?.[0];
              const dyear = person.deathDate?.match(/\d{4}/)?.[0];

              return (
                <li key={person.id}>
                  <button
                    onClick={() => setSelected(person)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border transition-colors text-sm ${
                      isActive
                        ? "bg-amber-800 text-white border-amber-800 shadow-md"
                        : "bg-white border-stone-200 hover:bg-amber-50 hover:border-amber-300"
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

      {/* ── Right panel: pedigree chart ────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {selected ? (
          <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
            <PedigreeView
              key={selected.id}
              person={selected}
              personsMap={personsMap}
              families={families}
              onNavigate={handleNavigate}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[40vh]
                          bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 text-center p-8">
            <div className="text-5xl mb-4 select-none opacity-40">🌳</div>
            <p className="text-amber-800 font-medium">Person auswählen</p>
            <p className="text-stone-400 text-sm mt-1">
              Suche links nach einer Person und klicke sie an, um ihren Stammbaum zu sehen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
