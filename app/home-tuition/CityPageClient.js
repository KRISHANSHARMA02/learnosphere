// app/home-tuition/CityPageClient.js
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import Script from "next/script";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "How do I find the best home tutor in my City?",
    answer:
      "Simply search your area on Learnosphere and choose from verified tutors.",
  },
  {
    question: "What subjects are available for home tuition?",
    answer:
      "Maths, Science, English, Accounts, Economics, Computers, and more.",
  },
  {
    question: "Can I get demo classes?",
    answer: "Yes! Learnosphere offers a demo class.",
  },
];

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-6">
      <button
        className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold font-Poppins">{question}</span>
        <span>
          {isOpen ? (
            <FiMinus className="text-gray-600 text-2xl" />
          ) : (
            <FiPlus className="text-gray-600 text-2xl" />
          )}
        </span>
      </button>
      {isOpen && (
        <p className="mt-2 px-4 py-3 text-gray-900 bg-gray-100 rounded-lg font-Poppins shadow-md">
          {answer}
        </p>
      )}
    </div>
  );
};

export default function CityPageClient({ initialLocations }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Grouping logic (Client-side search ke liye)
  const groupedLocations = initialLocations.reduce((acc, loc) => {
    if (!acc[loc.state]) acc[loc.state] = [];
    acc[loc.state].push(loc.city);
    return acc;
  }, {});

  const filteredGrouped = Object.entries(groupedLocations).reduce(
    (acc, [state, cities]) => {
      const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      if (filteredCities.length > 0) acc[state] = filteredCities;
      return acc;
    },
    {},
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black">
            Explore Home Tuition in Your City
          </h1>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search for a city..."
              className="px-4 py-2 border border-orange-300 rounded-full w-full max-w-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {Object.keys(filteredGrouped).map((state) => (
              <div
                key={state}
                className="rounded-3xl p-6 border-l-[5px] border-orange-500 shadow-lg bg-white relative overflow-hidden group"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  🏙️ {state}
                </h2>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                  {filteredGrouped[state].map((city, index) => (
                    <Link
                      key={index}
                      href={`/home-tuition/home-tuition-in-${encodeURIComponent(city)}`}
                      className="text-sm bg-orange-200 hover:bg-orange-600 hover:text-white px-3 py-1 rounded-full transition"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mt-20 px-4">
          <h2 className="mb-10 text-3xl font-semibold text-center text-gray-800 font-Poppins">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </section>
      </main>

      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />

      <Footer1 />
      <Footer />
    </>
  );
}
