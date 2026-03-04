import { getAllBlogPosts } from "@/lib/blog";
import BlogsPageClient from "./BlogsPageClient";

export default function BlogsPage() {
  const posts = getAllBlogPosts();
  return <BlogsPageClient posts={posts} />;
}
