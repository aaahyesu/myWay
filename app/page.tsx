"use client";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status, data: session } = useSession();
  const router = useRouter();

  // 로그인 상태인 경우 /main 페이지로 리디렉션
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/main");
    }
  }, [status, router]);

  // 로딩 중인 경우
  if (status === "loading") {
    return null;
  }

  const handleStartClick = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-3 *:font-medium">
        <img src="/character.png" alt="main character" className="w-50 h-50 " />
        <h1 className={`text-6xl font-LOTTERIACHAB text-gray-900`}>My Way</h1>
        <h2 className="text-lg font-NPSfontBold text-gray-500">
          나만의 길을 개척해봐 !
        </h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <button
          className="w-full bg-emerald-800 text-white text-lg font-medium py-2.5 rounded-md text-center hover:bg-gray-700 transition-colors"
          onClick={handleStartClick}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
