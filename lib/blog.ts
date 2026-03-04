import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const blogsDirectory = path.join(process.cwd(), "blogs-contents");

export interface BlogMeta {
  slug: string;
  title: string;
  titleEn: string;
  date: string;
  excerpt: string;
  excerptEn: string;
  tags: string[];
  readTime: number;
  coverColor: string;
}

export interface BlogPost extends BlogMeta {
  contentHtml: string;
}

/** Get all blog posts metadata, sorted by date (newest first) */
export function getAllBlogPosts(): BlogMeta[] {
  const fileNames = fs.readdirSync(blogsDirectory).filter((f) => f.endsWith(".md"));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(blogsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      titleEn: data.titleEn || data.title || slug,
      date: data.date || "",
      excerpt: data.excerpt || "",
      excerptEn: data.excerptEn || data.excerpt || "",
      tags: data.tags || [],
      readTime: data.readTime || 5,
      coverColor: data.coverColor || "#0070f3",
    } as BlogMeta;
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/** Get a single blog post with full HTML content */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || slug,
    titleEn: data.titleEn || data.title || slug,
    date: data.date || "",
    excerpt: data.excerpt || "",
    excerptEn: data.excerptEn || data.excerpt || "",
    tags: data.tags || [],
    readTime: data.readTime || 5,
    coverColor: data.coverColor || "#0070f3",
    contentHtml,
  };
}

/** Get all slugs for static generation */
export function getAllBlogSlugs(): string[] {
  return fs
    .readdirSync(blogsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
