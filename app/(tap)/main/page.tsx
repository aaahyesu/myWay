"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

import { getMorePlaces, getMoreBanners, getMoreRoute } from "./actions";
import { useSession } from "next-auth/react";

import { Bars3CenterLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import ListPlace from "@/components/list-place";
import CategoryComponent from "@/components/CatergoryComponent";
import BannerSwiper from "@/components/BannerSwiper";
import MainMapComponent from "@/components/MainMapComponent";

type Place = {
  id: number;
  title: string;
  address: string;
  photo: string;
};

type Banner = {
  id: number;
  title: string;
  content: string;
  photo: string;
};

type Route = {
  id: number;
  address: string;
  latitude: string;
  longitude: string;
};

export default function Main() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [route, setRoutes] = useState<Route[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      const [fetchedPlaces, fetchedBanners, fetchedRoutes] = await Promise.all([
        getMorePlaces(1, 1),
        getMoreBanners(),
        getMoreRoute(),
      ]);
      setPlaces(fetchedPlaces);
      setBanners(fetchedBanners);
      setRoutes(fetchedRoutes);
    }

    fetchData();
  }, []);

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "2rem",
      }}
    >
      <div className="w-full h-11 border-2 border-grey-400 rounded-lg mt-4 bg-gray-100 flex items-center justify-between px-4">
        <Bars3CenterLeftIcon className="w-7 h-7 text-gray-700" />
        <input
          type="text"
          placeholder="' 대전 맛집 코스 ' 를 검색해보세요"
          className="w-full mx-5 text-gray-700 bg-gray-100 focus:outline-none font-Nanum"
        />
        <UserCircleIcon className="w-7 h-7 text-gray-700" />
      </div>

      <BannerSwiper banners={banners} />
      <CategoryComponent />

      <div className="flex mt-4 items-start w-full">
        <img
          src="/recommend.png"
          alt="recommend"
          className="w-8 h-8 mr-2"
        ></img>
        <div className="text-md text-left font-semibold text-gray-500 mt-1">
          {session?.user?.name} 트립마스터
        </div>
        <div className="text-xl font-extrabold text-gray-800 ml-2">
          를 위한 추천 코스
        </div>
      </div>
      <MainMapComponent route={route} />

      <div className="flex mt-4 items-start w-full ">
        <img
          src="/recommend.png"
          alt="recommend"
          className="w-8 h-8 mr-0"
        ></img>
        <div className="text-xl font-extrabold text-gray-800 ml-2 mt-1">
          새로운 HotPlace 🔥
        </div>
        <Link href="../hotupload">
          <button className="flex items-center ml-14 mt-1 bg-black px-3 py-2 text-sm text-white shadow-xl rounded-full hover:bg-white hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
            핫플 등록
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {places.map((place) => (
          <ListPlace key={place.id} {...place} />
        ))}
      </div>
      <div className="mb-24"></div>
    </div>
  );
}
