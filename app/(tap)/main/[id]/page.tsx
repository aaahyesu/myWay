"use client";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { getMorePlaces } from "@/app/(tap)/main/actions";
import React, { useState, useEffect } from "react";
import Loading from "@/app/(tap)/main/[id]/loading";

import {
  HeartIcon as OutlineHeartIcon,
  ClockIcon,
  ExclamationCircleIcon,
  PhoneIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

import { CldImage } from "next-cloudinary";

type Place = {
  id: number;
  title: string;
  address: string;
  photo: string;
  content: string;
  open: string;
  close: string;
  tel: string;
  sns: string;
};

export default function PlaceDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPlaces() {
      const fetchedPlaces = await getMorePlaces(1, 1);
      const filteredPlace = fetchedPlaces.filter(
        (place_id) => place_id.id === id
      );
      setPlaces(filteredPlace);
      setLoading(false);
    }

    fetchPlaces();
  }, [id]);

  if (loading) {
    return <Loading />; // Display the Loading component while loading
  }

  if (places.length === 0) {
    return <div>No place found</div>;
  }

  const place = places[0];

  return (
    <div
      style={{
        height: "110vh",
        overflowY: "scroll",
        padding: "5px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="flex items-center justify-between p-5 text-lg text-black text-left font-bold mt-4">
        <div>
          {place.title}
          <p className="font-semibold pt-1 text-xs text-gray-300">{place.address}</p>
        </div>
        <div>
          <OutlineHeartIcon className="w-7 h-7" />
        </div>
      </div>
      <div className="p-5 flex justify-center items-center">
        <CldImage
          className="rounded-lg"
          src={place.photo}
          alt="Image"
          width={330}
          height={230}
        />
      </div>
      <p className="text-gray-600 text-center p-10 ">{place.content}</p>
      <div className="w-[340px] h-56 border-2 border-grey-400 rounded-lg bg-gray-100 flex flex-col items-start justify-center ml-4">
        <div className="flex flex-col ml-5">
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5" />
            <p className="text-sm ml-3">영업시간</p>
          </div>
          <p className="text-xs ml-8 text-gray-400">
            {place.open} ~ {place.close}
          </p>
        </div>

        <div className="flex flex-col ml-5 mt-3">
          <div className="flex items-center">
            <ExclamationCircleIcon className="w-5 h-5" />
            <p className="text-sm ml-3">라스트오더</p>
          </div>
          <p className="text-xs ml-8 text-gray-400">{place.close}</p>
        </div>
        <div className="flex flex-col ml-5 mt-3">
          <div className="flex items-center">
            <PhoneIcon className="w-5 h-5" />
            <p className="text-sm ml-3">전화번호</p>
          </div>
          <p className="text-xs ml-8 text-gray-400">{place.tel}</p>
        </div>

        <div className="flex flex-col ml-5 mt-3">
          <div className="flex items-center">
            <ShareIcon className="w-5 h-5" />
            <p className="text-sm ml-3">인스타 주소</p>
          </div>
          <p className="text-xs ml-8 text-gray-400">{place.sns}</p>
        </div>
      </div>
    </div>
  );
}
