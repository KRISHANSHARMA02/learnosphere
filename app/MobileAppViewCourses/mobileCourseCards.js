"use client";
import { APP_BACKEND_URL } from "@/src/helper/appbackend_api";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaTag } from "react-icons/fa";

const MobileCourseCards = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const userId = searchParams.get("userId");
  const className = searchParams.get("class");

  //const userId = "ST2024001"; // Replace with actual user ID logic
  //const className = "Grade 12"; // Replace with actual class logic

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true); // Start loader
        const response = await axios.post(
          `${APP_BACKEND_URL}/api/route/getAllcourses`,
          {
            userId,
            
            class: className,
          }
        );
        setCourses(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Something went wrong.");
      } finally {
        setLoading(false); // Stop loader
      }
    };

    if (userId && className) {
      fetchCourses();
    }
  }, [userId, className]);




  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
         
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
            <Image
              src="/no-data-svg.svg" // ✅ Replace with your own illustration or keep default
              alt="No courses"
              width={200}
              height={200}
              className="mb-6"
            />
            <h2 className="text-lg font-semibold">No Courses Available</h2>
            <p className="text-sm mt-2">
              There are currently no courses available for{" "}
              <span className="font-medium text-gray-800">{className}</span>.
              Please check back later.
            </p>
          </div>
        ) : (
          courses.map((course) => {

        

            return (
              <div key={course._id} className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden my-2">
                {/* Title Row with WhatsApp Icon */}
                <div className="flex items-center justify-between px-4 py-3">
                  <h2 className="text-md font-semibold text-gray-800 truncate">
                    {course.title}
                  </h2>
                  <a
                    href={`https://wa.me/?text=Check out this course: ${course.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:opacity-80"
                  >
                    <FaWhatsapp size={24} />
                  </a>
                </div>

                {/* Image with border */}
                <Link 
                   key={course._id}
                href={{
                  pathname: `/MobileAppViewCourses/${(
                    course.class +
                    "-" +
                    course.subject
                  )
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`,
                  query: {
                    id: course._id,
                    userId,
                  },
                }}
                className="bg-white"
                >
                <div className="px-4">
                  <div className="rounded-xl border border-gray-300 overflow-hidden">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      width={600}
                      height={200}
                      className="w-full h-[150px] object-cover"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-3">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {course.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Duration: {course.duration || "N/A"}
                  </p>

                  <hr className="my-2" />

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <Link
                      href={{
                        pathname: `/MobileAppViewCourses/${(
                          course.class +
                          "-" +
                          course.subject
                        )
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`,
                        query: {
                          id: course._id,
                          userId,
                        },
                      }}
                      className="border border-orange-600 text-orange-600 text-center py-2 rounded-lg text-sm font-medium hover:bg-orange-50"
                    >
                      Explore Details
                    </Link>
                  </div>
           
                </div>
                       </Link>
                </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MobileCourseCards;
