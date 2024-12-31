import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { BlogPreview } from "@/components/blog-preview";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPost from "@/lib/BlogPost";

async function getBlogPosts() {
  "use server";
  await connectToDatabase();

  const blogPosts = await BlogPost.find({}).sort({ date: -1 }).lean();

  return blogPosts;
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
