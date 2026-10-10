"use client";
import Navbar from "@/components/Navbar";

import Image from "next/image";
import React, { useState } from "react";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";

import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";
import { useRouter } from "next/navigation";
import FloatingMenu from "@/components/StickySyllabusButton";
import InfiniteSlider from "@/components/AutomaticSlide";


export default function TopicClient({ initialData  }) {
  const [data] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const router = useRouter();




  if (loading) return <div className="flex justify-center items-center h-[calc(100vh-200px)]">
    <div className="flex items-center justify-center space-x-2 text-3xl">Learn </div>
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
    <div className="flex items-center justify-center space-x-2 text-3xl">sphere  </div>
  </div>;


  return (
    <>
      <Navbar />
      <FloatingMenu />
      <InfiniteSlider />
      
      <div className="bg-gray-100 font-Poppins pt-2">
        <div className=" max-w-7xl mx-auto px-4 sm:px-10 lg:px-6  flex flex-col md:text-[1.08em] lg:flex-row gap-6">
          {/* LEFT MAIN CONTENT */}
          <div className="w-full lg:w-[70%] flex flex-col gap-5">
<div className="mx-auto bg-orange-500 rounded-xl w-full text-white py-5 px-4 shadow-md  text-center">
        {data.h1 && <h1 className="text-3xl font-bold">{data.h1}</h1>}
      </div>
            <div className="px-3 md:px-8 bg-white py-10 rounded-xl ">
              {data.p1 && <p className="">{data.p1}</p>}
              {data.h2 && <h2 className="text-2xl font-semibold py-4 ">{data.h2}</h2>}
              {data.p2 && <p className="py-2 text-gray-800">{data.p2}</p>}

              {/* SECTION 3 */}
              {data.h3 && <h2 className="text-2xl font-semibold py-4 ">{data.h3}</h2>}
              {data.p3 && <p className="py-2 text-gray-800">{data.p3}</p>}

              {/* SECTION 4 */}
              {data.h4 && <h2 className="text-2xl font-semibold py-4 ">{data.h4}</h2>}
              {data.p4 && <p className="py-2 text-gray-800">{data.p4}</p>}
              {/* LIST 4 */}
              {Array.isArray(data?.list4) && data.list4.length > 0 && (
                <ol className="list-decimal text-orange-700 ml-6 space-y-2">
                  {data.list4.map((item, index) => (
                    <li key={item.id || index}>
                      {item?.name || item?.title || item?.text || item}
                    </li>
                  ))}
                </ol>
              )}

              {/* SECTION 5 */}
              {data.h5 && <h2 className="text-2xl font-semibold py-4 ">{data.h5}</h2>}
              {data.p5 && <p className="py-2 text-gray-800">{data.p5}</p>}

              {/* SECTION 6 */}
              {data.h6 && <h2 className="text-2xl font-semibold py-4 ">{data.h6}</h2>}
              {data.p6 && <p className="py-2 text-gray-800">{data.p6}</p>}

              {/* SECTION 7 */}
              {data.h7 && <h2 className="text-2xl font-semibold py-4 ">{data.h7}</h2>}
              {data.p7 && <p className="py-2 text-gray-800">{data.p7}</p>}
              <div className="w-full">
                {Array.isArray(data?.list7) && data.list7.length > 0 && (
                  <ol className="list-decimal  text-orange-700 ml-6 space-y-2">
                    {data.list7.map((item, index) => (
                      <li key={item.id || index}>
                        {item?.name || item?.title || item?.text || item}
                      </li>
                    ))}
                  </ol>
                )} 
              </div>

              {/* SECTION 8 */}
              {data.h8 && <h2 className="text-2xl font-semibold py-4  ">{data.h8}</h2>}
              {data.p8 && <p className="py-2 text-gray-800">{data.p8}</p>}

              {/* SECTION 9 */}
              {data.h9 && <h2 className="text-2xl font-semibold py-4">{data.h9}</h2>}
              {data.p9 && <p className="py-2 text-gray-800">{data.p9}</p>}

              {/* SECTION 10 */}
              {data.h10 && <h2 className="text-2xl font-semibold py-4 ">{data.h10}</h2>}
              {data.p10 && <p className="py-2 text-gray-800">{data.p10}</p>}
              {/* LIST 10 */}
              {Array.isArray(data?.list10) && data.list10.length > 0 && (
                <ol className="list-decimal  text-orange-700 ml-6 space-y-2">
                  {data.list10.map((item, index) => (
                    <li key={item.id || index}>
                      {item?.name || item?.title || item?.text || item}
                    </li>
                  ))}
                </ol>
              )}

              {/* CONTINUE THIS PATTERN UNTIL h25 / p25 */}

              {data.h11 && <h2 className="text-2xl font-semibold py-4 ">{data.h11}</h2>}
              {data.p11 && <p className="py-2 text-gray-800">{data.p11}</p>}

              {data.h12 && <h2 className="text-2xl font-semibold py-4 ">{data.h12}</h2>}
              {data.p12 && <p className="py-2 text-gray-800">{data.p12}</p>}

              {data.h13 && <h2 className="text-2xl font-semibold py-4 ">{data.h13}</h2>}
              {data.p13 && <p className="py-2 text-gray-800">{data.p13}</p>}
              {/* DYNAMIC MULTI-COLUMN TABLE FOR anotherField(1–5) */}
              {(() => {
                const fields = [
                  data?.anotherField1,
                  data?.anotherField2,
                  data?.anotherField3,
                  data?.anotherField4,
                  data?.anotherField5
                ].filter((f) => Array.isArray(f) && f.length > 0);

                if (fields.length === 0) return null;

                return (
                  <div
                    className={`grid gap-4 mt-6`}
                    style={{ gridTemplateColumns: `repeat(${fields.length}, 1fr)` }}
                  >
                    {fields.map((list, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
                      >
                        <ol className="list-decimal ml-4 space-y-2">
                          {list.map((item, idx) => (
                            <li key={idx}>
                              {item?.name || item?.title || item?.text || item}
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                );
              })()}
              {data.h14 && <h2 className="text-2xl font-semibold py-4 ">{data.h14}</h2>}
              {data.p14 && <p className="py-2 text-gray-800">{data.p14}</p>}

              {data.h15 && <h2 className="text-2xl font-semibold py-4 ">{data.h15}</h2>}
              {data.p15 && <p className="py-2 text-gray-800">{data.p15}</p>}
              {/* LIST 15 */}
              {Array.isArray(data?.list15) && data.list15.length > 0 && (
                <ol className="list-decimal text-gray-900 ml-6 space-y-2">
                  {data.list15.map((item, index) => (
                    <li key={item.id || index}>
                      {item?.name || item?.title || item?.text || item}
                    </li>
                  ))}
                </ol>
              )}
              {data.h16 && <h2 className="text-2xl font-semibold py-4 ">{data.h16}</h2>}
              {data.p16 && <p className="py-2 text-gray-800">{data.p16}</p>}

              {data.h17 && <h2 className="text-2xl font-semibold py-4 ">{data.h17}</h2>}
              {data.p17 && <p className="py-2 text-gray-800">{data.p17}</p>}
              {/* LIST 17 */}
              {Array.isArray(data?.list17) && data.list17.length > 0 && (
                <ol className="list-decimal  text-orange-700 ml-6 space-y-2">
                  {data.list17.map((item, index) => (
                    <li key={item.id || index}>
                      {item?.name || item?.title || item?.text || item}
                    </li>
                  ))}
                </ol>
              )}
              {data.h18 && <h2 className="text-2xl font-semibold py-4 ">{data.h18}</h2>}
              {data.p18 && <p className="py-2 text-gray-800">{data.p18}</p>}

              {data.h19 && <h2 className="text-2xl font-semibold py-4 ">{data.h19}</h2>}
              {data.p19 && <p className="py-2 text-gray-800">{data.p19}</p>}

              {data.h20 && <h2 className="text-2xl font-semibold py-4 ">{data.h20}</h2>}
              {data.p20 && <p className="py-2 text-gray-800">{data.p20}</p>}

              {data.h21 && <h2 className="text-2xl font-semibold py-4 ">{data.h21}</h2>}
              {data.p21 && <p className="py-2 text-gray-800">{data.p21}</p>}

              {data.h22 && <h2 className="text-2xl font-semibold py-4 ">{data.h22}</h2>}
              {data.p22 && <p className="py-2 text-gray-800">{data.p22}</p>}

              {data.h23 && <h2 className="text-2xl font-semibold py-4 ">{data.h23}</h2>}
              {data.p23 && <p className="py-2 text-gray-800">{data.p23}</p>}

              {data.h24 && <h2 className="text-2xl font-semibold py-4 ">{data.h24}</h2>}
              {data.p24 && <p className="py-2 text-gray-800">{data.p24}</p>}

              {data.h25 && <h2 className="text-2xl font-semibold py-4 ">{data.h25}</h2>}
              {data.p25 && <p className="py-2 text-gray-800">{data.p25}</p>}
            </div>
            {/* ANY EXTRA IMAGES */}
            {data.imageUrls && (
              <div className="flex gap-4 mt-4 flex-wrap">
                {data.imageUrls.map((src, i) => (
                  <Image key={i} src={src} width={150} height={150} alt="" className="rounded-lg" />
                ))}
              </div>
            )}
          </div>
          {/* RIGHT SIDE FORM PLACEHOLDER */}
          <div className="w-full lg:w-[30%]">
            <div className="flex justify-center mb-10">
              <div
                onClick={() => router.push("/live-one-to-one")} // <-- your route here
                className="group cursor-pointer relative w-full max-w-sm bg-white border border-orange-300 
               rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 
               hover:-translate-y-1 hover:border-orange-500"
              >

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 
                    opacity-10 blur-xl rounded-2xl group-hover:opacity-20 transition-all duration-500">
                </div>

                <div className="relative">
                  {/* Badge */}
                  <span className="inline-block bg-orange-600 text-white text-xs font-bold 
                       px-3 py-1 rounded-full mb-3 shadow-md animate-pulse">
                    NEW UPDATE
                  </span>

                  {/* Icon */}
                  <div className="text-5xl mb-4">🎥</div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    One-on-One Live Online Sessions
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700">
                    Experience personalised 1:1 learning with India’s top tutors —
                    live, interactive, and tailored just for you.
                  </p>

                  {/* CTA Button */}
                  <button
                    className="mt-6 w-full bg-orange-600 text-white py-3 rounded-full font-semibold 
                   shadow-md hover:bg-orange-700 hover:shadow-lg transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            <div className=" border border-orange-500 rounded-lg ">
              <FormSection />
            </div>
          </div>

        </div>

        <Footer1 />
        <Footer />
      </div>
    </>
  );
}