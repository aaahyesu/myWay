"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

import { Bars3CenterLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function Main() {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
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
          {[1, 2, 3].map((index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide"
              style={{ marginRight: "12px" }}
            >
              <div className="text-center border-2 border-gray-300 rounded-lg p-4 bg-slate-50">
                <div className="flex justify-center items-center h-40 mt-2">
                  <div className=" w-60">
                    <Image
                      src="/background.png"
                      alt="/img"
                      width={100}
                      height={70}
                      layout="fixed"
                    />
                  </div>
                </div>
                <div className="h-14 mt-5">
                  <h2 className="text-center text-md font-semibold ">
                    대전의 맛집 거리가 궁금하다면?
                  </h2>
                  <p className="text-center text-xs text-gray-500 mr-2 ml-2">
                    성심당 맛있고, 꿈돌이 귀엽고, 가나다라마바사 아자차카타파하
                  </p>
                </div>
              </div>
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
          대전 광역시 유성구
        </div>
        <div className="text-xl font-extrabold text-gray-800 ml-2">
          기반 추천 코스
        </div>
      </div>
      <div className="w-full h-80 border-2 border-grey-400 rounded-lg mt-4 bg-gray-100 flex items-center justify-between px-4">
        <iframe
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0, marginTop: "5px" }}
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`}
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
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="flex flex-col items-center">
            <Link href="/main/1">
              <div className="w-42 h-32 rounded-xl overflow-hidden">
                <Image
                  src={`/placeSample.png`}
                  alt={`Image ${index}`}
                  width={170}
                  height={130}
                />
              </div>
            </Link>
            <p className="text-left mt-2 font-semibold">최진엽 사브샤브</p>
            <p className="text-center text-xs text-gray-500 mr-1">
              유성구 궁동로18번길 40 2층
            </p>
          </div>
        ))}
      </div>
      <p className="mb-24"></p>
    </div>
  );
}
