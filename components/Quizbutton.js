import React from "react";
import Image from "next/image";
import Link from "next/link";

const Quizbutton = () => {
  return (
    <>
      <h2 className="font-bold text-[1.1em] sm:text-[1.3em] md:text-[1.7em] flex justify-center items-center">
        Learn<b className="text-orange-600">O</b>sphere Online Quiz
      </h2>
      <div className="relative w-[98%] md:w-[90%] lg:m-4 lg:w-[98%] m-auto mt-4 h-[45vh] md:h-[40vh] xl:h-[50vh]">
        <Image
          className=" w-full h-full block border rounded-lg object-contain shadow-lg"
          src={"/QuizImage2.jpeg" || '/PlaceholderImage.png'} // Use a relative path for images in the public folder
          alt="Interactive online quiz for students"
          fill
          priority
          quality={100} // Adjust quality for faster loading without sacrificing too much clarity
         
        />
        <div className="flex flex-col p-2 md:p-6 lg:p-8 xl:p-14 2xl:p-20 mt-10 md:mt-0 gap-4 md:gap-0 absolute top-0 right-0 w-[55%] text-white">
          <h3 className="text-black  font-bold text-[.7em] sm:text-[.9em] md:text-[1.2em] lg:text-[1.3em]">
            Ace the Quiz: Test Your Knowledge Online!
          </h3>
          <ol className="text-gray-600 mt-0 md:mt-3 flex flex-col gap-2 list-decimal font-semibold text-[.5em] sm:text-[.7em] md:text-[.8em] lg:text-[.9em]">
            <li>
              Offers a wide range of courses, quizzes, and interactive content
              for learners of all levels
            </li>
            <li>
              Focuses on enhancing academic knowledge, professional skills, and
              personal growth.
            </li>
            <li>
              Connects you with like-minded individuals and experts, fostering
              collaboration and knowledge sharing.
            </li>
          </ol>
          <Link href="/Online-Quiz">
            <button className="w-20 sm:w-24 md:w-40 mt-1 lg:mt-3 bg-orange-600 font-bold p-1 sm:p-2 lg:p-3 text-[.6em] md:text-[1em] rounded-full">
              Online Quiz
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Quizbutton;



