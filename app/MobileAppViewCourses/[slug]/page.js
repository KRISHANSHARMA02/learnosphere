"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { FiVideo, FiBookOpen, FiClock } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { FaqItem } from "@/components/Faqs";
import Sociallinks2 from "@/components/Sociallinks2";

const CoursePage = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");
  const userId = searchParams.get("userId");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.post(
          "https://mobileapp.backend.learnosphere.in/api/route/getCourseDetailsByIdonWeb",
          { courseId }
        );
        setCourse(response.data);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const { courseDetails, courseContent } = course || {};
  if (!courseDetails) return <div>No course data available.</div>;

  // Count topics and videos
  const totalTopics = course?.totalTopics;
  const totalVideos = course?.totalVideos;

  return (
    <div className="max-w-6xl mx-auto px-4 py-5">
      {/* Back Button */}
      {/* <div className="mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium"
        >
          <FiArrowLeft className="mr-2 text-lg" />
          Back
        </button>
      </div> */}
      {/* Header Section */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Thumbnail */}
        {courseDetails.thumbnail && (
          <div className="w-full">
            <Image
              src={courseDetails.thumbnail}
              alt={courseDetails.title}
              width={600}
              height={400}
              className="rounded-xl shadow-md w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Course Info */}
        <div className="space-y-5">
          {/* Title */}
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 leading-snug">
            {courseDetails.title}
          </h1>

          {/* Description */}
          {courseDetails.description && (
            <p className="text-sm md:text-lg text-gray-600 mb-6 leading-relaxed">
              {courseDetails.description.split("\n").map((line, index) => (
                <p
                  key={index}
                  className="text-sm md:text-lg text-gray-600 mb-2 leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </p>
          )}

          {/* Class, Subject, Language, Duration */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-700">
            {courseDetails.class && (
              <span className="bg-gray-100 px-3 py-1 rounded-lg">
                Class: {courseDetails.class}
              </span>
            )}
            {courseDetails.subject && (
              <span className="bg-gray-100 px-3 py-1 rounded-lg">
                Subject: {courseDetails.subject}
              </span>
            )}
            {courseDetails.language && (
              <span className="bg-gray-100 px-3 py-1 rounded-lg">
                Language: {courseDetails.language}
              </span>
            )}
            {courseDetails.duration && (
              <span className="bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-1">
                <FiClock /> {courseDetails.duration}
              </span>
            )}
          </div>

          {/* Tags */}
          {courseDetails.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {courseDetails.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Course Stats */}
          <div className="flex gap-6 pt-4 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <FiBookOpen /> {totalTopics} Topics
            </div>
            <div className="flex items-center gap-2">
              <FiVideo /> {totalVideos} Videos
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      {courseDetails.highlights?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Highlights</h2>
          <ul className="pl-6 text-gray-800 space-y-2 list-disc marker:text-orange-500">
            {courseDetails.highlights.map((item, idx) => (
              <li key={idx} className="leading-relaxed text-base">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FAQs Section */}
      {courseDetails.faqs?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">FAQs</h2>
          <div className="space-y-3">
            {courseDetails.faqs.map((faq, idx) => (
              <FaqItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      )}

      {/* How to Enroll Section */}
      <div className="mt-14 bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          How to Enroll & Start Learning
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 text-base">
          <li>
            Visit our website <strong>learnosphere.in</strong> using your web
            browser.
          </li>
          <li>
            Navigate to the <strong>Courses</strong> section.
          </li>
          <li>Select the course you want to start learning.</li>
          <li>Complete your enrollment on our website.</li>
          <li>
            Open the app and sign in with the same account used on the website.
          </li>
          <li>
            Go to <strong>My Courses</strong> and begin your learning journey 🚀
          </li>
        </ol>
      </div>

      <Sociallinks2 />
    </div>
  );
};

export default CoursePage;
