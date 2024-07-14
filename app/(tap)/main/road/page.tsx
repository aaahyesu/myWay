"use client";
import Link from "next/link";
import { getMoreRoad, getMoreRoute } from "../actions";
import { useEffect, useState, useRef } from "react";
import { CldImage } from "next-cloudinary";

type Place = {
  id: number;
  title: string;
  address: string;
  photo: string;
  lat: number;
  lng: number;
};

type Route = {
  id: number;
  address: string;
  latitude: string;
  longitude: string;
};

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";

const geocodeAddress = async (address: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();
  if (data.status === "OK") {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  }
  throw new Error("Geocoding failed");
};

export default function Road() {
  const [roads, setRoads] = useState<Place[]>([]);
  const [route, setRoutes] = useState<Route[]>([]);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchRoads() {
      try {
        const fetchedRoads = await getMoreRoad();
        const roadsWithCoords = await Promise.all(
          fetchedRoads.map(async (road) => {
            const { lat, lng } = await geocodeAddress(road.address);
            return { ...road, lat, lng };
          })
        );
        setRoads(roadsWithCoords);
      } catch (error) {
        console.log("Error fetching roads", error);
      }
    }

    async function fetchRoutes() {
      const fetchedRoutes = await getMoreRoute();
      setRoutes(fetchedRoutes);
    }

    fetchRoads();
    fetchRoutes();
  }, []);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
        script.onload = () => initializeMap();
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

    if (roads.length > 0) {
      loadGoogleMaps();
    }
  }, [roads]);

  const initializeMap = () => {
    const mapElement = mapRef.current;
    if (!mapElement) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        const map = new google.maps.Map(mapElement, {
          center: userLocation,
          zoom: 15,
        });

        roads.forEach((road) => {
          const markerLocation = new google.maps.LatLng(road.lat, road.lng);
          new google.maps.Marker({
            position: markerLocation,
            map,
          });
        });
      },
      () => {
        console.error("Geolocation permission denied or unavailable.");
      }
    );
  };

  return (
    <div className="w-[380px] mt-2 flex flex-col items-center justify-center">
      <div className="flex mt-4 items-start w-full">
        <img src="/recommend.png" alt="recommend" className="w-8 h-8 mr-2" />
        <div className="text-md text-left font-semibold text-gray-500 mt-1">
          내 위치
        </div>
        <div className="text-xl font-extrabold text-gray-800 ml-2">
          기반 맛집 추천
        </div>
      </div>
      <div ref={mapRef} className="w-full h-80 mt-4"></div>
      <div className="flex mt-4 items-start w-full ">
        <img src="/recommend.png" alt="recommend" className="w-8 h-8 mr-2" />
        <div className="text-xl font-extrabold text-gray-800 ml-2 mt-1">
          근처 맛집 리스트
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {roads.map((road) => (
          <div key={road.id} className="flex flex-col items-center">
            <Link href={`/main/${road.id}`}>
              <div className="w-40 h-32 rounded-xl overflow-hidden">
                <CldImage
                  src={road.photo}
                  alt={`Image ${road.id}`}
                  width={170}
                  height={130}
                />
              </div>
            </Link>
            <p className="text-left mt-2 font-semibold">{road.title}</p>
            <p className="text-center text-xs text-gray-500">{road.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
