"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "./mongodb";
import BlogPost from "./BlogPost";

export const savePost = async ({
  title,
  description,
  tags,
  image,
  content,
}) => {
  const db = await connectToDatabase();
  const newPost = {
    title,
    description,
    image: image ? URL.createObjectURL(image) : null,
    content,
    tags: tags,
    date: new Date().toISOString(),
    slug: title.toLowerCase().replace(/ /g, "-"),
  };
  try {
    const res = await db.collection("blogPosts").insertOne(newPost);
    return {
      status: "success",
      message: "New blog post added",
      data: res,
    };
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  } finally {
    revalidatePath("/blog");
  }
};

//create for update post

export const updatePost = async ({
  title,
  description,
  tags,
  image,
  content,
  id,
}) => {
  console.log("id", id);
  const db = await connectToDatabase();
  const updatedPost = {
    title,
    description,
    image: image ? image : null,
    content: content,
    tags,
    date: new Date().toISOString(),
    slug: title.toLowerCase().replace(/ /g, "-"),
  };
  try {
    const res = await BlogPost.findByIdAndUpdate(
      id,
      { $set: updatedPost },
      { new: true }
    );
    return {
      status: "success",
      message: "Blog post updated",
      data: JSON.stringify(res),
    };
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  } finally {
    revalidatePath("/blog");
  }
};

//create for delete post

export const deletePost = async (id) => {
  console.log("id", id);
  await connectToDatabase();

  try {
    const res = await BlogPost.findByIdAndDelete(id);
    return {
      status: "success",
      message: "Blog post deleted",
      data: JSON.stringify(res),
    };
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  } finally {
    revalidatePath("/blog");
  }
};
