import { getAllBlogPosts } from "@/lib/blog";
import BlogSectionClient from "./BlogSectionClient";

export default function Blog() {
  const posts = getAllBlogPosts().slice(0, 3);
  return <BlogSectionClient posts={posts} />;
}
