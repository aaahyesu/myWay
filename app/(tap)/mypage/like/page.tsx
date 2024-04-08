"use client";
import { NextPage } from "next";
import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";



const Like: NextPage = () => {
    return(
        <div className="px-1 mb-24 py-10">
            <div className="grid grid-cols-2 gap-4 mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <div key={index} className="flex flex-col items-center">
            <Link href="/main/1">
              <div className="w-40 h-32 rounded-xl overflow-hidden">
                <Image
                  src={`/placeSample.png`}
                  alt={`Image ${index}`}
                  width={170}
                  height={130}
                />
              </div>
            </Link>
            <p className="text-left mt-2 font-semibold">최진엽 사브샤브</p>
            <p className="text-center text-xs text-gray-500 mr-1">
              유성구 궁동로18번길 40 2층
            </p>
          </div>
        ))}
      </div>
        </div>
    );
}

export default Like;