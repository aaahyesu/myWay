import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import Link from "next/link";

interface EnterForm {
  email?: string;
  password?: string;
}

const Enter: NextPage = () => {
  const { handleSubmit } = useForm<EnterForm>();
  const onValid = (data: EnterForm) => {
    console.log(data);
  };
  return (
    <div className="mt-16 px-4">
      <h2 className="text-center text-4xl font-extrabold">My Way</h2>
      <div className="mt-5">
        <div className="flex flex-col items-center">
          <img
            src="/character.png"
            alt="main character"
            className="w-24 h-24 "
          />
          <h5 className="text-md font-medium text-gray-500">
            나만의 길을 개척해봐!
          </h5>
        </div>
        <form
          onSubmit={handleSubmit(onValid)}
          className="mt-8 flex flex-col space-y-4"
        >
          <Link href="/users/">
            <div className="mt-1 rounded-md border-2 border-transparent bg-black px-4 py-2 text-center font-medium text-white shadow-sm hover:bg-[#050708]/80 focus:outline-none focus:ring-2 focus:ring-[#050708] focus:ring-offset-2 ">
              로그인 / 회원가입
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Enter;
