"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import he from "he"; // For decoding HTML entities

const RecentBlogsCards = ({ blogs}) => {

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://blogs.learnosphere.in/wp-json/wp/v2/posts?_embed&&per_page=100",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.WORDPRESS_API_TOKEN}`,
  //           },
  //         }
  //       );

  //       if (!res.ok) {
  //         throw new Error("Failed to fetch data");
  //       }

  //       const data = await res.json();

  //       setBlogs(data);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchBlogs();
  // }, []); // Empty dependency array ensures this runs only once on component mount


  if (blogs.length === 0) {
    return (
      <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-orange-600 text-2xl animate-spin flex items-center justify-center border-t-orange-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-full mt-10 sm:mt-16 md:mt-28 mx-2 md:mx-6">
        {/* Breadcrumb navigation or routing showing */}
        <nav
          className="text-gray-600 text-sm mx-6 mt-8 p-5"
          aria-label="Breadcrumb"
        >
          <ul className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">
                Home
              </a>
            </li>
            <li>/</li>

            <li>
              <a href="/Blogs" className="text-blue-600 hover:underline">
                Blogs
              </a>
            </li>
            <li>/</li>

            <li>
              <a
                href="/Blogs/RecentBlogs"
                className="text-blue-600 hover:underline"
              >
                All Blogs
              </a>
            </li>

            {/* Blog Title Showing
                    <li className="text-gray-800 font-semibold truncate">
                        {post.title.rendered}
                    </li> */}
          </ul>
        </nav>

        <div className="mx-1 md:mx-6 mt-8 p-2 md:p-5">
          <h1 className="text-start text-4xl font-bold mb-8 text-black">
            All Blogs
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ml-auto mr-auto md:mr-auto gap-16 ">
            {blogs.map((blog) => {
              // Safely access the featured media
              const featuredMedia =
                blog["_embedded"]?.["wp:featuredmedia"]?.[0];
              const imageUrl = featuredMedia?.["source_url"];

              return (
                <div
                  key={blog.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2"
                >
                  <div className="relative w-full h-40">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={he.decode(blog.title.rendered)}
                        fill
                        style={{ objectFit: "contain" }}
                        className="rounded-t-lg"
                      />
                    ) : (
                      <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <Link href={`/Blog/${blog.slug}`}>
                      <h2 className="text-xl font-semibold mb-2">
                        {he.decode(blog.title.rendered)}
                      </h2>
                    </Link>
                    <p className="text-gray-500 text-sm mb-4">
                      <RenderDate dateString={blog.date} />
                    </p>
                    <p
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: he.decode(blog.excerpt.rendered),
                      }}
                    ></p>
                    <Link
                      href={`/Blog/${blog.slug}`}
                      className="text-orange-600 font-semibold flex gap-1 items-center"
                    >
                      Read More
                      <MdKeyboardDoubleArrowRight />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer1 />
      <Footer />
    </>
  );
};

// Separate component to handle date rendering
const RenderDate = ({ dateString }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formatted = new Date(dateString).toLocaleDateString("en-US", options);
    setFormattedDate(formatted);
  }, [dateString]);

  return <span>{formattedDate}</span>;
};

export default RecentBlogsCards;
