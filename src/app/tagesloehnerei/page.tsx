import { getAllArticles, getComingSoonArticles } from "@/lib/articles";
import Link from "next/link";

export default function TagesloehnereiBlogPage() {
  const articles = getAllArticles();
  const comingSoon = getComingSoonArticles();

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-amber-900 mb-3">Aus der Tageslöhnerei</h1>
        <p className="text-lg text-stone-600">
          Geschichten, Hintergründe und Wissenswertes über das Leben unserer Vorfahren.
        </p>
      </div>

      {/* Published Articles */}
      {articles.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-amber-900">Veröffentlicht</h2>
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/tagesloehnerei/${article.slug}`}
              className="block bg-white border-2 border-amber-200 rounded-xl p-6 hover:shadow-lg hover:border-amber-300 transition-all group"
            >
              <div className="text-xs text-amber-600 mb-2 font-medium">
                {new Date(article.date).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" · "}
                {article.author}
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3 group-hover:text-amber-700 transition-colors">
                {article.title}
              </h3>
              <p className="text-stone-600 leading-relaxed mb-4">{article.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-amber-700 font-semibold group-hover:text-amber-900 transition-colors">
                Weiterlesen
                <span className="text-lg">→</span>
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Coming Soon */}
      {comingSoon.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-amber-900">Demnächst</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comingSoon.map((item) => (
              <div
                key={item.slug}
                className="bg-gradient-to-br from-amber-50 to-stone-50 border-2 border-dashed border-amber-200 rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-3 select-none opacity-50">🔒</div>
                <h3 className="text-lg font-bold text-amber-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500">Folgt bald…</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
