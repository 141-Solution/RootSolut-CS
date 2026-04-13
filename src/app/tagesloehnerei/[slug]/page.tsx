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
    <article className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/tagesloehnerei" className="text-amber-700 hover:text-amber-900 text-sm">
          ← Zurück zur Übersicht
        </Link>
      </div>

      <header className="mb-8">
        <div className="text-sm text-amber-600 mb-2">
          {new Date(article.date).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {article.author}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-amber-300 pl-4">
          {article.excerpt}
        </p>
      </header>

      <div className="prose prose-amber max-w-none">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="text-gray-700 leading-relaxed mb-4">
            {para}
          </p>
        ))}
      </div>
    </article>
  );
}
