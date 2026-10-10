"use client"
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BlogNavigation = ({ previousPost, nextPost }) => {
  const handleNavigation = (direction) => {
    const targetSlug = direction === "previous" ? previousPost?.slug : nextPost?.slug;
    if (targetSlug) {
      window.location.href = `/cmsblogs/${targetSlug}`; // Adjust the path as needed
    }
  };

  return (
    <div className="flex justify-between mb-8">
      <button
        onClick={() => handleNavigation("previous")}
        disabled={!previousPost}
        className={`flex items-center text-gray-600 hover:text-gray-800 ${!previousPost ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <FaArrowLeft className="mr-2" />
        Previous
      </button>
      <button
        onClick={() => handleNavigation("next")}
        disabled={!nextPost}
        className={`flex items-center text-gray-600 hover:text-gray-800 ${!nextPost ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Next
        <FaArrowRight className="ml-2" />
      </button>
    </div>
  );
};

export default BlogNavigation;
