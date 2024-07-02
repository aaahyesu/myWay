import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
// import getSession from "@/lib/session";

import {
  HeartIcon as OutlineHeartIcon,
  ClockIcon,
  ExclamationCircleIcon,
  PhoneIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import React from "react";

// 페이지 작성한 사람이 본인일 경우
async function getIsOwner(userId: number) {
  // const session = await getSession();
  // if (session.id) {
  //   return session.id === userId;
  // }
  return false;
}
async function getPlace(id: number) {
  const place = await prisma.place.findUnique({
    where: {
      id,
    },
  });
  console.log(place);
  return place;
}

export default async function PlaceDetail({
  params,
}: {
  params: { id: string };
}) {
  // 주소 창에 숫자 아닌 문자열 입력 막기
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const place = await getPlace(id);
  // 존재하지 않을 시
  if (!place) {
    return notFound();
  }
  // const isOwner = await getIsOwner(place.userId);
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
      <div className="flex items-center text-lg text-black text-left font-bold mt-5">
        <div>
          {place.title}
          <p className="font-semibold text-xs text-gray-300">{place.address}</p>
        </div>
        <div className="ml-40">
          <OutlineHeartIcon className="w-7 h-7" />
        </div>
      </div>

      <div className="p-5 flex justify-center items-center">
        <Image
          className="rounded-lg"
          src={place.photo}
          alt={`Image`}
          width={330}
          height={230}
        />
      </div>
      <p className="text-gray-600 text-center p-10 ">{place.content}</p>
      <div className="w-[340px] h-56 border-2 border-grey-400 rounded-lg bg-gray-100 flex flex-col items-start justify-center ml-4">
        <div className="flex flex-col ml-5">
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5" />
            <p className="text-sm ml-3">영업시간</p>
          </div>
          <p className="text-xs ml-8 text-gray-400">
            {place.open} ~ {place.close}
          </p>
        </div>

        <div className="flex flex-col ml-5 mt-3">
          <div className="flex items-center">
            <ExclamationCircleIcon className="w-5 h-5" />
            <p className="text-sm ml-3">라스트오더</p>
          </div>
          <p className="text-xs ml-8 text-gray-400">{place.close}</p>
        </div>
        <div className="flex flex-col ml-5 mt-3">
          <div className="flex items-center">
            <PhoneIcon className="w-5 h-5" />
            <p className="text-sm ml-3">전화번호</p>
          </div>
          <p className="text-xs ml-8 text-gray-400">{place.tel}</p>
        </div>

        <div className="flex flex-col ml-5 mt-3">
          <div className="flex items-center">
            <ShareIcon className="w-5 h-5" />
            <p className="text-sm ml-3">인스타 주소</p>
          </div>
          <p className="text-xs ml-8 text-gray-400">{place.sns}</p>
        </div>
      </div>
    </div>
  );
}
