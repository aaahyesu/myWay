import type { NextPage } from "next";
import React from 'react';

const Detail: NextPage = () => {
    return (
    <div className="px-20 py-10">
        <div className="mt-4 flex space-x-3.5 mb-4">
            <h1 className="text-xl font-Nanum font-semibold">여기에 이제 제목이 들어감</h1>
            <span className="inline-flex font-Nanum items-center rounded-lg bg-blue-400 px-3 py-1 text-sm font-semibold text-white">맛집</span>
            <span className="inline-flex font-Nanum items-center rounded-lg  bg-blue-400 px-3 py-1 text-sm font-semibold text-white">관광지</span>
        </div>
        <div className="space-y-2">
            <h2 className="font-Nanum text-gray-800">테마 :</h2>
            <h2 className="font-Nanum text-gray-800">출발지 :</h2>
            <h2 className="font-Nanum text-gray-800">도착지 :</h2>
        </div>
        <div className="flex space-x-4 mt-5 mb-3.5">
            <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            />
            <div>
                <h1 className="text-md font-Nanum">Name</h1>
                <h2 style={{ fontSize: '11px' }} className="font-light font-Nanum">DaeJeon, Korea</h2>
            </div>
            <div className="flex flex-grow justify-end"></div>
            <button className="inline-flex items-center font-Nanum rounded-2xl bg-gray-50 px-4 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">follow</button>
        </div>
    </div>
    );
}

export default Detail;