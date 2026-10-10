"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Head from "next/head";




const Chaptertest2 = () => {
  return (
    <div>
    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
      <div className="mx-2 md:mx-16 p-2 md:p-10 rounded-lg flex flex-col border border-gray-300 gap-4">
        <p className="text-[.9em] md:text-[1.4em] font-bold">
          Pick a subject to start your test session
        </p>
        <div className="flex  flex-col w-full  gap-2 md:gap-8">
          <Link
            className="transition-all ease-in-out duration-150 hover:scale-110"
            href={`/Userdashboard/chaptertest/samplepapers?samplepapers=Sample%20Question%20Papers&year=2024-2025`}
          >
            <span>
              <p className="bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold text-center p-2 rounded-bl-2xl rounded-br-2xl text-[0.8em] md:text-[1em]">
                Sample Question Paper Year 2024-25
              </p>
            </span>
          </Link>
          <Link
            className="transition-all ease-in-out duration-150 hover:scale-110"
            href={`/Userdashboard/chaptertest/samplepapers?samplepapers=Sample%20Question%20Papers&year=2023-2024`}
          >
            <span>
              <p className="bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold text-center p-2 rounded-bl-2xl rounded-br-2xl text-[0.8em] md:text-[1em]">
                Sample Question Paper Year 2023-24
              </p>
            </span>
          </Link>
          <Link
            className="transition-all ease-in-out duration-150 hover:scale-110"
            href={`/Userdashboard/chaptertest/samplepapers?samplepapers=Sample%20Question%20Papers&year=2022-2023`}
          >
            <span>
              <p className="bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold text-center p-2 rounded-bl-2xl rounded-br-2xl text-[0.8em] md:text-[1em]">
                Sample Question Paper Year 2022-23
              </p>
            </span>
          </Link>
          <Link
            className="transition-all ease-in-out duration-150 hover:scale-110"
            href={`/Userdashboard/chaptertest/samplepapers?samplepapers=Sample%20Question%20Papers&year=2021-2022`}
          >
            <span>
              <p className="bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold text-center p-2 rounded-bl-2xl rounded-br-2xl text-[0.8em] md:text-[1em]">
                Sample Question Paper Year 2021-22
              </p>
            </span>
          </Link>
          <Link
            className="transition-all ease-in-out duration-150 hover:scale-110"
            href={`/Userdashboard/chaptertest/samplepapers?samplepapers=Sample%20Question%20Papers&year=2020-2021`}
          >
            <span>
              <p className="bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold text-center p-2 rounded-bl-2xl rounded-br-2xl text-[0.8em] md:text-[1em]">
                Sample Question Paper Year 2020-21
              </p>
            </span>
          </Link>
          <Link
            className="transition-all ease-in-out duration-150 hover:scale-110"
            href={`/Userdashboard/chaptertest/samplepapers?samplepapers=Sample%20Question%20Papers&year=2019-2020`}
          >
            <span>
              <p className="bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold text-center p-2 rounded-bl-2xl rounded-br-2xl text-[0.8em] md:text-[1em]">
                Sample Question Paper Year 2019-20
              </p>
            </span>
          </Link>
          <Link
            className="transition-all ease-in-out duration-150 hover:scale-110"
            href={`/Userdashboard/chaptertest/samplepapers?samplepapers=Sample%20Question%20Papers&year=2018-2019`}
          >
            <span>
              <p className="bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold text-center p-2 rounded-bl-2xl rounded-br-2xl text-[0.8em] md:text-[1em]">
                Sample Question Paper Year 2018-19
              </p>
            </span>
          </Link>
          <Link
            className="transition-all ease-in-out duration-150 hover:scale-110"
            href={`/Userdashboard/chaptertest/samplepapers?samplepapers=Sample%20Question%20Papers&year=2017-2018`}
          >
            <span>
              <p className="bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold text-center p-2 rounded-bl-2xl rounded-br-2xl text-[0.8em] md:text-[1em]">
                Sample Question Paper Year 2017-18
              </p>
            </span>
          </Link>
          <Link
            className="transition-all ease-in-out duration-150 hover:scale-110"
            href={`/Userdashboard/chaptertest/samplepapers?samplepapers=Sample%20Question%20Papers&year=2016-2017`}
          >
            <span>
              <p className="bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold text-center p-2 rounded-bl-2xl rounded-br-2xl text-[0.8em] md:text-[1em]">
                Sample Question Paper Year 2016-17
              </p>
            </span>
          </Link>
          <Link
            className="transition-all ease-in-out duration-150 hover:scale-110"
            href={`/Userdashboard/chaptertest/samplepapers?samplepapers=Sample%20Question%20Papers&year=2015-2016`}
          >
            <span>
              <p className="bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold text-center p-2 rounded-bl-2xl rounded-br-2xl text-[0.8em] md:text-[1em]">
                Sample Question Paper Year 2015-16
              </p>
            </span>
          </Link>
        </div>
      </div>
  
    </div>
  );
};

export default Chaptertest2;
