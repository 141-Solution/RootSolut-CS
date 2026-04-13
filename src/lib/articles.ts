import fs from "fs";
import path from "path";

export interface Article {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
}

const ARTICLES_DIR = path.join(process.cwd(), "data/articles");

// Only this article is published; others show as "coming soon"
const PUBLISHED_ARTICLES = ["familienchronik-anfaenge"];

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".json"));
  const articles = files
    .filter((f) => PUBLISHED_ARTICLES.includes(f.replace(".json", "")))
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
      return JSON.parse(raw) as Article;
    });
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getComingSoonArticles(): { slug: string; title: string }[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".json"));
  return files
    .filter((f) => !PUBLISHED_ARTICLES.includes(f.replace(".json", "")))
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
      const article = JSON.parse(raw) as Article;
      return { slug: article.slug, title: article.title };
    });
}

export function getArticleBySlug(slug: string): Article | null {
  if (!PUBLISHED_ARTICLES.includes(slug)) return null;
  const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Article;
}
