"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPosts } from "./action";
import { CldImage } from "next-cloudinary";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

type Post = {
  id: number;
  title: string;
  theme: string;
  content: string;
  photo: string;
  authorname: string;
};

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching places: ", error);
      }
    }
    fetchPosts();
  }, []);

  const nextSlide = (postIndex: number) => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + 1) % posts[postIndex].photo.split(",").length
    );
  };

  const prevSlide = (postIndex: number) => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + posts[postIndex].photo.split(",").length) %
        posts[postIndex].photo.split(",").length
    );
  };

  return (
    <div className="">
      {posts.map((post, i) => (
        <div
          key={i}
          className="mt-8 rounded-lg border border-gray-200 shadow-md p-3"
        >
          <div className="flex space-x-3 mb-2 items-center">
            <img
              className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
              src="./profile.png"
              alt=""
            />
            <div>
              <h1 className="text-base">{post.authorname}</h1>
              <h2 style={{ fontSize: "10px" }} className="font-light">
                DaeJeon, Korea
              </h2>
            </div>
          </div>
          <div className="w-[360px] h-[360px] m-auto relative group flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <CldImage
                src={post.photo.split(",")[currentSlide]}
                width={350}
                height={350}
                alt="Uploaded Image"
                className="object-cover"
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
            <div className="mt-2 flex space-x-2 px-2">
              <h1 className="text-black text-base hover:text-gray-500 font-semibold">
                {post.title}
              </h1>
              <span className="inline-flex items-center rounded-lg bg-blue-400 px-2 text-sm text-white">
                {post.theme}
              </span>
            </div>
            <h1 className="mt-1 px-2 text-black hover:text-gray-500 text-sm">
              {post.content}
            </h1>
          </Link>
        </div>
      ))}
      <p className="mb-24"></p>
    </div>
  );
}
