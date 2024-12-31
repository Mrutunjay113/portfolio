"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BlogForm } from "./blog-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeftSquare, Home, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { deletePost, savePost, updatePost } from "@/lib/actions";

// Assuming `blogPosts` is being passed as a prop, otherwise initialize it with dummy data
const generateRandomBlogPosts = (count) => {
  const tags = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "CSS",
    "HTML",
    "Web Development",
    "Frontend",
    "Backend",
    "Full Stack",
    "UI/UX",
    "Performance",
    "Accessibility",
    "SEO",
    "Mobile",
    "Responsive Design",
  ];

  return Array.from({ length: count }, (_, i) => {
    const title = `Blog Post ${i + 1}`;
    const excerpt = `This is a brief description of Blog Post ${
      i + 1
    }. It covers various topics related to web development.`;
    const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000))
      .toISOString()
      .split("T")[0];
    const slug = `blog-post-${i + 1}`;
    const postTags = tags.sort(() => 0.5 - Math.random()).slice(0, 3);

    return { id: i + 1, title, excerpt, date, slug, tags: postTags };
  });
};

export function Blog({ blogPosts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [posts, setPosts] = useState(blogPosts || generateRandomBlogPosts(10));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const { toast } = useToast();

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === "" || post.tags.includes(selectedTag))
  );

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  const handleAddOrEditPost = async (post) => {
    const { title, description, tags, image, content, date, id } = post;
    console.log("post", post);

    if (editingPost) {
      const res = await updatePost({
        id,
        title,
        description,
        tags,
        image,
        content,
        date: new Date().toISOString(),
      });
      console.log("res", res);
      toast({
        title: "Blog post updated",
        description: "Your changes have been saved successfully.",
      });
    } else {
      // Add new post

      const res = await savePost({
        title,
        description,
        tags,
        image,
        content,
        date: new Date().toISOString(),
      });
      console.log("res", res);
      toast({
        title: "Blog post created",
        description: "Your new blog post has been added successfully.",
      });
    }
    setIsDrawerOpen(false);
    setEditingPost(null);
  };

  const handleDelete = async (postId) => {
    console.log("postId", postId);
    const res = await deletePost(postId);
    console.log("res", res);
    toast({
      title: "Blog post deleted",
      description: "The blog post has been deleted successfully.",
    });
  };

  return (
    <section className="py-20 bg-background">
      {" "}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        <Link href="/" className="flex items-center gap-2 underline">
          <ArrowLeftSquare className="h-6 w-6 hover:bg-gray-200" />
          Home
        </Link>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest Blog Posts
        </motion.h2>
        {/* Search and Add Blog */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetTrigger asChild>
              <Button onClick={() => setEditingPost(null)}>Add Blog</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  {editingPost ? "Edit" : "Add"} Blog Post
                </SheetTitle>
              </SheetHeader>
              <BlogForm
                onSubmit={handleAddOrEditPost}
                initialData={editingPost}
              />
            </SheetContent>
          </Sheet>
        </div>
        {/* Tags Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Badge
            variant={selectedTag === "" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedTag("")}
          >
            All
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        {/* Blog Posts */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{post.title}</h3>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={() => {
                              setEditingPost(post);
                              setIsDrawerOpen(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onSelect={() => handleDelete(post._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {post.date}
                      </span>
                      <Link
                        href={`/blog/post?title=${post.slug}`}
                        className="text-primary hover:underline"
                      >
                        Read more
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-6 text-muted-foreground">
            No blog posts found.
          </p>
        )}
      </div>
    </section>
  );
}
