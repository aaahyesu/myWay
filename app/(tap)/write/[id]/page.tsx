"use client";
import React, { useState, useEffect, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { upload } from "./action";
import { getMapKey } from "../action";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Bar from "@/components/bar";

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
  const [placeNames, setPlaceNames] = useState<string[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { status, data: session } = useSession();
  const path = usePathname();
  const key = path.substring("/write/".length);
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState("");

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
  }, []);

  useEffect(() => {
    if (coordinates.length > 0 && !window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places`;
      script.onload = initializeMap;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else if (coordinates.length > 0) {
      initializeMap(); // Directly initialize if already loaded
    }
  }, [coordinates]);

  const initializeMap = () => {
    if (coordinates.length > 0 && mapRef.current === null) {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 37.5665, lng: 126.978 },
          zoom: 13,
        }
      );

      mapRef.current = map;

      const bounds = new google.maps.LatLngBounds();
      coordinates.forEach((coord) => {
        bounds.extend(new google.maps.LatLng(coord.latitude, coord.longitude));
      });
      map.fitBounds(bounds);

      coordinates.forEach((coord, index) => {
        new google.maps.Marker({
          position: { lat: coord.latitude, lng: coord.longitude },
          map: map,
          label: `${index + 1}`,
        });
      });

      if (coordinates.length > 1) {
        new google.maps.Polyline({
          path: coordinates.map((coord) => ({
            lat: coord.latitude,
            lng: coord.longitude,
          })),
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map,
        });
      }
    }
  };

  if (status === "loading") {
    return null;
  }

  if (!session?.user?.name) {
    throw new Error("User name not found in session");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      alert("모든 필수 필드를 입력하세요.");
      return;
    }

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("names", JSON.stringify(placeNames));
      const response = await upload(formData);
      console.log("Upload successful", response);
      router.push(`/main`);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const validateForm = () => {
    const title = document.getElementById("title") as HTMLInputElement;
    const theme = document.getElementById("theme") as HTMLSelectElement;
    const content = document.getElementById("content") as HTMLTextAreaElement;

    if (
      !title.value ||
      !theme.value ||
      !content.value ||
      publicIds.length === 0
    ) {
      return false;
    }

    for (let i = 0; i < coordinates.length; i++) {
      const placeName = document.getElementById(
        `name-${i}`
      ) as HTMLInputElement;
      if (!placeName.value) {
        return false;
      }
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Bar canGoBack title="루트 작성하기" />
      <div className="py-16 mb-24">
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
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            required
          >
            <option value="" disabled>
              테마를 선택하세요
            </option>
            <option value="맛집">맛집</option>
            <option value="카페">카페</option>
            <option value="관광">관광</option>
            <option value="핫플">핫플</option>
            <option value="힐링">힐링</option>
            <option value="여행">여행</option>
          </select>

          {coordinates.map((coord, index) => (
            <div key={index}>
              <input
                className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                type="text"
                id={`name-${index}`}
                name={`name-${index}`}
                placeholder={`${index + 1} 장소명 `}
                value={placeNames[index] || ""}
                onChange={(e) => {
                  const newPlaceNames = [...placeNames];
                  newPlaceNames[index] = e.target.value;
                  setPlaceNames(newPlaceNames);
                }}
                required
              />
            </div>
          ))}
          <div
            id="map"
            style={{ width: "100%", height: "400px" }}
            className="bg-gray-200"
          ></div>
          <textarea
            className="w-full p-4 text-base placeholder-gray-400 border border-gray-200 focus:outline-none focus:border-gray-400 rounded-xl"
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
                    alt="Uploaded Image"
                  />
                </div>
              ))}
            </div>
          </div>
          {publicIds.length > 0 && (
            <input
              type="hidden"
              name="photo"
              id="photo"
              required
              value={publicIds}
            />
          )}
        </div>
        <input
          name="username"
          id="username"
          value={session.user.name}
          type="hidden"
          required
        />
        <input name="key" id="key" value={key} type="hidden" required />
        <button
          className="w-full mt-4 py-2 bg-black text-base font-semibold text-white border rounded-lg"
          type="submit"
        >
          등록
        </button>
        <p className="mb-3 text-lg leading-relaxed text-gray-600"></p>
      </div>
    </form>
  );
}
