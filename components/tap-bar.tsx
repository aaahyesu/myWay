"use client";
import {
  HomeIcon as SolidHomeIcon,
  MagnifyingGlassIcon as SolidSearch,
  UserCircleIcon as SolidMypage,
  PencilSquareIcon as SolidWrite,
  UserGroupIcon as SolidCommunity,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineIcon,
  MagnifyingGlassIcon as OutlineSearch,
  UserCircleIcon as OutlineMypage,
  PencilSquareIcon as OutlineWrite,
  UserGroupIcon as OutlineCommunity,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 z-30 w-full max-w-sm mx-auto grid grid-cols-5 justify-between bg-white border-neutral-600 border-t py-3">
      <Link href="/main" className="flex flex-col items-center">
        {pathname === "/main" ? (
          <SolidHomeIcon className="w-6 h-6" />
        ) : (
          <OutlineIcon className="w-6 h-6" />
        )}
        <span className="text-sm mt-1">홈</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center">
        {pathname === "/search" ? (
          <SolidSearch className="w-6 h-6" />
        ) : (
          <OutlineSearch className="w-6 h-6" />
        )}
        <span className="text-sm mt-1">검색</span>
      </Link>
      <Link href="/mypage" className="flex flex-col items-center ">
        {pathname === "/mypage" ? (
          <SolidMypage className="w-6 h-6" />
        ) : (
          <OutlineMypage className="w-6 h-6" />
        )}
        <span className="text-sm mt-1">마이페이지</span>
      </Link>
      <Link href="/write" className="flex flex-col items-center">
        {pathname === "/write" ? (
          <SolidWrite className="w-6 h-6" />
        ) : (
          <OutlineWrite className="w-6 h-6" />
        )}
        <span className="text-sm mt-1">작성하기</span>
      </Link>
      <Link href="/community" className="flex flex-col items-center">
        {pathname === "/community" ? (
          <SolidCommunity className="w-6 h-6" />
        ) : (
          <OutlineCommunity className="w-6 h-6" />
        )}
        <span className="text-sm mt-1">커뮤니티</span>
      </Link>
    </div>
  );
}
