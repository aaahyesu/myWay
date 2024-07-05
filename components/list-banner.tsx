import Link from "next/link";
import Image from "next/image";

interface ListBannerProps {
  title: string;
  content: string;
  photo: string;
  id: number;
}

export default function ListPlace({
  title,
  content,
  photo,
  id,
}: ListBannerProps) {
  return (
    <div className="text-center border-2 border-gray-300 rounded-lg p-4 bg-slate-50">
      <div className="flex justify-center items-center h-40 mt-2">
        <div className=" w-60">
          <Image
            src={photo}
            alt="/img"
            width={100}
            height={70}
            layout="fixed"
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
