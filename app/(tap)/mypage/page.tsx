"use client";
import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Bar from "@/components/bar";
import { getPosts } from "@/app/(tap)/community/action";
import { getMorePlaces } from "@/app/(tap)/main/actions";
import Image from "next/image";

type Post = {
  authorname: string;
};

type Place = {
  username: string;
};

export default function Mypage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postAll, setPostAll] = useState<Post[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const { status, data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  // 로그아웃 상태인 경우 / 페이지로 리디렉션
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        const filteredPost = fetchedPosts.filter(
          (posting) => posting.authorname === String(session?.user?.name)
        );
        setPostAll(fetchedPosts);
        setPosts(filteredPost);
      } catch (error) {
        console.error("Error fetching places: ", error);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const fetchedPlaces = await getMorePlaces(1, 1);
        const filteredPlaces = fetchedPlaces.filter(
          (place) => place.username === String(session?.user?.name)
        );
        setPlaces(filteredPlaces);
      } catch (error) {
        console.error("Error fetching places: ", error);
      }
    }

    fetchPlaces();
  }, []);

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

      <div className="flex justify-between mx-8 mt-10">
        <Link href="/mypage/allPost">
          <div className="flex flex-col items-center">
            <span className="text-gray-500" style={{ fontSize: "16px" }}>
              전체 목록
            </span>
            <p className="text-lg">{postAll.length}개</p>
            <p className="text-xs text-gray-400">자세히 보기</p>
          </div>
        </Link>
        <Link href="/mypage/hotplace">
          <div className="flex flex-col items-center">
            <span className="text-gray-500" style={{ fontSize: "16px" }}>
              등록한 핫플 목록
            </span>
            <p className="text-lg">{places.length}개</p>
            <p className="text-xs text-gray-400">자세히 보기</p>
          </div>
        </Link>
        <Link href="/mypage/mypath">
          <div className="flex flex-col items-center">
            <span className="text-gray-500" style={{ fontSize: "16px" }}>
              나의 경로 목록
            </span>
            <p className="text-lg">{posts.length}개</p>
            <p className="text-xs text-gray-400">자세히 보기</p>
          </div>
        </Link>
      </div>
      <h1 className="pt-16 text-gray-500 text-lg font-medium px-4">나의 뱃지 목록</h1>
      <div className="pt-4 flex justify-center gap-6 text-gray-500">
        <div className="flex flex-col items-center">
          <Image
            src="/coffee.png"
            alt="Description of the image"
            width={90}
            height={90}
          />
          <p>커피 한 잔 할래요</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/dinner.png"
            alt="Description of the image"
            width={90}
            height={90}
          />
          <p>프로 먹방러</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/travel.png"
            alt="Description of the image"
            width={90}
            height={90}
          />
          <p>빠니보틀</p>
        </div>
      </div>
    </div>
  );
}
