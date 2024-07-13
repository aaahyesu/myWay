"use client";
import { getMorePlaces } from "@/app/(tap)/main/actions";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ListPlace from "@/components/list-place";
import Bar from "@/components/bar";

type Place = {
  id: number;
  title: string;
  address: string;
  photo: string;
  username: string;
};

export default function Hotplace() {
  const [places, setPlaces] = useState<Place[]>([]);
  const { data: session } = useSession();
  const [page] = useState(1);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const fetchedPlaces = await getMorePlaces(page, 1);
        const filteredPlaces= fetchedPlaces.filter(
          (place) => place.username === String(session?.user?.name)
        );
        setPlaces(filteredPlaces);
      } catch (error) {
        console.error("Error fetching places: ", error);
      }
    }

    fetchPlaces();
  }, [page]);

  return (
    <div className="grid grid-cols-2 gap-4 mt-4 pt-10">
      <Bar canGoBack title="등록한 핫플 목록"/>
      {places.map((place) => (
        <ListPlace key={place.id} {...place} />
      ))}
    </div>
  );
}
