"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { getResourceRoute } from "@/src/utils/resourceRouteHelper";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import DynamicFAQSection from "@/components/DynamicFAQSection";
import React, { useEffect, useState, use } from "react";
import Banner2 from "@/public/Banner2.jpeg";
import Link from "next/link";
import Banner1 from "@/public/Banner1.jpeg";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import WhatsappModal from "@/components/whatsappModal";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";
import { useSession } from "next-auth/react";

const DataTable = ({ data, slug: propSlug, initialLoggedIn = false }) => {
  const params = useParams();
  const currentSlug = propSlug || params?.slug;
  const { data: session, status } = useSession();

  const isLoggedIn =
    Boolean(initialLoggedIn) ||
    status === "authenticated" ||
    Boolean(session?.user);

  const [activePdfUrl, setActivePdfUrl] = useState(data?.[0]?.pdfUrl || null);

  useEffect(() => {
    if (data?.[0]?.pdfUrl) {
      setActivePdfUrl(data[0].pdfUrl);
    }
  }, [data]);

  // const params = use(props.params);
  // const { slug } = params;
  //  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [Class, setClass] = useState(null);
  const [dataId, setDataId] = useState(null); // New state for ID
  const [searchQuery, setSearchQuery] = useState("");

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton((prev) => !prev);
    }, 10000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
  }, []);

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
  //   useEffect(() => {
  //     // Check if we are in the browser before accessing window
  //     if (typeof window !== "undefined") {
  //       const searchParams = new URLSearchParams(window.location.search);
  //       setClass(searchParams.get("Class"));
  //       setDataId(searchParams.get("id")); // Get ID from URL
  //     }
  //   }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         setLoading(true);
  //         setError("");

  //         const response = await axios.get(
  //           `${WEB_BACKEND_URL}/api/route/cbsepreviouspaperspdf/${slug}`
  //         );
  //         console.log("API Response:", response.data);

  //         if (response.data && response.data.data) {
  //           setData(response.data.data);
  //         } else {
  //           setData([]); // No data found
  //         }
  //       } catch (err) {
  //         console.error("Error fetching data:", err);
  //         setError(err.response?.data?.message || "Error fetching data.");
  //         setData([]);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     if (slug) fetchData();
  //   }, [slug]);

  //   if (loading) {
  //     return <div className="text-gray-600">Loading...</div>;
  //   }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 font-Poppins">
        <div className="px-4 lg:px-28 flex flex-col md:flex-row gap-6 bg-gray-100 container mx-auto pt-24">
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
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <div key={item.id} className="mb-4">
                  {index === 0 ? (
                    <h1 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold">
                      {item.heading1 || item.title || currentSlug?.replace(/-/g, ' ')}
                    </h1>
                  ) : (
                    <h2 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold">
                      {item.heading1 || item.title || currentSlug?.replace(/-/g, ' ')}
                    </h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para1}</p>
                  {item.heading2 && (
                    <h2 className="mb-2 2 mt-4 font-bold">{item.heading2}</h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para2}</p>
                  {item.list1 && item.list1.length > 0 && (
                    <ol className="list-disc text-orange-600 pl-5 mb-2">
                      {item.list1.map((listItem, index) => (
                        <li key={listItem} className="mb-1">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}
                  {item.heading3 && (
                    <h2 className="mb-2 p-4 text-white 2 mt-4 bg-orange-600 font-bold">
                      {item.heading3}
                    </h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para3}</p>

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

                  {item.heading4 && (
                    <h2 className="mb-2  2 mt-4 font-bold">{item.heading4}</h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para4}</p>
                  {/* Display PDF with access control */}
                  {isLoggedIn && (activePdfUrl || item.pdfUrl) ? (
                    <div className="mt-4">
                      <iframe
                        src={`${activePdfUrl || item.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        width="100%"
                        height="500px"
                        style={{
                          border: "none",
                          overflow: "hidden",
                        }}
                        title="PDF Viewer"
                      >
                        This browser does not support PDFs. Please download the
                        PDF to view it:
                        <a href={activePdfUrl || item.pdfUrl}>Download PDF</a>
                      </iframe>
                      <div className="mt-4 flex justify-center">
                        <a
                          href={activePdfUrl || item.pdfUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                          Download PDF
                        </a>
                      </div>
                    </div>
                  ) : (
                    /* 🚫 Logged-out user sees blurred preview + login overlay */
                    <div className="mt-4">
                      <div className="relative w-full h-[500px] border border-gray-300 rounded-xl overflow-hidden shadow-md bg-white">
                        {/* Blurred preview document representation */}
                        <div className="w-full h-full flex flex-col justify-start p-8 bg-gray-50 blur-[3px] opacity-40 select-none pointer-events-none space-y-4">
                          <div className="h-7 bg-gray-500 rounded w-3/4 mx-auto mb-6"></div>
                          <div className="h-4 bg-gray-400 rounded w-full"></div>
                          <div className="h-4 bg-gray-400 rounded w-11/12"></div>
                          <div className="h-4 bg-gray-400 rounded w-full"></div>
                          <div className="h-4 bg-gray-400 rounded w-4/5"></div>
                          <div className="h-10 bg-gray-300 rounded w-full my-4"></div>
                          <div className="h-4 bg-gray-400 rounded w-full"></div>
                          <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-400 rounded w-full"></div>
                          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-400 rounded w-full"></div>
                          <div className="h-4 bg-gray-400 rounded w-2/3"></div>
                        </div>

                        {/* Login Prompt Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/75 backdrop-blur-sm p-6 z-10 text-center">
                          <div className="bg-white/95 p-8 rounded-2xl shadow-xl max-w-md mx-auto border border-gray-100 flex flex-col items-center">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl mb-3 shadow-inner">
                              🔒
                            </div>
                            <p className="text-xl font-bold mb-2 text-gray-900">
                              Please log in to view the full PDF
                            </p>
                            <p className="mb-6 text-gray-600 font-medium text-sm leading-relaxed">
                              You're seeing a limited preview. Log in to access the complete document with solutions.
                            </p>
                            <Link
                              href="/Student"
                              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-2.5 rounded-full shadow-md transition-all duration-200 hover:scale-105"
                            >
                              Log In
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Locked Download Button */}
                      <div className="mt-4 flex justify-center">
                        <button
                          onClick={() => router.push("/Student")}
                          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
                        >
                          <span>🔒</span> Download PDF (Login Required)
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="mb-2 mt-6">{item.para13}</p>

                  {item.heading5 && (
                    <h2 className="mb-2 2 mt-4 font-bold">{item.heading5}</h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para5}</p>

                  {(item.tableData && item.tableData.length > 0) ||
                  (item.anotherField && item.anotherField.length > 0) ? (
                    <div className="rounded-xl bg-orange-100 grid border border-slate-800 mt-4">
                      {item.heading7 ? ( // Check if item.heading8 has a value
                        <h2 className="p-4 font-bold text-center border-black border-b text-[1.2em]">
                          {item.heading7}
                        </h2>
                      ) : null}

                      <p>{item.para7}</p>
                      <table className="rounded-xl min-w-full text-orange-600 text-[.9em] font-semibold bg-white">
                        <tbody className="rounded-xl">
                          <tr>
                            {/* Render the first column for tableData */}
                            {item.tableData && item.tableData.length > 0 ? (
                              <td>
                                {item.tableData.map((dataItem, index) => (
                                  <div
                                    key={dataItem.id || index}
                                    className={`py-2 px-4 hover:bg-gray-100 ${
                                      index === item.tableData.length - 1
                                        ? ""
                                        : "border-b border-black"
                                    }`}
                                  >
                                    {typeof dataItem === "string" ? (
                                      dataItem
                                    ) : dataItem.slug ? (
                                      <Link
                                        href={`/CBSE-Previousyear-Question-Papers-/${dataItem.slug}`}
                                        className="w-full block hover:underline"
                                      >
                                        {dataItem.title || dataItem.slug}
                                      </Link>
                                    ) : dataItem.pdfUrl ? (
                                      <a
                                        href={dataItem.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full block hover:underline"
                                      >
                                        {dataItem.title || "Download PDF"}
                                      </a>
                                    ) : (
                                      <span>{dataItem.title || ""}</span>
                                    )}
                                  </div>
                                ))}
                              </td>
                            ) : null}{" "}
                            {/* No placeholder text when there's no data */}
                            {/* Render the second column for anotherField */}
                            {item.anotherField &&
                            item.anotherField.length > 0 ? (
                              <td>
                                {item.anotherField.map((dataItem, index) => (
                                  <div
                                    key={dataItem.id || index}
                                    className={`py-2 px-4 hover:bg-gray-100 ${
                                      index === item.anotherField.length - 1
                                        ? ""
                                        : "border-b"
                                    }`}
                                  >
                                    {typeof dataItem === "string" ? (
                                      dataItem
                                    ) : dataItem.pdfUrl ? (
                                      <a
                                        href={dataItem.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full block hover:underline"
                                      >
                                        {dataItem.title || "Access Solutions"}
                                      </a>
                                    ) : dataItem.slug ? (
                                      <Link
                                        href={`/CBSE-Previousyear-Question-Papers-/${dataItem.slug}`}
                                        className="w-full block hover:underline"
                                      >
                                        {dataItem.title || "Access Solutions"}
                                      </Link>
                                    ) : (
                                      <span>{dataItem.title || ""}</span>
                                    )}
                                  </div>
                                ))}
                              </td>
                            ) : null}{" "}
                            {/* No placeholder text when there's no data */}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {item.heading8 && (
                    <h2 className="mb-2 p-4 text-white 2 mt-4 bg-orange-600 font-bold">
                      {item.heading8}
                    </h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para8}</p>

                  {item.heading9 && (
                    <h2 className="mb-2  2 mt-4  font-bold">{item.heading9}</h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para9}</p>

                  {item.list4 && item.list4.length > 0 && (
                    <ol className="list-disc text-orange-600 pl-5 mb-2">
                      {item.list4.map((listItem, index) => (
                        <li key={listItem} className="mb-1">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}

                  {item.heading10 && (
                    <h2 className="mb-2  2 mt-4 font-bold">{item.heading10}</h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para10}</p>
                  {item.heading11 && (
                    <h2 className="mb-2  2 ">{item.heading11}</h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para11}</p>
                  {item.heading12 && (
                    <h2 className="mb-2  2 ">{item.heading12}</h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para12}</p>
                  {item.heading13 && (
                    <h2 className="mb-2  2 ">{item.heading13}</h2>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para13}</p>

                  {(item.heading6 || item.para6 || (item.list3 && item.list3.length > 0)) && (
                    <div className="flex flex-col text-[.8em] mt-5 border border-slate-800  rounded-lg p-1">
                      {item.heading6 && (
                        <h2 className=" font-semibold">{item.heading6}</h2>
                      )}
                      {item.para6 && <p className=" ">{item.para6}</p>}
                    {item.list3 && item.list3.length > 0 && (
                      <ol className="flex flex-wrap gap-2 w-full p-4 text-orange-600 mb-2">
                        {item.list3.map((listItem, index) => (
                          <li
                            key={
                              index
                            } /* Yahan index kar diya taaki React error na de */
                            className="mb-1 w-[48%] bg-gray-200 rounded-lg font-semibold hover:bg-orange-600 hover:text-white hover:font-bold transition-all ease-in-out duration-150 overflow-hidden"
                          >
                            {/* Yahan se dabbe ka pura area clickable banega */}
                            <Link
                              href={getResourceRoute(typeof listItem === 'string' ? listItem : listItem?.value || listItem)}
                              className="block w-full h-full p-4"
                            >
                              {typeof listItem === 'string' ? listItem : listItem?.value || listItem}
                            </Link>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                  )}
                </div>
              ))
            ) : (
              <p>
                No data found for Class {Class} with ID {dataId}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-5w-full lg: w-[35%]">
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

            <div className="">
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
