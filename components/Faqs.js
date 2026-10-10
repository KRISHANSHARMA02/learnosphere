"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import Head from "next/head";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Learnosphere connect educators and learners for tutoring?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learnosphere provides a user-friendly platform where educators can create profiles showcasing their qualifications and availability. Learners can browse profiles and easily book sessions with private tutors near them, ensuring a personalized learning experience."
      }
    },
    {
      "@type": "Question",
      "name": "Can students choose their preferred educators for home tuition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! Learnosphere allows students to select private tutors based on their qualifications, experience, and availability. Whether you're looking for home tuition near you or online tutoring, our platform offers flexible options to meet your academic needs."
      }
    },
    {
      "@type": "Question",
      "name": "What types of tuition classes are available on Learnosphere?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learnosphere offers a wide range of subjects and exam preparation classes. From academic subjects like math and science to competitive exams like UPSC, NEET, IIT, and CBSE, you can find the best tuition classes near you tailored to your learning goals."
      }
    },
    {
      "@type": "Question",
      "name": "How can educators join Learnosphere and offer tutoring services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Educators can easily join Learnosphere by signing up on our platform and completing the verification process. Once approved, they can offer private tutoring services to students, allowing learners to find qualified tutors near them."
      }
    },
    {
      "@type": "Question",
      "name": "What should I do if I encounter technical issues or need help finding home tutors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you face any technical issues or need assistance finding home tuition or private tutors near you, Learnosphere offers dedicated customer support. You can reach us via email, live chat, or phone for prompt assistance."
      }
    },
    {
      "@type": "Question",
      "name": "Is Learnosphere safe for children?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every tutor is verified, and demo classes are supervised upon request. We prioritize safety and academic quality."
      }
    },
    {
      "@type": "Question",
      "name": "What boards do you support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CBSE, ICSE, and all State Boards."
      }
    },
    {
      "@type": "Question",
      "name": "Can I choose between online and home tuition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You can switch or mix at any time based on your schedule and location."
      }
    },
    
    {
      "@type": "Question",
      "name": "How do I track my child’s performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You’ll receive weekly progress reports, along with session-by-session feedback from the tutor."
      }
    }
  ]
};

export const FaqItem = ({ question, answer }) => {
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

const Faqs = () => {
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
            __html: JSON.stringify(faqSchema)
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

export default Faqs;
