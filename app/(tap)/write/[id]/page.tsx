"use client";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { upload } from "./action";
import { getMapKey } from "../action";
import { usePathname, useRouter } from "next/navigation";

// Google Maps API 키
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_ROUTES_API_KEY;

interface CloudinaryResult {
  public_id: string;
}

type Coordinates = {
  id: number;
  address: string;
  latitude: string;
  longitude: string;
  key: bigint;
};

export default function Page() {
  const [publicIds, setPublicIds] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>(["", "", "", "", ""]); // 장소 배열
  const [responses, setResponses] = useState<any[]>([]); // DirectionsService 응답 배열
  const [keys, setKeys] = useState<Coordinates[]>([]);
  const [page, setPage] = useState(1);
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);

  const path = usePathname();
  const idstr = path.substring("/write/".length);
  const id = parseInt(idstr);
  const router = useRouter();

  // DirectionsService 응답을 받았을 때 호출될 콜백
  const directionsCallback = (result: any, status: any, index: number) => {
    if (status === "OK") {
      const updatedResponses = [...responses];
      updatedResponses[index] = result;
      setResponses(updatedResponses);
    } else {
      console.error(`Directions request failed due to ${status}`);
    }
  };
  console.log;

  // 경로 검색 함수
  const searchRoute = () => {
    // 초기화
    setResponses([]);

    // DirectionsService를 통해 입력된 위치들 사이의 경로 검색
    for (let i = 0; i < locations.length - 1; i++) {
      const origin = locations[i];
      const destination = locations[i + 1];

      // Skip empty locations
      if (!origin || !destination) {
        continue;
      }

      const directionsService = new google.maps.DirectionsService();
      const directionsServiceOptions = {
        origin,
        destination,
        travelMode: google.maps.TravelMode.TRANSIT,
      };

      directionsService.route(directionsServiceOptions, (result, status) =>
        directionsCallback(result, status, i)
      );
    }
  };

  // Input 변경 핸들러
  const handleInputChange = (index: number, value: string) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = value;
    setLocations(updatedLocations);
  };

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
        const fetchedCoordinates = await getMapKey(page, 1);
        const filteredCoordinates = fetchedCoordinates.filter(
          (coord) => coord.key === BigInt(id)
        );
        setCoordinates(filteredCoordinates);
      } catch (error) {
        console.error("Error fetching coordinates: ", error);
      }
    }

    fetchCoordinates();
  }, [page]);

  console.log(coordinates);

  return (
    <form action={upload}>
      <ul>
        {coordinates.map((coord) => (
          <li key={coord.id}>
            Address: {coord.address}, Latitude: {coord.latitude}, Longitude:{" "}
            {coord.longitude}
          </li>
        ))}
      </ul>
      <div className="py-10">
        <input
          className="w-full px-2 py-2 placeholder-gray-400 text-xl font-semibold border-b-[1.6px] border-gray-300 focus:border-gray-400 focus:outline-none"
          type="text"
          id="title"
          name="title"
          placeholder="제목 (20자 이내)"
          maxLength={20}
        />
        <div className="mb-10" />
        <div className="items-center space-y-6 ">
          <input
            className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
            type="text"
            id="theme"
            name="theme"
            placeholder="테마"
          />

          {locations.map((location, index) => (
            <div key={`location-${index}`}>
              <input
                className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="장소"
                value={location}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          ))}
          <button onClick={searchRoute}>경로 검색</button>
          <LoadScript googleMapsApiKey="api-key">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={{ lat: 37.5665, lng: 126.978 }}
              zoom={13} // 초기 줌 레벨
            >
              {/* DirectionsRenderer를 통해 모든 경로 표시 */}
              {responses.map(
                (response, index) =>
                  response && (
                    <DirectionsRenderer
                      key={`directions-${index}`}
                      options={{ directions: response }}
                    />
                  )
              )}
            </GoogleMap>
          </LoadScript>
          <textarea
            className="w-full p-3 text-base placeholder-gray-400 border border-gray-200 focus:outline-none focus:border-gray-400  rounded-xl"
            rows={5}
            id="content"
            name="content"
            placeholder="상세 내용 (200자 이내)"
            maxLength={200}
          />
          <div className="text-gray-400 font-medium text-lg">사진 추가</div>
          <div className="flex flex-col justify-center">
            <CldUploadWidget uploadPreset="kymakj5i" onUpload={handleUpload}>
              {({ open }) => (
                <button
                  className="btn btn-primary w-24 h-24 rounded-md bg-gray-200 flex items-center justify-center"
                  onClick={() => open()}
                >
                  <div className="flex flex-col items-center">
                    {" "}
                    {/* Wrap SVG icon and text */}
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
                    </span>{" "}
                    {/* Text */}
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
        </div>
        <button className="w-full mt-4 py-2 bg-black text-base font-semibold text-white border rounded-lg">
          등록
        </button>
        <p className="mb-24"></p>
      </div>
    </form>
  );
}
