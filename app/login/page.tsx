"use client";
import React from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const renderLoginButtons = () => (
    <>
      <button
        className="w-full bg-white text-black border border-spacing-2 text-lg font-medium py-2.5 rounded-md text-center hover:bg-green-500 translation-colors"
        onClick={() => signIn("naver", { callbackUrl: "/main" })}
      >
        네이버 로그인
      </button>
      <button
        className="w-full bg-yellow-300 text-black text-lg font-medium py-2.5 rounded-md text-center hover:bg-yellow-200 translation-colors"
        onClick={() => signIn("kakao", { callbackUrl: "/main" })}
      >
        카카오 로그인
      </button>
      <button
        className="w-full bg-white text-black border border-spacing-2 text-lg font-medium py-2.5 rounded-md text-center hover:bg-black hover:text-white translation-colors"
        onClick={() => signIn("google", { callbackUrl: "/main" })}
      >
        구글 로그인
      </button>
    </>
  );

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-3 *:font-medium">
        <h1 className="text-6xl font-LOTTERIACHAB text-gray-900">Login</h1>
        <h2 className="text-lg font-NPSfontBold text-gray-500">
          원하는 로그인 방법을 선택하세요
        </h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        {renderLoginButtons()}
      </div>
    </div>
  );
}
