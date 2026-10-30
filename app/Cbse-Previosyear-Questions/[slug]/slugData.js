"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import Banner2 from "@/public/Banner2.jpeg";
import Link from "next/link";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import WhatsappModal from "@/components/whatsappModal";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";
import DynamicFAQSection from "@/components/DynamicFAQSection";
import { useSession } from "next-auth/react";

import axios from "axios";
import { getResourceRoute } from "@/src/utils/resourceRouteHelper";
const DataTable = ({ data: serverData, slug: propSlug }) => {
  // const params = use(props.params);
  // const { slug } = params;
  const [Class, setClass] = useState(null);

  const params = useParams();
  const slug = params?.slug;
  const currentSlug = propSlug || slug;
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
  // useEffect(() => {
  //     // Check if we are in the browser before accessing window
  //     if (typeof window !== "undefined") {
  //         const searchParams = new URLSearchParams(window.location.search);
  //         setClass(searchParams.get("Class"));
  //     }
  // }, []);

  // const [data, setData] = useState(serverData || []);

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(serverData || []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [activePdfId, setActivePdfId] = useState(null);
  const [pdfUrls, setPdfUrls] = useState({});
  const { data: session } = useSession();

  const handleLinkClick = async (e, generatedSlug, dataItemId, directPdfUrl) => {
    e.preventDefault();

    if (activePdfId === dataItemId) {
      setActivePdfId(null);
      return;
    }

    setActivePdfId(dataItemId);

    if (directPdfUrl) {
      setPdfUrls((prev) => ({ ...prev, [dataItemId]: directPdfUrl }));
      return;
    }

    if (!pdfUrls[dataItemId]) {
      try {
        const response = await axios.get(
          `${WEB_BACKEND_URL}/api/route/cbsepreviouspaperspdf/${generatedSlug}`,
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          const url = response.data.data[0].pdfUrl;
          if (url) {
            setPdfUrls((prev) => ({ ...prev, [dataItemId]: url }));
          } else {
            alert("PDF URL not found for this paper.");
            setActivePdfId(null);
          }
        } else {
          alert("Data not found for this paper.");
          setActivePdfId(null);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load PDF.");
        setActivePdfId(null);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton((prev) => !prev);
    }, 10000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
  }, []);

  useEffect(() => {
    // If server already provided data, do not overwrite or refetch
    if (serverData && serverData.length > 0) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const baseUrl = process.env.NEXT_PUBLIC_WEB_BACKEND_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "https://learnospherebackend.learnosphere.in" : "https://learnospherebackend.learnosphere.in");
        const response = await axios.get(
          `${WEB_BACKEND_URL}/api/route/CbsePreviousyearQuestions/${slug}`,
        );

        if (response.data && response.data.data) {
          setData(response.data.data);
        } else {
          setData([]);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug, serverData]);

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 font-Poppins">
        <div className="px-4 md:px-28 flex flex-col lg:flex-row gap-6 bg-gray-100 container mx-auto pt-24">
          <div className="flex flex-col gap-5 w-full lg:w-[65%]">
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
              data.map((item, index) => (
                <div key={item.id} className="mb-4">
                  {index === 0 ? (
                    <h1 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold rounded-lg">
                      {item.heading1 || item.title || currentSlug?.replace(/-/g, ' ')}
                    </h1>
                  ) : (
                    <h2 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold rounded-lg">
                      {item.heading1 || item.title || currentSlug?.replace(/-/g, ' ')}
                    </h2>
                  )}

                  <p className="mb-2 mt-4 text-gray-800">{item.para1}</p>

                  {item.heading2 && (
                    <h2 className="mb-2 text-slate-800 text-[1.2em]">
                      {item.heading2}
                    </h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para2}</p>

                  <Image src={Banner2} alt="" />
                  {item.list1 && item.list1.length > 0 && (
                    <ol className="list-disc text-orange-600 pl-5 mb-2">
                      {item.list1.map((listItem, index) => (
                        <li key={index} className="mb-1">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}
                  <div>
                    {item.heading3 ? ( // Check if item.heading24 has a value
                      <h2 className=" text-[1.2em]">{item.heading3}</h2>
                    ) : null}
                    <p className="mb-2 mt-4 text-gray-800">{item.para3}</p>

                    {(item.heading4 ||
                      (item.tableData && item.tableData.length > 0) ||
                      (item.anotherField && item.anotherField.length > 0)) && (
                      <div className="grid border border-slate-800 mt-4">
                        {item.heading4 && (
                          <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.2em]">
                            {item.heading4}
                          </h2>
                        )}
                        {item.para4 && <p className="">{item.para4}</p>}

                        {(item.tableData && item.tableData.length > 0) ||
                        (item.anotherField && item.anotherField.length > 0) ? (
                          <table className="min-w-full bg-white">
                            <tbody>
                              <tr>
                                {item.tableData && item.tableData.length > 0 ? (
                                  <td className="border border-slate-800">
                                    {item.tableData.map((dataItem, index) => {
                                      const generatedSlug =
                                        dataItem.slug ||
                                        encodeURIComponent(
                                          dataItem.title
                                            .toLowerCase()
                                            .replace(/\b\w/g, (char) =>
                                              char.toUpperCase(),
                                            )
                                            .replace(/\s+/g, "-"),
                                        );
                                      return (
                                        <div
                                          key={dataItem.id}
                                          className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${
                                            index === item.tableData.length - 1
                                              ? ""
                                              : "border-b border-slate-800"
                                          }`}
                                        >
                                          {dataItem.title ? (
                                            <a
                                              className="w-full block text-center cursor-pointer text-black font-semibold"
                                              onClick={(e) =>
                                                handleLinkClick(
                                                  e,
                                                  generatedSlug,
                                                  dataItem.id,
                                                  dataItem.pdfUrl,
                                                )
                                              }
                                            >
                                              {dataItem.title}
                                            </a>
                                          ) : (
                                            <span>No title available</span>
                                          )}

                                          {activePdfId === dataItem.id &&
                                            pdfUrls[dataItem.id] && (
                                              <div className="mt-4 mb-2 w-full bg-white border border-gray-200 rounded-xl overflow-hidden relative shadow-lg">
                                                <div className="relative bg-gray-50 p-2">
                                                  <iframe
                                                    src={`${pdfUrls[dataItem.id]}#toolbar=0`}
                                                    className="w-full h-[600px] rounded-xl"
                                                    title="PDF Viewer"
                                                    style={
                                                      !session
                                                        ? {
                                                            filter: "blur(5px)",
                                                            opacity: 0.7,
                                                            pointerEvents:
                                                              "none",
                                                            userSelect: "none",
                                                          }
                                                        : {}
                                                    }
                                                  ></iframe>

                                                  {!session && (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-10">
                                                      <div className="bg-white/95 p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center max-w-md mx-auto border border-gray-100">
                                                        <p className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-900">
                                                          <span>🔒</span> Please
                                                          log in to view the
                                                          full PDF
                                                        </p>
                                                        <p className="mb-6 text-gray-600 font-medium">
                                                          You're seeing a
                                                          limited preview. Log
                                                          in to access the
                                                          complete document.
                                                        </p>
                                                        <Link
                                                          href="/Signin"
                                                          className="bg-[#ea580c] text-white px-8 py-2.5 rounded-full font-bold hover:bg-[#c2410c] transition-colors shadow-md"
                                                        >
                                                          Log In
                                                        </Link>
                                                      </div>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            )}
                                        </div>
                                      );
                                    })}
                                  </td>
                                ) : (
                                  <td className="border border-slate-800">
                                    <div className="py-2 px-4 text-gray-500">
                                      No data found
                                    </div>
                                  </td>
                                )}

                                {item.anotherField &&
                                  item.anotherField.length > 0 && (
                                    <td className="border border-slate-800">
                                      {item.anotherField.map(
                                        (dataItem, index) => {
                                          const linkedTableItem =
                                            item.tableData[index];
                                          const generatedSlug =
                                            linkedTableItem?.slug ||
                                            encodeURIComponent(
                                              (linkedTableItem?.title || "")
                                                .toLowerCase()
                                                .replace(/\b\w/g, (char) =>
                                                  char.toUpperCase(),
                                                )
                                                .replace(/\s+/g, "-"),
                                            );
                                          return (
                                            <div
                                              key={dataItem.id}
                                              className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${
                                                index ===
                                                item.anotherField.length - 1
                                                  ? ""
                                                  : "border-b"
                                              }`}
                                            >
                                              {dataItem.title ? (
                                                <a
                                                  className="w-full block text-center cursor-pointer text-black font-semibold"
                                                  onClick={(e) =>
                                                    handleLinkClick(
                                                      e,
                                                      generatedSlug,
                                                      dataItem.id,
                                                      dataItem.pdfUrl,
                                                    )
                                                  }
                                                >
                                                  {dataItem.title}
                                                </a>
                                              ) : (
                                                <span>No title available</span>
                                              )}

                                              {activePdfId === dataItem.id &&
                                                pdfUrls[dataItem.id] && (
                                                  <div className="mt-4 mb-2 w-full bg-white border border-gray-200 rounded-xl overflow-hidden relative shadow-lg">
                                                    <div className="relative bg-gray-50 p-2">
                                                      <iframe
                                                        src={`${pdfUrls[dataItem.id]}#toolbar=0`}
                                                        className="w-full h-[600px] rounded-xl"
                                                        title="PDF Viewer"
                                                        style={
                                                          !session
                                                            ? {
                                                                filter:
                                                                  "blur(5px)",
                                                                opacity: 0.7,
                                                                pointerEvents:
                                                                  "none",
                                                                userSelect:
                                                                  "none",
                                                              }
                                                            : {}
                                                        }
                                                      ></iframe>

                                                      {!session && (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-10">
                                                          <div className="bg-white/95 p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center max-w-md mx-auto border border-gray-100">
                                                            <p className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-900">
                                                              <span>🔒</span>{" "}
                                                              Please log in to
                                                              view the full PDF
                                                            </p>
                                                            <p className="mb-6 text-gray-600 font-medium">
                                                              You're seeing a
                                                              limited preview.
                                                              Log in to access
                                                              the complete
                                                              document.
                                                            </p>
                                                            <Link
                                                              href="/Signin"
                                                              className="bg-[#ea580c] text-white px-8 py-2.5 rounded-full font-bold hover:bg-[#c2410c] transition-colors shadow-md"
                                                            >
                                                              Log In
                                                            </Link>
                                                          </div>
                                                        </div>
                                                      )}
                                                    </div>
                                                  </div>
                                                )}
                                            </div>
                                          );
                                        },
                                      )}
                                    </td>
                                  )}
                              </tr>
                            </tbody>
                          </table>
                        ) : null}
                      </div>
                    )}
                  </div>
                  {item.heading5 && (
                    <h2 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                      {item.heading5}
                    </h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para5}</p>
                  {item.list2 && item.list2.length > 0 && (
                    <ol className="list-disc text-orange-600 pl-5 mb-2">
                      {item.list2.map((listItem, index) => (
                        <li key={index} className="mb-1">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}
                  {item.heading6 && (
                    <h2 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                      {item.heading6}
                    </h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para6}</p>
                  {item.heading7 && (
                    <h2 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                      {item.heading7}
                    </h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para7}</p>
                  {item.heading8 && (
                    <h2 className="mb-2 text-orange-600 mt-3 text-[1.2em]">
                      {item.heading8}
                    </h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para8}</p>
                  {item.heading9 && (
                    <h2 className="mb-2 text-orange-600 mt-3 text-[1.2em]">
                      {item.heading9}
                    </h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para9}</p>
                  {item.heading10 && (
                    <h2 className="mb-2 text-orange-600 mt-3 text-[1.2em]">
                      {item.heading10}
                    </h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para10}</p>

                  {item.anotherField1 && item.anotherField1.length > 0 && (
                    <div className="border mt-3 mb-5 border-slate-800">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <table className="min-w-full bg-white border border-gray-300">
                          <tbody className="text-center">
                            <tr>
                              <td className="border border-slate-800">
                                {item.anotherField1.map((dataItem, index) => (
                                  <div
                                    key={dataItem.id} // Ensure a unique key for each item
                                    className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${
                                      index === item.anotherField1.length - 1
                                        ? ""
                                        : "border-b"
                                    }`}
                                  >
                                    {dataItem && dataItem.title ? (
                                      <a
                                        className="w-full block text-center cursor-pointer text-black font-semibold hover:underline"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          if (activePdfId === dataItem.id) {
                                            setActivePdfId(null);
                                            return;
                                          }
                                          if (dataItem.pdfUrl) {
                                            setPdfUrls((prev) => ({
                                              ...prev,
                                              [dataItem.id]: dataItem.pdfUrl,
                                            }));
                                            setActivePdfId(dataItem.id);
                                          } else {
                                            alert("No PDF URL available");
                                          }
                                        }}
                                      >
                                        {dataItem.title}
                                      </a>
                                    ) : (
                                      <span>No title available</span>
                                    )}

                                    {activePdfId === dataItem.id &&
                                      pdfUrls[dataItem.id] && (
                                        <div className="mt-4 mb-2 w-full bg-white border border-gray-200 rounded-xl overflow-hidden relative shadow-lg">
                                          <div className="relative bg-gray-50 p-2">
                                            {session ? (
                                              <iframe
                                                src={`${pdfUrls[dataItem.id]}#toolbar=0`}
                                                className="w-full h-[600px] rounded-xl"
                                                title="PDF Viewer"
                                              />
                                            ) : (
                                              <div className="relative w-full h-[600px] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                                                <div className="w-full h-full flex flex-col justify-start p-8 blur-[3px] opacity-40 select-none pointer-events-none space-y-4 absolute inset-0">
                                                  <div className="h-7 bg-gray-500 rounded w-3/4 mx-auto mb-6"></div>
                                                  <div className="h-4 bg-gray-400 rounded w-full"></div>
                                                  <div className="h-4 bg-gray-400 rounded w-11/12"></div>
                                                  <div className="h-4 bg-gray-400 rounded w-full"></div>
                                                  <div className="h-4 bg-gray-400 rounded w-4/5"></div>
                                                  <div className="h-10 bg-gray-300 rounded w-full my-4"></div>
                                                  <div className="h-4 bg-gray-400 rounded w-full"></div>
                                                  <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                                                  <div className="h-4 bg-gray-400 rounded w-full"></div>
                                                </div>
                                                <div className="relative bg-white/95 p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center max-w-md mx-auto border border-gray-100 z-10">
                                                  <p className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-900">
                                                    <span>🔒</span> Please log in to view the full PDF
                                                  </p>
                                                  <p className="mb-6 text-gray-600 font-medium">
                                                    You're seeing a limited preview. Log in to access the complete document.
                                                  </p>
                                                  <Link
                                                    href="/Signin"
                                                    className="bg-[#ea580c] text-white px-8 py-2.5 rounded-full font-bold hover:bg-[#c2410c] transition-colors shadow-md"
                                                  >
                                                    Log In
                                                  </Link>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                ))}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <p className="mb-2 mt-4 text-gray-800">{item.para11}</p>
                  {(item.heading13 || item.para13 || (item.list3 && item.list3.length > 0)) && (
                    <div className="flex flex-col text-[.8em] mt-5 border border-slate-800  rounded-lg p-1">
                      {item.heading13 && (
                        <h2 className=" font-semibold">{item.heading13}</h2>
                      )}
                      {item.para13 && <p className=" ">{item.para13}</p>}
                    {item.list3 && item.list3.length > 0 && (
                      <ol className="  flex flex-wrap gap-2 w-full p-4 text-orange-600  mb-2">
                        {item.list3.map((listItem, index) => (
                          <li
                            key={index}
                            className="mb-1 w-[48%] bg-gray-200 rounded-lg font-semibold hover:bg-orange-600 hover:text-white hover:font-bold transition-all ease-in-out duration-150 overflow-hidden"
                          >
                            <Link
                              href={getResourceRoute(listItem)}
                              className="block w-full h-full p-4"
                            >
                              {listItem}
                            </Link>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                  )}

                  {item.imageUrls && item.imageUrls.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {item.imageUrls.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No data found for Class {Class}</p>
            )}
          </div>
          <div className="flex flex-col gap-5 w-full lg:w-[35%]">
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

            <div className=" ">
              <FormSection />
            </div>
          </div>
        </div>
        <DynamicFAQSection slug={currentSlug} />
        <Footer1 />
        <Footer />
      </div>
    </>
  );
};

export default DataTable;
