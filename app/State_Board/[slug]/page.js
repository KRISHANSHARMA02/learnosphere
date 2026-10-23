import React from "react";
import StateBoardSlug from "@/components/StateBoardSlug";

const titleMap = {
  "APBSE": "AP State Board Syllabus & Subjects",
  "BSEB": "Bihar Board Syllabus & Subjects",
  "BSE_Odi": "BSE Odisha Syllabus for All Classes",
  "BSE_Telangana": "Telangana Board Class-Wise Syllabus",
  "CGBSE": "CGBSE Education Board Syllabus Guide",
  "DSEAP": "AP School Education Syllabus Guide",
  "GBSHSE": "Goa State Board Syllabus by Class",
  "HPBOSE": "HPBOSE Syllabus for All Classes",
  "JAC": "JAC Syllabus for School Students",
  "KSEEB": "Karnataka State Board Curriculum Guide",
  "MANIPUR": "Manipur School Syllabus & Study Guide",
  "MBOSE": "Meghalaya State Board Study Guide",
  "MPBSE": "MP Board Syllabus for All Classes",
  "PSEB": "Punjab Board Syllabus & Subjects",
  "SEBA": "Assam School Curriculum Guide",
  "TBSE": "Tripura Education Board Syllabus Guide",
  "UBSE": "UBSE Curriculum, Subjects & Learning Topics",
};

const descriptionMap = {
  "APBSE": "Discover AP State Board subjects, syllabus details and key chapters to support classroom learning and exam preparation.",
  "BSEB": "Find Bihar Board syllabus details, class-wise subjects and important chapters to help students plan their studies.",
  "BSE_Odi": "Explore the Odisha Board syllabus, class-wise subjects and important topics to support students with their school studies.",
  "BSE_Telangana": "Check the Telangana State Board curriculum, subject details and essential topics for effective learning and revision.",
  "CGBSE": "Explore Chhattisgarh Board syllabus details and subject information to support daily learning, revision and exam preparation.",
  "DSEAP": "Discover Andhra Pradesh school syllabus details and subject information to help students understand their coursework and plan revision.",
  "GBSHSE": "Browse class-wise Goa Board syllabus information, subject details and learning topics for school students.",
  "HPBOSE": "Explore the Himachal Pradesh Board syllabus, subjects and key topics to support school learning and exam preparation.",
  "JAC": "Find Jharkhand Academic Council syllabus details, subject information and key learning topics for different classes.",
  "KSEEB": "Discover the Karnataka school curriculum, subject-wise topics and syllabus information for students across different classes.",
  "MANIPUR": "Check Manipur school syllabus details, subjects and essential topics to build understanding and prepare for examinations.",
  "MBOSE": "Browse Meghalaya Board syllabus information and subject-wise topics to strengthen concepts and support exam preparation.",
  "MPBSE": "Explore the MPBSE syllabus, class-wise subjects and important topics to help students understand the curriculum and prepare for exams.",
  "PSEB": "Find PSEB curriculum details, subject-wise topics and key chapters to help students plan their studies.",
  "SEBA": "Discover Assam Board curriculum information, school subjects and learning topics for students across different classes.",
  "TBSE": "Explore academic syllabus details for Tripura schools and discover subject-wise learning topics for different classes.",
  "UBSE": "Understand the UBSE curriculum with subject details and key topics that help students organise their school studies.",
};

/* ✅ Metadata */
export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ MUST await

  if (titleMap[slug]) {
    return {
      title: titleMap[slug],
      description: descriptionMap[slug] || "",
    };
  }

  const baseUrl = "https://learnosphere.in";
  try {
    const res = await fetch(`${baseUrl}/api/boards/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { title: "Learnosphere | State Board" };
    }

    const data = await res.json();
    const heading = data.heading || "State Board";

    return {
      title: `Learnosphere | ${heading} Study Materials, Model Papers & Exam Updates`,
    };
  } catch (e) {
    return { title: "Learnosphere | State Board" };
  }
}

/* ✅ Page */
export default async function StateBordslug({ params }) {
  const { slug } = await params; // ✅ MUST await

  return <StateBoardSlug slug={slug} />;
}
