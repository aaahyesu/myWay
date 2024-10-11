export default function Comment() {
  return (
    <>
      <h1 className="mt-16 font-semibold text-xl text-gray-800">댓글</h1>
      <div className="px-2 flex space-x-2 mt-4 mb-2">
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src="../profile.png"
          alt=""
        />
        <h1 className="flex items-center text-base">김혜수</h1>
      </div>
      <h2 className="px-3 text-sm">와 정말 멋진 장소 추천 감사합니다~</h2>
      <div className="flex space-x-2 items-center">
        <input
          className="mt-4 w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:border-gray-400 focus:outline-none"
          type="text"
          id="comment"
          name="comment"
          placeholder="댓글 추가"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="gray"
          className="mt-3.5 w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    </>
  );
}
