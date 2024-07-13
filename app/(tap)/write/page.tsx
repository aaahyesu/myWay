"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";

import Image from "next/image";
import { upload } from "./action";
import { useRouter } from "next/navigation";
import Bar from "@/components/bar";

const containerStyle = {
  width: "100%",
  height: "350px",
};

const defaultCenter = {
  lat: 37.569227,
  lng: 126.9777256,
  zoom: 16,
};

interface Coordinates {
  id: string;
  lat: number;
  lng: number;
  address?: string;
}

export default function Write() {
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(
    null
  );
  const [markers, setMarkers] = useState<Coordinates[]>([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const mapRef = useRef<google.maps.Map | null>(null);

  const router = useRouter();

  const newKey = Math.floor(Math.random() * 10000) + Date.now();
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ id: "current", lat: latitude, lng: longitude });
        setMapCenter({ lat: latitude, lng: longitude, zoom: 15 });
      });
    }
  }, []);

  const fetchAddress = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    return data.results[0]?.formatted_address || "Unknown Location";
  };

  const handleButtonClick = async () => {
    if (currentPosition) {
      const address = await fetchAddress(
        currentPosition.lat,
        currentPosition.lng
      );
      const newMarker = {
        ...currentPosition,
        id: `${Date.now()}`,
        address: address,
      };
      setMarkers([...markers, newMarker]);
      console.log(
        `Marker added: id=${newMarker.id}, lat=${newMarker.lat}, lng=${newMarker.lng}, address=${newMarker.address}`
      );
    }
  };

  const handleCenterChanged = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      if (center) {
        const newCenter = {
          id: "center",
          lat: center.lat(),
          lng: center.lng(),
        };
        setCurrentPosition(newCenter);
      }
    }
  };

  const generatePolylinePath = () => {
    return markers.map((marker) => ({
      lat: marker.lat,
      lng: marker.lng,
    }));
  };

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormValidation = () => {
    if (
      latitudeArray.length === 0 ||
      longitudeArray.length === 0 ||
      addressArray.length === 0
    ) {
      setIsFormValid(false);
      alert("모든 필수 필드를 입력하세요.");
    } else {
      setIsFormValid(true);
    }
  };

  const handleRouteWriteClick = () => {
    handleFormValidation();
    if (isFormValid) {
      router.push(`/write/${newKey}`);
    }
  };

  const latitudeArray = markers.map((marker) => marker.lat);
  const longitudeArray = markers.map((marker) => marker.lng);
  const addressArray = markers.map((marker) => marker.address);

  return isLoaded ? (
    <form action={upload} method="post">
      <Bar title="루트 작성하기" />
      <div className="py-16 mb-20">
        <h1 className="text-xl font-semibold mb-4">나만의 루트 만들기</h1>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-md text-gray-400">
              원하는 위치에서 좌표 찍기 버튼을 눌러
            </h2>
            <h2 className="text-md mb-4 text-gray-400">
              나만의 루트를 생성해보세요
            </h2>
          </div>
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={mapCenter.zoom}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onCenterChanged={handleCenterChanged}
        >
          {currentPosition && (
            <Marker
              position={{ lat: currentPosition.lat, lng: currentPosition.lng }}
            />
          )}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              animation={window.google.maps.Animation.BOUNCE}
              icon={{
                url: "/marker.png",
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          ))}
          {markers.length > 1 && (
            <Polyline
              path={generatePolylinePath()}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
        <div className="text-center mt-4">
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="flex items-center bg-gray-400 text-white py-2 px-4 rounded-full"
              onClick={() => window.location.reload()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              <span className="ml-2">루트삭제</span>
            </button>
            <button
              className="flex items-center bg-black text-white py-2 px-4 rounded-full"
              onClick={handleRouteWriteClick}
            >
              <span className="mr-2">루트작성</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
          <button type="button" onClick={handleButtonClick}>
            <Image
              src="/foot.png"
              alt="Description of the image"
              width="120"
              height="120"
            />
            <span className="text-base">좌표찍기</span>
          </button>
        </div>
        <div className="marker-inputs mb-4">
          <input
            type="hidden"
            id="latitude-array"
            value={JSON.stringify(latitudeArray)}
            name="latitude"
            required
          />
          <input
            type="hidden"
            id="longitude-array"
            value={JSON.stringify(longitudeArray)}
            name="longitude"
            required
          />
          <input
            type="hidden"
            id="address-array"
            value={JSON.stringify(addressArray)}
            name="address"
            required
          />
          <input type="hidden" name="key" value={newKey} required />
        </div>
      </div>
    </form>
  ) : (
    <div>Loading…</div>
  );
}
