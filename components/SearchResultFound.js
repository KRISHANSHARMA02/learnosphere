"use client";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // ✅ Next.js App Router Hook
import Swal from "sweetalert2"; // ✅ make sure this is installed
import { trackEvent } from "@/src/lib/eventTracker";

const ContentFound = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [foundItems, setFoundItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/data.json");
        const data = await response.json();

        if (query) {
          const regex = new RegExp(`\\b${query.toLowerCase()}\\b`, "i");
          const found = data.filter((item) =>
            regex.test(item.name.toLowerCase())
          );
          setFoundItems(found);
          setCurrentPage(1); // ✅ Reset to first page on new search
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]); // ✅ Re-run when query changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      name,
      contact,
      email,
      message,
    };

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/query",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        trackEvent("SEARCH_QUERY_FORM_SUBMITTED", {
          name,
          email,
          mobile_number: contact,
          contact,
          message,
        });

        setSuccess("Your Query submitted successfully!");
        setName("");
        setContact("");
        setEmail("");
        setMessage("");

        Swal.fire({
          title: "Thank You!",
          text: "Thank you for your feedback. We will resolve your issue as soon as possible!",
          icon: "success",
          confirmButtonText: "Close",
          confirmButtonColor: "#3085d6",
        });
      } else {
        setErrors({ general: "Failed to submit the form. Please try again." });
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An error occurred while submitting the form." });
      }
    }
  };

  const handleSearchSubmit = (e) => {
  e.preventDefault();
  const searchTerm = inputValue.trim();
  if (searchTerm) {
    router.push(`/content-found?query=${encodeURIComponent(searchTerm)}`);
  } 
};

  const totalPages = Math.ceil(foundItems.length / itemsPerPage);
  const currentItems = foundItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const generatePageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pageNumbers;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold">
          Learn<b className="font-bold text-orange-600">0</b>sphere...
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-20 md:mt-14 p-2 md:p-10 flex flex-col md:flex-row gap-3">
        <div className="flex w-full md:w-[70%] bg-gray-50 p-2 md:p-10 flex-col justify-start">
          {foundItems.length > 0 ? (
            <>
              <p className="font-bold text-2xl mb-8 font-poppins">{`Found ${
                foundItems.length
              } result${foundItems.length > 1 ? "s" : ""} for "${query}"`}</p>
              {currentItems.map((item, index) => (
                <div key={index} className="mb-4">
                  <a href={item.path}>
                    <h2 className="text-xl text-gray-800 hover:text-orange-600 hover:underline hover:underline-offset-1 font-bold">
                      {item.name}
                    </h2>
                  </a>
                  <p>{item.description}</p>
                </div>
              ))}
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 bg-orange-200 rounded ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-orange-300"
                  }`}
                >
                  Previous
                </button>
                {generatePageNumbers().map((number, index) =>
                  typeof number === "number" ? (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(number)}
                      className={`px-4 py-2 rounded-full text-[.8em] ${
                        currentPage === number
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {number}
                    </button>
                  ) : (
                    <span key={index} className="px-3 py-1">
                      {number}
                    </span>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 bg-orange-200 rounded ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-orange-300"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center h-screen">
              <h2 className="font-extrabold text-[6em] animate-pulse text-center bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
                404
              </h2>
              <p className="font-semibold text-center text-[2em]">Oops!</p>
              <p className="font-semibold text-center mt-2 text-[1em]">
                Error 404 - Page Not Found
              </p>
              <p className="font-semibold text-center mt-2 text-[.9em]">
                This Page Can Not Find. We're Working On It
              </p>
              <Link
                href="/"
                className="text-center mt-4 bg-gradient-to-r from-orange-600 rounded-md to-orange-500 text-white p-2 font-bold text-[1em]"
              >
                Go to homepage
              </Link>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 w-full md:w-[30%] p-6 flex flex-col gap-2"
        >
          <h2 className="text-orange-600 font-bold text-center text-[1.6em]">
            Query Form
          </h2>
          {/* Form Fields */}
          {[
            { id: "name", label: "Full Name", value: name, set: setName },
            { id: "contact", label: "Contact", value: contact, set: setContact },
            { id: "email", label: "E-mail", value: email, set: setEmail },
            { id: "message", label: "Message", value: message, set: setMessage },
          ].map(({ id, label, value, set }) => (
            <span key={id} className="flex flex-col gap-1">
              <label htmlFor={id} className="text-gray-800 font-bold">
                {label}*
              </label>
              <input
                id={id}
                value={value}
                onChange={(e) => set(e.target.value)}
                name={id}
                type="text"
                placeholder={`Enter Your ${label}`}
                className="p-2 border border-gray-300 bg-white text-black placeholder:text-gray-800 placeholder:text-[.9em] rounded-md"
              />
              {errors[id] && (
                <p className="text-red-500 text-sm mb-4">{errors[id]}</p>
              )}
            </span>
          ))}
          <button
            type="submit"
            className="bg-orange-600 text-white font-bold w-24 mt-2 p-2 rounded-md"
          >
            Submit
          </button>
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        </form>
      </div>
      <Footer1 />
      <Footer />
    </>
  );
};

export default ContentFound;
