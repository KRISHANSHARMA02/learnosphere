"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Banner from "@/public/Banner.jpeg";
import Link from "next/link";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import WhatsappModal from "@/components/whatsappModal";

import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";
import PageNotFound from "@/app/not-found";

const DataTable = ({ params }) => {
  const [Class, setClass] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [slug, setSlug] = useState("");  

  useEffect(() => {
    // Unwrap params (it's a Promise)
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };

    unwrapParams();
  }, [params]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    // Trigger the redirect when the Enter key is pressed
    if (e.key === "Enter" && searchQuery) {
      // Redirect to ContentFound with the search query as a URL parameter
      window.location.href = `/SearchResult?query=${searchQuery}`;
    }
  };

  const router = useRouter();
  useEffect(() => {
    // Check if we are in the browser before accessing window
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setClass(searchParams.get("Class"));
    }
  }, []);

  const [data, setData] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton((prev) => !prev);
    }, 100000000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        let topicData = null;
        try {
          const response = await axios.get(
            `${WEB_BACKEND_URL}/api/route/mathematicsTopic/${slug}`
          );
          if (response.data && response.data.data && response.data.data.length > 0) {
            topicData = response.data.data;
          }
        } catch (fetchErr) {
          if (WEB_BACKEND_URL.includes("localhost") || (typeof window !== "undefined" && window.location.hostname === "localhost")) {
            try {
              const liveResponse = await axios.get(
                `https://learnospherebackend.learnosphere.in/api/route/mathematicsTopic/${slug}`
              );
              if (liveResponse.data && liveResponse.data.data && liveResponse.data.data.length > 0) {
                topicData = liveResponse.data.data;
              }
            } catch (liveErr) {}
          }
        }

        if (topicData) {
          setData(topicData);
        } else {
          setData([]);
          setError("Mathematics topic not found");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (!loading && (!data || data.length === 0 || error)) {
    return <PageNotFound />;
  }

  // if (error) { return <div className="text-red-500">Error: {error}</div>; }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 font-Poppins">
        <div className=" px-4 md:px-28 flex flex-col md:flex-row gap-6 bg-gray-100 container mx-auto pt-24">
          <div className="flex flex-col gap-5 w-full md:w-[65%]">
            <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4">
              {/* WhatsApp Modal */}
              {showButton && (
                <div
                  data-aos="fade-up"
                  className="absolute bottom-10 md:bottom-16 right-0 md:-left-[390px] 2xl:right-1 xl:-left-[370px] rounded-lg p-4 transition-transform transform duration-500 ease-in-out"
                >
                  <div className="relative">
                    {/* Close Icon */}
                    <FaTimes
                      size={18}
                      className="absolute top-2 right-0 text-white cursor-pointer"
                      onClick={() => setShowButton(false)} // Close the modal
                    />
                    <WhatsappModal />
                  </div>
                </div>
              )}

              {/* WhatsApp Icon */}
              <FaWhatsapp
                size={48}
                className="text-white bg-green-500 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
                onClick={() => setShowButton(!showButton)} // Toggle modal visibility
              />
            </div>
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className="mb-4">
                  <h1 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold">
                    {item.heading1}
                  </h1>
                  <Link href="https://sarvgyat.learnosphere.in/">
                    <Image className="mt-3" src={Banner} alt="" />
                  </Link>
                  <p className="mb-2 mt-4 text-gray-800">{item.para1}</p>
                  {item.para60 > 0 && (

                    <p className="bg-orange-50 font-semibold text-[1em] border p-3 text-center border-gray-300 rounded-lg ">{item.para60}</p>
                  )}

                  {item.list1 && item.list1.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list1.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <h1 className="mb-2 text-slate-800 text-[1.5em]">
                    {item.heading2}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para2}</p>

                  {item.list2 && item.list2.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list2.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {item.imageUrls && item.imageUrls.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <h1 className=" text-slate-800 mt-4 text-[1.3em]">
                    {item.heading3}
                  </h1>
                  <p className="">{item.para3}</p>

                  {item.anotherField1 && item.anotherField1.length > 0 && (
                    <div className="grid gap-4 mt-3">
                      <table className="min-w-full bg-white border border-gray-300">
                        <tbody>
                          <tr >
                            <td className="border border-slate-800">
                              {item.anotherField1.map((dataItem, index) => (
                                <div
                                  key={index}
                                  className={`py-2 px-4 ${index === item.anotherField1.length - 1
                                      ? ""
                                      : "border-b border-slate-800"
                                    } hover:bg-gray-100 text-gray-900 flex space-x-8 sm:space-x-14 md:space-x-14 lg:space-x-20 xl:space-x-28`}
                                >
                                  {dataItem.split(" ").map((word, idx) => (
                                    <span key={idx}>{word}</span>
                                  ))}
                                </div>

                              ))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {item.imageUrls1 && item.imageUrls1.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls1.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}


                  <h1 className=" text-slate-800 text-[1.2em]">
                    {item.heading4}
                  </h1>
                  <p className="mt-4">{item.para4}</p>

                  {item.list4 && item.list4.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list4.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {item.imageUrls2 && item.imageUrls2.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls2.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <h1 className="mb-2 text-slate-800 mt-2 text-[1.5em]">
                    {item.heading5}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para5}</p>

                  {item.list5 && item.list5.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list5.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <h1 className="mb-2 text-slate-800 text-[1.5em]">
                    {item.heading7}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para7}</p>

                  {item.imageUrls3 && item.imageUrls3.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls3.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}



                  <div className="grid gap-4">
                    {(item.tableData && item.tableData.length > 0) ||
                      (item.anotherField && item.anotherField.length > 0) ? (
                      <table className="min-w-full bg-white border border-gray-300 table-fixed">

                        <tbody>
                          {item.tableData.map((theorem, index) => (
                            <tr key={index}>
                              {/* Theorem Column */}
                              <td className="border border-slate-800 py-2 px-4 align-top">
                                {theorem}
                              </td>
                              {/* Statement Column */}
                              <td className="border border-slate-800 py-2 px-4 align-top">
                                {item.anotherField && item.anotherField[index]
                                  ? item.anotherField[index]
                                  : "No data found"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : null}
                  </div>


                  {item.list6 && item.list6.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list6.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}


                  <h1 className="mb-1 text-slate-800 mt-2  text-[1.5em]">
                    {item.heading8}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para8}</p>
                  {item.list7 && item.list7.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list7.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}


                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading9}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para9}</p>
                  {item.list8 && item.list8.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list8.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {item.imageUrls4 && item.imageUrls4.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls4.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading10}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para10}</p>
                  {/*border para*/}
                  {item.para6 > 0 && (

                    <p className="bg-orange-50 font-semibold text-[1em] border p-3 text-center border-gray-300 rounded-lg ">{item.para6}</p>
                  )}
                  {item.list9 && item.list9.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list9.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading11}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para11}</p>




                  {item.list10 && item.list10.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list10.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading12}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para12}</p>
                  {item.imageUrls5 && item.imageUrls5.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls5.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading13}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para13}</p>
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading14}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para14}</p>
                  {item.list11 && item.list11.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list11.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {item.imageUrls6 && item.imageUrls6.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls6.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  <h1 className="mb-2 mt-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading15}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para15}</p>
                  {item.imageUrls7 && item.imageUrls7.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls7.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  {item.list12 && item.list12.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list12.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 mt-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading16}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para16}</p>
                  {item.para59 > 0 && (

                    <p className="bg-orange-50 font-semibold text-[1em] border p-3 text-center border-gray-300 rounded-lg ">{item.para59}</p>
                  )}

                  {item.imageUrls8 && item.imageUrls8.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls8.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  {item.list13 && item.list13.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list13.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading17}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para17}</p>

                  <div className="grid gap-4">
                    {(item.anotherField17 && item.anotherField17.length > 0) ||
                      (item.anotherField18 && item.anotherField18.length > 0) ||
                      (item.anotherField19 && item.anotherField19.length > 0) ||
                      (item.anotherField20 && item.anotherField20.length > 0) ? (
                      <div className="overflow-x-auto max-w-full"> {/* Confines scrolling to the table */}
                        <table className="min-w-full bg-white border border-gray-300 table-fixed">
                          <tbody>
                            {item.anotherField17.map((_, index) => (
                              <tr key={index} className="align-top"> {/* Align cells to the top */}
                                {/* Theorem Column */}
                                <td className="border border-slate-800 py-2 px-4 align-top">
                                  {item.anotherField17 && item.anotherField17[index]
                                    ? item.anotherField17[index]
                                    : "No data found"}
                                </td>
                                <td className="border border-slate-800 py-2 px-4 align-top">
                                  {item.anotherField18 && item.anotherField18[index]
                                    ? item.anotherField18[index]
                                    : "No data found"}
                                </td>
                                <td className="border border-slate-800 py-2 px-4 align-top">
                                  {item.anotherField19 && item.anotherField19[index]
                                    ? item.anotherField19[index]
                                    : "No data found"}
                                </td>
                                {/* Statement Column */}
                                <td className="border border-slate-800 py-2 px-4 align-top">
                                  {item.anotherField20 && item.anotherField20[index]
                                    ? item.anotherField20[index]
                                    : "No data found"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>




                  {item.list14 && item.list14.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list14.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading18}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para18}</p>
                  {item.para57 > 0 && (

                    <p className="bg-orange-50 font-semibold text-[1em] border p-3 text-center border-gray-300 rounded-lg ">{item.para57}</p>
                  )}

                  {item.list40 && item.list40.length > 0 && (
                    <div className="p-4  rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list40.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <p className="mb-2 mt-1 text-gray-800">{item.para62}</p>
                  {item.imageUrls9 && item.imageUrls9.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls9.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading19}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para19}</p>
                  <p className="mb-2 mt-1 text-gray-800">{item.para63}</p>

                  {item.imageUrls10 && item.imageUrls10.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls10.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  {item.list15 && item.list15.length > 0 && (
                    <div className="p-4  rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list15.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading20}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para20}</p>
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading21}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para21}</p>

                  {item.list16 && item.list16.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list16.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading22}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para22}</p>
                  {item.list37 && item.list37.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className="  text-gray-800 mb-2">
                        {item.list37.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading23}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para23}</p>
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading24}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para24}</p>
                  {item.list17 && item.list17.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list17.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}


                  <div className="grid gap-4">
                    {/* Check if there's any data in the fields */}
                    {item.anotherField2?.some((value) => value) ||
                      item.anotherField3?.some((value) => value) ||
                      item.anotherField4?.some((value) => value) ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 table-fixed">
                          <tbody>
                            {item.anotherField2.map((_, index) => {
                              // Check if the current row has data in at least one field
                              const hasData =
                                (item.anotherField2 && item.anotherField2[index]) ||
                                (item.anotherField3 && item.anotherField3[index]) ||
                                (item.anotherField4 && item.anotherField4[index]);

                              // Render rows only with data
                              if (hasData) {
                                return (
                                  <tr key={index} className="align-top">
                                    {/* Render first column only if data exists */}
                                    {item.anotherField2 && item.anotherField2[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField2[index]}
                                      </td>
                                    ) : null}

                                    {/* Render second column only if data exists */}
                                    {item.anotherField3 && item.anotherField3[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField3[index]}
                                      </td>
                                    ) : null}

                                    {/* Render third column only if data exists */}
                                    {item.anotherField4 && item.anotherField4[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField4[index]}
                                      </td>
                                    ) : null}
                                  </tr>
                                );
                              }
                              return null; // Skip rows without data
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>




                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading25}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para25}</p>
                  {item.imageUrls11 && item.imageUrls11.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls11.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading26}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para26}</p>
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading27}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para27}</p>

                  {item.list18 && item.list18.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list18.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading28}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para28}</p>
                  {item.imageUrls12 && item.imageUrls12.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls12.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <div className="grid gap-4">
                    {/* Check if there's any data in the fields */}
                    {item.anotherField5?.some((value) => value) ||
                      item.anotherField6?.some((value) => value) ||
                      item.anotherField7?.some((value) => value) ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 table-fixed">
                          <tbody>
                            {item.anotherField5.map((_, index) => {
                              // Check if the current row has data in at least one field
                              const hasData =
                                (item.anotherField5 && item.anotherField5[index]) ||
                                (item.anotherField6 && item.anotherField6[index]) ||
                                (item.anotherField7 && item.anotherField7[index]);

                              // Render rows only with data
                              if (hasData) {
                                return (
                                  <tr key={index} className="align-top">
                                    {/* Render first column only if data exists */}
                                    {item.anotherField5 && item.anotherField5[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField5[index]}
                                      </td>
                                    ) : null}

                                    {/* Render second column only if data exists */}
                                    {item.anotherField6 && item.anotherField6[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField6[index]}
                                      </td>
                                    ) : null}

                                    {/* Render third column only if data exists */}
                                    {item.anotherField7 && item.anotherField7[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField7[index]}
                                      </td>
                                    ) : null}
                                  </tr>
                                );
                              }
                              return null; // Skip rows without data
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>



                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading29}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para29}</p>
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading30}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para30}</p>
                  {item.imageUrls13 && item.imageUrls13.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls13.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  {item.list19 && item.list19.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list19.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 mt-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading31}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para31}</p>

                  {item.list38 && item.list38.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className="  text-gray-800 mb-2">
                        {item.list38.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {item.list26 && item.list26.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list26.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {item.imageUrls14 && item.imageUrls14.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls14.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  <div className="grid gap-4">
                    {/* Check if there's any data in the fields */}
                    {item.anotherField8?.some((value) => value) ||
                      item.anotherField9?.some((value) => value) ||
                      item.anotherField10?.some((value) => value) ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 table-fixed">
                          <tbody>
                            {item.anotherField8.map((_, index) => {
                              // Check if the current row has data in at least one field
                              const hasData =
                                (item.anotherField8 && item.anotherField8[index]) ||
                                (item.anotherField9 && item.anotherField9[index]) ||
                                (item.anotherField10 && item.anotherField10[index]);

                              // Render rows only with data
                              if (hasData) {
                                return (
                                  <tr key={index} className="align-top">
                                    {/* Render first column only if data exists */}
                                    {item.anotherField8 && item.anotherField8[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField8[index]}
                                      </td>
                                    ) : null}

                                    {/* Render second column only if data exists */}
                                    {item.anotherField9 && item.anotherField9[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField9[index]}
                                      </td>
                                    ) : null}

                                    {/* Render third column only if data exists */}
                                    {item.anotherField10 && item.anotherField10[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField10[index]}
                                      </td>
                                    ) : null}
                                  </tr>
                                );
                              }
                              return null; // Skip rows without data
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>



                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading32}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para32}</p>

                  {item.list27 && item.list27.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className=" text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list27.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading33}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para33}</p>
                  {item.list39 && item.list39.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className="  text-gray-800 mb-2">
                        {item.list39.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}


                  {item.list20 && item.list20.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list20.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading34}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para34}</p>
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading35}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para35}</p>
                  {item.imageUrls15 && item.imageUrls15.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls15.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <div className="grid gap-4">
                    {/* Check if there's any data in the fields */}
                    {item.anotherField11?.some((value) => value) ||
                      item.anotherField12?.some((value) => value) ||
                      item.anotherField13?.some((value) => value) ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 table-fixed">
                          <tbody>
                            {item.anotherField11.map((_, index) => {
                              // Check if the current row has data in at least one field
                              const hasData =
                                (item.anotherField11 && item.anotherField11[index]) ||
                                (item.anotherField12 && item.anotherField12[index]) ||
                                (item.anotherField13 && item.anotherField13[index]);

                              // Render rows only with data
                              if (hasData) {
                                return (
                                  <tr key={index} className="align-top">
                                    {/* Render first column only if data exists */}
                                    {item.anotherField11 && item.anotherField11[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField11[index]}
                                      </td>
                                    ) : null}

                                    {/* Render second column only if data exists */}
                                    {item.anotherField12 && item.anotherField12[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField12[index]}
                                      </td>
                                    ) : null}

                                    {/* Render third column only if data exists */}
                                    {item.anotherField13 && item.anotherField13[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField13[index]}
                                      </td>
                                    ) : null}
                                  </tr>
                                );
                              }
                              return null; // Skip rows without data
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>


                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading36}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para36}</p>

                  <div className="grid gap-4">
                    {/* Check if there's any data in the fields */}
                    {item.anotherField21?.some((value) => value) ||
                      item.anotherField22?.some((value) => value) ||
                      item.anotherField23?.some((value) => value) ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 table-fixed">
                          <tbody>
                            {item.anotherField21.map((_, index) => {
                              // Check if the current row has data in at least one field
                              const hasData =
                                (item.anotherField21 && item.anotherField21[index]) ||
                                (item.anotherField22 && item.anotherField22[index]) ||
                                (item.anotherField23 && item.anotherField23[index]);

                              // Render rows only with data
                              if (hasData) {
                                return (
                                  <tr key={index} className="align-top">
                                    {/* Render first column only if data exists */}
                                    {item.anotherField21 && item.anotherField21[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField21[index]}
                                      </td>
                                    ) : null}

                                    {/* Render second column only if data exists */}
                                    {item.anotherField22 && item.anotherField22[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField22[index]}
                                      </td>
                                    ) : null}

                                    {/* Render third column only if data exists */}
                                    {item.anotherField23 && item.anotherField23[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField23[index]}
                                      </td>
                                    ) : null}
                                  </tr>
                                );
                              }
                              return null; // Skip rows without data
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>

                  {item.list21 && item.list21.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list21.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {item.imageUrls16 && item.imageUrls16.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls16.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading37}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para37}</p>
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading38}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para38}</p>
                  {item.list22 && item.list22.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list22.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {item.imageUrls17 && item.imageUrls17.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls17.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  {item.list28 && item.list28.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className=" text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list28.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading39}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para39}</p>
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading40}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para40}</p>

                  {item.imageUrls18 && item.imageUrls18.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls18.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  {item.list29 && item.list29.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className=" text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list29.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {item.list23 && item.list23.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list23.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading41}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para41}</p>
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading42}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para42}</p>

                  {item.imageUrls19 && item.imageUrls19.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls19.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  {item.list30 && item.list30.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className=" text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list30.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading43}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para43}</p>

                  {item.list31 && item.list31.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className=" text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list31.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading44}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para44}</p>
                  {item.list32 && item.list32.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className=" text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list32.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading45}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para45}</p>
                  {item.list24 && item.list24.length > 0 && (
                    <div className="p-4 border border-gray-300 rounded-lg">
                      <ol className="list-decimal text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list24.map((listItem, index) => (
                          <li key={index} className="mb-1">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {item.list33 && item.list33.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className=" text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list33.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <div className="grid gap-4">
                    {/* Check if there's any data in the fields */}
                    {item.anotherField14?.some((value) => value) ||
                      item.anotherField15?.some((value) => value) ||
                      item.anotherField16?.some((value) => value) ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 table-fixed">
                          <tbody>
                            {item.anotherField14.map((_, index) => {
                              // Check if the current row has data in at least one field
                              const hasData =
                                (item.anotherField14 && item.anotherField14[index]) ||
                                (item.anotherField15 && item.anotherField15[index]) ||
                                (item.anotherField16 && item.anotherField16[index]);

                              // Render rows only with data
                              if (hasData) {
                                return (
                                  <tr key={index} className="align-top">
                                    {/* Render first column only if data exists */}
                                    {item.anotherField14 && item.anotherField14[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField14[index]}
                                      </td>
                                    ) : null}

                                    {/* Render second column only if data exists */}
                                    {item.anotherField15 && item.anotherField15[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField15[index]}
                                      </td>
                                    ) : null}

                                    {/* Render third column only if data exists */}
                                    {item.anotherField16 && item.anotherField16[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField16[index]}
                                      </td>
                                    ) : null}
                                  </tr>
                                );
                              }
                              return null; // Skip rows without data
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>



                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading46}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para46}</p>
                  {item.list34 && item.list34.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className=" list-disc text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list34.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {item.imageUrls20 && item.imageUrls20.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls20.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          width={1000}
                          height={1000}
                          className="w-full  h-auto  rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading47}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para47}</p>
                  {item.list35 && item.list35.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className=" list-disc text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list35.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading48}
                  </h1>

                  <p className="mb-2 mt-1 text-gray-800">{item.para48}</p>
                  {item.list36 && item.list36.length > 0 && (
                    <div className=" rounded-lg">
                      <ol className=" text-[.9em] pl-10 text-gray-800 mb-2">
                        {item.list36.map((listItem, index) => (
                          <li key={index} className="mb-1 mt-2">
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <h1 className="mb-2 font-semibold text-orange-600 text-[1em]">
                    {item.heading49}
                  </h1>
                  <p className="mb-2 mt-1 text-gray-800">{item.para49}</p>



                  <div>
                    <h1 className="mb-2 font-bold text-black text-[1.3em]">
                      {item.heading50}
                    </h1>
                    <p className="mb-2 mt-1 text-gray-800">{item.para50}</p>
                    <h1 className="mb-2 font-semibold text-black text-[1em]">
                      {item.heading51}
                    </h1>
                    <p className="mb-2 mt-1 text-gray-800">{item.para51}</p>
                    <h1 className="mb-2 font-semibold text-black text-[1em]">
                      {item.heading52}
                    </h1>
                    <p className="mb-2 mt-1 text-gray-800">{item.para52}</p>
                    <h1 className="mb-2 font-semibold text-black text-[1em]">
                      {item.heading53}
                    </h1>
                    <p className="mb-2 mt-1 text-gray-800">{item.para53}</p>
                    <h1 className="mb-2 font-semibold text-black text-[1em]">
                      {item.heading54}
                    </h1>
                    <p className="mb-2 mt-1 text-gray-800">{item.para54}</p>
                    <h1 className="mb-2 font-semibold text-black text-[1em]">
                      {item.heading55}
                    </h1>
                    <p className="mb-2 mt-1 text-gray-800">{item.para55}</p>
                    <p className="mb-2 mt-1 text-gray-800">{item.para56}</p>

                  </div>

                  <div className='flex flex-col  mt-5 border  border-slate-800  rounded-lg p-1'>
                  <h1 className=' font-bold text-[1em]'>{item.heading6}</h1>

                  {item.list3 && item.list3.length > 0 && (
                    <ol className="  flex flex-wrap gap-2 w-full text-[.8em] p-4 text-orange-600  mb-2">
                      {item.list3.map((listItem, index) => (
                        <li key={index} className="mb-1 w-[48%] bg-gray-200 rounded-lg font-semibold hover:bg-orange-600 hover:text-white hover:font-bold transition-all ease-in-out duration-150">
                          <Link href={`/Mathematicstopic/${encodeURIComponent(listItem.toLowerCase().replace(/\s+/g, '-'))}`} className="block w-full h-full p-4">
                            {listItem}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
                

                </div>
              ))
            ) : (
              <PageNotFound />
            )}
          </div>
          <div className="flex flex-col gap-5 w-full md:w-[35%] font-Poppins">
            <div className="w-full bg-white p-8 ">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Type To Search"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="placeholder:text-gray-500 p-3 w-full  rounded-md border border-gray-400"
              />
            </div>
            <div className="bg-white p-6 flex flex-col gap-3">
              <h2 className="font-semibold text-[1.1em]">CBSE Sample Papers</h2>
              <ul className="list-disc flex flex-col gap-2 text-[.9em] text-orange-500 px-4">
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-8-Maths">
                  <li>CBSE Sample Papers Class 8 Maths</li>
                </Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-9-Maths">
                  <li>CBSE Sample Papers Class 9 Maths</li>
                </Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Class-10-Maths-Sample-Paper-Basic-and-Standard">
                  <li>CBSE Sample Papers Class 10 Maths</li>
                </Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-11-Maths">
                  <li>CBSE Sample Papers Class 11 Maths</li>
                </Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Class-12-Maths-Sample-Papers">
                  <li>CBSE Sample Papers Class 12 Maths</li>
                </Link>
              </ul>
            </div>
            

            
            <div className="bg-white p-6 flex flex-col gap-3">
              <h2 className="font-semibold text-[1.1em]">
                ICSE Previous Year Question Papers
              </h2>
              <ul className="list-disc flex flex-col text-[.9em] gap-2 text-orange-500 px-4">
                <Link href="/ICSE-Previousyear-Questions/ICSE-Class-10-Maths-Previous-Year-Paper">
                  <li>ICSE Previous Year Question Papers Class 10</li>
                </Link>
                <Link href="/ICSE-Previousyear-Questions/ISC-Class-12-Maths-Previous-Year-Question-Papers">
                  <li>ISC Previous Year Question Papers Class 12</li>
                </Link>
              </ul>
            </div>

            
            <div className=" bg-white p-5  rounded-lg">
              <FormSection />
            </div>
          </div>
        </div>
        <Footer1 />
        <Footer />
      </div>
    </>
  );
};

export default DataTable;
