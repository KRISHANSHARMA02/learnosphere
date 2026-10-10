"use client";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import AOS from "aos";

import "aos/dist/aos.css";

import Brandapp from "@/components/Brandapp";

import Link from "next/link";

import { FiPlus, FiMinus } from "react-icons/fi";

import Script from "next/script";

import { cityContentMap } from "@/app/api/homeTuition/route";

import TeacherSection from "@/components/TeacherSection";

import SearchBar from "@/components/SearchBar";
import { trackEvent, EVENT_NAMES } from '../src/lib/eventTracker';

const courses = [
  {
    title: "Class 12 PCM Mastery",

    desc: "Master Physics, Chemistry & Math with AI-driven adaptive learning.",

    color: "bg-gradient-to-br from-yellow-100 to-yellow-200",

    link: "/Courses",
  },

  {
    title: "Class 9 All-in-One",

    desc: "Cover all subjects with interactive sessions and flexible scheduling.",

    color: "bg-green-50",

    link: "/Courses",
  },

  {
    title: "Class 10 Complete",

    desc: "Gamified lessons, micro-learning, and AI integrated tutoring.",

    color: "bg-gradient-to-br from-orange-100 to-orange-200",

    link: "/Courses",
  },
];

export default function HomeTuitionContent({
  cityData,
  headline,
  teachers = [],
  slug,
}) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [selectedSubject, setSelectedSubject] = useState(null);

  const cityKey = cityData?.city?.toLowerCase();

  const cityContent = cityContentMap[cityKey];

  const faqs = [
    {
      question: " How does Learnosphere match the right tutor with a student?",

      answer:
        "Learnosphere uses a smart matching system that considers the student's grade, subject, learning style, and tutor expertise to ensure the perfect fit.",
    },

    {
      question: "What subjects and exams do Learnosphere tutors cover?",

      answer:
        "Our tutors cover all school subjects (Math, Science, English, Hindi, Social Science, Accounts, Economics, Computer Science, etc.) and competitive exams like IIT-JEE, NEET, Olympiads, CUET, NDA, and CA Foundation.",
    },

    {
      question: "Can parents track their child's progress?",

      answer:
        "Absolutely! Learnosphere provides regular assessments and progress updates so parents can monitor improvement.",
    },

    {
      question: "How much does Learnosphere home tuition cost?",

      answer:
        " Learnosphere offers affordable and flexible plans, ensuring quality education at budget-friendly prices.",
    },

    {
      question: "Can tutors earn well with Learnosphere?",

      answer:
        "Yes! Tutors enjoy flexible opportunities, good earning potential, and recognition as part of India's trusted education platform.",
    },

    {
      question:
        "Do you provide tuition for all boards like CBSE, ICSE, and State Boards?",

      answer:
        "Yes, we provide expert tutors for CBSE, ICSE, and all major State Boards across India.",
    },
  ];

  const FeatureCard = ({ title, desc }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-100 p-6 shadow-lg rounded-xl border"
      data-aos="fade-up"
    >
      <h3 className="text-xl font-semibold mb-2 text-orange-700">{title}</h3>

      <p>{desc}</p>
    </motion.div>
  );

  const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${question}`}
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
          <p
            id={`faq-answer-${question}`}
            className="mt-2 px-4 py-3 text-gray-900 bg-gray-100 rounded-lg font-Poppins shadow-md"
          >
            {answer}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white text-gray-900">
      <section className="relative text-center pt-16 pb-10 md:pt-20 md:pb-12 bg-gradient-to-br from-orange-100 via-orange-50 to-white rounded-b-[3rem] overflow-visible">
        <div className="absolute inset-0 bg-orange-200/20"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-gray-900 leading-normal md:leading-snug break-words whitespace-normal px-2"
          >
            {headline}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-4 md:mt-6"
          >
            <div className="w-full max-w-2xl">
              <SearchBar
                onCategorySelect={(subject) => {
                  if (slug) {
                    const subjectSlug = subject
                      .toLowerCase()
                      .replace(/\s+/g, "-");

                    window.location.href = `/home-tuition/${slug}/lessons/${subjectSlug}`;
                  } else {
                    setSelectedSubject(subject);
                  }
                }}
                variant="full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <TeacherSection
        limit={6}
        city={cityData.city}
        subject={selectedSubject}
        teachers={teachers}
        loading={false}
        slug={slug}
        redirectToSubject={true}
      />

      <section className="py-10 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Why Choose Learn<b className="text-orange-600">O</b>sphere
        </h2>

        <p className="text-gray-700 text-center leading-relaxed">
          At Learn<b className="text-orange-600">O</b>sphere, we provide the
          most reliable home tuition in {cityData.city} with expert tutors for
          every subject and grade level. From CBSE, ICSE, State Boards to NEET,
          JEE, Olympiads & CUET — we ensure strong foundations and better
          results.
        </p>
      </section>

      {cityContent?.paragraph && (
        <section className="py-8 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Home Tuition in {cityData.city}
          </h2>

          <p className="text-lg text-gray-800 leading-relaxed text-center">
            {cityContent.paragraph}
          </p>
        </section>
      )}

      <section className="py-14 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Our Featured Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className={`p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all ${course.color}`}
            >
              <h3 className="text-2xl font-bold mb-4">{course.title}</h3>

              <p className="text-gray-700 leading-relaxed">{course.desc}</p>

              <Link
                href={course.link}
                onClick={() => trackEvent(EVENT_NAMES.EXPLORE_COURSE_CLICK, { course_title: course.title, course_link: course.link })}
                className="mt-6 inline-block px-6 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition"
              >
                Explore Course
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}

      <section className="py-12 px-6 max-w-6xl mx-auto text-center">
        <h3 className="text-xl md:text-2xl font-bold mb-4">
          Right Tutor for Every Student
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Education today is about personalized growth. Learnosphere connects
          students with trusted tutors across {cityData.city} for academics and
          competitive exams.
        </p>
      </section>

      <Brandapp />

      {/* FAQ */}

      <section className="max-w-5xl mx-auto mt-16 px-4">
        <h2 className="mb-10 text-3xl font-semibold text-center text-gray-800">
          Frequently Asked Questions
        </h2>

        {faqs.map(({ question, answer }) => (
          <FaqItem key={question} question={question} answer={answer} />
        ))}
      </section>

      {/* FAQ Schema */}

      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
    </div>
  );
}
