"use client";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface BarProps {
  canGoBack?: boolean;
  title?: string;
  bookmark?: boolean;
}

export default function Bar({ 
  title, 
  bookmark, 
  canGoBack 
}: BarProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="fixed top-0 z-30 w-full max-w-sm mx-auto bg-white py-2 flex px-4 border-b">
      <div className="flex w-full items-center justify-between">
        {canGoBack && (
          <button onClick={handleGoBack}>
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
        )}
        {title && (
          <span className="flex-grow text-center text-lg font-medium">{title}</span>
        )}
        {bookmark && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        )}
      </div>
    </div>
  );
}