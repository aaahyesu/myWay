"use client";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import { getMorePlaces, getMoreBanners } from "./actions";
import { signIn, signOut, useSession } from "next-auth/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

import { Bars3CenterLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import ListPlace from "@/components/list-place";
import ListBanner from "@/components/list-banner";

import { useState, useEffect } from "react";

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

async function getPlaces() {
  const places = await prisma.place.findMany({
    select: {
      id: true,
      title: true,
      photo: true,
      address: true,
    },
  });

  return places;
}
async function getBanners() {
  const banners = await prisma.banner.findMany({
    select: {
      id: true,
      title: true,
      photo: true,
      content: true,
    },
  });
}

export default function Main() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [page, setPage] = useState(1);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const fetchedPlaces = await getMorePlaces(page, 1); // userId를 적절히 대체하세요
        console.log(fetchedPlaces);
        setPlaces(fetchedPlaces);
      } catch (error) {
        console.error("Error fetching places: ", error);
      }
    }
    async function fetchBanners() {
      try {
        const fetchedBanners = await getMoreBanners(page, 1); // userId를 적절히 대체하세요
        console.log(fetchedBanners);
        setBanners(fetchedBanners);
      } catch (error) {
        console.error("Error fetching Banners: ", error);
      }
    }

    fetchPlaces();
    fetchBanners();
  }, [page]);

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "2rem",
      }}
    >
      {" "}
      <div className="w-full h-11 border-2 border-grey-400 rounded-lg mt-4 bg-gray-100 flex items-center justify-between px-4">
        <Bars3CenterLeftIcon className="w-7 h-7 text-gray-700" />
        <input
          type="text"
          placeholder="' 대전 맛집 코스 ' 를 검색해보세요"
          className="w-full mx-5 text-gray-700 bg-gray-100 focus:outline-none font-Nanum"
        />
        <UserCircleIcon className="w-7 h-7 text-gray-700" />
      </div>
      <div className="w-full mt-4 flex flex-col items-center justify-center">
        <Swiper
          effect="fade"
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          style={{ width: "100%", height: "100%" }}
          spaceBetween={10}
          slidesPerView={1.2}
          autoplay={{
            delay: 5000, // 자동 재생 간격(ms)
            disableOnInteraction: false, // 사용자 상호 작용 시 자동 재생 중지 여부
          }}
        >
          {banners.map((banner) => (
            <SwiperSlide
              key={banner.id}
              className="swiper-slide"
              style={{ marginRight: "12px" }}
            >
              <ListBanner key={banner.id} {...banner} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center mt-5 mr-2">
        <Link
          href="main/restaurant"
          className="flex flex-col items-center mr-12 hover:bg-slate-100 focus:ring focus:outline-none focus:ring-gray-500"
        >
          <img src="/restaurant.png" alt="Icon1" className="w-10 h-10" />
          <p className="text-sm text-gray-700 mt-1 font-semibold">맛집</p>
        </Link>
        <Link
          href="main/cafe"
          className="flex flex-col items-center mr-12 hover:bg-slate-100"
        >
          <img src="/cafe.png" alt="Icon2" className="w-10 h-10" />
          <p className="text-sm text-gray-700 mt-1 font-semibold">카페</p>
        </Link>
        <Link
          href="main/guide"
          className="flex flex-col items-center mr-12 hover:bg-slate-100"
        >
          <img src="/guide.png" alt="Icon3" className="w-10 h-10" />
          <p className="text-sm text-gray-700 mt-1 font-semibold">관광지</p>
        </Link>
        <Link
          href="main/road"
          className="flex flex-col items-center hover:bg-slate-100"
        >
          <img src="/road.png" alt="Icon4" className="w-10 h-10" />
          <p className="text-sm text-gray-700 mt-1 font-semibold">추천코스</p>
        </Link>
      </div>
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
      <div className="w-full h-80 border-2 border-grey-400 rounded-lg mt-4 bg-gray-100 flex items-center justify-between px-4">
        <iframe
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0, marginTop: "5px" }}
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&q=LOCATION`}
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex mt-4 items-start w-full ">
        <img
          src="/recommend.png"
          alt="recommend"
          className="w-8 h-8 mr-2"
        ></img>
        <div className="text-xl font-extrabold text-gray-800 ml-2 mt-1">
          궁동 근처 핫플레이스
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {places.map((place) => (
          <ListPlace key={place.id} {...place} />
        ))}
      </div>
      <p className="mb-24"></p>
    </div>
  );
}
