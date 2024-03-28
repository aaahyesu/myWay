"use client";
import type { NextPage } from "next";
import React, { useEffect } from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Define an interface for the global google object
interface GoogleWindow extends Window {
  google: {
    maps: {
      Map: any; // Adjust the type as needed
    };
  };
}

const GOOGLE_MAPS = process.env.GOOGLE_MAPS_API_KEY;

const Detail: NextPage = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
      };
      
    useEffect(() => {
        // Load Google Maps script dynamically
        const loadGoogleMapsScript = () => {
            const googleMapsScript = document.createElement('script');
            googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS}}`;
            googleMapsScript.async = true;
            window.document.body.appendChild(googleMapsScript);
            googleMapsScript.addEventListener('load', initMap);
        };

        const initMap = () => {
            const googleMap = (window as GoogleWindow).google.maps.Map;
            const map = new googleMap(document.getElementById('map'), {
                center: { lat: 37.5665, lng: 126.9780 },
                zoom: 16,
            });
        };

        loadGoogleMapsScript();
    }, []);

    return (
        <div className="py-10">
            <div className="mt-4 flex space-x-2 mb-6">
                <h1 className="text-xl font-Nanum font-semibold">여기에 이제 제목이 들어감</h1>
                <span className="inline-flex font-Nanum items-center rounded-lg bg-blue-400 px-3 py-1 text-sm font-semibold text-white">맛집</span>
                <span className="inline-flex font-Nanum items-center rounded-lg  bg-blue-400 px-3 py-1 text-sm font-semibold text-white">관광지</span>
            </div>
            <div id="map" className="w-96 h-80 mb-6"></div>
            <div className="space-y-4">
                <h2 className="font-Nanum text-sm text-gray-800">테마 :</h2>
                <h2 className="font-Nanum text-sm text-gray-800">출발지 :</h2>
                <h2 className="font-Nanum text-sm text-gray-800">도착지 :</h2>
            </div>
            <div className="flex space-x-3 mt-10 mb-4">
                <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
                <div>
                    <h1 className="text-sm font-Nanum">Name</h1>
                    <h2 className="font-light text-[9px] font-Nanum">DaeJeon, Korea</h2>
                </div>
                <div className="flex flex-grow justify-end"></div>
                <button className="inline-flex items-center font-Nanum rounded-2xl bg-gray-50 px-4 text-xs text-gray-600 ring-1 ring-inset ring-gray-500/10">follow</button>
            </div>
            <div className="relative pt-10">
            <Image src="/bg.png" alt="Description of the image" width="400" height="300" className="absolute inset-0 z-10"/>
            <div className="slider-container relative z-20">
                <Slider {...settings}>
                    <div style={{ borderRadius: '8px' }}>
                        <h3>
                        <Image src="/food1.jpg" className="rounded-lg" alt="Description of the image" width="200" height="80"/>
                        </h3>
                    </div>
                    <div style={{ borderRadius: '8px' }}>
                        <h3>
                        <Image src="/food2.jpg" className="rounded-lg" alt="Description of the image" width="200" height="80"/>
                        </h3>
                    </div>
                    <div>
                        <h3>
                        <Image src="/food3.jpg" className="rounded-lg" alt="Description of the image" width="200" height="80"/>
                        </h3>
                    </div>
                    <div>
                        <h3>
                        <Image src="/food4.jpg" className="rounded-lg" alt="Description of the image" width="200" height="80"/>
                        </h3>
                    </div>
                    <div>
                        <h3>
                        <Image src="/food5.jpg" className="rounded-lg" alt="Description of the image" width="200" height="80"/>
                        </h3>
                    </div>
                    <div>
                        <h3>
                        <Image src="/food6.jpg" className="rounded-lg" alt="Description of the image" width="200" height="80"/>
                        </h3>
                    </div>
                    <div>
                        <h3></h3>
                    </div>
                </Slider>
            </div>
            </div>
            <div className="mt-20 space-y-6">
                <h2 className="font-Nanum text-sm text-gray-800">첫번째 스팟 :</h2>
                <h2 className="font-Nanum text-sm text-gray-800">두번째 스팟 :</h2>
                <h2 className="font-Nanum text-sm text-gray-800">세번째 스팟 :</h2>
            </div>
            <h1 className="mt-14 font-Nanum font-semibold text-md text-gray-800">이런사람에게 추천해요👍</h1>
            <div className="mt-2 border flex flex-wrap justify-center border-gray-300 rounded-xl px-4 py-4">
                <div className="flex flex-wrap justify-center space-x-10">
                    <span className="flex flex-col space-y-2 items-center">
                        <Image src="/eat.png" alt="Description of the image" width="80" height="80"/>
                        <h1 className="font-Nanum text-sm">대식가</h1>
                    </span> 
                    <span className="flex flex-col space-y-2 items-center">
                        <Image src="/family.png" alt="Description of the image" width="80" height="80"/>
                        <h1 className="font-Nanum text-sm">온가족이랑</h1>
                    </span> 
                    <span className="flex flex-col space-y-2 items-center">
                        <Image src="/friend.png" alt="Description of the image" width="80" height="80"/>
                        <h1 className="font-Nanum text-sm">친구랑</h1>
                    </span>
                </div>
                <div className="flex flex-wrap justify-center mt-4 space-x-10">
                    <span className="flex flex-col space-y-2 items-center">
                        <Image src="/vegan.png" alt="Description of the image" width="80" height="80"/>
                        <h1 className="font-Nanum text-sm">비건</h1>
                    </span> 
                    <span className="flex flex-col space-y-2 items-center">
                        <Image src="/mount.png" alt="Description of the image" width="80" height="80"/>
                        <h1 className="font-Nanum text-sm">등산러버</h1>
                    </span> 
                    <span className="flex flex-col space-y-2 items-center">
                        <Image src="/study.png" alt="Description of the image" width="80" height="80"/>
                        <h1 className="font-Nanum text-sm">혼공족</h1>
                    </span>
                </div>
            </div>
            <h1 className="mt-16 font-Nanum font-semibold text-md text-gray-800">댓글</h1>
            <div className="px-2 flex space-x-2 mt-3 mb-2">
                <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
                <h1 className="flex items-center text-sm font-Nanum">Name</h1>
            </div>
            <h2 className="px-3 text-sm font-Nanum">와 정말 멋진 장소 추천 감사합니다~</h2>
            <div className="flex space-x-2 items-center">
                <input
                    className="mt-4 w-full px-3 py-2 placeholder-gray-300 font-Nanum text-sm border border-gray-300 rounded-md focus:border-gray-400 focus:outline-none"
                    type="text"
                    id="comment"
                    name="comment"
                    placeholder="댓글 추가"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="gray" className="mt-3.5 w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
        </div>
    );
}

export default Detail;