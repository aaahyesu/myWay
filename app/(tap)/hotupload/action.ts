"use server";

import prisma from "@/lib/prisma";

export async function uploadSpot(formData: FormData) {
  const data = {
    photo: formData.get("photo")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    content: formData.get("content")?.toString() || "",
    address: formData.get("address")?.toString() || "",
    open: formData.get("open")?.toString() || "",
    close: formData.get("close")?.toString() || "",
    tel: formData.get("tel")?.toString() || "",
    sns: formData.get("sns")?.toString() || "",
    username: formData.get("username")?.toString() || "",
    category: formData.get("category")?.toString() || "",
  };

  const place = await prisma.place.create({
    data: {
      title: data.title,
      content: data.content,
      category: data.category,
      address: data.address,
      open: data.open,
      close: data.close,
      tel: data.tel,
      sns: data.sns,
      photo: data.photo,
      user: {
        connect: {
          name: data.username,
        },
      },
    },
  });
  console.log(place);
}
