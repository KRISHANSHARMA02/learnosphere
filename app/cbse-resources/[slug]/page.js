const cbseResourceCustomTitles = {
  "maths-worksheet-for-class-3": "Class 3 Maths Worksheets: CBSE Practice Sheets | Learnosphere",
  "cbse-moderation-policy-2017": "CBSE Moderation Policy 2017 Explained | Learnosphere",
  "ncert-solutions-for-class-6-social-science-civics-chapter-1": "NCERT Class 6 Civics Chapter 1 Solutions | Learnosphere",
  "science-experiments-app": "Science Experiments App: Learn Through Activities | Learnosphere",
  "class-7th-science-sample-question-paper": "Class 7 Science Sample Question Paper (CBSE) | Learnosphere",
  "cbse-class-6-science": "CBSE Class 6 Science: Chapters and Study Material | Learnosphere",
  "cbse-class-7-maths": "CBSE Class 7 Maths: Chapters and Study Material | Learnosphere",
  "chemistry-notes-for-class-12": "Class 12 Chemistry Notes for CBSE Board Revision | Learnosphere",
  "5th-class-maths-book": "Class 5 Maths Book – Chapters, Topics & Study Material | Learnosphere",
  "structure-of-atom-class-11": "Structure of Atom Class 11 – Notes, Topics & Questions | Learnosphere",
  "ncert-solutions-for-class-11-chemistry": "NCERT Solutions for Class 11 Chemistry: Chapter-Wise Answers, Important Topics and Study Material | Learnosphere",
  "4th-class-science": "CBSE Class 4 Science – Topics, Learning Activities and Study Material | Learnosphere"
};

const cbseResourceCustomDescriptions = {
  "5th-class-maths-book": "Explore the Class 5 Maths Book, chapter-wise topics, NCERT Maths Mela, exercises and useful study resources for CBSE students.",
  "structure-of-atom-class-11": "Explore Structure of Atom Class 11 with important topics, atomic models, quantum numbers, formulas and Chemistry study material.",
  "ncert-solutions-for-class-11-chemistry": "NCERT Solutions for Class 11 Chemistry: Chapter-wise answers, important topics, concepts, and study material for CBSE students.",
  "4th-class-science": "CBSE Class 4 Science: Explore chapter-wise topics, learning activities, worksheets, and study material for Class 4 Science and EVS students."
};

import { notFound } from "next/navigation";
import ResourcePage from "./ResourcePage";
import { validateCbseResourceSlug, getResourceContent } from "./resourceData";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return { title: "Page Not Found | Learnosphere" };

  const isValid = await validateCbseResourceSlug(slug);
  if (!isValid) {
    return {
      title: "Page Not Found | Learnosphere",
      robots: { index: false, follow: false },
    };
  }

  const content = getResourceContent(slug);
  if (!content) {
    return {
      title: "Page Not Found | Learnosphere",
      robots: { index: false, follow: false },
    };
  }

  const cleanSlug = slug.toLowerCase().trim();
  const customTitle = cbseResourceCustomTitles[cleanSlug] || cbseResourceCustomTitles[slug] || content.metaTitle;
  const customDesc = cbseResourceCustomDescriptions[cleanSlug] || cbseResourceCustomDescriptions[slug] || content.metaDescription;

  return {
    title: customTitle ? { absolute: customTitle } : `${content.title} | Learnosphere`,
    description: customDesc || content.description?.[0] || `Comprehensive CBSE resources for ${content.title}.`,
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
