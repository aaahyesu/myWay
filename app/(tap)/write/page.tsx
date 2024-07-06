"use client";
import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Image from "next/image";
import { upload } from "./action";
import Link from "next/link";

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

const CurrentLocationMap: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(
    null
  );
  const [markers, setMarkers] = useState<Coordinates[]>([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "api-key",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(position);
        setCurrentPosition({ id: "current", lat: latitude, lng: longitude });
        setMapCenter({ lat: latitude, lng: longitude, zoom: 15 });
      });
    }
  }, []);

  const fetchAddress = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_ROUTES_API}`
    );
    const data = await response.json();
    return data.results[0]?.formatted_address || "Unknown Location";
  };

  const handleButtonClick = async () => {
    if (currentPosition) {
      if (markers.length < 5) {
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
      } else {
        console.log("마커 개수는 최대 5개입니다.");
      }
    }
  };

  const handleMarkerClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      if (markers.length < 5) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const address = await fetchAddress(lat, lng);
        const newMarker = {
          id: `${Date.now()}`,
          lat,
          lng,
          address: address,
        };
        setMarkers([...markers, newMarker]);
        console.log(
          `Marker clicked: id=${newMarker.id}, lat=${newMarker.lat}, lng=${newMarker.lng}, address=${newMarker.address}`
        );
      } else {
        console.log("마커 개수는 최대 5개입니다.");
      }
    } else {
      console.error("Click event latLng is null");
    }
  };

  const clearMarkers = () => {
    setMarkers([]);
    console.log("모든 마커가 삭제되었습니다.");
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

  const latitudeArray = markers.map((marker) => marker.lat);
  const longitudeArray = markers.map((marker) => marker.lng);
  const addressArray = markers.map((marker) => marker.address);

  return isLoaded ? (
    <form action={upload} method="post">
      <div className="py-10 mb-20">
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
          onClick={handleMarkerClick}
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
            {/* <Link href="/write"> */}
            <button className="flex items-center bg-black text-white py-2 px-4 rounded-full">
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
          <input
            type="hidden"
            id="address-array"
            value={JSON.stringify(addressArray)}
            name="address"
          />
        </div>
      </div>
    </form>
  ) : (
    <div>Loading...</div>
  );
};

export default CurrentLocationMap;
