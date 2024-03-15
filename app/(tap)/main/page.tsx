import Link from "next/link";
import Image from "next/image";
import { Bars3CenterLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function Main() {
  return (
    <div>
      <div className="w-full h-11 border-2 border-grey-400 rounded-lg mt-4 bg-gray-100 flex items-center justify-between px-4">
        <Bars3CenterLeftIcon className="w-7 h-7 text-gray-700" />
        <input
          type="text"
          placeholder="' 대전 맛집 코스 ' 를 검색해보세요"
          className="w-full mx-5 text-gray-700 bg-gray-100 focus:outline-none"
        />
        <UserCircleIcon className="w-7 h-7 text-gray-700" />
      </div>
      <div className="w-60 h-60 border-2 border-grey-400 rounded-lg mt-4 bg-gray-100 flex flex-col items-center justify-center">
        <Image src="/background.png" alt="/img" width={180} height={180} />
        <h2 className="text-center font-semibold mt-3">
          {" "}
          대전의 맛집 거리가 궁금하다면?
        </h2>
        <p className="text-center text-sm text-gray-500 mr-1 m">
          성심당 맛있고, 꿈돌이 귀엽고, 가나다라마바사 아자차카
        </p>
      </div>
    </div>
  );
}
