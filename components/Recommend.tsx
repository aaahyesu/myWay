import Image from "next/image";

const recommendations = [
  { src: "/eat.png", label: "대식가" },
  { src: "/family.png", label: "온가족이랑" },
  { src: "/friend.png", label: "친구랑" },
  { src: "/vegan.png", label: "비건" },
  { src: "/mount.png", label: "등산러버" },
  { src: "/study.png", label: "혼공족" },
];

export default function Recommend() {
  return (
    <>
      <h1 className="mt-14 font-semibold text-xl text-gray-800">
        이런사람에게 추천해요👍
      </h1>
      <div className="mt-4 border flex flex-wrap justify-center border-gray-300 rounded-xl px-4 py-4">
        {recommendations.map((item, index) => (
          <span
            key={index}
            className="flex flex-col space-y-2 items-center mx-4"
          >
            <Image
              src={item.src}
              alt={`Description of the image - ${item.label}`}
              width={80}
              height={80}
            />
            <h1 className="text-sm">{item.label}</h1>
          </span>
        ))}
      </div>
    </>
  );
}
