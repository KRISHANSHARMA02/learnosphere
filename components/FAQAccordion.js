"use client";

import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg focus:outline-none text-left transition-all duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-[.9em] md:text-lg font-semibold font-Poppins text-gray-800">
          {question}
        </span>
        <span className="ml-3 flex-shrink-0 text-orange-600">
          {isOpen ? (
            <FiMinus className="text-xl md:text-2xl" />
          ) : (
            <FiPlus className="text-xl md:text-2xl" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg font-Poppins text-[.85em] md:text-base leading-relaxed border-l-4 border-orange-500 shadow-sm">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function FAQAccordion({
  faqs = [],
  title = "Frequently Asked Questions (FAQs)",
}) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-12 px-4 md:px-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <h2 className="mb-8 text-2xl md:text-3xl font-bold font-Poppins text-center text-gray-800">
        {title}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}
