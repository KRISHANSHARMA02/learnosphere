"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Picture from '@/public/books-svgrepo-com (1).svg'
import Image from "next/image";
import Picture1 from '@/public/rewind-svgrepo-com (1).svg'

const Books = () => {
  const { data: session, status } = useSession();
  const [grade, setGrade] = useState(null);
  const [books, setBooks] = useState([]);
  const searchParams = useSearchParams();
  const selectedSubject = searchParams.get("selectedSubject"); // URL se subject fetch kiya
  const selectedLevel = searchParams.get("level"); // 🛠️ Fix: Fetch `level` from URL

  // ✅ Grade Fetching from API
  useEffect(() => {
    const fetchGrade = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getStudentByEmail`,
            { gmail: session.user.email }
          );
          setGrade(response.data.grade);
        } catch (error) {
          console.error("Error fetching grade:", error);
        }
      }
    };

    fetchGrade();
  }, [session, status]);

  // ✅ Books Fetching (Grade & Subject wise)
  useEffect(() => {
    const fetchBooks = async () => {
      if (grade && selectedSubject) {
        try {
          const response = await axios.get(
            `${WEB_BACKEND_URL}/api/route/fetchBooks`,
            { params: { grade, selectedSubject } }
          );
          setBooks(response.data.books || []); // 🛠️ Fix: Handle null response
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      }
    };

    fetchBooks();
  }, [grade, selectedSubject]);

  const handleGoBack = () => {
    window.history.back();
  };


  return (
    <div className="p-4 w-full">
    <div
      onClick={handleGoBack}
      className="absolute top-28 cursor-pointer"
    >
      <Image
        height={80}
        width={80}
        src={Picture1}
        alt="Back Picture"
        className="relative h-10 w-10"
      />
    </div>
    <div className="flex justify-center items-center text-white">
    <h2 className="text-[1.4em] p-3 rounded-full bg-orange-600 text-center font-bold mb-4">
    Books for {selectedSubject}
    </h2>
   
    
    </div>
    
      {books?.length > 0 ? (
        
        <ul className="w-[90%] m-auto grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-center">
        {books
          .filter((book) => book.books !== null && book.books.trim() !== "") // ❌ Null books hatao
          .map((book, index) => (
            <li key={index} className="mb-2 text-center mt-3 p-7 border rounded-lg">
              <Link
                href={`/Userdashboard/chaptertest/Chapterwise?selectedSubject=${selectedSubject}&level=${selectedLevel}&books=${encodeURIComponent(
                  book.books
                )}`}
                className="text-orange-500 flex justify-around items-center gap-4 font-bold hover:underline"
              >
                <Image width={80} height={80} src={Picture} alt="Books Picture" />
                {book.books}
              </Link>
            </li>
          ))}
      </ul>
      
      ) : (
        <p>No books found for this subject.</p>
      )}
    </div>
  );
};

export default Books;
