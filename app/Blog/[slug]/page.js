import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
// import htmlParser from "html-react-parser";
import parse, { domToReact } from "html-react-parser";
import he from "he"; // For decoding HTML entities
import { FaqItem } from "@/components/Faqs";

export async function generateStaticParams() {
  const res = await fetch(
    "https://blogs.learnosphere.in/wp-json/wp/v2/posts?_embed&&per_page=100",
    { cache: "no-store" }
  );
  const blogs = await res.json();

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(
    `https://blogs.learnosphere.in/wp-json/wp/v2/posts?slug=${slug}&_embed&&per_page=100`,
    { cache: "no-store" }
  );
  const blogs = await res.json();

  if (!blogs || blogs.length === 0) {
    return { title: "Blog post not found" };
  }

  return { title: blogs[0].title.rendered };
}


const BlogPost = async ({ params }) => {
  const { slug } = await params;

  const fetchPosts = async () => {
    const res = await fetch(
      "https://blogs.learnosphere.in/wp-json/wp/v2/posts?_embed&&per_page=100",
      { cache: "no-store" }
    );
    return res.json();
  };

  const [blogs, currentPost] = await Promise.all([
    fetchPosts(),
    fetch(
      `https://blogs.learnosphere.in/wp-json/wp/v2/posts?slug=${slug}&_embed&&per_page=100`,
      { cache: "no-store" }
    ).then((res) => res.json()),
  ]);

  if (!currentPost || currentPost.length === 0) {
    return <p>Blog post not found</p>;
  }

  const post = currentPost[0];
  const imageUrl = post["_embedded"]?.["wp:featuredmedia"]?.[0]?.["source_url"];
  const content = he.decode(post.content.rendered); // Decode HTML entities in content

  const replace = (domNode) => {
    if (domNode.name === "img") {
      return null;
    }

    if (domNode.name === "a") {
      return (
        <a
          href={domNode.attribs?.href}
          target={domNode.attribs?.target || "_self"}
          rel={domNode.attribs?.rel || "noopener noreferrer"}
          className="text-blue-600 hover:underline"
        >
          {domNode.children[0]?.data}
        </a>
      );
    }

    if (domNode.name === "h1") {
      return (
        <h1 className="text-4xl font-bold text-gray-900 my-6 text-align: left px-2">
          {domNode.children[0]?.data}
        </h1>
      );
    }

    if (domNode.name === "h2") {
      return (
        <h2 className="text-3xl font-semibold text-gray-800 my-6 px-2">
          {domNode.children.map((child, index) => {
            if (child.name === "strong") {
              return (

                <strong key={index} className="font-bold text-black">
                  {child.children?.[0]?.data}
                </strong>

              );
            }
            // Add paragraph spacing here
            if (domNode.name === "p") {
              return (
                <p key={index} className="mb-4 leading-relaxed">
                  {domToReact(domNode.children, { replace })}
                </p>
              );
            }

            if (child.name === "em") {
              return (
                <em key={index} className="italic text-gray-600">
                  {child.children?.map((emChild, emIndex) => {
                    if (emChild.name === "strong") {
                      return (
                        <strong key={emIndex} className="font-bold text-black">
                          {emChild.children?.[0]?.data}
                        </strong>
                      );
                    }
                    return emChild.data || null;
                  })}
                </em>
              );
            }

            if (child.name === "a") {
              return (
                <a
                  key={index}
                  href={child.attribs?.href}
                  target={child.attribs?.target || "_self"}
                  rel={child.attribs?.rel || "noopener noreferrer"}
                  className="text-blue-600 hover:underline"
                >
                  {child.children?.[0]?.data}
                </a>
              );
            }

            return child.data || null;
          })}
        </h2>
      );
    }

    if (domNode.name === "h3") {
      return (
        <h3 className="text-2xl font-medium text-black my-6 px-2">
          {domNode.children.map((child, index) => {
            if (child.name === "strong") {
              return (
                <strong key={index} className="font-bold text-black">
                  {child.children?.[0]?.data}
                </strong>
              );
            }
            // Add paragraph spacing here
            if (domNode.name === "p") {
              return (
                <p key={index} className="mb-4 leading-relaxed">
                  {domToReact(domNode.children, { replace })}
                </p>
              );
            }
            if (child.name === "em") {
              return (
                <em key={index} className="italic text-gray-600">
                  {child.children?.map((emChild, emIndex) => {
                    if (emChild.name === "strong") {
                      return (
                        <strong key={emIndex} className="font-bold text-black">
                          {emChild.children?.[0]?.data}
                        </strong>
                      );
                    }
                    return emChild.data || null;
                  })}
                </em>
              );
            }
            if (child.name === "a") {
              return (
                <a
                  key={index}
                  href={child.attribs?.href}
                  target={child.attribs?.target || "_self"}
                  rel={child.attribs?.rel || "noopener noreferrer"}
                  className="text-blue-600 hover:underline"
                >
                  {child.children?.[0]?.data}
                </a>
              );
            }

            return child.data || null;
          })}
        </h3>
      );
    }

    if (domNode.name === "h4") {
      return (
        <h4 className="text-xl font-semibold text-gray-700 my-6 px-2">
          {domNode.children[0]?.data}
        </h4>
      );
    }
    // Add paragraph spacing here
    if (domNode.name === "p") {
      return (
        <p className="my-4 leading-relaxed">
          {domToReact(domNode.children, { replace })}
        </p>
      );
    }
    if (domNode.name === "ul") {
      const validChildren = domNode.children?.filter(
        (child) => child?.children?.[0]?.data?.trim()
      );

      if (!validChildren || validChildren.length === 0) {
        return null;
      }

      return (
        <ul className="list-disc pl-6 space-y-3 my-4 px-2">
          {validChildren.map((child, index) => (
            <li key={index} className="leading-relaxed text-base text-gray-800">
              {child.children[0].data}
            </li>
          ))}
        </ul>
      );
    }
    // Add paragraph spacing here
    if (domNode.name === "p") {
      return (
        <p className="mb-4 leading-relaxed">
          {domToReact(domNode.children, { replace })}
        </p>
      );
    }
    if (domNode.name === "ol") {
      const validChildren = domNode.children?.filter(
        (child) => child.name === "li" && child.children?.length > 0
      );

      if (!validChildren || validChildren.length === 0) {
        return null;
      }

      return (
        <ol className="list-decimal pl-6 space-y-3 my-4 px-2 text-left">
          {validChildren.map((child, index) => (
            <li key={index} className="leading-relaxed text-base text-gray-800">
              {child.children.map((liChild, liIndex) => {
                if (liChild.name === "strong") {
                  return (
                    <strong key={liIndex} className="font-bold text-black">
                      {liChild.children?.[0]?.data}
                    </strong>
                  );
                }

                if (liChild.name === "a") {
                  return (
                    <a
                      key={liIndex}
                      href={liChild.attribs?.href}
                      target={liChild.attribs?.target || "_self"}
                      rel={liChild.attribs?.rel || "noopener noreferrer"}
                      className="text-blue-600 hover:underline"
                    >
                      {liChild.children?.[0]?.data}
                    </a>
                  );
                }

                return liChild.data || null;
              })}
            </li>
          ))}
        </ol>
      );
    }

    if (
      domNode.name === "figure" &&
      domNode.attribs?.class?.includes("wp-block-table")
    ) {
      return (
        <div className="overflow-x-auto my-6 px-2">
          {domToReact(domNode.children, { replace })}
        </div>
      );
    }

    if (domNode.name === "table") {
      return (
        <div className="overflow-x-auto my-6 px-2">
          <table className="table-auto w-full border border-gray-300">
            {domToReact(domNode.children, { replace })}
          </table>
        </div>
      );
    }

    if (domNode.name === "thead") {
      return (
        <thead className="bg-gray-200">
          {domToReact(domNode.children, { replace })}
        </thead>
      );
    }

    if (domNode.name === "tbody") {
      return <tbody>{domToReact(domNode.children, { replace })}</tbody>;
    }

    if (domNode.name === "tr") {
      return (
        <tr className="border-b border-gray-300">
          {domToReact(domNode.children, { replace })}
        </tr>
      );
    }

    if (domNode.name === "td") {
      return (
        <td className="px-4 py-3 border border-gray-200 text-sm text-left">
          {domToReact(domNode.children, { replace })}
        </td>
      );
    }

    if (domNode.name === "th") {
      return (
        <th className="px-4 py-3 border border-gray-200 font-semibold text-left bg-gray-100">
          {domToReact(domNode.children, { replace })}
        </th>
      );
    }
    // Add paragraph spacing here
    if (domNode.name === "p") {
      return (
        <p className="mb-4 leading-relaxed">
          {domToReact(domNode.children, { replace })}
        </p>
      );
    }
    if (
      domNode.name === "div" &&
      domNode.attribs?.class?.includes("wp-block-aioseo-faq")
    ) {
      const questionNode = domNode.children?.find(
        (child) =>
          child.name === "h3" &&
          child.attribs?.class?.includes("aioseo-faq-block-question")
      );

      const answerNode = domNode.children?.find(
        (child) =>
          child.name === "div" &&
          child.attribs?.class?.includes("aioseo-faq-block-answer")
      );

      const questionText = questionNode?.children?.[0]?.data || "";

      const answerContent = answerNode
        ? domToReact(answerNode.children, { replace })
        : null;

      return (
        <div className="px-2 my-6">
          <FaqItem
            key={questionText}
            question={questionText}
            answer={
              <div className="text-gray-900 py-2">
                {answerContent}
              </div>
            }
          />
        </div>
      );
    }
  };

  // Now use the `replace` function here:
  const parsedContent = parse(content, { replace });

  const currentIndex = blogs.findIndex((blog) => blog.slug === slug);
  const previousPost = blogs[currentIndex - 1] || null;
  const nextPost = blogs[currentIndex + 1] || null;

  return (
    <>
      <Navbar />
      <div className="max-w-full mt-28 md:mt-28 mx-5 md:mx-14 px-4 md:px-8 ">
        {/* Breadcrumb navigation or routing showing */}
        <nav className="text-gray-600 text-sm mb-4" aria-label="Breadcrumb">
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

            {/* Blog Title Showing*/}
            <li className="text-gray-800 font-semibold truncate">
              {he.decode(post.title.rendered)}
            </li>
          </ul>
        </nav>

        {/* main content start */}
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          {/* main content (Left Side) */}
          <div className="flex-1 md:w-3/4">
            <header className="mb-6 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {he.decode(post.title.rendered)}
              </h1>
              <p className="text-gray-600 text-sm md:text-lg">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </header>

            {/* Featured image */}
            <div className="relative w-full mb-6 rounded-lg overflow-hidden shadow-lg">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={he.decode(post.title.rendered)}
                  width={1280}
                  height={768}
                  style={{ objectFit: "contain" }}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                  No image available
                </div>
              )}
            </div>

            {/* Render HTML content without images */}
            <div className="prose prose-sm sm:prose md:prose-lg lg:prose-xl max-w-none text-gray-800 m-0 md:m-5 p-1 md:p-5 ">
              {parsedContent}
            </div>
          </div>

          {/* sidebar (Right Side) */}
          <div className="md:w-1/4 sm:w-1/2 w-full p-5 border-l border-gray-300 mt-5 md:mt-0">
            <h2 className="text-xl font-semibold mb-4">Latest Blogs</h2>
            <ul>
              {blogs.slice(0, 5).map((blog) => {
                const blogImageUrl =
                  blog["_embedded"]?.["wp:featuredmedia"]?.[0]?.["source_url"];

                return (
                  <li
                    key={blog.id}
                    className="mb-4 flex items-center space-x-3 overflow-hidden border-b border-gray-200 pb-3"
                  >
                    {/* Image Section */}
                    {blogImageUrl ? (
                      <div className="flex-shrink-0 w-20 h-26">
                        <Image
                          src={blogImageUrl}
                          alt={he.decode(blog.title.rendered)}
                          width={200}
                          height={100}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 flex items-center justify-center rounded-lg text-sm text-gray-500">
                        No Image
                      </div>
                    )}

                    {/* Title Section */}
                    <a
                      href={`/Blog/${blog.slug}`}
                      className="text-blue-600 hover:underline flex-grow block text-sm md:text-base leading-tight"
                    >
                      {he.decode(blog.title.rendered)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Footer1 />
      <Footer />
    </>
  );
};

export default BlogPost;
