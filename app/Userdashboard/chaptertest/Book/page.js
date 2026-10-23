"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Picture from "@/public/books-svgrepo-com (1).svg";
import Picture1 from '@/public/rewind-svgrepo-com (1).svg'
import { FaExclamationCircle } from "react-icons/fa";
import { IoRemoveOutline } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa"; // Importing Spinner for loading state


const Book = () => {
  const { data: session, status } = useSession();
  const [grade, setGrade] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const searchParams = new URLSearchParams(window.location.search);
  const selectedSubject = searchParams.get("selectedSubject");

  useEffect(() => {
    const fetchGrade = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getStudentByEmail`,
            { gmail: session.user.email }
          );
          setGrade(response.data.grade);
        } catch (err) {
          console.error("Error fetching grade:", err);
          setError("Unable to fetch grade. Please try again.");
        }
      }
    };
    fetchGrade();
  }, [session, status]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (grade && selectedSubject) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${WEB_BACKEND_URL}/api/route/getBooks`,
            { params: { grade, selectedSubject } }
          );

          const filteredBooks = response.data.books.filter(
            (book) => book.books !== null
          );
          setBooks(filteredBooks);  
        } catch (err) {
          console.error("Error fetching books:", err);
          setError("No books found for this subject and grade. We are updating the content soon! 🚀");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBooks();
  }, [grade, selectedSubject]);

  useEffect(() => {
    const savedBook = localStorage.getItem("selectedBook");
    if (savedBook) {
      setSelectedBook(savedBook);
      setTimeout(() => {
        setSelectedBook(null);
        localStorage.removeItem("selectedBook");
      }, 2000);
    }
  }, []);

  const handleBookClick = (bookName) => {
    setSelectedBook(bookName);
    localStorage.setItem("selectedBook", bookName);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="font-poppins p-4 relative">
      <div
        onClick={handleGoBack}
        className="absolute top-3 cursor-pointer"
      >
        <Image
          height={80}
          width={80}
          src={Picture1}
          alt="Back Picture"
          className="relative h-10 w-10"
        />
      </div>

      <h1 className="text-[1.5em] font-bold text-orange-600 text-center mb-4">
        Books for {selectedSubject}
      </h1>

      {/* ✅ Loading */}
      {isLoading ? (
        <p className="text-gray-500 text-center text-lg">Loading books...</p>
      ) : error ? (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg flex items-center justify-center flex-col shadow-md max-w-lg mx-auto mt-10">
          <FaExclamationCircle className="text-3xl mb-2" />
          <p className="text-lg font-semibold text-center">{error}</p>
        </div>
      ) : books.length > 0 ? (
        <ul className="w-[90%] m-auto grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-center">
          {books.map((book, index) => (
            <li
              key={index}
              className={`mb-2 text-center mt-3 p-7 border rounded-lg transition-all duration-300 ${
                selectedBook === book.books
                  ? "bg-orange-300 text-white"
                  : "bg-white text-orange-500"
              }`}
              onClick={() => handleBookClick(book.books)}
            >
              <Link
                href={`/Userdashboard/chaptertest/ChapterWiseQ&A?selectedSubject=${selectedSubject}&books=${encodeURIComponent(
                  book.books
                )}`}
                className="flex justify-around items-center gap-4 font-bold hover:underline"
              >
                <Image width={80} height={80} src={Picture} alt="Books Picture" />
                {book.books}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Book;
