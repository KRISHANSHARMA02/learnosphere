"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import he from "he";


const BlogsPage = ({ blogs } ) => {
 // const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://blogs.learnosphere.in/wp-json/wp/v2/posts?_embed",
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

  if (error) {
    return <p>{error}</p>;
  }

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
      <div className="w-none mx-auto md:mx-40 px-10 md:px-10">
        <h2 className="text-start text-4xl font-bold mb-8 text-black">
          Latest Blogs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.slice(0, 6).map((blog) => {
            // Safely access the featured media
            const featuredMedia = blog["_embedded"]?.["wp:featuredmedia"]?.[0];
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

export default BlogsPage;