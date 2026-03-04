import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  return <BlogPostClient post={post} />;
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}
