import React from "react";
import Certification from "@/components/OnlineQuizSlg";
import { notFound } from "next/navigation";

const validQuizSlugs = new Set([
  "Certification-Quiz-For-Class-1",
  "Certification-Quiz-For-Class-2",
  "Certification-Quiz-For-Class-3",
  "Certification-Quiz-For-Class-4",
  "Certification-Quiz-For-Class-5",
  "Certification-Quiz-For-Class-6",
  "Certification-Quiz-For-Class-7",
  "Certification-Quiz-For-Class-8",
  "Certification-Quiz-For-Class-9",
  "Certification-Quiz-For-Class-10",
  "Certification-Quiz-For-Class-11",
  "Certification-Quiz-For-Class-12",
]);

function getMatchedSlug(slug) {
  if (!slug) return null;
  const target = slug.toLowerCase();
  for (const s of validQuizSlugs) {
    if (s.toLowerCase() === target) return s;
  }
  return null;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const matchedSlug = getMatchedSlug(slug);

    if (!matchedSlug) {
        return {
            title: "Page Not Found | Learnosphere",
        };
    }

    const baseUrl = "https://learnosphere.in";
    const canonicalUrl = `${baseUrl}/Online-Quiz/${matchedSlug}`;
    const res = await fetch(`${baseUrl}/api/onlineQuiz/${matchedSlug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return {
            title: "Online Quiz | Learnosphere",
            alternates: {
                canonical: canonicalUrl,
            },
        };
    }

    const data = await res.json();
    const grade = data.grade || "Certification Quiz";
    const apiDescription = data.d1 || `Test your knowledge with our Class ${grade} online certification quiz on Learnosphere.`;

    return {
        title: `Online Quiz - Certification Quiz For Class-${grade} | Learnosphere  `,
        description: apiDescription,
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default async function OnlineQuizSlg({ params }) {
    const { slug } = await params;
    const matchedSlug = getMatchedSlug(slug);

    if (!matchedSlug) {
        notFound();
    }

    return <Certification slug={matchedSlug} />;
}
