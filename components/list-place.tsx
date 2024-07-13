import Link from "next/link";
import { CldImage } from "next-cloudinary";

interface ListPlaceProps {
  title: string;
  address: string;
  photo: string;
  id: number;
}

export default function ListPlace({
  title,
  address,
  photo,
  id,
}: ListPlaceProps) {
  return (
    <div className="flex flex-col items-center">
      <Link href={`/main/${id}`} className="">
        <div className="w-42 h-32 rounded-xl overflow-hidden">
          <CldImage src={photo} alt={title} width={170} height={130} />
        </div>
      </Link>
      <p className="text-left mt-2 font-semibold">{title}</p>
      <p className="text-center text-xs text-gray-500 mr-1">{address}</p>
    </div>
  );
}
