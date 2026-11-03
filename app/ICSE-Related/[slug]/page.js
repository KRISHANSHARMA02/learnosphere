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
  "ICSE-Class-6-Maths": "ICSE Class 6 Maths: Study Material and Practice | Learnosphere",
  "ICSE-Class-8-Biology-Selina-Solutions-Chapter-2": "ICSE Class 8 Biology Selina Solutions: Chapter 2 | Learnosphere",
  "ICSE-Board-Papers-2016": "ICSE Board Papers 2016: Past Year Question Papers | Learnosphere",
  "ICSE-Solutions-Class-10-Chapter-8-Current-Electricity": "ICSE Class 10 Physics Current Electricity: Chapter 8 | Learnosphere",
  "ICSE-Syllabus-for-Class-10-for-the-Year-2023-24": "ICSE Class 10 Syllabus for 2023-24 Session | Learnosphere",
  "ICSE-vs-CBSE-Which-is-Better-CBSE-or-ICSE": "ICSE vs CBSE: Which Board Is Better for Your Child? | Learnosphere",
  "ICSE-Class-6-Maths-Syllabus": "ICSE Class 6 Maths Syllabus: Chapters and Topics | Learnosphere",
  "ICSE-Class-9-Chemistry-Selina-Solutions-Chapter-2": "ICSE Class 9 Chemistry Selina Solutions: Chapter 2 | Learnosphere",
  "ISC-2017-Schedule": "ISC 2017 Exam Schedule: Class 12 Date Sheet | Learnosphere",
  "ICSE-Class-7-Questions-Papers": "ICSE Class 7 Question Papers for Practice | Learnosphere",
  "ICSE-Class-8-Maths-Selina-Solutions-Chapter-17": "ICSE Class 8 Maths Selina Solutions: Chapter 17 | Learnosphere",
  "ICSE-Class-8-Maths-Selina-Solutions-Chapter-13": "Selina ICSE Class 8 Maths Chapter 13 Solutions | Learnosphere",
  "ICSE-Books-For-Class-10": "ICSE Books for Class 10: Textbooks & Reference List | Learnosphere",
  "ICSE-Physics-Questions-Paper-2014-Solved": "ICSE Physics 2014 Question Paper with Solutions | Learnosphere",
  "ICSE-Selina-Class-9-Maths": "Selina ICSE Class 9 Maths Chapter Solutions | Learnosphere",
  "List-of-ICSE-Schools-in-India": "List of ICSE Schools Across India | Learnosphere",
  "ICSE-ISC-Class-11-Maths-Book": "ISC Class 11 Maths Book for ICSE Students | Learnosphere",
  "ICSE-Solutions-Class-10-Chapter-1-Periodic-Table-Periodic-Property-And-Variations-Of-Properties": "ICSE Class 10 Chemistry: Periodic Table & Properties | Learnosphere",
  "ICSE-Class-9-Biology-Selina-Solutions-Chapter-1": "ICSE Class 9 Biology Selina Solutions: Chapter 1 | Learnosphere",
  "Concise-Mathematics-Class-10-ICSE-Guide": "Concise Mathematics Class 10 ICSE Guide | Learnosphere",
  "ICSE-Class-8-Chemistry-Selina-Solutions-Chapter-8": "ICSE Class 8 Chemistry Selina Solutions: Chapter 8 | Learnosphere",
  "ICSE-Class-8-Chemistry-Selina-Solutions-Chapter-6": "Selina ICSE Class 8 Chemistry Chapter 6 Solutions | Learnosphere",
  "Selina-Solutions-Class-10-Chapter-5-Refraction-Through-A-Lens": "Refraction Through a Lens: ICSE Class 10 Selina Ch 5 | Learnosphere",
  "ICSE-Class-7": "ICSE Class 7: Subjects, Syllabus and Study Material | Learnosphere",
  "ICSE-Selina-Solution-Concise-Biology-Class-10-Chapter-3-Genetics-Some-Basic-Fundamentals": "Genetics: ICSE Class 10 Biology Selina Ch 3 Solutions | Learnosphere"
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
    "http://localhost:4000",
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
