"use client";
import { getMorePlaces } from "@/app/(tap)/main/actions";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ListPlace from "@/components/layout/ListPlace";
import Bar from "@/components/common/Bar";

type Place = {
  id: number;
  title: string;
  address: string;
  photo: string;
  userEmail: string;
};

export default function Hotplace() {
  const [places, setPlaces] = useState<Place[]>([]);
  const { data: session } = useSession();
  const [page] = useState(1);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const fetchedPlaces = await getMorePlaces(page, 1);
        const filteredPlaces = fetchedPlaces.filter(
          (place) => place.userEmail === String(session?.user?.email)
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
      <Bar canGoBack title="등록한 핫플 목록" />
      {places.map((place) => (
        <ListPlace key={place.id} {...place} />
      ))}
    </div>
  );
}
