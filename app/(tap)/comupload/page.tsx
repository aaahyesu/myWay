"use client";

import type { NextPage } from "next";
import React from 'react';
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
    public_id: string;
  }
  
  const Upload: NextPage = () => {
    const [publicIds, setPublicIds] = useState<string[]>([]);
  
    const handleUpload = (result: any) => {
        if (result.event === 'success') {
          if (publicIds.length < 10) {
            const info = result.info as CloudinaryResult;
            setPublicIds((prevPublicIds) => [...prevPublicIds, info.public_id]);
          } else {
            alert('이미지 업로드는 10개까지 가능합니다.');
          }
        }
      };

    return (
        <div className="py-10">
            <input
                className="w-full px-2 py-2 placeholder-gray-400 text-xl font-semibold border-b-[1.6px] border-gray-300 focus:border-gray-400 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="제목 (20자 이내)"
                maxLength={20}
            /><div className="mb-10" />
            <div className="items-center space-y-6 ">
                <input
                    className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="테마"
                />
                
                <input
                    className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="출발지"
                />

                <input
                    className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="도착지"
                />
                <input
                    className="w-full px-2 py-1.5 text-base placeholder-gray-400 border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="장소"
                />
                <textarea
                    className="w-full p-3 text-base placeholder-gray-400 border border-gray-200 focus:outline-none focus:border-gray-400  rounded-xl"
                    rows={5}
                    id="name"
                    name="name"
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
                                <div className="flex flex-col items-center"> {/* Wrap SVG icon and text */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <span className="text-xs text-gray-400">{publicIds.length}/10</span> {/* Text */}
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

                <h1 className="text-gray-500 font-medium text-lg">추천 카테고리</h1>
                <div className="flex">
                    <div className="flex flex-grow items-center mb-4">
                        <input id="default-checkbox1" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded"/>
                        <label htmlFor="default-checkbox1" className="ms-2 text-base font-medium text-gray-500 dark:text-gray-300">체크박스</label>
                    </div>
                    <div className="flex flex-grow items-center mb-4">
                        <input id="default-checkbox2" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded"/>
                        <label htmlFor="default-checkbox2" className="ms-2 text-base font-medium text-gray-500 dark:text-gray-300">체크박스</label>
                    </div>
                </div>
            </div>
            <button className="w-full mt-4 py-2 bg-black text-base font-semibold text-white border rounded-lg">등록</button>
            <p className="mb-24"></p>
        </div>
    );
}

export default Upload;
