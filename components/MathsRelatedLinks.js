"use client";
import Link from "next/link";
import React from "react";

export default function MathsRelatedLinks({
  title = "Maths Related Links",
  links = [
    { title: "Square Root of 7", href: "/Mathematicstopic/square-root-of-7" },
    { title: "HCF of Two Numbers", href: "/Mathematicstopic/hcf-of-two-numbers" },
  ],
}) {
  return (
    <div className="w-full bg-white border border-slate-800 rounded-xl p-5 md:p-6 my-6 font-Poppins">
      <h2 className="font-bold text-[1.2em] md:text-[1.4rem] text-black mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((item, index) => {
          const itemTitle = typeof item === "string" ? item : item.title;
          const href =
            typeof item === "string"
              ? `/Mathematicstopic/${encodeURIComponent(
                  item.toLowerCase().replace(/\s+/g, "-")
                )}`
              : item.href;
          return (
            <Link
              key={index}
              href={href}
              className="bg-gray-200 p-4 rounded-lg text-orange-600 font-semibold hover:bg-orange-600 hover:text-white transition-all duration-150 ease-in-out block text-left"
            >
              {itemTitle}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
