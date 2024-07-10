"use client";

import type { NextPage } from "next";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { uploadSpot } from "./action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CloudinaryResult {
  public_id: string;
}

export default function HotUpload() {
  const [publicIds, setPublicIds] = useState<string[]>([]);
  const router = useRouter();
  const { status, data: session } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session?.user?.name) {
    throw new Error("User name not found in session");
  }

  const handleUpload = (result: any) => {
    if (result.event === "success") {
      if (publicIds.length < 5) {
        // Corrected limit to 5 as per alert message
        const info = result.info as CloudinaryResult;
        setPublicIds((prevPublicIds) => [...prevPublicIds, info.public_id]);
      } else {
        alert("이미지 업로드는 5개까지 가능합니다.");
      }
    }
  };

  return (
    <form action={uploadSpot} method="POST">
      <div className="py-10">
        <input
          className="w-full px-2 py-2 placeholder-gray-400 text-xl font-semibold border-b-[1.6px] lin border-gray-300 focus:border-gray-400 focus:outline-none"
          type="text"
          required
          id="title"
          name="title"
          placeholder="장소명 (20자 이내)"
          maxLength={20}
        />
        <div className="mb-10" />
        <div className="text-gray-400 font-medium text-base">사진 추가</div>
        <div className="mt-4 flex flex-col justify-center">
          <CldUploadWidget uploadPreset="kymakj5i" onUpload={handleUpload}>
            {({ open }) => (
              <button
                className="btn btn-primary w-24 h-24 rounded-md bg-gray-200 flex items-center justify-center"
                type="button" // Use type="button" to prevent form submission on click
                onClick={() => open()}
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
                    {publicIds.length}/5
                  </span>
                </div>
              </button>
            )}
          </CldUploadWidget>
          <div className="mt-4 flex flex-wrap">
            {publicIds.map((publicId, index) => (
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
          <input type="hidden" name="photo" id="photo" value={publicIds} />
        )}
        <input
          name="username"
          id="username"
          value={session.user.name}
          type="hidden"
        />
        <textarea
          className="w-full p-3 mt-6 text-base placeholder-gray-400 border border-gray-200 focus:outline-none focus:border-gray-400 rounded-xl"
          rows={5}
          id="content"
          required
          name="content"
          placeholder="소개말 (200자 이내)"
          maxLength={200}
        />
        <div className="mt-6 items-center space-y-6 ">
          <div className="flex space-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              />
            </svg>
            <input
              className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
              type="text"
              id="address"
              required
              name="address"
              placeholder="위치정보"
            />
          </div>
          <div className="flex space-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <input
              className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
              type="time"
              id="open"
              required
              name="open"
              placeholder="오픈시간"
            />
          </div>
          <div className="flex space-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <input
              className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
              type="time"
              id="close"
              required
              name="close"
              placeholder="종료시간"
            />
          </div>
          <div className="flex space-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <input
              className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
              type="number"
              id="tel"
              required
              name="tel"
              placeholder="전화번호"
            />
          </div>
          <div className="flex space-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            <input
              className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
              type="text"
              id="sns"
              required
              name="sns"
              placeholder="SNS주소"
            />
          </div>
        </div>
        <button className="w-full mt-10 py-2 text-lg font-semibold bg-black text-white border rounded-lg" onClick={() => router.push(`/main`)}> 
          등록
        </button>
        <p className="mb-24"></p>
      </div>
    </form>
  );
};