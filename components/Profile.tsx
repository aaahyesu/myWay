import { Post } from "@/app/(tap)/community/page";

interface ProfileProps {
  post: Post;
}

export default function Profile({ post }: ProfileProps) {
  return (
    <div className="flex space-x-3 mb-2 items-center">
      <img
        className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
        src="/profile.png"
        alt=""
      />
      <div>
        <h1 className="text-base">{post.author.name}</h1>
      </div>
      <div className="flex flex-grow justify-end"></div>
      <button className="inline-flex items-center rounded-2xl bg-gray-50 px-4 py-2 text-xs text-gray-600 ring-1 ring-inset ring-gray-500/10">
        follow
      </button>
    </div>
  );
}
