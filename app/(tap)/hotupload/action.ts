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
  };

  const place = await prisma.place.create({
    data: {
      title: data.title,
      content: data.content,
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
}

// "use server";

// export async function uploadSpot(formData: FormData) {
//   const data = {
//     photo: formData.get("photo"),
//     title: formData.get("title"),
//     content: formData.get("content"),
//     address: formData.get("address"),
//     open: formData.get("open"),
//     close: formData.get("close"),
//     tel: formData.get("tel"),
//     sns: formData.get("sns"),
//     username: formData.get("username"),
//   };
//   console.log(data);
// }
