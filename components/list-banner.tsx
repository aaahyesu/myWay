import { CldImage } from "next-cloudinary";
import React from "react";

interface ListBannerProps {
  title: string;
  content: string;
  photo: string;
  id: number;
}

function ListBanner({ title, content, photo, id }: ListBannerProps) {
  // 두개 이상의 이미지는 콤마로 구분지어져 있음
  const photoArray = photo.split(",");
  const firstPhoto = photoArray[0].trim();

  return (
    <div className="text-center border-2 border-gray-300 rounded-lg p-4 bg-slate-50">
      <div className="flex justify-center items-center h-40 mt-2">
        <div className=" w-60">
          <CldImage
            src={firstPhoto}
            alt="배너 이미지"
            width={100}
            height={70}
            quality="auto" // 자동으로 최적 품질 적용
            format="auto"
            loading="lazy"
            priority={false}
          />
        </div>
      </div>
      <div className="h-14 mt-5">
        <h2 className="text-center text-md font-semibold ">{title}</h2>
        <p className="text-center text-xs text-gray-500 mr-2 ml-2">{content}</p>
      </div>
    </div>
  );
}
export default React.memo(ListBanner);
