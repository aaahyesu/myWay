"use client";
import { NextPage } from "next";
import React, { useState } from 'react';
import Link from "next/link";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';



const Save: NextPage = () => {
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: React.SetStateAction<number>) => {
    setCurrentIndex(slideIndex);
  };
    return(
        <div className="px-1">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
            <div key={i} className="mt-8">
                <div className="flex space-x-3 mb-2 items-center">
                    <img
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    <div>
                      <h1 className="text-base ">Name</h1>
                      <h2 style={{ fontSize: '10px' }} className="font-light ">DaeJeon, Korea</h2>
                    </div>
                    <div className="flex flex-grow justify-end"></div>
                    <button className="inline-flex items-center rounded-2xl bg-gray-50 px-4 py-2 text-xs text-gray-600 ring-1 ring-inset ring-gray-500/10">follow</button>
                </div>
                <div className='w-[380px] h-[380px] m-auto relative group'>
                  <div
                    style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                    className='w-full h-full shadow-md shadow-slate-300 rounded-2xl bg-center bg-cover duration-500'
                  ></div>
                  {/* Left Arrow */}
                  <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-0.5 text-white cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                  </div>
                  {/* Right Arrow */}
                  <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-0.5 text-white cursor-pointer'>
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                  </div>
                  <div className='flex top-4 justify-center py-2'>
                    {slides.map((slide, slideIndex) => (
                      <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className='text-2xl cursor-pointer'
                      >
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/community/1">
                <div className="mt-2 flex space-x-2 px-2">
                    <h1 className="text-black text-base hover:text-gray-500 font-semibold">Title - instagram copycat</h1>
                    <span className="inline-flex items-center rounded-lg bg-blue-400 px-2  text-sm text-white">맛집</span>
                    <span className="inline-flex  items-center rounded-lg  bg-blue-400 px-2 text-sm text-white">관광지</span>
                </div>
                <h1 className="mt-1 px-2 text-black hover:text-gray-500 text-sm ">detail ~~~~~~</h1>
                </Link>
            </div>
            ))}
            <p className="mb-24"></p>
        </div>
    );
}

export default Save;