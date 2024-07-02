import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <div className="animate-pulse p-5 flex flex-col gap-5">
      {/* Placeholder for the main content */}

      {/* Placeholder for additional content */}
      <div className="flex gap-2 items-center">
        <div className="flex flex-col gap-1">
          <div className="h-5 w-20 bg-neutral-300 rounded-md" />
          <div className="h-5 w-40 bg-neutral-300 rounded-md" />
        </div>
      </div>
      <div className="aspect-square border-neutral-300 text-neutral-300 border-4 border-dashed rounded-md flex justify-center items-center h-64">
        <PhotoIcon className="h-20" />
      </div>

      {/* Placeholder for another section */}
      <div className="h-52 w-30 bg-neutral-300 rounded-md" />
      <div className="h-52 w-30 bg-neutral-300 rounded-md" />
    </div>
  );
}
