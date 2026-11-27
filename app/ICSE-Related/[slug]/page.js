import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
const icseRelatedTitles = {
  "ICSE-Biology": "ICSE Biology Study Resources and Chapter Help | Learnosphere",
  "ICSE-Mathematics-Class-10-Solutions": "ICSE Class 10 Maths Solutions: Chapter-Wise Answers | Learnosphere",
  "ICSE-Class-9-Maths-Selina-Solutions-Chapter-8": "ICSE Class 9 Maths Selina Solutions: Chapter 8 | Learnosphere",
  "ICSE-School-In-Jaipur": "ICSE Schools in Jaipur: List and Details | Learnosphere",
  "ICSE-Full-Form": "ICSE Full Form: What Does ICSE Stand For? | Learnosphere",
  "ICSE-Syllabus": "ICSE Syllabus: Subjects and Class-Wise Overview | Learnosphere",
  "Selina-Solutions-Concise-Biology-Class-10-Chapter-6-Photosynthesis": "Photosynthesis: ICSE Class 10 Biology Selina Ch 6 | Learnosphere",
  "ICSE-Passing-Marks": "ICSE Passing Marks: Minimum Marks Required to Pass | Learnosphere",
  "ICSE-School-List-With-Details": "ICSE School List with Details | Learnosphere",
  "ICSE-Solutions-Class-10-Chapter-1-Force": "ICSE Class 10 Physics Chapter 1 Force: Solutions | Learnosphere",
  "ICSE-Solutions-Class-10-Chapter-8-Current-Electricity": "Current Electricity Class 10 ICSE: Important Concepts, Formulas and Solutions | Learnosphere",
  "icse-solutions-class-10-chapter-8-current-electricity": "Current Electricity Class 10 ICSE: Important Concepts, Formulas and Solutions | Learnosphere",
  "ICSE-Class-7": "ICSE Class 7: Syllabus, Subjects, Study Material and Learning Resources | Learnosphere",
  "icse-class-7": "ICSE Class 7: Syllabus, Subjects, Study Material and Learning Resources | Learnosphere",
  "ICSE-Selina-Solution-Concise-Biology-Class-10-Chapter-3-Genetics-Some-Basic-Fundamentals": "Genetics Class 10 ICSE: Important Concepts, Mendel's Laws and Selina Solutions | Learnosphere",
  "icse-selina-solution-concise-biology-class-10-chapter-3-genetics-some-basic-fundamentals": "Genetics Class 10 ICSE: Important Concepts, Mendel's Laws and Selina Solutions | Learnosphere",
  "ICSE-Class-9-Biology-Selina-Solutions-Chapter-1": "ICSE Class 9 Biology Selina Solutions Chapter 1 – Introducing Biology | Learnosphere",
  "icse-class-9-biology-selina-solutions-chapter-1": "ICSE Class 9 Biology Selina Solutions Chapter 1 – Introducing Biology | Learnosphere",
  "ICSE-Class-8-Maths-Selina-Solutions-Chapter-13": "ICSE Class 8 Maths Selina Solutions Chapter 13 – Factorisation | Learnosphere",
  "icse-class-8-maths-selina-solutions-chapter-13": "ICSE Class 8 Maths Selina Solutions Chapter 13 – Factorisation | Learnosphere",
  "ICSE-Class-6-Maths": "ICSE Class 6 Maths – Selina Solutions, Chapters and Study Material | Learnosphere",
  "icse-class-6-maths": "ICSE Class 6 Maths – Selina Solutions, Chapters and Study Material | Learnosphere"
};


import { notFound } from "next/navigation";
import axios from "axios";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import RelatedPageClient from "./RelatedPageClient";

const GENUINE_ICSE_SLUGS = new Set([
  "icse-selina-solution-concise-biology-class-10-chapter-3-genetics-some-basic-fundamentals",
  "icse-class-7",
  "selina-solutions-class-10-chapter-5-refraction-through-a-lens",
  "icse-class-8-chemistry-selina-solutions-chapter-6",
  "icse-class-8-chemistry-selina-solutions-chapter-8",
  "concise-mathematics-class-10-icse-guide",
  "icse-class-9-biology-selina-solutions-chapter-1",
  "icse-solutions-class-10-chapter-1-periodic-table-periodic-property-and-variations-of-properties",
  "icse-isc-class-11-maths-book",
  "list-of-icse-schools-in-india",
  "icse-selina-class-9-maths",
  "icse-physics-questions-paper-2014-solved",
  "icse-books-for-class-10",
  "icse-class-8-maths-selina-solutions-chapter-13",
  "icse-class-8-maths-selina-solutions-chapter-17",
  "icse-class-7-questions-papers",
  "isc-2017-schedule",
  "icse-class-9-chemistry-selina-solutions-chapter-2",
  "icse-class-6-maths-syllabus",
  "icse-vs-cbse-which-is-better-cbse-or-icse",
  "icse-syllabus-for-class-10-for-the-year-2023-24",
  "icse-solutions-class-10-chapter-8-current-electricity",
  "icse-board-papers-2016",
  "icse-class-8-biology-selina-solutions-chapter-2",
  "icse-class-6-maths",
  "icse-solutions-class-10-chapter-1-force",
  "icse-school-list-with-details",
  "icse-passing-marks",
  "selina-solutions-concise-biology-class-10-chapter-6-photosynthesis",
  "icse-syllabus",
  "icse-full-form",
  "icse-school-in-jaipur",
  "icse-class-9-maths-selina-solutions-chapter-8",
  "icse-mathematics-class-10-solutions",
  "icse-biology",
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

  const customTitle = icseRelatedTitles[slug] || (cleanSlug && icseRelatedTitles[cleanSlug]) || data.metaTitle;
  const metaDescription =
    data.metaDescription ||
    data.introPoints?.[0] ||
    `Comprehensive ICSE study resources and syllabus for ${data.title}.`;

  return {
    title: customTitle ? { absolute: customTitle } : `${data.title} | Learnosphere`,
    description: metaDescription,
    alternates: {
      canonical: buildCanonicalUrl(["ICSE-Related", slug]),
    },
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
