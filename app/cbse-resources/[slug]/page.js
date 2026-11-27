const cbseResourceCustomTitles = {
  "maths-worksheet-for-class-3": "Class 3 Maths Worksheets: CBSE Practice Sheets | Learnosphere",
  "cbse-moderation-policy-2017": "CBSE Moderation Policy 2017 Explained | Learnosphere",
  "ncert-solutions-for-class-6-social-science-civics-chapter-1": "NCERT Class 6 Civics Chapter 1 Solutions | Learnosphere",
  "science-experiments-app": "Science Experiments App: Learn Through Activities | Learnosphere",
  "class-7th-science-sample-question-paper": "Class 7 Science Sample Question Paper (CBSE) | Learnosphere",
  "cbse-class-6-science": "CBSE Class 6 Science: Chapters and Study Material | Learnosphere",
  "cbse-class-7-maths": "CBSE Class 7 Maths – NCERT Solutions, Notes & Study Material | Learnosphere",
  "chemistry-notes-for-class-12": "Class 12 Chemistry Notes – Chapter-Wise Study Material | Learnosphere",
  "5th-class-maths-book": "Class 5 Maths Book – Chapters, Topics & Study Material | Learnosphere",
  "structure-of-atom-class-11": "Structure of Atom Class 11 – Notes, Topics & Questions | Learnosphere",
  "ncert-solutions-for-class-11-chemistry": "NCERT Solutions for Class 11 Chemistry: Chapter-Wise Answers, Important Topics and Study Material | Learnosphere",
  "4th-class-science": "CBSE Class 4 Science – Topics, Learning Activities and Study Material | Learnosphere",
  "ncert-solutions-class-9-maths": "NCERT Solutions for Class 9 Maths – Chapter-Wise Exercise Solutions | Learnosphere",
  "cbse-class-10-maths-objective-questions": "CBSE Class 10 Maths Objective Questions & Practice | Learnosphere",
  "ncert-solutions-class-10-science": "NCERT Solutions Class 10 Science – Chapter Wise Answers | Learnosphere",
  "ncert-solutions-class-10-maths": "NCERT Solutions for Class 10 Maths – Chapter-Wise Questions and Answers | Learnosphere"
};

const cbseResourceCustomDescriptions = {
  "5th-class-maths-book": "Explore the Class 5 Maths Book, chapter-wise topics, NCERT Maths Mela, exercises and useful study resources for CBSE students.",
  "structure-of-atom-class-11": "Explore Structure of Atom Class 11 with important topics, atomic models, quantum numbers, formulas and Chemistry study material.",
  "ncert-solutions-for-class-11-chemistry": "NCERT Solutions for Class 11 Chemistry: Chapter-wise answers, important topics, concepts, and study material for CBSE students.",
  "4th-class-science": "CBSE Class 4 Science: Explore chapter-wise topics, learning activities, worksheets, and study material for Class 4 Science and EVS students.",
  "ncert-solutions-class-9-maths": "NCERT Solutions for Class 9 Maths provide structured chapter-wise answers, important formulas, and exercise solutions to prepare for CBSE examinations.",
  "cbse-class-10-maths-objective-questions": "Practise CBSE Class 10 Maths Objective Questions chapter-wise. Improve concept clarity, calculation accuracy and exam preparation with useful study resources.",
  "ncert-solutions-class-10-science": "Explore NCERT Solutions Class 10 Science with chapter-wise answers, detailed explanations and study resources for CBSE board exam preparation.",
  "chemistry-notes-for-class-12": "Explore Class 12 Chemistry Notes with important formulas, reactions, chapter-wise explanations and study material for CBSE students.",
  "cbse-class-7-maths": "Explore CBSE Class 7 Maths study material, NCERT solutions, chapter-wise notes, formulas and practice questions on Learnosphere.",
  "ncert-solutions-class-10-maths": "NCERT Solutions for Class 10 Maths provide step-by-step answers to textbook questions, helping students understand concepts and prepare for CBSE board exams."
};

import { notFound } from "next/navigation";
import ResourcePage from "./ResourcePage";
import { validateCbseResourceSlug, getResourceContent } from "./resourceData";

import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return { title: "Page Not Found | Learnosphere" };

  const isValid = await validateCbseResourceSlug(slug);
  if (!isValid) {
    return {
      title: "Page Not Found | Learnosphere",
      robots: { index: false, follow: false },
      alternates: {
        canonical: buildCanonicalUrl(["cbse-resources", slug]),
      },
    };
  }

  const content = getResourceContent(slug);
  if (!content) {
    return {
      title: "Page Not Found | Learnosphere",
      robots: { index: false, follow: false },
      alternates: {
        canonical: buildCanonicalUrl(["cbse-resources", slug]),
      },
    };
  }

  const cleanSlug = slug.toLowerCase().trim();
  const customTitle = cbseResourceCustomTitles[cleanSlug] || cbseResourceCustomTitles[slug] || content.metaTitle;
  const customDesc = cbseResourceCustomDescriptions[cleanSlug] || cbseResourceCustomDescriptions[slug] || content.metaDescription;

  return {
    title: customTitle ? { absolute: customTitle } : `${content.title} | Learnosphere`,
    description: customDesc || content.description?.[0] || `Comprehensive CBSE resources for ${content.title}.`,
    alternates: {
      canonical: buildCanonicalUrl(["cbse-resources", slug]),
    },
  };
}

export default async function CbseResourcePage({ params }) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  const isValid = await validateCbseResourceSlug(slug);
  if (!isValid) {
    notFound();
  }

  const content = getResourceContent(slug);
  if (!content) {
    notFound();
  }

  return <ResourcePage slug={slug} initialContent={content} />;
}
