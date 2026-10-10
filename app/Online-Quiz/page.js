"use client";
import React from "react";
import Picture from "@/public/training-7408257_1280.jpg";
import Image from "next/image";
import class1 from "@/public/Class1Pic.jpeg";
import class2 from "@/public/9.png";
import class3 from "@/public/10.png";
import class4 from "@/public/11.png";
import class5 from "@/public/12.png";
import class6 from "@/public/13.png";
import class7 from "@/public/14.png";
import class8 from "@/public/15.png";
import class9 from "@/public/16.png";
import class10 from "@/public/17.png";
import class11 from "@/public/18.png";
import class12 from "@/public/19.png";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";

const OnilneQuiz = () => {
  return (
    <div>
      <head>
        <title>Online Quiz | Learnosphere</title>
        <meta
          name="description"
          content="Engage your young learner with fun and interactive online quizzes for All Classes. Covering basic subjects like Math, English, and Science, these quizzes help reinforce early learning, track progress, and build confidence. Start today and make learning enjoyable!"
        />
        <meta
          name="keywords"
          content="Online Quiz, Certification Quiz, Practice Quiz, Quizzes"
        />
        <link rel="canonical" href="https://learnosphere.in/Online-Quiz" />
      </head>
      <Navbar />
      <div className="flex flex-col gap-2 mt-14 justify-center items-center p-8">
        <h1
          className="font-extrabold border-2 border-orange-500 p-4  rounded-lg  text-center 
            w-full md:w-[70%] m-auto  text-2xl bg-gradient-to-r from-gradient-start to-gradient-end
            bg-clip-text text-transparent
            from-orange-500 to-red-600  "
        >
          Elevate Your Learning Experience with Learnosphere's Practice Quizzes!
        </h1>
        <p className="font-semibold text-center mt-3">
          At Learnosphere, we understand that practice is key to mastering any
          subject. Our meticulously crafted practice quiz for students from
          grades 1 to 12, along with online quizzes, cover a wide range of
          subjects to ensure comprehensive learning. Each online quiz is
          designed to enhance your understanding, boost confidence, and prepare
          you for academic success.
        </p>
        <p className="font-semibold text-center mt-3">
          Completing this online quiz not only reinforces your knowledge but
          also provides instant feedback, allowing you to identify areas for
          improvement. As you progress through the online quiz, you will earn
          certificates that recognize your achievements, motivating you to reach
          new heights. These certificates are a great addition to your academic
          portfolio, showcasing your commitment to learning.
        </p>
        <div className="px-2 md:px-20 mt-8 flex flex-col gap-12 md:flex-row">
          <div className="p-4">
            <Image
              className="h-auto md:h-60 w-auto md:w-60 rounded-xl"
              src={Picture}
              alt="Quiz Challenge"
              width={700}
              height={700}
            />
          </div>
          <div className="mt-6">
            <p className="font-bold text-[1.4em] text-orange-600 text-center"></p>
            <ol className="text-orange-600 font-bold text-[1.3em] flex flex-col gap-2">
              Quiz Challenge: Test Your Skills
              <li className="px-2 md:px-10  text-black font-semibold text-[.8em] flex gap-2">
                <p className="text-orange-600">1.</p> Dive into a variety of
                quizzes designed to test your knowledge and boost learning.
              </li>
              <li className="px-2 md:px-10  text-black font-semibold text-[.8em] flex gap-2">
                <p className="text-orange-600">2.</p>Sharpen your skills with
                questions covering different subjects and difficulty levels.
              </li>
              <li className="px-2 md:px-10 text-black font-semibold text-[.8em] flex gap-2">
                <p className="text-orange-600">3.</p>Track your progress over
                time and see how much you've improved.
              </li>
              <li className="px-2 md:px-10 text-black font-semibold text-[.8em] flex gap-2">
                <p className="text-orange-600">4.</p> Compete with friends or
                challenge yourself to achieve new high scores.
              </li>
              <li className="px-2 md:px-10 text-black font-semibold text-[.8em] flex gap-2">
                <p className="text-orange-600">5.</p> Learn in a fun,
                interactive way while reinforcing key concepts and facts.
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 w-full px-4 md:px-16 ">
        <div className="w-full md:w-[32%] 2xl:w-[22%] px-8  border rounded-xl shadow-2xl p-4">
          <Image
            className="h-40 w-72  rounded-xl"
            src={class1}
            alt="Learnosphere's Class 1 Practice Quizzes!"
          />
          <p className="mt-4  font-semibold">
            Explore the fun of learning with Learnosphere's Class 1 Practice
            Quizzes! Engage with exciting questions that enhance skills in math,
            English, and science while earning certificates for your
            achievements!"
          </p>
          <Link href="/Online-Quiz/Certification-Quiz-For-Class-1">
            <button className="bg-orange-600 p-3 w-36 mt-4 text-center text-white font-bold rounded-xl">
              Start Quiz
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[32%] 2xl:w-[22%] px-8 border rounded-xl shadow-2xl p-4">
          <Image
            className="h-40 w-72  rounded-xl"
            src={class2}
            alt="Class 2 Practice Quizzes"
          />
          <p className="mt-4  font-semibold">
            Dive into Class 2 Practice Quizzes with Learnosphere! Fun and
            interactive questions boost math, language, and science skills,
            helping students earn certificates while enjoying their learning
            journey!
          </p>
          <Link href="/Online-Quiz/Certification-Quiz-For-Class-2">
            <button className="bg-orange-600 p-3 w-36 mt-4 text-center text-white font-bold rounded-xl">
              Start Quiz
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[32%] 2xl:w-[22%] px-8 border rounded-xl shadow-2xl p-4">
          <Image
            className="h-40 w-72  rounded-xl"
            src={class3}
            alt="Class 3 Practice Quizzes"
          />
          <p className="mt-4  font-semibold">
            Discover Class 3 Practice Quizzes on Learnosphere! Engage with
            creative questions that strengthen math, reading, and science
            abilities, allowing students to earn certificates and celebrate
            their educational achievements!
          </p>
          <Link href="/Online-Quiz/Certification-Quiz-For-Class-3">
            <button className="bg-orange-600 p-3 w-36 mt-4 text-center text-white font-bold rounded-xl">
              Start Quiz
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[32%] 2xl:w-[22%] px-8 border rounded-xl shadow-2xl p-4">
          <Image
            className="h-40 w-72  rounded-xl"
            src={class4}
            alt="Class 4 Practice Quizzes"
          />
          <p className="mt-4  font-semibold">
            Join Class 4 Practice Quizzes at Learnosphere! Explore engaging
            questions that enhance math, language, and science skills,
            empowering students to earn certificates and recognize their hard
            work!
          </p>
          <Link href="/Online-Quiz/Certification-Quiz-For-Class-4">
            <button className="bg-orange-600 p-3 w-36 mt-4 text-center text-white font-bold rounded-xl">
              Start Quiz
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[32%] 2xl:w-[22%]  px-8 border rounded-xl shadow-2xl p-4">
          <Image
            className="h-40 w-72  rounded-xl"
            src={class5}
            alt="Learnosphere's Class 5 Practice Quizzes"
          />
          <p className="mt-4  font-semibold">
            Explore Learnosphere's Class 5 Practice Quizzes! Fun, interactive
            questions enhance math, English, and science knowledge while
            rewarding students with certificates for their dedication and
            academic progress!
          </p>
          <Link href="/Online-Quiz/Certification-Quiz-For-Class-5">
            <button className="bg-orange-600 p-3 w-36 mt-4 text-center text-white font-bold rounded-xl">
              Start Quiz
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[32%] 2xl:w-[22%] px-8 border rounded-xl shadow-2xl p-4">
          <Image
            className="h-40 w-72  rounded-xl"
            src={class6}
            alt="Class 6 Practice Quizzes"
          />
          <p className="mt-4  font-semibold">
            Unlock the power of learning with Class 6 Practice Quizzes on
            Learnosphere! Exciting questions develop critical skills in math,
            language arts, and science, with certificates to celebrate
            achievements!
          </p>
          <Link href="/Online-Quiz/Certification-Quiz-For-Class-6">
            <button className="bg-orange-600 p-3 w-36 mt-4 text-center text-white font-bold rounded-xl">
              Start Quiz
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[32%] 2xl:w-[22%] px-8 border rounded-xl shadow-2xl p-4">
          <Image
            className="h-40 w-72  rounded-xl"
            src={class7}
            alt="Class 7 Practice Quiz"
          />
          <p className="mt-4  font-semibold">
            Enhance learning with Class 7 Practice Quizzes on Learnosphere!
            Thought-provoking questions boost skills in math, English, and
            science, offering certificates to recognize students’ hard work and
            progress!
          </p>
          <Link href="/Online-Quiz/Certification-Quiz-For-Class-7">
            <button className="bg-orange-600 p-3 w-36 mt-4 text-center text-white font-bold rounded-xl">
              Start Quiz
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[32%] 2xl:w-[22%] px-8 border rounded-xl shadow-2xl p-4">
          <Image
            className="h-40 w-72  rounded-xl"
            src={class8}
            alt="Class 8 Practice Quizzes at Learnosphere"
          />
          <p className="mt-4  font-semibold">
            Explore Class 8 Practice Quizzes at Learnosphere! Engaging questions
            strengthen skills in math, science, and language, rewarding students
            with certificates for their commitment to learning and growth!
          </p>
          <Link href="/Online-Quiz/Certification-Quiz-For-Class-8">
            <button className="bg-orange-600 p-3 w-36 mt-4 text-center text-white font-bold rounded-xl">
              Start Quiz
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[32%] 2xl:w-[22%] px-8 border rounded-xl shadow-2xl p-4">
          <Image
            className="h-40 w-72  rounded-xl"
            src={class9}
            alt="Join Class 9 Practice Quizzes "
          />
          <p className="mt-4  font-semibold">
            Join Class 9 Practice Quizzes on Learnosphere! Interactive questions
            enhance critical thinking in math, English, and science, with
            certificates awarded to motivate students on their academic journey!
          </p>
          <Link href="/Online-Quiz/Certification-Quiz-For-Class-9">
            <button className="bg-orange-600 p-3 w-36 mt-4 text-center text-white font-bold rounded-xl">
              Start Quiz
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[32%] 2xl:w-[22%] px-8 border rounded-xl shadow-2xl p-4">
          <Image
            className="h-40 w-72  rounded-xl"
            src={class10}
            alt="Class 10 Practice Quizzes"
          />
          <p className="mt-4  font-semibold">
            Master your studies with Class 10 Practice Quizzes at Learnosphere!
            Challenging questions improve math, science, and language skills,
            allowing students to earn certificates for their achievements!
          </p>
          <Link href="/Online-Quiz/Certification-Quiz-For-Class-10">
            <button className="bg-orange-600 p-3 w-36 mt-4 text-center text-white font-bold rounded-xl">
              Start Quiz
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[32%] 2xl:w-[22%] px-8 border rounded-xl shadow-2xl p-4">
          <Image
            className="h-40 w-72  rounded-xl"
            src={class11}
            alt="Class 11 Practice Quizzes on Learnosphere"
          />
          <p className="mt-4  font-semibold">
            Elevate learning with Class 11 Practice Quizzes on Learnosphere!
            Engaging questions deepen knowledge in math, science, and English,
            rewarding students with certificates for their academic efforts!
          </p>
          <Link href="/Online-Quiz/Certification-Quiz-For-Class-11">
            <button className="bg-orange-600 p-3 w-36 mt-4 text-center text-white font-bold rounded-xl">
              Start Quiz
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[32%] 2xl:w-[22%] px-8 border rounded-xl shadow-2xl p-4">
          <Image
            className="h-40 w-72  rounded-xl"
            src={class12}
            alt="Class 12 Practice Quizzes at Learnosphere"
          />
          <p className="mt-4  font-semibold">
            Achieve excellence with Class 12 Practice Quizzes at Learnosphere!
            Thought-provoking questions enhance skills in math, science, and
            language arts, with certificates to celebrate student achievements
            and progress!
          </p>
          <Link href="/Online-Quiz/Certification-Quiz-For-Class-12">
            <button className="bg-orange-600 p-3 w-36 mt-4 text-center text-white font-bold rounded-xl">
              Start Quiz
            </button>
          </Link>
        </div>
      </div>
      <Footer1 />
      <Footer />
    </div>
  );
};

export default OnilneQuiz;
