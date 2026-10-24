export const dynamic = "force-dynamic"; // 👈 add this at the top
export const revalidate = 60; // ✅ re-fetch from WordPress every 60s

import React, { Suspense } from "react";
import CoursesCard from "./coursesCards";
import { getAllCourses } from "@/src/lib/actions/courses";
import Script from "next/script";


export default async function Page() {
  const courses = await getAllCourses();

  // 🔹 Build ItemList dynamically from backend
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CBSE Online Courses for Class 1 to 12",
    description:
      "Browse personalized one-to-one CBSE online courses for Class 1 to 12 including PCM, PCB, Commerce, Maths, Science, and Social Science by Learnosphere.",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: 16,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Online Course for Class 12 PCM – Physics, Chemistry & Maths",
        url: "https://learnosphere.in/Courses/class-12-pcm-6874f1d6a4298b45d8043a62",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Class 12 Online Course PCB – Physics, Chemistry & Biology",
        url: "https://learnosphere.in/Courses/class-12-pcb-68775159fbc9eb6a9b937530",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Class 12 Commerce Online Course – Accounts, Business Studies & Economics",
        url: "https://learnosphere.in/Courses/class-12-commerce-68775d2ffbc9eb6a9b9377e1",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Class 11 PCM Online Course – JEE & CBSE Foundation",
        url: "https://learnosphere.in/Courses/class-11-pcm-687760f4fbc9eb6a9b937914",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Class 11 PCB Online Course – NEET & Board Preparation",
        url: "https://learnosphere.in/Courses/class-11-pcb-6877645efbc9eb6a9b93838c",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Class 11 Commerce Online Course – Business Studies, Accounts & Economics",
        url: "https://learnosphere.in/Courses/class-11-business-studies-accountancy-economics-6889d8cdc7f80001f3aa5654",
      },
      {
        "@type": "ListItem",
        position: 7,
        name: "Class 10 Online Course – Maths, Science & Social Science",
        url: "https://learnosphere.in/Courses/class-10-maths,science,social-science-68778960fbc9eb6a9b938bfc",
      },
      {
        "@type": "ListItem",
        position: 8,
        name: "Class 9 Online Course – Maths, Science & Social Science",
        url: "https://learnosphere.in/Courses/class-9-maths,science,social-science-68789610798291bd763ec46a",
      },
      {
        "@type": "ListItem",
        position: 9,
        name: "Class 8 Online Course – Complete CBSE Syllabus",
        url: "https://learnosphere.in/Courses/children/class-8-maths,science,social-science-6878b4e982ff71d850fc4219",
      },
      {
        "@type": "ListItem",
        position: 10,
        name: "Class 7 Online Course – Maths, Science & SST",
        url: "https://learnosphere.in/Courses/children/class-7-maths,science,social-science-6878b5f182ff71d850fc426d",
      },
      {
        "@type": "ListItem",
        position: 11,
        name: "Class 6 Online Course – Maths, Science & SST",
        url: "https://learnosphere.in/Courses/children/class-6-maths,science,social-science-6878d67782ff71d850fc5fab",
      },
      {
        "@type": "ListItem",
        position: 12,
        name: "Online Course for Class 5 – Fun & Concept-Based Learning",
        url: "https://learnosphere.in/Courses/children/class-5-maths,science,social-science-69142ff45330999b692f19ed",
      },
      {
        "@type": "ListItem",
        position: 13,
        name: "Online Course for Class 4 – Interactive Learning Program",
        url: "https://learnosphere.in/Courses/children/class-4-maths,science,social-science-69142a445330999b692f179b",
      },
      {
        "@type": "ListItem",
        position: 14,
        name: "Online Course for Class 3 – Confidence & Skill Building",
        url: "https://learnosphere.in/Courses/children/class-3-maths,science,social-science-691428175330999b692f16a8",
      },
      {
        "@type": "ListItem",
        position: 15,
        name: "CBSE Class 2 Online Course – Maths & EVS",
        url: "https://learnosphere.in/Courses/children/2-maths-&-evs-691324e2a372f57de3564220",
      },
      {
        "@type": "ListItem",
        position: 16,
        name: "Online Course for Class 1 – English & Hindi",
        url: "https://learnosphere.in/Courses/children/class-1-english,-hindi-691424da5330999b692f15be",
      },
    ],
  };

  return (
    <>
      {/* ✅ JSON-LD Schema in HEAD */}
      <Script
        id="courses-itemlist-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />

      {/* UI */}
      <Suspense fallback={<div className="p-10 text-center"></div>}>
        <CoursesCard courses={courses} />
      </Suspense>
    </>
  );
}


export const metadata = {
  title: "Online Learning Courses for Students",
  description: "Discover learning courses for students to strengthen subject knowledge, develop skills and support academic growth.",
};