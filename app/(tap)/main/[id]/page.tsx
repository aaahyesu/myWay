import {
  HeartIcon as OutlineHeartIcon,
  ClockIcon,
  ExclamationCircleIcon,
  PhoneIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

export default function PlaceDetail() {
  return (
    <div
      style={{
        height: "110vh",
        overflowY: "scroll",
        padding: "5px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="flex items-center font-Nanum text-lg text-black text-left font-bold mt-5">
        <div>
          에이트
          <p className="font-semibold text-xs text-gray-300">
            유성구 궁동로 18번길 40 2층
          </p>
        </div>
        <div className="ml-40">
          <OutlineHeartIcon className="w-7 h-7" />
        </div>
      </div>

      <div className="p-5 flex justify-center items-center">
        <Image
          className="rounded-lg"
          src={`/placeSample.png`}
          alt={`Image`}
          width={330}
          height={230}
        />
      </div>
      <p className="text-gray-600 font-Nanum text-center p-10 ">
        도심속에 비밀의 정원. 나무와 물이 만나는 그곳에서 모두의 마음이
        aight(all right) 하시길 바랍니다. 넓은 공간과 여유로운 주차공간이 있는
        대형 베이커리 카페입니다. 일상의 작은 쉼표가 되고 싶습니다 You ganna be
        all right at the aight.
      </p>
      <div className="w-[340px] h-56 border-2 border-grey-400 rounded-lg bg-gray-100 flex flex-col items-start justify-center ml-4">
        <div className="flex flex-col ml-5">
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5" />
            <p className="text-sm ml-3">영업시간</p>
          </div>
          <p className="text-xs ml-8 text-gray-400">10:00 ~ 02:00</p>
        </div>

        <div className="flex flex-col ml-5 mt-3">
          <div className="flex items-center">
            <ExclamationCircleIcon className="w-5 h-5" />
            <p className="text-sm ml-3">라스트오더</p>
          </div>
          <p className="text-xs ml-8 text-gray-400">PM 01:30</p>
        </div>
        <div className="flex flex-col ml-5 mt-3">
          <div className="flex items-center">
            <PhoneIcon className="w-5 h-5" />
            <p className="text-sm ml-3">전화번호</p>
          </div>
          <p className="text-xs ml-8 text-gray-400">010-0000-0000</p>
        </div>

        <div className="flex flex-col ml-5 mt-3">
          <div className="flex items-center">
            <ShareIcon className="w-5 h-5" />
            <p className="text-sm ml-3">인스타 주소</p>
          </div>
          <p className="text-xs ml-8 text-gray-400">
            https://www.instagram.com/hyesu_ragu/
          </p>
        </div>
      </div>
    </div>
  );
}
