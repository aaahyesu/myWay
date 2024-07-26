"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getPosts } from "../action";
import { usePathname } from "next/navigation";
import { CldImage } from "next-cloudinary";
import Bar from "@/components/bar";

type Post = {
  id: number;
  title: string;
  theme: string;
  content: string;
  photo: string;
  authorEmail: string;
  author: {
    name: string;
  };
  coordinate: {
    address: string;
    latitude: string;
    longitude: string;
    name: string | null;
  }[];
};

interface GoogleWindow extends Window {
  google: typeof google;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";

export default function Detail() {
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [mapLoaded, setMapLoaded] = useState(false);
  const path = usePathname();
  const id = path.substring("/community/".length);

  useEffect(() => {
    async function fetchPost() {
      try {
        const fetchedPosts = await getPosts();
        const filteredPost = fetchedPosts.find(
          (posting) => posting.id === Number(id)
        );
        setPost(filteredPost);
      } catch (error) {
        console.error("Error fetching post: ", error);
      }
    }
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && !mapLoaded) {
      // Load Google Maps script if not loaded
      if (!document.getElementById("google-maps-script")) {
        const googleMapsScript = document.createElement("script");
        googleMapsScript.id = "google-maps-script";
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        googleMapsScript.async = true;
        window.document.body.appendChild(googleMapsScript);
        googleMapsScript.onload = () => {
          setMapLoaded(true);
          initMap();
        };
      } else {
        initMap();
      }
    }
  }, [post, mapLoaded]);

  const initMap = () => {
    const { google } = window as GoogleWindow;
    const mapElement = document.getElementById("map");

    if (!mapElement) {
      console.error("Map element not found");
      return;
    }

    const map = new google.maps.Map(mapElement, {
      center: { lat: 37.5665, lng: 126.978 },
      zoom: 10,
    });

    const geocoder = new google.maps.Geocoder();
    const addresses = post?.coordinate?.[0]?.address
      ? JSON.parse(post.coordinate[0].address)
      : [];

    const addMarkersAndPolyline = async () => {
      const coordinatesPromises = addresses.map(
        (address: string) =>
          new Promise<{ lat: number; lng: number }>((resolve, reject) => {
            geocoder.geocode({ address }, (results, status) => {
              if (
                status === google.maps.GeocoderStatus.OK &&
                results &&
                results[0]
              ) {
                const location = results[0].geometry.location;
                resolve({ lat: location.lat(), lng: location.lng() });
              } else {
                reject(status);
              }
            });
          })
      );

      try {
        const coordinates = await Promise.all(coordinatesPromises);
        const path = coordinates.map((coord) => ({
          lat: coord.lat,
          lng: coord.lng,
        }));

        const bounds = new google.maps.LatLngBounds();
        coordinates.forEach((coord, index) => {
          new google.maps.Marker({
            position: coord,
            map,
            label: {
              text: (index + 1).toString(),
              color: "white",
            },
          });
          bounds.extend(coord);
        });

        new google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map,
        });

        if (path.length > 0) {
          map.fitBounds(bounds);
        }
      } catch (error) {
        console.error("Error adding markers and polyline: ", error);
      }
    };

    if (addresses.length) {
      addMarkersAndPolyline();
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-16">
      <Bar canGoBack title={post.title} bookmark />
      <div id="map" className="w-96 h-80 mb-6"></div>
      <div className="mt-4 flex space-x-2 mb-6">
        <h1 className="text-xl font-semibold">{post.title}</h1>
        <span className="inline-flex items-center rounded-lg bg-blue-400 px-2 py-1 text-sm font-semibold text-white">
          {post.theme}
        </span>
      </div>
      <div className="space-y-3">
        {post.coordinate[0]?.name &&
          JSON.parse(post.coordinate[0].name).map(
            (name: string, index: number) => (
              <h2 key={index} className="text-base text-gray-500">
                <span className="text-gray-500">
                  📍 {index + 1} 번째 플레이스 :
                </span>{" "}
                <span className="text-black">{name}</span>
              </h2>
            )
          )}
      </div>
      <div className="flex space-x-3 mt-10 mb-4 items-center">
        <img
          className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
          src="../profile.png"
          alt=""
        />
        <div>
          <h1 className="text-base">{post.author?.name}</h1>
        </div>
      </div>
      <div className="relative pt-10">
        <Image
          src="/bg.png"
          alt="Description of the image"
          width="300"
          height="200"
          className="absolute inset-0 z-10"
        />
        <div className="slider-container relative z-20">
          <Slider>
            {post.photo.split(",").map((photoUrl, index) => (
              <div key={index} className="w-[250px] h-[250px] flex-shrink-0">
                <CldImage
                  src={photoUrl.trim()}
                  className="rounded-lg shadow-md h-full object-cover"
                  alt={`Photo ${index + 1}`}
                  width={250}
                  height={250}
                />
              </div>
            ))}
            <div></div>
          </Slider>
        </div>
      </div>
      <div className="mt-16 space-y-6">
        <h2 className="text-base text-gray-800">{post.content}</h2>
      </div>
      <h1 className="mt-14 font-semibold text-xl text-gray-800">
        이런사람에게 추천해요👍
      </h1>
      <div className="mt-4 border flex flex-wrap justify-center border-gray-300 rounded-xl px-4 py-4">
        <div className="flex flex-wrap justify-center space-x-10">
          <span className="flex flex-col space-y-2 items-center">
            <Image
              src="/eat.png"
              alt="Description of the image"
              width="80"
              height="80"
            />
            <h1 className="text-sm ">대식가</h1>
          </span>
          <span className="flex flex-col space-y-2 items-center">
            <Image
              src="/family.png"
              alt="Description of the image"
              width="80"
              height="80"
            />
            <h1 className="text-sm">온가족이랑</h1>
          </span>
          <span className="flex flex-col space-y-2 items-center">
            <Image
              src="/friend.png"
              alt="Description of the image"
              width="80"
              height="80"
            />
            <h1 className="text-sm">친구랑</h1>
          </span>
        </div>
        <div className="flex flex-wrap justify-center mt-4 space-x-10">
          <span className="flex flex-col space-y-2 items-center">
            <Image
              src="/vegan.png"
              alt="Description of the image"
              width="80"
              height="80"
            />
            <h1 className="text-sm">비건</h1>
          </span>
          <span className="flex flex-col space-y-2 items-center">
            <Image
              src="/mount.png"
              alt="Description of the image"
              width="80"
              height="80"
            />
            <h1 className="text-sm">등산러버</h1>
          </span>
          <span className="flex flex-col space-y-2 items-center">
            <Image
              src="/study.png"
              alt="Description of the image"
              width="80"
              height="80"
            />
            <h1 className="text-sm">혼공족</h1>
          </span>
        </div>
      </div>
      <h1 className="mt-16 font-semibold text-xl text-gray-800">댓글</h1>
      <div className="px-2 flex space-x-2 mt-4 mb-2">
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src="../profile.png"
          alt=""
        />
        <h1 className="flex items-center text-base">김혜수</h1>
      </div>
      <h2 className="px-3 text-sm">와 정말 멋진 장소 추천 감사합니다~</h2>
      <div className="flex space-x-2 items-center">
        <input
          className="mt-4 w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:border-gray-400 focus:outline-none"
          type="text"
          id="comment"
          name="comment"
          placeholder="댓글 추가"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="gray"
          className="mt-3.5 w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <p className="mb-24"></p>
    </div>
  );
}
