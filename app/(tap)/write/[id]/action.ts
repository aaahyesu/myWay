"use server";

import prisma from "@/lib/prisma";

export async function upload(formData: FormData) {
  const data = {
    title: formData.get("title")?.toString() || "",
    theme: formData.get("theme")?.toString() || "",
    names: formData.get("names")?.toString() || "",
    content: formData.get("content")?.toString() || "",
    photo: formData.get("photo")?.toString() || "",
    username: formData.get("username")?.toString() || "",
    key: formData.get("key")?.toString() || "",
  };


  const title = data.title.toString();
  const theme = data.theme.toString();
  const names = data.names.toString();
  const content = data.content.toString();
  const username = data.username.toString();
  const photo = data.photo.toString();
  const key = data.key as string;

  console.log(data);

  const post = await prisma.post.create({
    data: {
      title: title,
      theme: theme,
      content: content,
      photo: photo,
      author: {
        connect: {
          name: username,
        },
      },
    }})

  const updateCoordinate = await prisma.coordinate.update({
    where: {
      key: BigInt(key),
    },
    data: {
      name: names,
      postId: post.id
    },
  });

  console.log("post created:", post);
}
