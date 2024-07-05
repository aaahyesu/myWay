"use server";
import prisma from "@/lib/db";

export async function getMorePlaces(page: number, userId: number) {
  const places = await prisma.place.findMany({
    select: {
      id: true,
      title: true,
      photo: true,
      address: true,
    },
  });

  return places;
}
export async function getMoreBanners(page: number, userId: number) {
  const banners = await prisma.banner.findMany({
    select: {
      id: true,
      title: true,
      photo: true,
      content: true,
    },
  });

  return banners;
}
