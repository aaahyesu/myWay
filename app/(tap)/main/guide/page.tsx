"use client";
import Link from "next/link";
import Image from "next/image";
import { getMoreGuid } from "../actions";
import Map from "@/components/map";
import { useEffect, useState } from "react";

type Place = {
  id: number;
  title: string;
  address: string;
  photo: string;
};

export default function Guid() {
  const [guids, setGuids] = useState<Place[]>([]);

  useEffect(() => {
    async function fetchGuids() {
      try {
        const fetchedGuids = await getMoreGuid();
        setGuids(fetchedGuids);
      } catch (error) {
        console.log("Error fetching cafes", error);
      }
    }

    fetchGuids();
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
          기반 관광지 추천
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
          궁동 근처 관광지 리스트
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {guids.map((guid) => (
          <div key={guid.id} className="flex flex-col items-center">
            <Link href={`/main/${guid.id}`}>
              <div className="w-40 h-32 rounded-xl overflow-hidden">
                <Image
                  src={guid.photo}
                  alt={`Image ${guid.id}`}
                  width={170}
                  height={130}
                />
              </div>
            </Link>
            <p className="text-left mt-2 font-semibold">{guid.title}</p>
            <p className="text-center text-xs text-gray-500 mr-1">
              {guid.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
