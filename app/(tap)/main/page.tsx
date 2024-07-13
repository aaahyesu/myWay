"use client";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

import { getMorePlaces, getMoreBanners, getMoreRoute } from "./actions";
import { signIn, signOut, useSession } from "next-auth/react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MapPinIcon from "@heroicons/react/24/solid";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

import { Bars3CenterLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import ListPlace from "@/components/list-place";
import ListBanner from "@/components/list-banner";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";

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

const colorMap: Record<number, string> = {
  1: "#CC3D3D",
  2: "#4374D9",
  3: "#6B8A24",
};
const MAX_DISTANCE = 1000; // 내 위치 1Km 반경

export default function Main() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [route, setRoutes] = useState<Route[]>([]);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchPlaces() {
      const fetchedPlaces = await getMorePlaces(1, 1);
      setPlaces(fetchedPlaces);
    }

    async function fetchBanners() {
      const fetchedBanners = await getMoreBanners();
      setBanners(fetchedBanners);
    }

    async function fetchRoutes() {
      const fetchedRoutes = await getMoreRoute();
      setRoutes(fetchedRoutes);
    }

    fetchPlaces();
    fetchBanners();
    fetchRoutes();
  }, []);

  useEffect(() => {
    if (route.length > 0) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
      script.onload = () => initializeMap();
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [route]);

  const initializeMap = () => {
    const mapElement = mapRef.current;

    if (!mapElement) {
      console.error("Map element not found");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const userLocation = new google.maps.LatLng(userLat, userLng);

          const map = new google.maps.Map(mapElement, {
            center: {
              lat: userLat,
              lng: userLng,
            },
            zoom: 15,
          });

          const bounds = new google.maps.LatLngBounds();

          route.forEach((coord) => {
            const latArray = JSON.parse(coord.latitude);
            const lngArray = JSON.parse(coord.longitude);
            const id = coord.id;
            const color = colorMap[id] || "#D1B2FF";

            const path = latArray.map((lat: any, index: string | number) => ({
              lat,
              lng: lngArray[index],
            }));

            const polyline = new google.maps.Polyline({
              path,
              geodesic: true,
              strokeColor: color,
              strokeOpacity: 1.0,
              strokeWeight: 2,
            });
            polyline.setMap(map);

            latArray.forEach(
              (
                lat: number | google.maps.LatLng | google.maps.LatLngLiteral,
                index: string | number
              ) => {
                const position = {
                  lat: Number(lat),
                  lng: Number(lngArray[index]),
                };

                const markerLocation = new google.maps.LatLng(
                  lat,
                  lngArray[index]
                );
                const distance =
                  google.maps.geometry.spherical.computeDistanceBetween(
                    userLocation,
                    markerLocation
                  );

                // 5km 이내의 마커만 추가
                if (distance <= MAX_DISTANCE) {
                  bounds.extend(markerLocation);

                  const icon = {
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="black" strokeWidth="0.1" className="size-8">
                      <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                    </svg>
                  `)}`,
                    scaledSize: new google.maps.Size(35, 35),
                  };

                  new google.maps.Marker({
                    position,
                    map,
                    icon,
                  });
                }
              }
            );
          });

          map.fitBounds(bounds);
        },
        () => {
          console.error("Geolocation permission denied or unavailable.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

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
              <Link href={`/community/${banner.id}`}>
                <ListBanner key={banner.id} {...banner} />
              </Link>
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
      <div className="flex flex-col mt-4">
        <div ref={mapRef} className="w-full h-80"></div>
      </div>

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
