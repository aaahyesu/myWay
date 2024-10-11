"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPosts } from "./action";
import { CldImage } from "next-cloudinary";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Bar from "@/components/common/Bar";
import Profile from "@/components/layout/Profile";

export type Post = {
  id: number;
  title: string;
  theme: string;
  content: string;
  photo: string;
  authorEmail: string;
  author: {
    name: string;
  };
};

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentSlides, setCurrentSlides] = useState<number[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        setCurrentSlides(new Array(fetchedPosts.length).fill(0));
      } catch (error) {
        console.error("Error fetching places: ", error);
      }
    }
    fetchPosts();
  }, []);

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
    <div className="py-10 ">
      <Bar title="커뮤니티" />
      {posts.map((post, i) => (
        <div
          key={i}
          className="mt-8 rounded-lg border border-gray-200 shadow-md p-3 transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <Profile post={post} />
          <div className="w-[360px] h-[360px] m-auto relative group flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <CldImage
                src={post.photo.split(",")[currentSlides[i]]}
                width={350}
                height={350}
                alt="Uploaded Image"
                className="object-cover w-[350px] h-[350px]"
                priority
              />
            </div>
            {post.photo.split(",").length > 1 && (
              <>
                <div className="absolute z-100 top-[50%] transform -translate-y-1/2 -left-1 text-2xl rounded-full p-0.5 text-white cursor-pointer bg-gray-800/20">
                  <BsChevronCompactLeft
                    onClick={() => prevSlide(i)}
                    size={30}
                  />
                </div>
                <div className="absolute z-100 top-[50%] transform -translate-y-1/2 -right-1 text-2xl rounded-full p-0.5 text-white cursor-pointer bg-gray-800/20">
                  <BsChevronCompactRight
                    onClick={() => nextSlide(i)}
                    size={30}
                  />
                </div>
              </>
            )}
          </div>
          <Link href={`/community/${post.id}`} key={post.id}>
            <div className="border-t border-gray-200 mb-2 mt-4">
              <div className="mt-2 flex space-x-2 px-2">
                <h2 className="text-black text-base hover:text-gray-500 font-semibold">
                  {post.title}
                </h2>
                <p className="inline-flex items-center rounded-lg bg-blue-400 px-2 text-sm text-white">
                  {post.theme}
                </p>
              </div>
              <p className="mt-1 px-2 text-black hover:text-gray-500 text-sm">
                {post.content}
              </p>
            </div>
          </Link>
        </div>
      ))}
      <p className="mb-24"></p>
    </div>
  );
}
