import type { NextPage } from "next";
import React from 'react';


const Upload: NextPage = () => {
    return (
        <div className="px-20 py-10">
            <input
                className="w-full px-2.5 py-2 placeholder-gray-300 font-Nanum text-xl border-b-[1.6px] lin border-gray-300 focus:border-gray-400 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="제목 (20자 이내)"
            /><div className="mb-10" />
            <div className="items-center space-y-6 ">
            <input
                className="w-full px-2.5 py-1.5 placeholder-gray-300 font-Nanum border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="테마"
            />
            
            <input
                className="w-full px-2.5 py-1.5 placeholder-gray-300 font-Nanum border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="출발지"
            />

            <input
                className="w-full px-2.5 py-1.5 placeholder-gray-300 font-Nanum border-b border-gray-200 focus:border-gray-400 focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="도착지"
            />
            <input
                className="w-full px-2.5 py-1.5 placeholder-gray-300 font-Nanum border-b border-gray-200 focus:border-gray-400 focus:outline-none"
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
            <h1 className="font-Nanum text-gray-400">추천 카테고리</h1>
            <div className="flex">
                <div className="flex flex-grow items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium font-Nanum text-gray-400 dark:text-gray-300">Default checkbox</label>
                </div>
                <div className="flex flex-grow items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium font-Nanum text-gray-400 dark:text-gray-300">Default checkbox</label>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Upload;
