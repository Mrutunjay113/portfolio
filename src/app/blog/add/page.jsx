"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StarterKit from "@tiptap/starter-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { connectToDatabase } from "@/lib/mongodb";
import { savePost } from "@/lib/actions";

export default function AddBlogPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState("");
  const router = useRouter();

  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content: "<p>Start writing your blog post here...</p>",
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await savePost({ title, description, tags, image, editor });
    if (res.status === "success") {
      alert(res.message);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-screen pt-16 py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Add New Blog Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Input
                  id="content"
                  value={editor}
                  onChange={(e) => setEditor(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. React, Next.js, Web Development"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Cover Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </div>
              <Button type="submit" className="w-full">
                Create Blog Post
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
