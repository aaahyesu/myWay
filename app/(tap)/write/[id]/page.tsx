"use client"
import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { upload } from "./action";
import { getMapKey } from "../action";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

// Google Maps API 키
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";

interface CloudinaryResult {
  public_id: string;
}

type Coordinates = {
  address: string;
  latitude: number;
  longitude: number;
};

export default function Page() {
  const [publicIds, setPublicIds] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
  const [placeNames, setPlaceNames] = useState<string[]>([]); // 장소명 배열 상태
  const mapRef = useRef<google.maps.Map | null>(null);
  const { status, data: session } = useSession();

  const path = usePathname();
  const key = path.substring("/write/".length);

  const handleUpload = (result: any) => {
    if (result.event === "success") {
      if (publicIds.length < 10) {
        const info = result.info as CloudinaryResult;
        setPublicIds((prevPublicIds) => [...prevPublicIds, info.public_id]);
      } else {
        alert("이미지 업로드는 10개까지 가능합니다.");
      }
    }
  };

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        const fetchedCoordinates = await getMapKey();
        const filteredCoordinates = fetchedCoordinates.filter(
          (coord) => coord.key === BigInt(key)
        );

        if (filteredCoordinates.length > 0) {
          const addresses = JSON.parse(filteredCoordinates[0].address);
          const latitudes = JSON.parse(filteredCoordinates[0].latitude);
          const longitudes = JSON.parse(filteredCoordinates[0].longitude);

          const formattedCoordinates = addresses.map(
            (address: string, index: number) => ({
              address,
              latitude: latitudes[index],
              longitude: longitudes[index],
            })
          );
          setCoordinates(formattedCoordinates);
        }
      } catch (error) {
        console.error("Error fetching coordinates: ", error);
      }
    }
    fetchCoordinates();
  }, [key]);

  useEffect(() => {
    if (mapRef.current && coordinates.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      coordinates.forEach((coord) => {
        bounds.extend(new google.maps.LatLng(coord.latitude, coord.longitude));
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [coordinates]);

  const handlePlaceNameChange = (index: number, value: string) => {
    setPlaceNames((prevNames) => {
      const newNames = [...prevNames];
      newNames[index] = value;
      return newNames;
    });

    // 장소명이 입력될 때마다 coordinates 상태 업데이트
    setCoordinates((prevCoordinates) => {
      const newCoordinates = [...prevCoordinates];
      if (newCoordinates[index]) {
        newCoordinates[index].address = value;
      }
      return newCoordinates;
    });
  };

  if (status === "loading") {
    return null; // 로딩 중에는 아무것도 표시하지 않음
  }

  if (!session?.user?.name) {
    throw new Error("User name not found in session");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("names", JSON.stringify(placeNames));
      const response = await upload(formData);
      console.log("Upload successful", response);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="py-10 mb-24">
        <input
          className="w-full px-2 py-2 placeholder-gray-400 text-xl font-semibold border-b-[1.6px] border-gray-300 focus:border-gray-400 focus:outline-none"
          type="text"
          id="title"
          name="title"
          placeholder="제목 (20자 이내)"
          maxLength={20}
          required
        />
        <div className="mb-10" />
        <div className="items-center space-y-6 ">
          <select
            className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
            id="theme"
            name="theme"
            required
          >
            <option value="" disabled selected>
              테마를 선택하세요
            </option>
            <option value="맛집">맛집</option>
            <option value="카페">카페</option>
            <option value="관광">관광</option>
            <option value="핫플">핫플</option>
            <option value="힐링">힐링</option>
            <option value="여행">여행</option>
          </select>

          {coordinates.map((_, index) => (
            <div key={`${index}`}>
              {coordinates[index] && (
                <div>
                  <input
                    className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                    type="text"
                    id={`name-${index}`}
                    name={`name-${index}`}
                    placeholder={`${index + 1} 장소명 `}
                    value={placeNames[index] || ""}
                    onChange={(e) =>
                      handlePlaceNameChange(index, e.target.value)
                    }
                    required
                  />
                </div>
              )}
            </div>
          ))}
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={{ lat: 37.5665, lng: 126.978 }}
              zoom={13}
              onLoad={(map) => {
                mapRef.current = map;
              }}
            >
              {coordinates.length > 1 && (
                <Polyline
                  path={coordinates.map((coord) => ({
                    lat: coord.latitude,
                    lng: coord.longitude,
                  }))}
                  options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 1,
                    strokeWeight: 2,
                  }}
                />
              )}
              {coordinates.map((coord, index) => (
                <Marker
                  key={`marker-${index}`}
                  position={{ lat: coord.latitude, lng: coord.longitude }}
                  label={`${index + 1}`}
                />
              ))}
            </GoogleMap>
          </LoadScript>
          <textarea
            className="w-full p-4 text-base placeholder-gray-400 border border-gray-200 focus:outline-none focus:border-gray-400  rounded-xl"
            rows={9}
            id="content"
            name="content"
            placeholder="상세 내용 (200자 이내)"
            maxLength={200}
            required
          />
          <div className="text-gray-400 font-medium text-lg">사진 추가</div>
          <div className="flex flex-col justify-center">
            <CldUploadWidget uploadPreset="kymakj5i" onUpload={handleUpload}>
              {({ open }) => (
                <button
                  className="btn btn-primary w-24 h-24 rounded-md bg-gray-200 flex items-center justify-center"
                  onClick={() => open()}
                  type="button"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-8 h-8 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <span className="text-xs text-gray-400">
                      {publicIds.length}/10
                    </span>
                  </div>
                </button>
              )}
            </CldUploadWidget>
            <div className="mt-4 flex flex-wrap">
              {publicIds.map((publicId) => (
                <div key={publicId} className="mr-2 mb-2">
                  <CldImage
                    src={publicId}
                    width={100}
                    height={100}
                    alt="Uploaded Image Not Found"
                  />
                </div>
              ))}
            </div>
          </div>
          {publicIds.length > 0 && (
            <input type="hidden" name="photo" id="photo" value={publicIds} />
          )}
        </div>
        <input
          name="username"
          id="username"
          value={session.user.name}
          type="hidden"
        />
        <input
          name="key"
          id="key"
          value={key}
          type="hidden"
        ></input>
        <button className="w-full mt-4 py-2 bg-black text-base font-semibold text-white border rounded-lg">
          등록
        </button>
        <p className="mb-3 text-lg leading-relaxed text-gray-600"></p>
      </div>
    </form>
  );
}