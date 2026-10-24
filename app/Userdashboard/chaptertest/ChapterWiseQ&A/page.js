"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaRegFilePdf } from "react-icons/fa";
import Image from "next/image";
import Picture from "@/public/rewind-svgrepo-com (1).svg";

const StudentData = () => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const selectedSubject = searchParams.get("selectedSubject");
  let books = searchParams.get("books");

  const [grade, setGrade] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Remove "null" from books param if present
  if (books === "null" || books === "" || books === undefined) {
    books = null;
  }

  // ✅ Fetch grade using user's email
  useEffect(() => {
    const fetchGrade = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getStudentByEmail`,
            { gmail: session.user.email }
          );
          setGrade(response.data.grade); // ✅ Set grade correctly
        } catch (error) {
          console.error("Error fetching grade:", error);
        }
      }
    };

    fetchGrade();
  }, [session, status]);

  // ✅ Fetch student data when grade is available
  useEffect(() => {
    const fetchData = async () => {
      if (grade && selectedSubject) {
        try {
          const params = { grade, selectedSubject };

          // ✅ Only add books param if it is not null
          if (books) {
            params.books = books;
          }

          const response = await axios.get(
            `${WEB_BACKEND_URL}/api/route/getstudentdata`,
            { params } // ✅ Pass only required params
          );

          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setData([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [grade, selectedSubject, books]);

  const handleView = (pdfUrl) => {
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
      <head><title>PDF Viewer</title></head>
      <body style = "margin:0,padding:0,overflow:hidden;">
      <iframe src = "${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" width = "100%" height = "100%" style="border:none;"></iframe>
      </body>
      </html>
      `);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="p-6">
      <div onClick={handleGoBack} className="absolute top-28 cursor-pointer">
        <Image
          height={80}
          width={80}
          src={Picture}
          alt="Back Picture"
          className="relative h-10 w-10"
        />
      </div>
      <h1 className="text-2xl font-bold text-center mb-4">
        Data for {selectedSubject}
      </h1>

      {books && (
        <h2 className="text-lg font-semibold text-center text-orange-600 bg-orange-100 rounded-full w-[95%] md:w-[45%] m-auto p-3 ">
          {books}
        </h2>
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : data.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 px-4 gap-6 sm:px-10 mt-8  ">
          {data.map((item, index) => (
            <li
              onClick={() => handleView(item.pdfUrl, item.id)}
              key={index}
              className=" rounded-lg text-gray-900 justify-between border border-gray-300 p-4 font-semibold flex items-center gap-2"
            >
              {item.title || "No Title Available"}
              <li
                key={index}
                className="mb-1 flex justify-between items-center"
              >
                <button className="text-orange-600 underline">
                  <FaRegFilePdf size={24} />
                </button>
              </li>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-red-500">No data found.</p>
      )}
    </div>
  );
};

export default StudentData;
