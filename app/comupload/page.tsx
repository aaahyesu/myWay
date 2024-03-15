import type { NextPage } from "next";
import React from 'react';


const Upload: NextPage = () => {
    return (
        <div className="py-10">
            <input
                className="w-full px-2 py-2 placeholder-gray-300 font-Nanum text-xl border-b-[1.6px] lin border-gray-300 focus:border-gray-400 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="제목 (20자 이내)"
            /><div className="mb-10" />
            <div className="items-center space-y-6 ">
            <input
                className="w-full px-2 py-1.5 placeholder-gray-300 font-Nanum border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="테마"
            />
            
            <input
                className="w-full px-2 py-1.5 placeholder-gray-300 font-Nanum border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="출발지"
            />

            <input
                className="w-full px-2 py-1.5 placeholder-gray-300 font-Nanum border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="도착지"
            />
            <input
                className="w-full px-2 py-1.5 placeholder-gray-300 font-Nanum border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="장소"
            />
            <textarea
                className="w-full p-3 font-Nanum placeholder-gray-300 border border-gray-200 focus:outline-none focus:border-gray-400  rounded-xl"
                rows={5}
                id="name"
                name="name"
                placeholder="상세 내용 (200자 이내)"
            />
            <h1 className="font-Nanum text-gray-500">추천 카테고리</h1>
            <div className="flex">
                <div className="flex flex-grow items-center mb-4">
                    <input id="default-checkbox1" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded"/>
                    <label htmlFor="default-checkbox1" className="ms-2 text-sm font-medium font-Nanum text-gray-500 dark:text-gray-300">체크박스</label>
                </div>
                <div className="flex flex-grow items-center mb-4">
                    <input id="default-checkbox2" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded"/>
                    <label htmlFor="default-checkbox2" className="ms-2 text-sm font-medium font-Nanum text-gray-500 dark:text-gray-300">체크박스</label>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Upload;
