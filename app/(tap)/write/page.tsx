"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Image from "next/image";
import { upload } from "./action";
import Link from "next/link";


const containerStyle = {
  width: "100%",
  height: "350px",
};

const defaultCenter = {
  lat: 37.569227, // 서울의 좌표
  lng: 126.9777256,
  zoom: 16,
};

interface Coordinates {
  id: string;
  lat: number;
  lng: number;
}

const CurrentLocationMap: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(null);
  const [markers, setMarkers] = useState<Coordinates[]>([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ id: "current", lat: latitude, lng: longitude });
      });
    }
  }, []);

  // 현재 위치 마커 추가 함수
  const handleButtonClick = () => {
    if (currentPosition) {
      if (markers.length < 5) { // 추가된 조건
        const newMarker = { ...currentPosition, id: `${Date.now()}` };
        setMarkers([...markers, newMarker]);
        console.log(`Marker added: id=${newMarker.id}, lat=${newMarker.lat}, lng=${newMarker.lng}`);
      } else {
        console.log("마커 개수는 최대 5개입니다."); // 추가된 경고 메시지
      }
    }
  };

  // 지도에서 마커 클릭 시 마커 추가 함수
  const handleMarkerClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      if (markers.length < 5) { // 추가된 조건
        const newMarker = {
          id: `${Date.now()}`,
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setMarkers([...markers, newMarker]);
        console.log(`Marker clicked: id=${newMarker.id}, lat=${newMarker.lat}, lng=${newMarker.lng}`);
      } else {
        console.log("마커 개수는 최대 5개입니다."); // 추가된 경고 메시지
      }
    } else {
      console.error("Click event latLng is null");
    }
  };

  // 마커 초기화 함수
  const clearMarkers = () => {
    setMarkers([]);
    console.log("모든 마커가 삭제되었습니다.");
  };
  
  // 위도와 경도를 배열 형태로 변환
  const latitudeArray = markers.map(marker => marker.lat);
  const longitudeArray = markers.map(marker => marker.lng);

  return isLoaded ? (
    <form action={upload}>
      <div className="py-10 mb-20">
        <h1 className="text-xl font-semibold mb-4">나만의 루트 만들기</h1>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-md text-gray-400">원하는 위치에서 좌표 찍기 버튼을 눌러</h2>
            <h2 className="text-md mb-4 text-gray-400">나만의 루트를 생성해보세요</h2>
          </div>
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition || defaultCenter}
          zoom={currentPosition ? 15 : 5}
          onClick={handleMarkerClick}
        >
          {currentPosition && <Marker position={currentPosition} />}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker}
              animation={window.google.maps.Animation.BOUNCE}
              icon={{
                url: "/marker.png",
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          ))}
        </GoogleMap>
        <div className="text-center mt-4">
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="flex items-center bg-gray-400 text-white py-2 px-4 rounded-full"
              onClick={clearMarkers}
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
            {/* <Link href={`/write/${123}`} className=""> */}
            <button
              className="flex items-center bg-black text-white py-2 px-4 rounded-full"
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
            {/* </Link> */}
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
          />
          <input
            type="hidden"
            id="longitude-array"
            value={JSON.stringify(longitudeArray)}
            name="longitude"
          />
        </div>
        
      </div>
    </form>
  ) : (
    <div>Loading...</div>
  );
};

export default CurrentLocationMap;
