"use server";

import prisma from "@/lib/prisma";

export async function getMapKey() {
  const keys = await prisma.coordinate.findMany({
    select: {
      id: true,
      key: true,
      address: true,
      latitude: true,
      longitude: true,
    },
  });

  return keys;
}

export async function upload(formData: FormData) {
  const data = {
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    address: formData.get("address"),
    key: formData.get("key"),
  };

  if (
    data.address === null ||
    data.latitude === null ||
    data.longitude === null ||
    data.key === null
  ) {
    throw new Error(
      "Address, latitude, longitude, and key are required fields."
    );
  }

  const address = data.address.toString();
  const latitude = data.latitude.toString();
  const longitude = data.longitude.toString();
  const key = BigInt(data.key as string); // Convert key to BigInt

  const coordinate = await prisma.coordinate.create({
    data: {
      address: address,
      latitude: latitude,
      longitude: longitude,
      key: key,
    },
  });

  console.log("Coordinate created:", coordinate);

  return data;
}
