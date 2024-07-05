"use server";

import prisma from "@/lib/prisma";

export async function upload(formData: FormData) {
  const data = {
    address: formData.get("address"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
  };
  
  console.log(data)
  
  if ( data.address === null || data.latitude === null || data.longitude === null) {
    throw new Error("address are required fields.");
  }
  const address = data.address.toString();
  const latitude = data.latitude.toString();
  const longitude = data.longitude.toString();

  const Coordinate = await prisma.coordinate.create({
    data: {
      address: address,
      latitude: latitude,
      longitude: longitude,
    },
  });

  console.log("Coordinate created:", Coordinate);
}
