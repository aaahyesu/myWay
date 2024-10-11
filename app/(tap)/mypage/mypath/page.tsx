"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPosts } from "@/app/(tap)/community/action";
import { CldImage } from "next-cloudinary";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Bar from "@/components/common/Bar";
import { useSession } from "next-auth/react";

type Post = {
  id: number;
  title: string;
  theme: string;
  content: string;
  photo: string;
  authorEmail: string;
};

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentSlides, setCurrentSlides] = useState<number[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        const filteredPost = fetchedPosts.filter(
          (posting) => posting.authorEmail === String(session?.user?.email)
        );
        setPosts(filteredPost);
        setCurrentSlides(new Array(filteredPost.length).fill(0)); // Initialize slides for each post
      } catch (error) {
        console.error("Error fetching places: ", error);
      }
    }
    fetchPosts();
  }, [session]);

  const nextSlide = (postIndex: number) => {
    setCurrentSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      newSlides[postIndex] =
        (newSlides[postIndex] + 1) % posts[postIndex].photo.split(",").length;
      return newSlides;
    });
  };

  const prevSlide = (postIndex: number) => {
    setCurrentSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      newSlides[postIndex] =
        (newSlides[postIndex] - 1 + posts[postIndex].photo.split(",").length) %
        posts[postIndex].photo.split(",").length;
      return newSlides;
    });
  };

  return (
    <div className="py-10 px-1 grid grid-cols-2 gap-7">
      <Bar canGoBack title="나의 경로 목록" />
      {posts.map((post, i) => (
        <div key={i} className="">
          <div className="flex space-x-3 mb-2 items-center"></div>
          <div className="w-[170px] h-[170px] m-auto relative group flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <CldImage
                src={post.photo.split(",")[currentSlides[i]]}
                width={160}
                height={160}
                alt="Uploaded Image"
                className="object-cover w-[160px] h-[160px]"
              />
            </div>
            {post.photo.split(",").length > 1 && (
              <>
                <div className="absolute top-[50%] transform -translate-y-1/2 -left-1 text-2xl rounded-full p-0.5 text-white cursor-pointer bg-gray-800/20">
                  <BsChevronCompactLeft
                    onClick={() => prevSlide(i)}
                    size={30}
                  />
                </div>
                <div className="absolute top-[50%] transform -translate-y-1/2 -right-1 text-2xl rounded-full p-0.5 text-white cursor-pointer bg-gray-800/20">
                  <BsChevronCompactRight
                    onClick={() => nextSlide(i)}
                    size={30}
                  />
                </div>
              </>
            )}
          </div>
          <div className="border-t border-gray-200 my-3"></div>
          <Link href={`/community/${post.id}`}>
            <h1 className="text-black text-sm hover:text-gray-500">
              {post.title}
            </h1>
            <h1 className="text-xs font-light text-gray-500">{post.content}</h1>
          </Link>
        </div>
      ))}
      <p className="mb-24"></p>
    </div>
  );
}
