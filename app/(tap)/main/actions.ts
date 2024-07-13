"use server";
import prisma from "@/lib/db";

export async function getMorePlaces(page: number, userId: number) {
  const places = await prisma.place.findMany({
    select: {
      id: true,
      title: true,
      photo: true,
      address: true,
      username: true,
    },
  });

  return places;
}
export async function getMoreBanners() {
  const banners = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      photo: true,
      content: true,
    },
  });

  return banners;
}
export async function getMoreCafe() {
  const cafes = await prisma.place.findMany({
    where: {
      category: "카페",
    },
    select: {
      id: true,
      title: true,
      photo: true,
      content: true,
      address: true,
    },
  });

  return cafes;
}

export async function getMoreRestaurant() {
  const restaurants = await prisma.place.findMany({
    where: {
      category: "맛집",
    },
    select: {
      id: true,
      title: true,
      photo: true,
      content: true,
      address: true,
    },
  });

  return restaurants;
}

export async function getMoreGuid() {
  const guids = await prisma.place.findMany({
    where: {
      category: "관광지",
    },
    select: {
      id: true,
      title: true,
      photo: true,
      content: true,
      address: true,
    },
  });

  return guids;
}
export async function getMoreRoad() {
  const roads = await prisma.place.findMany({
    where: {
      category: "관광지",
    },
    select: {
      id: true,
      title: true,
      photo: true,
      content: true,
      address: true,
    },
  });

  return roads;
}

export async function getMoreRoute() {
  const keys = await prisma.coordinate.findMany({
    select: {
      id: true,
      address: true,
      latitude: true,
      longitude: true,
    },
  });

  return keys;
}
