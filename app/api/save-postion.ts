// pages/api/save-position.ts

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { lat, lng } = req.body;

    try {
      const newCoordinate = await prisma.coordinate.create({
        data: {
          latitude: lat,
          longitude: lng,
        },
      });
      res.status(200).json(newCoordinate);
    } catch (error) {
      console.error("Error saving position to database:", error);
      res.status(500).json({ error: "Error saving position to database" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
