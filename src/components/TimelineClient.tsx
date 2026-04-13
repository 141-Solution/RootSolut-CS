"use client";

import { useState, useEffect, useMemo } from "react";
import { GedcomEvent } from "@/lib/gedcom-parser";

interface Props {
  events: GedcomEvent[];
}

const typeLabels: Record<string, string> = {
  birth: "Geburt",
  death: "Tod",
  marriage: "Heirat",
};

const typeConfig = {
  birth: { bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-800 border-emerald-300", dot: "bg-emerald-500" },
  death: { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-100 text-slate-700 border-slate-300", dot: "bg-slate-400" },
  marriage: { bg: "bg-rose-50", border: "border-rose-200", badge: "bg-rose-100 text-rose-800 border-rose-300", dot: "bg-rose-500" },
};

export default function TimelineClient({ events }: Props) {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search (200ms)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 200);
    return () => clearTimeout(t);
  }, [search]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchType = filter === "all" || e.type === filter;
      const matchSearch =
        !debouncedSearch ||
        e.description.toLowerCase().includes(debouncedSearch) ||
        (e.place ?? "").toLowerCase().includes(debouncedSearch);
      return matchType && matchSearch;
    });
  }, [events, filter, debouncedSearch]);

  // Group events by decade
  const grouped = useMemo(() => {
    const groups: Record<number, GedcomEvent[]> = {};
    filtered.forEach((e) => {
      const decade = Math.floor(e.year / 10) * 10;
      if (!groups[decade]) groups[decade] = [];
      groups[decade].push(e);
    });
    return Object.entries(groups)
      .map(([decade, evs]) => ({ decade: parseInt(decade), events: evs }))
      .sort((a, b) => b.decade - a.decade);
  }, [filtered]);

  const typeStats = useMemo(() => {
    const stats = { all: events.length, birth: 0, death: 0, marriage: 0 };
    events.forEach((e) => {
      if (e.type === "birth") stats.birth++;
      else if (e.type === "death") stats.death++;
      else if (e.type === "marriage") stats.marriage++;
    });
    return stats;
  }, [events]);

  return (
    <div className="space-y-6">
      {/* ── Filters ────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Person oder Ort suchen…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-amber-300 rounded-xl px-4 py-2.5 text-sm bg-white
                       focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                       placeholder:text-stone-400 shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["all", "birth", "death", "marriage"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                filter === t
                  ? "bg-amber-800 text-white border-amber-800 shadow-md"
                  : "border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-amber-300"
              }`}
            >
              {t === "all" ? "Alle" : typeLabels[t]}
              {t !== "all" && <span className="ml-1.5 text-xs opacity-75">({typeStats[t as keyof typeof typeStats]})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results summary ────────────────────────────────────────────────── */}
      <div className="text-sm text-stone-500 px-1">
        {filtered.length === 0
          ? "Keine Ereignisse gefunden."
          : `${filtered.length} von ${events.length} Ereignissen · ${grouped.length} Dekade${grouped.length !== 1 ? "n" : ""}`}
      </div>

      {/* ── Timeline (grouped by decade) ────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-4xl mb-3 select-none opacity-40">📜</div>
          <p className="text-stone-400 font-medium">Keine Ereignisse gefunden</p>
          <p className="text-stone-300 text-sm mt-1">Versuchen Sie, andere Filter zu setzen.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(({ decade, events: decadeEvents }) => (
            <div key={decade}>
              {/* Decade header */}
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-lg font-bold text-amber-900">
                  {decade}er Jahre
                </h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-200 to-transparent" />
                <span className="text-xs text-stone-400 px-2 py-1 bg-stone-100 rounded-full whitespace-nowrap">
                  {decadeEvents.length} Ereignis{decadeEvents.length !== 1 ? "se" : ""}
                </span>
              </div>

              {/* Events in this decade */}
              <ol className="relative ml-4 space-y-4 border-l-2 border-amber-200 pl-6">
                {decadeEvents.map((event, idx) => {
                  const cfg = typeConfig[event.type];
                  return (
                    <li key={`${decade}-${idx}`} className="relative">
                      {/* Dot */}
                      <div className={`absolute -left-[1.875rem] top-1.5 w-4 h-4 rounded-full border-2 border-white ${cfg.dot} shadow-sm`} />

                      {/* Card */}
                      <div className={`border-2 rounded-xl p-4 transition-all hover:shadow-md ${cfg.bg} ${cfg.border}`}>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-amber-900">{event.year}</span>
                            <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${cfg.badge}`}>
                              {typeLabels[event.type]}
                            </span>
                          </div>
                        </div>

                        <p className="font-semibold text-stone-800 leading-snug">{event.description}</p>

                        {/* Details */}
                        {(event.date || event.place) && (
                          <div className="mt-3 pt-3 border-t border-current border-opacity-10 space-y-1 text-sm text-stone-600">
                            {event.date && <div>📅 {event.date}</div>}
                            {event.place && <div>📍 {event.place}</div>}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
