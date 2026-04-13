"use client";

import { GedcomPerson, GedcomFamily } from "@/lib/gedcom-parser";
import { useMemo } from "react";

// ── Helpers ───────────────────────────────────────────────────────────────────

function yearStr(p: GedcomPerson): string {
  const b = p.birthDate?.match(/\d{4}/)?.[0];
  const d = p.deathDate?.match(/\d{4}/)?.[0];
  if (b && d) return `✦${b}  †${d}`;
  if (b) return `✦${b}`;
  if (d) return `†${d}`;
  return "";
}

function sexCls(sex?: string) {
  if (sex === "M") return { bg: "bg-sky-50", border: "border-sky-200", hover: "hover:border-sky-400 hover:bg-sky-100", text: "text-sky-900", muted: "text-sky-400" };
  if (sex === "F") return { bg: "bg-rose-50", border: "border-rose-200", hover: "hover:border-rose-400 hover:bg-rose-100", text: "text-rose-900", muted: "text-rose-400" };
  return { bg: "bg-stone-50", border: "border-stone-200", hover: "hover:border-stone-400 hover:bg-stone-100", text: "text-stone-700", muted: "text-stone-400" };
}

// Build binary-heap ancestor array
// pos 1 = selected person
// pos 2 = father, 3 = mother
// pos 4-7 = grandparents
// pos 8-15 = great-grandparents
function buildAncestors(
  person: GedcomPerson,
  personsMap: Record<string, GedcomPerson>,
  families: GedcomFamily[]
): (GedcomPerson | null)[] {
  const tree: (GedcomPerson | null)[] = new Array(16).fill(null);
  tree[1] = person;

  const fill = (pos: number) => {
    if (pos * 2 >= 16) return;
    const p = tree[pos];
    if (!p) return;
    const pFam = families.find((f) => p.familiesAsChild.includes(f.id));
    if (!pFam) return;
    if (pFam.husbandId && personsMap[pFam.husbandId]) {
      tree[pos * 2] = personsMap[pFam.husbandId];
      fill(pos * 2);
    }
    if (pFam.wifeId && personsMap[pFam.wifeId]) {
      tree[pos * 2 + 1] = personsMap[pFam.wifeId];
      fill(pos * 2 + 1);
    }
  };

  fill(1);
  return tree;
}

// ── Sub-components ────────────────────────────────────────────────────────────

// Ancestor card – click to navigate
function AncestorCard({
  person,
  onNavigate,
  size = "xs",
}: {
  person: GedcomPerson | null;
  onNavigate: (p: GedcomPerson) => void;
  size?: "xs" | "sm" | "md";
}) {
  const col = sexCls(person?.sex);
  const pad = size === "xs" ? "px-2 py-1.5" : size === "sm" ? "px-2.5 py-2" : "px-3 py-2.5";
  const nameSize = size === "xs" ? "text-[10px]" : size === "sm" ? "text-xs" : "text-sm";
  const minH = size === "xs" ? "min-h-[44px]" : size === "sm" ? "min-h-[52px]" : "min-h-[60px]";

  if (!person) {
    return (
      <div className={`rounded-xl border-2 border-dashed border-stone-200 flex items-center justify-center ${minH}`}>
        <span className="text-stone-300 text-xs select-none">?</span>
      </div>
    );
  }

  const displayName =
    size === "xs"
      ? `${person.firstName.split(" ")[0]} ${person.lastName}`.trim()
      : person.fullName;

  return (
    <button
      onClick={() => onNavigate(person)}
      title={`${person.fullName} – zum Navigieren klicken`}
      className={`w-full rounded-xl border-2 text-left transition-all duration-150 hover:shadow-md hover:scale-[1.02] active:scale-100 ${col.bg} ${col.border} ${col.hover} ${pad} ${minH}`}
    >
      <div className={`font-semibold truncate leading-tight ${col.text} ${nameSize}`}>
        {person.sex === "M" ? "♂ " : person.sex === "F" ? "♀ " : ""}
        {displayName}
      </div>
      {yearStr(person) && (
        <div className={`mt-0.5 font-mono leading-none ${col.muted} ${size === "xs" ? "text-[9px]" : "text-[10px]"}`}>
          {yearStr(person)}
        </div>
      )}
    </button>
  );
}

// V-shaped connector between two generation rows.
// Each bridge cell spans the same width as 2 child cards, so the V vertex
// lands exactly at the center of the parent card below.
function Bridge({
  leftPresent,
  rightPresent,
}: {
  leftPresent: boolean;
  rightPresent: boolean;
}) {
  if (!leftPresent && !rightPresent) return <div className="h-5" />;

  if (leftPresent && rightPresent) {
    return (
      <div className="flex h-5">
        <div className="flex-1 border-b-2 border-r-2 border-amber-200 rounded-br-lg" />
        <div className="flex-1 border-b-2 border-l-2 border-amber-200 rounded-bl-lg" />
      </div>
    );
  }

  // Single known parent: centered vertical line
  return (
    <div className="flex justify-center h-5">
      <div className="w-0.5 h-full bg-amber-200" />
    </div>
  );
}

// Featured card for the currently selected person
function SelectedCard({
  person,
}: {
  person: GedcomPerson;
}) {
  const col = sexCls(person.sex);

  return (
    <div className={`rounded-[1.75rem] border-2 p-5 shadow-md ${col.bg} ${col.border}`}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className={`text-xl font-bold wrap-break-word ${col.text}`}>
            {person.sex === "M" ? "♂ " : person.sex === "F" ? "♀ " : ""}
            {person.fullName}
          </div>
          <div className="text-[10px] text-stone-400 font-mono mt-0.5">{person.id}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">Geburt</div>
          <div className="font-medium text-stone-800">{person.birthDate || "–"}</div>
          {person.birthPlace && <div className="text-xs text-stone-500 mt-0.5">{person.birthPlace}</div>}
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">Tod</div>
          <div className="font-medium text-stone-800">{person.deathDate || "–"}</div>
          {person.deathPlace && <div className="text-xs text-stone-500 mt-0.5">{person.deathPlace}</div>}
        </div>
      </div>

      {person.note && (
        <div className="mt-3 text-xs text-stone-500 italic border-t border-stone-200/60 pt-3 leading-relaxed">
          {person.note.length > 240 ? person.note.slice(0, 240) + "…" : person.note}
        </div>
      )}
    </div>
  );
}

// Spouse & children section
function FamilySection({
  person,
  families,
  personsMap,
  onNavigate,
}: {
  person: GedcomPerson;
  families: GedcomFamily[];
  personsMap: Record<string, GedcomPerson>;
  onNavigate: (p: GedcomPerson) => void;
}) {
  const spouseFams = families.filter(
    (f) => f.husbandId === person.id || f.wifeId === person.id
  );
  if (!spouseFams.length) return null;

  return (
    <div className="space-y-3">
      {spouseFams.map((fam) => {
        const spouseId = fam.husbandId === person.id ? fam.wifeId : fam.husbandId;
        const spouse = spouseId ? personsMap[spouseId] ?? null : null;
        const children = fam.childIds
          .map((id) => personsMap[id])
          .filter(Boolean) as GedcomPerson[];

        return (
          <div
            key={fam.id}
            className="paper-panel rounded-3xl p-4"
          >
            {spouse && (
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
                <span className="text-[10px] uppercase tracking-widest text-(--orange-deep) font-medium whitespace-nowrap">
                  Ehepartner
                </span>
                <div className="w-full sm:max-w-xs sm:flex-1">
                  <AncestorCard person={spouse} onNavigate={onNavigate} size="sm" />
                </div>
                {fam.marriageDate && (
                  <span className="text-xs text-stone-500 whitespace-nowrap">
                    ⚭ {fam.marriageDate}
                    {fam.marriagePlace ? `, ${fam.marriagePlace}` : ""}
                  </span>
                )}
              </div>
            )}

            {children.length > 0 && (
              <>
                <div className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-2">
                  {children.length === 1 ? "1 Kind" : `${children.length} Kinder`}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {children.map((child) => (
                    <AncestorCard
                      key={child.id}
                      person={child}
                      onNavigate={onNavigate}
                      size="sm"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Row label ─────────────────────────────────────────────────────────────────
function RowLabel({ label }: { label: string }) {
  return (
    <div className="mb-1 mt-3">
      <span className="text-[10px] uppercase tracking-widest text-stone-300 font-medium select-none">
        {label}
      </span>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

interface Props {
  person: GedcomPerson;
  personsMap: Record<string, GedcomPerson>;
  families: GedcomFamily[];
  onNavigate: (p: GedcomPerson) => void;
}

export default function PedigreeView({ person, personsMap, families, onNavigate }: Props) {
  const tree = useMemo(
    () => buildAncestors(person, personsMap, families),
    // person.id is the stable key; including full refs for correctness
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [person.id, personsMap, families]
  );

  const hasParents = !!(tree[2] || tree[3]);
  const hasGPs = [4, 5, 6, 7].some((i) => tree[i]);
  const hasGGPs = [8, 9, 10, 11, 12, 13, 14, 15].some((i) => tree[i]);

  return (
    <div className="section-shell rounded-4xl p-4 sm:p-6">
      {/* Great-grandparents row */}
      {hasGGPs && (
        <>
          <RowLabel label="Urgroßeltern" />
          <div className="overflow-x-auto pb-2">
            <div className="grid min-w-176 grid-cols-8 gap-1.5">
              {[8, 9, 10, 11, 12, 13, 14, 15].map((pos) => (
                <AncestorCard key={pos} person={tree[pos]} onNavigate={onNavigate} size="xs" />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Connector: GGP → GP (only if both rows exist) */}
      {hasGGPs && hasGPs && (
        <div className="overflow-x-auto pb-1">
          <div className="grid min-w-176 grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <Bridge key={i} leftPresent={!!tree[8 + i * 2]} rightPresent={!!tree[9 + i * 2]} />
            ))}
          </div>
        </div>
      )}

      {/* Grandparents row */}
      {hasGPs && (
        <>
          <RowLabel label="Großeltern" />
          <div className="overflow-x-auto pb-2">
            <div className="grid min-w-lg grid-cols-4 gap-1.5">
              {[4, 5, 6, 7].map((pos) => (
                <AncestorCard key={pos} person={tree[pos]} onNavigate={onNavigate} size="sm" />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Connector: GP → Parents */}
      {hasGPs && hasParents && (
        <div className="overflow-x-auto pb-1">
          <div className="grid min-w-lg grid-cols-2 gap-1.5">
            {[0, 1].map((i) => (
              <Bridge key={i} leftPresent={!!tree[4 + i * 2]} rightPresent={!!tree[5 + i * 2]} />
            ))}
          </div>
        </div>
      )}

      {/* Parents row */}
      {hasParents && (
        <>
          <RowLabel label="Eltern" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[2, 3].map((pos) => (
              <AncestorCard key={pos} person={tree[pos]} onNavigate={onNavigate} size="md" />
            ))}
          </div>
        </>
      )}

      {/* Connector: Parents → Selected */}
      {hasParents && (
        <Bridge leftPresent={!!tree[2]} rightPresent={!!tree[3]} />
      )}

      {/* Selected person (featured) */}
      <RowLabel label="Ausgewählt" />
      <SelectedCard person={person} />

      {/* Vertical line to children */}
      <div className="flex justify-center my-0.5">
        <div className="w-0.5 h-5 bg-amber-200" />
      </div>

      {/* Families & children */}
      <RowLabel label="Ehe & Kinder" />
      <FamilySection
        person={person}
        families={families}
        personsMap={personsMap}
        onNavigate={onNavigate}
      />
    </div>
  );
}
