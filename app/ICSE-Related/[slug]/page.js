
import { notFound } from "next/navigation";
import axios from "axios";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import RelatedPageClient from "./RelatedPageClient";

const GENUINE_ICSE_SLUGS = new Set([
  "class-8-icse-maths-worksheets",
  "isc-physics-previous-question-papers",
  "icse-2017-question-paper",
  "concise-physics-class-10-icse-pdf",
  "icse-sample-papers",
  "concise-mathematics-class-9-icse-guide-pdf",
  "icse-class-10-physics-syllabus",
  "icse-class-10-maths-selina-solutions",
  "icse-solved-question-papers-last-ten-years",
  "icse-vs-cbse",
  "icse-new-syllabus",
]);

function normalizeSlug(slug) {
  if (typeof slug !== "string") return null;

  const cleanSlug = slug.trim().toLowerCase();

  if (
    !cleanSlug ||
    cleanSlug.length > 150 ||
    !/^[a-z0-9-]+$/.test(cleanSlug) ||
    !GENUINE_ICSE_SLUGS.has(cleanSlug)
  ) {
    return null;
  }

  return cleanSlug;
}

async function getIcseRelatedData(slug) {
  const cleanSlug = normalizeSlug(slug);

  if (!cleanSlug) return null;

  const backendUrls = [
    WEB_BACKEND_URL,
    process.env.WEB_BACKEND_URL,
    "https://learnospherebackend.learnosphere.in",
    "https://learnospherebackend.learnosphere.in",
  ].filter(Boolean);

  const uniqueBackendUrls = [
    ...new Set(backendUrls.map((url) => url.replace(/\/+$/, ""))),
  ];

  for (const baseUrl of uniqueBackendUrls) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/route/icse-related/${encodeURIComponent(cleanSlug)}`,
        { timeout: 8000 }
      );

      const data = response.data?.data;

      if (
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        data.title
      ) {
        return data;
      }
    } catch {
      // Try the next configured backend URL.
    }
  }

  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cleanSlug = normalizeSlug(slug);

  if (!cleanSlug) {
    return {
      title: "Page Not Found | Learnosphere",
      robots: { index: false, follow: false },
    };
  }

  const data = await getIcseRelatedData(cleanSlug);

  if (!data) {
    return {
      title: "Page Not Found | Learnosphere",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${data.title} | Learnosphere`,
    description:
      data.introPoints?.[0] ||
      `Comprehensive ICSE study resources and syllabus for ${data.title}.`,
  };
}

export default async function ICSERelatedPage({ params }) {
  const { slug } = await params;
  const cleanSlug = normalizeSlug(slug);

  if (!cleanSlug) {
    notFound();
  }

  const data = await getIcseRelatedData(cleanSlug);

  if (!data) {
    notFound();
  }

  return <RelatedPageClient initialData={data} slug={cleanSlug} />;
}
