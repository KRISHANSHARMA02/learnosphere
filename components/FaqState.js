"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import Head from "next/head";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What do you mean by the state Board?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A State Board is a government-run educational authority in an Indian state that designs the curriculum, conducts school exams (like SSC and HSC), and regulates school education within that state.",
      },
    },
    {
      "@type": "Question",
      name: "What are state education boards?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "State education boards are official academic bodies established by individual Indian states to manage school-level education. They set the syllabus, conduct exams like Class 10 (SSC) and Class 12 (HSC), and issue certificates to students within their respective states.",
      },
    },
    {
      "@type": "Question",
      name: "Is the state board harder than ICSE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, the State Board is usually easier than ICSE. ICSE has a more detailed syllabus and tougher exams, especially in English and science. State Boards have simpler and more region-focused content.",
      },
    },
    {
      "@type": "Question",
      name: "Can I crack NEET or JEE from a State Board?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, many students from State Boards clear NEET and JEE with the right preparation, especially by studying NCERT books.",
      },
    },
    {
      "@type": "Question",
      name: "Which is better: CBSE or State Board?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CBSE is better for national-level exams like NEET or JEE, while State Boards are good for regional exams and local language learning.",
      },
    },
    {
      "@type": "Question",
      name: "Do State Boards follow NCERT books?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some do (like UP and Rajasthan), but many use their own textbooks. It's good to check your state's official site or school.",
      },
    },
  ],
};

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[.8em] md:text-lg font-semibold font-Poppins">
          {question}
        </span>
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

const FaqState = () => {
  return (
    <>
      <Head>
        <title>FAQs - Learnosphere</title>
        <meta
          name="description"
          content="Get answers to common questions about Learnosphere's tutoring, home tuition, and more."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </Head>

      <div className="max-w-5xl mx-auto mt-14 px-4 md:px-0">
        <h2 className="mb-8 text-[1.2em] md:text-3xl font-semibold font-Poppins text-center text-gray-800">
          Frequently Asked Questions
        </h2>
        <div>
          {faqSchema.mainEntity.map((item, index) => (
            <FaqItem
              key={index}
              question={item.name}
              answer={item.acceptedAnswer.text}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FaqState;
