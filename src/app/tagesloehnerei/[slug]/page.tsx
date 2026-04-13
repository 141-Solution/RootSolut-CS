import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const paragraphs = article.content.split("\n\n").filter(Boolean);

  return (
    <article className="mx-auto max-w-4xl">
      <div className="mb-6">
        <Link href="/tagesloehnerei" className="text-sm font-semibold text-[var(--green-deep)] hover:text-[var(--brown-deep)]">
          ← Zurück zur Übersicht
        </Link>
      </div>

      <header className="section-shell mb-8 rounded-[2rem] px-5 py-7 sm:px-8 sm:py-9">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--orange-deep)] sm:text-sm">
          {new Date(article.date).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {article.author}
        </div>
        <h1 className="mb-4 text-4xl font-semibold leading-tight text-[var(--brown-deep)] sm:text-5xl lg:text-6xl">
          {article.title}
        </h1>
        <p className="border-l-4 border-[var(--orange-deep)] pl-4 text-base leading-relaxed text-[rgba(45,36,23,0.78)] sm:text-lg">
          {article.excerpt}
        </p>
      </header>

      <div className="space-y-4 rounded-[1.75rem] bg-[rgba(255,250,241,0.72)] px-5 py-6 sm:px-8">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="text-base leading-relaxed text-[rgba(45,36,23,0.86)] sm:text-[1.05rem]">
            {para}
          </p>
        ))}
      </div>
    </article>
  );
}
