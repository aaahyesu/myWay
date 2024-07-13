"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Bar from "@/components/bar";

export default function Mypage() {
  const { status, data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };
  // 로그아웃 상태인 경우 / 페이지로 리디렉션
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="bg-white w-full flex flex-col py-16">
      <Bar title="마이페이지" />
      <div className="flex justify-left mx-8" style={{ height: "100px" }}>
        <img
          src="/banner2.jpeg"
          alt="Profile"
          className="rounded-full shadow-md"
          style={{ width: "100px", height: "100px" }}
        />
        <div className="flex-col mx-6 my-5">
          <h2 style={{ fontSize: "24px" }}>{session?.user?.name}</h2>
          <div className="flex justify-center mb-2 my-1">
            <button
              className="bg-black rounded-lg border mt-1 text-white text-xs shadow-md font-medium text-center hover:bg-gray-100 hover:text-black px-3 py-1.5"
              onClick={handleSignOut}
            >
              My Way Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between mx-8 mb-10">
        <Link href="/mypage/save">
          <div className="flex flex-col items-center">
            <span className="text-gray-500" style={{ fontSize: "16px" }}>
              저장 목록
            </span>
            <p className="text-lg">3개</p>
            <p className="text-xs text-gray-400">자세히 보기</p>
          </div>
        </Link>
        <Link href="/mypage/like">
          <div className="flex flex-col items-center">
            <span className="text-gray-500" style={{ fontSize: "16px" }}>
              좋아요 목록
            </span>
            <p className="text-lg">5개</p>
            <p className="text-xs text-gray-400">자세히 보기</p>
          </div>
        </Link>
        <Link href="/mypage/mypath">
          <div className="flex flex-col items-center">
            <span className="text-gray-500" style={{ fontSize: "16px" }}>
              나의 경로 목록
            </span>
            <p className="text-lg">7개</p>
            <p className="text-xs text-gray-400">자세히 보기</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
