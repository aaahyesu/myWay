"use client";
import Link from "next/link";
import Image from "next/image";
import { getMoreRoad } from "../actions";
import Map from "@/components/map";
import { useEffect, useState } from "react";

type Place = {
  id: number;
  title: string;
  address: string;
  photo: string;
};

export default function Road() {
  const [roads, setRoads] = useState<Place[]>([]);

  useEffect(() => {
    async function fetchRoads() {
      try {
        const fetchedRoads = await getMoreRoad();
        setRoads(fetchedRoads);
      } catch (error) {
        console.log("Error fetching cafes", error);
      }
    }

    fetchRoads();
  }, []);
  return (
    <div className="w-[380px] mt-2 flex flex-col items-center justify-center">
      <div className="flex mt-4 items-start w-full">
        <img
          src="/recommend.png"
          alt="recommend"
          className="w-8 h-8 mr-2"
        ></img>
        <div className="text-md text-left font-semibold text-gray-500 mt-1">
          대전 광역시 유성구
        </div>
        <div className="text-xl font-extrabold text-gray-800 ml-2">
          기반 코스 추천
        </div>
      </div>
      <Map />
      <div className="flex mt-4 items-start w-full ">
        <img
          src="/recommend.png"
          alt="recommend"
          className="w-8 h-8 mr-2"
        ></img>
        <div className="text-xl font-extrabold text-gray-800 ml-2 mt-1">
          궁동 근처 코스 리스트
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {roads.map((road) => (
          <div key={road.id} className="flex flex-col items-center">
            <Link href={`/main/${road.id}`}>
              <div className="w-40 h-32 rounded-xl overflow-hidden">
                <Image
                  src={road.photo}
                  alt={`Image ${road.id}`}
                  width={170}
                  height={130}
                />
              </div>
            </Link>
            <p className="text-left mt-2 font-semibold">{road.title}</p>
            <p className="text-center text-xs text-gray-500 mr-1">
              {road.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
