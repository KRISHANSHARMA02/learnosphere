import React from "react";
import StateBoardSlug from "@/components/StateBoardSlug";

/* ✅ Metadata */
export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ MUST await

  const baseUrl = "https://learnosphere.in";
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
}

/* ✅ Page */
export default async function StateBordslug({ params }) {
  const { slug } = await params; // ✅ MUST await

  return <StateBoardSlug slug={slug} />;
}
