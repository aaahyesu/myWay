import { Post } from "@/app/(tap)/community/[id]/page";

interface ProfileProps {
  post: Post;
}
export default function CommuPlace({ post }: ProfileProps) {
  return (
    <>
      <div className="mt-4 flex space-x-2 mb-6">
        <h1 className="text-xl font-semibold">{post.title}</h1>
        <span className="inline-flex items-center rounded-lg bg-blue-400 px-2 py-1 text-sm font-semibold text-white">
          {post.theme}
        </span>
      </div>
      <div className="space-y-3 mb-10">
        {post.coordinate[0]?.name &&
          JSON.parse(post.coordinate[0].name).map(
            (name: string, index: number) => (
              <h2 key={index} className="text-base text-gray-500">
                <span className="text-gray-500">
                  📍 {index + 1} 번째 플레이스 :
                </span>{" "}
                <span className="text-black">{name}</span>
              </h2>
            )
          )}
      </div>
    </>
  );
}
