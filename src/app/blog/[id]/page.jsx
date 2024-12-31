import { connectToDatabase } from "@/lib/mongodb";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeftSquare } from "lucide-react";

async function getPostById(title) {
  console.log("title", title);
  const db = await connectToDatabase();

  const blogPosts = await db
    .collection("blogPosts")
    .find({ slug: title })
    .toArray();

  return blogPosts[0];
}

export default async function BlogPost({ searchParams }) {
  const { title } = searchParams;
  const post = (await getPostById(title)) || [];
  console.log("post", post);

  return (
    <main className="m-10 p-10 ">
      {" "}
      <Link href="/" className="flex items-center gap-2 underline mb-8">
        <ArrowLeftSquare className="h-6 w-6 hover:bg-gray-200" />
        Home
      </Link>
      <Card className="">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription className="">
            <div className="flex">
              {post.tags.map((tag, index) => (
                <Badge key={index} className="mr-2">
                  {tag}
                </Badge>
              ))}{" "}
              <div className="">{post.date}</div>
            </div>

            <div className="mt-5">{post.description}</div>
          </CardDescription>
        </CardHeader>
        <CardContent>{post.content}</CardContent>
      </Card>
    </main>
  );
}