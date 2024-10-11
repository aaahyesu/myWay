import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import ListBanner from "@/components/list-banner";

type Banner = {
  id: number;
  title: string;
  content: string;
  photo: string;
};

const BannerSwiper = ({ banners }: { banners: Banner[] }) => {
  return (
    <div className="w-full mt-4 flex flex-col items-center justify-center">
      <Swiper
        effect="fade"
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        style={{ width: "100%", height: "100%" }}
        spaceBetween={10}
        slidesPerView={1.2}
        autoplay={{
          delay: 5000, // 자동 재생 간격(ms)
          disableOnInteraction: false, // 사용자 상호 작용 시 자동 재생 중지 여부
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide
            key={banner.id}
            className="swiper-slide"
            style={{ marginRight: "12px" }}
          >
            <Link href={`/community/${banner.id}`}>
              <ListBanner key={banner.id} {...banner} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSwiper;
