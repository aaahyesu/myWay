import Link from "next/link";
import React from "react";

type CategoryItem = {
  href: string;
  src: string;
  alt: string;
  text: string;
  imgClass: string;
};

const categories: CategoryItem[] = [
  {
    href: "main/restaurant",
    src: "/foods.png",
    alt: "Icon1",
    text: "맛집",
    imgClass: "w-14 h-12",
  },
  {
    href: "main/cafe",
    src: "/cafe.png",
    alt: "Icon2",
    text: "카페",
    imgClass: "w-12 h-12",
  },
  {
    href: "main/guide",
    src: "/camera.png",
    alt: "Icon3",
    text: "관광지",
    imgClass: "w-14 h-12 ml-4",
  },
  {
    href: "main/road",
    src: "/guideImage.png",
    alt: "Icon4",
    text: "추천코스",
    imgClass: "w-14 h-12",
  },
];

const CategoryComponent = () => {
  return (
    <div className="flex justify-center mt-5">
      <div className="grid grid-cols-4 gap-4">
        {categories.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex flex-col items-center bg-translate shadow-lg shadow-gray-200  hover:bg-slate-200 focus:ring focus:outline-none focus:ring-gray-500 p-2 rounded-[30px]"
          >
            <img src={item.src} alt={item.alt} className={item.imgClass} />
            <p className="text-xs text-gray-700 mt-1 font-semibold">
              {item.text}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryComponent;
