"use server";
import prisma from "@/lib/db";

export async function getPosts() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      theme: true,
      content: true,
      photo: true,
      authorEmail: true,
      author: {
        select: {
          name: true,
        },
      },
      coordinate: {
        select: {
          address: true,
          latitude: true,
          longitude: true,
          name: true,
        },
      },
    },
  });

  return posts;
}
