"use server";

import prisma from "@/lib/prisma";

export async function upload(formData: FormData) {
  const data = {
    title: formData.get("title"),
    theme: formData.get("theme"),
    startLocation: formData.get("startLocation"),
    endLocation: formData.get("endLocation"),
    place: formData.get("place"),
    content: formData.get("content"),
    photo: formData.get("photo"),
    published: formData.get("published"),
    authorId: formData.get("authorId"),
  };
  
  console.log(data)
  
  const post = await prisma.post.create({
    data: {
        title: data.title,
        theme: data.theme,
        startLocation: data.startLocation,
        endLocation: data.endLocation,
        place: data.place,
        content: data.content,
        photo: data.photo,
        published: data.published,
        authorId: data.authorId,
    },
  });

  console.log("post created:", post);
}
