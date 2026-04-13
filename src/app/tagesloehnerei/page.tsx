import { getAllArticles, getComingSoonArticles } from "@/lib/articles";
import Link from "next/link";

export default function TagesloehnereiBlogPage() {
  const articles = getAllArticles();
  const comingSoon = getComingSoonArticles();

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
      {/* Header */}
      <div className="section-shell rounded-[2rem] px-5 py-7 sm:px-8 sm:py-9">
        <h1 className="mb-3 text-5xl font-semibold text-[var(--brown-deep)] sm:text-6xl">Aus der Tageslöhnerei</h1>
        <p className="max-w-3xl text-base leading-relaxed text-[rgba(45,36,23,0.78)] sm:text-lg">
          Geschichten, Hintergründe und Wissenswertes über das Leben unserer Vorfahren.
        </p>
      </div>

      {/* Published Articles */}
      {articles.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-[var(--brown-deep)]">Veröffentlicht</h2>
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/tagesloehnerei/${article.slug}`}
              className="paper-panel block rounded-[1.75rem] p-5 transition-all group hover:-translate-y-1 sm:p-6"
            >
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--orange-deep)]">
                {new Date(article.date).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" · "}
                {article.author}
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-[var(--brown-deep)] transition-colors group-hover:text-[var(--green-deep)] sm:text-3xl">
                {article.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[rgba(45,36,23,0.74)] sm:text-base">{article.excerpt}</p>
              <span className="inline-flex items-center gap-2 font-semibold text-[var(--green-deep)] transition-colors group-hover:text-[var(--brown-deep)]">
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
          <h2 className="text-3xl font-semibold text-[var(--brown-deep)]">Demnächst</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comingSoon.map((item) => (
              <div
                key={item.slug}
                className="section-shell rounded-[1.75rem] border-2 border-dashed p-6 text-center"
              >
                <div className="text-4xl mb-3 select-none opacity-50">🔒</div>
                <h3 className="mb-2 text-xl font-semibold text-[var(--brown-deep)]">{item.title}</h3>
                <p className="text-sm text-stone-500">Folgt bald…</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
