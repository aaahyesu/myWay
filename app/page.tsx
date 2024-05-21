"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { inter } from "./fonts";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();

  // 로딩 중인 경우
  if (status === "loading") {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-3 *:font-medium">
        <img src="/character.png" alt="main character" className="w-50 h-50 " />
        <h1 className={`text-6xl  text-green-900`}>My Way</h1>
        <h2 className="text-lg font-NPSfontBold text-gray-700">
          나만의 길을 개척해봐 !
        </h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <button
          className="w-full bg-white text-black border border-spacing-2 text-lg font-medium py-2.5 rounded-md text-center hover:bg-green-500 translation-colors"
          onClick={() =>
            signIn("naver", { redirect: true, callbackUrl: "/main" })
          }
        >
          네이버 로그인
        </button>
        <button
          className="w-full bg-yellow-300 text-black text-lg font-medium py-2.5 rounded-md text-center hover:bg-yellow-200 translation-colors"
          onClick={() =>
            signIn("kakao", { redirect: true, callbackUrl: "/main" })
          }
        >
          카카오 로그인
        </button>
        <button
          className="w-full bg-white text-black border border-spacing-2 text-lg font-medium py-2.5 rounded-md text-center hover:bg-black hover:text-white translation-colors"
          onClick={() =>
            signIn("google", { redirect: true, callbackUrl: "/main" })
          }
        >
          구글 로그인
        </button>
      </div>
    </div>
  );
}
