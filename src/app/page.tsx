import Link from "next/link";
import { loadGedcomData } from "@/lib/gedcom-loader";
import { getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const data = loadGedcomData();
  const articles = getAllArticles().slice(0, 2);
  const personCount = data.persons.size;
  const familyCount = data.families.size;

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-12 border-b border-amber-200">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
          Die Schwiesselmänner
        </h1>
        <p className="text-lg text-amber-800 max-w-2xl mx-auto leading-relaxed">
          Eine Reise durch die Geschichte der Familie Schwiesselmann –
          von den Tageslöhnern in Großschönau bis in die Gegenwart.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Personen", value: personCount, href: "/stammbaum" },
          { label: "Familien", value: familyCount, href: "/stammbaum" },
          { label: "Artikel", value: articles.length + 1, href: "/tagesloehnerei" },
          { label: "Generationen", value: "4+", href: "/chronologie" },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center hover:bg-amber-100 transition-colors group"
          >
            <div className="text-3xl font-bold text-amber-900 group-hover:text-amber-700">
              {stat.value}
            </div>
            <div className="text-sm text-amber-700 mt-1">{stat.label}</div>
          </Link>
        ))}
      </section>

      {/* Quick links */}
      <section className="grid md:grid-cols-3 gap-6">
        <Link href="/stammbaum" className="group bg-white border border-amber-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">🌳</div>
          <h2 className="text-xl font-semibold text-amber-900 mb-2 group-hover:text-amber-700">Stammbaum</h2>
          <p className="text-sm text-gray-600">
            Alle erfassten Personen und Familien auf einen Blick.
          </p>
        </Link>
        <Link href="/chronologie" className="group bg-white border border-amber-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">📅</div>
          <h2 className="text-xl font-semibold text-amber-900 mb-2 group-hover:text-amber-700">Chronologie</h2>
          <p className="text-sm text-gray-600">
            Ereignisse in zeitlicher Reihenfolge – Geburten, Heiraten, Tode.
          </p>
        </Link>
        <Link href="/tagesloehnerei" className="group bg-white border border-amber-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">📜</div>
          <h2 className="text-xl font-semibold text-amber-900 mb-2 group-hover:text-amber-700">Aus der Tageslöhnerei</h2>
          <p className="text-sm text-gray-600">
            Geschichten und Hintergründe aus dem Leben unserer Vorfahren.
          </p>
        </Link>
      </section>

      {/* Latest articles */}
      {articles.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-amber-900 mb-4 pb-2 border-b border-amber-200">
            Neueste Beiträge
          </h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/tagesloehnerei/${article.slug}`}
                className="block bg-white border border-amber-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <div className="text-xs text-amber-600 mb-1">
                  {new Date(article.date).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}
                </div>
                <h3 className="text-lg font-semibold text-amber-900 mb-1">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/tagesloehnerei" className="text-amber-700 hover:text-amber-900 text-sm font-medium">
              Alle Beiträge →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
