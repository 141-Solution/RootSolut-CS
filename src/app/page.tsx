import Link from "next/link";
import { loadGedcomData } from "@/lib/gedcom-loader";
import { getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const data = loadGedcomData();
  const articles = getAllArticles().slice(0, 2);
  const personCount = data.persons.size;
  const familyCount = data.families.size;

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
      {/* Hero */}
      <section className="section-shell overflow-hidden rounded-[2rem] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-[rgba(54,90,61,0.12)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--green-deep)]">
              Familienchronik Mecklenburg
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-none text-[var(--brown-deep)] sm:text-6xl lg:text-7xl">
              Die Schwiesselmänner
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[rgba(45,36,23,0.82)] sm:text-lg lg:text-xl">
              Eine Reise durch die Geschichte der Familie Schwiesselmann von den Tagelöhnern in Großschönau bis in die Gegenwart.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/stammbaum" className="rounded-full bg-[var(--green-deep)] px-6 py-3 text-center text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                Stammbaum ansehen
              </Link>
              <Link href="/chronologie" className="rounded-full border border-[rgba(95,61,40,0.18)] bg-[rgba(255,250,241,0.86)] px-6 py-3 text-center text-sm font-semibold text-[var(--brown-deep)] transition-colors hover:bg-[rgba(243,214,185,0.5)]">
                Chronologie lesen
              </Link>
            </div>
          </div>

          <div className="paper-panel earth-ring rounded-[1.75rem] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--orange-deep)]">Schwerpunkte</p>
            <div className="mt-4 space-y-4 text-sm text-[rgba(45,36,23,0.8)] sm:text-base">
              <div className="rounded-2xl bg-[rgba(227,236,222,0.65)] p-4">
                Familienbeziehungen aus lokalen GEDCOM-Dateien, lesbar auf Desktop und Mobilgeräten.
              </div>
              <div className="rounded-2xl bg-[rgba(243,214,185,0.55)] p-4">
                Artikel, Chronologie und Kontakt in einer ruhigen, archivartigen Oberfläche.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[
          { label: "Personen", value: personCount, href: "/stammbaum" },
          { label: "Familien", value: familyCount, href: "/stammbaum" },
          { label: "Artikel", value: articles.length + 1, href: "/tagesloehnerei" },
          { label: "Generationen", value: "4+", href: "/chronologie" },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="paper-panel earth-ring group rounded-3xl p-4 text-center transition-transform hover:-translate-y-1 sm:p-5"
          >
            <div className="text-3xl font-semibold text-[var(--brown-deep)] transition-colors group-hover:text-[var(--green-deep)] sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--orange-deep)] sm:text-sm">{stat.label}</div>
          </Link>
        ))}
      </section>

      {/* Quick links */}
      <section className="grid gap-4 md:grid-cols-3 md:gap-6">
        <Link href="/stammbaum" className="paper-panel group rounded-[1.75rem] p-5 transition-transform hover:-translate-y-1 sm:p-6">
          <div className="mb-3 text-3xl">🌳</div>
          <h2 className="mb-2 text-2xl font-semibold text-[var(--brown-deep)] group-hover:text-[var(--green-deep)]">Stammbaum</h2>
          <p className="text-sm leading-relaxed text-[rgba(45,36,23,0.72)]">
            Alle erfassten Personen und Familien auf einen Blick.
          </p>
        </Link>
        <Link href="/chronologie" className="paper-panel group rounded-[1.75rem] p-5 transition-transform hover:-translate-y-1 sm:p-6">
          <div className="mb-3 text-3xl">📅</div>
          <h2 className="mb-2 text-2xl font-semibold text-[var(--brown-deep)] group-hover:text-[var(--green-deep)]">Chronologie</h2>
          <p className="text-sm leading-relaxed text-[rgba(45,36,23,0.72)]">
            Ereignisse in zeitlicher Reihenfolge – Geburten, Heiraten, Tode.
          </p>
        </Link>
        <Link href="/tagesloehnerei" className="paper-panel group rounded-[1.75rem] p-5 transition-transform hover:-translate-y-1 sm:p-6">
          <div className="mb-3 text-3xl">📜</div>
          <h2 className="mb-2 text-2xl font-semibold text-[var(--brown-deep)] group-hover:text-[var(--green-deep)]">Aus der Tageslöhnerei</h2>
          <p className="text-sm leading-relaxed text-[rgba(45,36,23,0.72)]">
            Geschichten und Hintergründe aus dem Leben unserer Vorfahren.
          </p>
        </Link>
      </section>

      {/* Latest articles */}
      {articles.length > 0 && (
        <section>
          <h2 className="mb-4 border-b border-[rgba(95,61,40,0.14)] pb-3 text-3xl font-semibold text-[var(--brown-deep)]">
            Neueste Beiträge
          </h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/tagesloehnerei/${article.slug}`}
                className="paper-panel block rounded-[1.5rem] p-5 transition-transform hover:-translate-y-1 sm:p-6"
              >
                <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--orange-deep)]">
                  {new Date(article.date).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}
                </div>
                <h3 className="mb-1 text-xl font-semibold text-[var(--brown-deep)] sm:text-2xl">{article.title}</h3>
                <p className="text-sm leading-relaxed text-[rgba(45,36,23,0.72)]">{article.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/tagesloehnerei" className="text-sm font-semibold text-[var(--green-deep)] hover:text-[var(--brown-deep)]">
              Alle Beiträge →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
