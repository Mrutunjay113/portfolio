import { Blog } from "@/components/blog";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { connectToDatabase } from "@/lib/mongodb";
import { Home } from "lucide-react";

async function getBlogPosts() {
  "use server";
  const db = await connectToDatabase();

  const blogPosts = await db
    .collection("blogPosts")
    .find({})
    .sort({ date: -1 })
    .toArray(); // Convert the cursor to an array

  // Serialize `_id` and format `date`
  return blogPosts.map((post) => ({
    ...post,
    _id: post._id.toString(), // Convert ObjectId to string
    date: post.date instanceof Date ? post.date.toISOString() : post.date, // Format date
  }));
}

export default async function BlogPage() {
  const blogPosts = (await getBlogPosts()) || [];

  return (
    <div className="min-h-screen bg-background">
      <Blog blogPosts={blogPosts} />
    </div>
  );
}
