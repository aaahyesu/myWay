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

  // 기존 좌표가 있는지 확인
  const existingCoordinate = await prisma.coordinate.findUnique({
    where: { key: key },
  });

  if (existingCoordinate) {
    // 기존 좌표가 있으면 업데이트
    const updatedCoordinate = await prisma.coordinate.update({
      where: { key: key },
      data: {
        address: address,
        latitude: latitude,
        longitude: longitude,
      },
    });

    console.log("Coordinate updated:", updatedCoordinate);
    return updatedCoordinate; // 업데이트된 좌표 반환
  }

  // 기존 좌표가 없다면 새로 생성
  const coordinate = await prisma.coordinate.create({
    data: {
      address: address,
      latitude: latitude,
      longitude: longitude,
      key: key,
    },
  });

  console.log("Coordinate created:", coordinate);
  return coordinate; // 생성된 좌표 반환
}
