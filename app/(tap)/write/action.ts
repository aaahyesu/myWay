"use server";

import prisma from "@/lib/prisma";

export async function upload(formData: FormData) {
  const data = {
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    address: formData.get("address"),
    key: formData.get("key"),
  };
  console.log(data);
  if (
    data.address === null ||
    data.latitude === null ||
    data.longitude === null ||
    data.key === null
  ) {
    throw new Error("address are required fields.");
  }
  const address = data.address.toString();
  const latitude = data.latitude.toString();
  const longitude = data.longitude.toString();
  const key = Number(data.key);

  if (isNaN(key)) {
    throw new Error("Key must be a number.");
  }

  const Coordinate = await prisma.coordinate.create({
    data: {
      address: address,
      latitude: latitude,
      longitude: longitude,
      key: key,
    },
  });

  console.log("Coordinate created:", Coordinate);

  return data;
}
