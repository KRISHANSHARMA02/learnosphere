"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image"; // Importing the Image component from Next.js
import StudentGif from "@/public/Student_Gif_Login.gif"; // Importing the Student GIF
import TeacherGif from "@/public/Teacher_gif_login.gif"; // Importing the Teacher GIF

const LoginPopup = ({ isOpen, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0);
  const [text, setText] = useState("");

  // Wrap words array with useMemo to avoid reinitializing it on every render
  const words = useMemo(() => ["Role", "Position", "Journey", "Profile"], []);

  useEffect(() => {
    const typingSpeed = isDeleting ? 300 : 300;
    const timeout = setTimeout(() => {
      if (!isDeleting && text === words[loop]) {
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoop((prev) => (prev + 1) % words.length);
      } else {
        const updatedText = isDeleting
          ? text.slice(0, -1)
          : words[loop].substring(0, text.length + 1);
        setText(updatedText);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, loop, words]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center font-Poppins justify-center z-50">
      <div className="bgcontainer rounded-lg shadow-lg w-full h-auto max-w-4xl p-6 md:p-10 relative animate-fade-in m-2 md:m-0">
        <Image
          src="/LoginPopupImg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-orange-500 z-50 hover:scale-105 duration-150 transition-all"
        >
          ✖
        </button>

        {/* Popup Content */}
        <div className="relative z-10 text-center">
          <h2 className="text-xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-600 to-pink-500 brightness-125 contrast-150 mb-6 md:mb-8 z-20">
            Select Your{" "}
            <span className="inline-block">
              {text}
              <span>!</span>
            </span>
          </h2>
          <div className="flex flex-row gap-6 items-center justify-around mb-2">
            {/* Educator Card */}
            <Link
              href="/jobs-for-home-tutors"
              className="group cursor-pointer bg-white rounded-lg shadow-lg border border-orange-500 p-6 w-auto h-auto transition transform hover:scale-105"
            >
              <Image
                src={TeacherGif}
                alt="Educator"
                width={170}
                height={170}
                className="mx-auto mb-2"
              />
              <h3 className="text-sm md:text-lg font-bold text-orange-600 group-hover:text-orange-700">
                Educator
              </h3>
            </Link>

            {/* Student Card */}
            <Link
              href="/Student"
              className="group cursor-pointer bg-white rounded-lg shadow-lg p-6 w-auto border border-orange-500 h-auto transition transform hover:scale-105"
            >
              <Image
                src={StudentGif}
                alt="Student"
                width={170}
                height={170}
                className="mx-auto mb-2"
              />
              <h3 className="text-sm md:text-lg font-bold text-orange-600 group-hover:text-orange-700">
                Student
              </h3>
            </Link>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPopup;
