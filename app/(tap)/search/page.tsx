import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Search() {
  return (
    <div className="w-full h-11 border-2 border-grey-400 rounded-lg mt-4 bg-gray-100 flex items-center justify-between px-4">
      <MagnifyingGlassIcon className="w-6 h-6 text-gray-800" />
      <input
        type="text"
        placeholder="' 대전 맛집 코스 ' 를 검색해보세요"
        className="w-full mx-5 text-gray-700 bg-gray-100 focus:outline-none font-Nanum"
      />
    </div>
  );
}
