import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { BlogPreview } from "@/components/blog-preview";
import { connectToDatabase } from "@/lib/mongodb";

async function getBlogPosts() {
  const db = await connectToDatabase();

  const blogPosts = await db
    .collection("blogPosts")
    .find({})
    .limit(3)
    .sort({ date: -1 })
    .toArray(); // Convert the cursor to an array

  // Serialize `_id` and format `date`
  return blogPosts.map((post) => ({
    ...post,
    _id: post._id.toString(), // Convert ObjectId to string
    date: post.date instanceof Date ? post.date.toISOString() : post.date, // Format date
  }));
}

export default async function Home() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        {blogPosts.length > 0 && <BlogPreview blogPosts={blogPosts} />}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
