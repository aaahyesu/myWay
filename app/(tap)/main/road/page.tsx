import Link from "next/link";
import Image from "next/image";

export default function Restaurant() {
  return (
    <div className="w-[380px] mt-2 flex flex-col items-center justify-center">
      <div className="flex mt-4 items-start w-full">
        <img
          src="/recommend.png"
          alt="recommend"
          className="w-8 h-8 mr-2"
        ></img>
        <div className="text-md text-left font-semibold text-gray-500 mt-1">
          대전 광역시 유성구
        </div>
        <div className="text-xl font-extrabold text-gray-800 ml-2">
          기반 코스 추천
        </div>
      </div>
      <div className="w-full h-80 border-2 border-grey-400 rounded-lg mt-4 bg-gray-100 flex items-center justify-between px-4">
        <iframe
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0, marginTop: "5px" }}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAb4wNGFmgyWp9ZSn06pqxwHExSQfBl3eA&q=LOCATION`}
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex mt-4 items-start w-full ">
        <img
          src="/recommend.png"
          alt="recommend"
          className="w-8 h-8 mr-2"
        ></img>
        <div className="text-xl font-extrabold text-gray-800 ml-2 mt-1">
          궁동 근처 코스 리스트
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {[1, 2, 3, 4].map((index) => (
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
