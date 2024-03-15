import Image from "next/image";
import Link from "next/link";
import { inter } from "./fonts";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-3 *:font-medium">
        <img src="/character.png" alt="main character" className="w-50 h-50 " />
        <h1 className={`text-6xl ${inter.className}`}>My Way</h1>
        <h2 className="text-xl">나만의 길을 개척해봐 !</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link
          href="/main"
          className="w-full bg-yellow-300 text-black text-lg font-medium py-2.5 rounded-md text-center hover:bg-yellow-200 translation-colors"
        >
          카카오로 로그인
        </Link>
        <Link
          href="/create-account"
          className="w-full bg-white text-black border border-spacing-2 text-lg font-medium py-2.5 rounded-md text-center hover:bg-green-500 translation-colors"
        >
          네이버 로그인
        </Link>
      </div>
    </div>
  );
}
