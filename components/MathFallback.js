"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/public/Banner.jpeg";
import { getMathFallbackContent } from "./mathContentData";

export default function MathFallback({ slug }) {
  const title = slug
    ? decodeURIComponent(slug)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Mathematics Topic";

  const content = getMathFallbackContent(title);

  return (
    <div className="mb-4">
      <h1 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold rounded-t-lg">
        {title}
      </h1>
      <Link href="https://sarvgyat.learnosphere.in/">
        <Image className="mt-3 w-full rounded-md" src={Banner} alt="Learnosphere Banner" />
      </Link>
      <div className="p-6 bg-white mt-4 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-slate-800">About {title}</h2>
        {content ? (
          <>
            <p className="text-gray-700 leading-relaxed text-[1em]">
              {content}
            </p>
            <p className="mt-6 text-orange-600 font-semibold text-[.9em]">
              Detailed formulas and step-by-step solutions are updated here regularly by our experts.
            </p>
          </>
        ) : (
          <p className="text-gray-700 leading-relaxed text-[1em]">
            Detailed concepts, formulas, and step-by-step solutions for{" "}
            <strong>{title}</strong> will be updated here shortly. Please check back later or explore other related topics from the list below.
          </p>
        )}
      </div>
    </div>
  );
}
