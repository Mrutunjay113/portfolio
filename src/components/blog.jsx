"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    title: "Getting Started with Next.js",
    excerpt:
      "Learn how to set up your first Next.js project and understand its core concepts.",
    date: "2023-06-01",
    slug: "getting-started-with-nextjs",
  },
  {
    title: "Mastering Tailwind CSS",
    excerpt:
      "Dive deep into Tailwind CSS and learn how to create beautiful, responsive designs quickly.",
    date: "2023-06-15",
    slug: "mastering-tailwind-css",
  },
  {
    title: "The Power of Server-Side Rendering",
    excerpt:
      "Explore the benefits of server-side rendering and how it can improve your web application's performance.",
    date: "2023-07-01",
    slug: "power-of-server-side-rendering",
  },
];

export function Blog() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest Blog Posts
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {post.date}
                    </span>
                    {/* <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                      Read more
                    </Link> */}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
