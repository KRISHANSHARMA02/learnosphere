const samplePaperTitles = {
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-7": "CBSE Class 9 Maths Sample Paper Set 7 | Learnosphere",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-6": "CBSE Class 9 Maths Set 6: Sample Paper Practice | Learnosphere",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-9": "CBSE Class 9 Maths Set 9: Sample Paper Practice | Learnosphere",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-8": "Class 9 Maths Set 8: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-3": "CBSE Class 9 Maths Set 3: Sample Paper Practice | Learnosphere",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-2": "Class 9 Maths Set 2: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-5": "Class 9 Maths Set 5: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-4": "CBSE Class 9 Maths Sample Paper Set 4 | Learnosphere",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-1": "CBSE Class 9 Maths Sample Paper Set 1 | Learnosphere",
  "Cbse-Class-8-Maths-Sa-1-Sample-Paper": "Class 8 Maths SA-1 Sample Paper for CBSE Students | Learnosphere",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-11": "Class 9 Maths Set 11: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-12": "CBSE Class 9 Maths Set 12: Sample Paper Practice | Learnosphere",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-10": "CBSE Class 9 Maths Sample Paper Set 10 | Learnosphere",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-13": "CBSE Class 9 Maths Sample Paper Set 13 | Learnosphere",
  "Cbse-Sample-Paper-For-Class-8-Maths-Set-5": "Class 8 Maths Set 5: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Sample-Paper-For-Class-8-Maths-Set-3": "CBSE Class 8 Maths Set 3: Sample Paper Practice | Learnosphere",
  "Cbse-Sample-Paper-For-Class-8-Maths-Set-4": "CBSE Class 8 Maths Sample Paper Set 4 | Learnosphere",
  "Cbse-Sample-Paper-For-Class-8-Maths-Set-2": "Class 8 Maths Set 2: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Sample-Paper-Class-8-Maths-Set-1": "CBSE Class 8 Maths Sample Paper Set 1 | Learnosphere",
  "Cbse-Class-11-Maths-Sample-Paper-Set-4": "CBSE Class 11 Maths Sample Paper Set 4 | Learnosphere",
  "Cbse-Class-11-Maths-Sample-Paper-Set-3": "CBSE Class 11 Maths Set 3: Sample Paper Practice | Learnosphere",
  "Cbse-Class-11-Maths-Sample-Paper-Set-2": "Class 11 Maths Set 2: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Class-11-Maths-Sample-Paper-Set-1": "CBSE Class 11 Maths Sample Paper Set 1 | Learnosphere",
  "Cbse-Class-11-Maths-Sample-Paper-Set-8": "Class 11 Maths Set 8: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Class-11-Maths-Sample-Paper-Set-7": "CBSE Class 11 Maths Sample Paper Set 7 | Learnosphere",
  "Cbse-Class-11-Maths-Sample-Paper-Set-6": "CBSE Class 11 Maths Set 6: Sample Paper Practice | Learnosphere",
  "Cbse-Class-11-Maths-Sample-Paper-Set-5": "Class 11 Maths Set 5: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Class-11-Maths-Sample-Paper-Set-9": "CBSE Class 11 Maths Set 9: Sample Paper Practice | Learnosphere",
  "Cbse-Class-12-Maths-Sample-Paper-Set-7": "CBSE Class 12 Maths Sample Paper Set 7 | Learnosphere",
  "Cbse-Class-12-Maths-Sample-Paper-Set-6": "CBSE Class 12 Maths Set 6: Sample Paper Practice | Learnosphere",
  "Cbse-Class-12-Maths-Sample-Paper-Set-9": "CBSE Class 12 Maths Set 9: Sample Paper Practice | Learnosphere",
  "Cbse-Class-12-Maths-Sample-Paper-Set-8": "Class 12 Maths Set 8: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Class-12-Maths-Sample-Paper-Set-3": "CBSE Class 12 Maths Set 3: Sample Paper Practice | Learnosphere",
  "Cbse-Class-12-Maths-Sample-Paper-Set-2": "Class 12 Maths Set 2: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Class-12-Maths-Sample-Paper-Set-5": "Class 12 Maths Set 5: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Class-12-Maths-Sample-Paper-Set-4": "CBSE Class 12 Maths Sample Paper Set 4 | Learnosphere",
  "Cbse-Class-11-Maths-Sample-Paper-Set-10": "CBSE Class 11 Maths Sample Paper Set 10 | Learnosphere",
  "Cbse-Class-12-Maths-Sample-Paper-Set-10": "CBSE Class 12 Maths Sample Paper Set 10 | Learnosphere",
  "Cbse-Class-8-Maths-Sa-2-Sample-Paper": "CBSE Class 8 Maths Sample Paper for SA-2 Exam | Learnosphere",
  "Cbse-Class-9-Maths-Sample-Papers-Sa1": "CBSE Class 9 Maths Sample Paper for SA-1 Exam | Learnosphere",
  "Cbse-Class-9-Maths-Sample-Papers-Sa2": "Class 9 Maths SA-2 Sample Papers for CBSE Students | Learnosphere",
  "Cbse-Class-10-Maths-Sample-Papers-Set-1": "CBSE Class 10 Maths Sample Paper Set 1 | Learnosphere",
  "Cbse-Class-10-Maths-Sample-Papers-Set-2": "Class 10 Maths Set 2: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Class-10-Maths-Sample-Papers-Set-3": "CBSE Class 10 Maths Set 3: Sample Paper Practice | Learnosphere",
  "Cbse-Class-10-Maths-Sample-Papers-Set-4": "CBSE Class 10 Maths Sample Paper Set 4 | Learnosphere",
  "Cbse-Class-10-Maths-Sample-Papers-Set-5": "Class 10 Maths Set 5: CBSE Sample Question Paper | Learnosphere",
  "Cbse-Class-10-Maths-Sample-Papers-Set-6": "CBSE Class 10 Maths Set 6: Sample Paper Practice | Learnosphere"
};

const samplePaperMetaDescriptions = {
  "Cbse-Class-10-Maths-Sample-Papers-Set-1": "CBSE Class 10 Maths Sample Paper Set 1: practise exam-style questions and test your preparation before the exam. Try it on Learnosphere.",
  "Cbse-Class-10-Maths-Sample-Papers-Set-2": "CBSE Class 10 Maths Sample Paper Set 2: solve exam-pattern questions, find weak topics and revise with confidence. Try it on Learnosphere.",
  "Cbse-Class-10-Maths-Sample-Papers-Set-3": "CBSE Class 10 Maths Sample Paper Set 3: practise important question types and improve speed and accuracy. Try it on Learnosphere.",
  "Cbse-Class-10-Maths-Sample-Papers-Set-4": "CBSE Class 10 Maths Sample Paper Set 4: check your understanding and see how ready you are for the exam. Try it on Learnosphere.",
  "Cbse-Class-10-Maths-Sample-Papers-Set-5": "CBSE Class 10 Maths Sample Paper Set 5: build exam confidence by practising with another paper in the series. Try it on Learnosphere.",
  "Cbse-Class-10-Maths-Sample-Papers-Set-6": "CBSE Class 10 Maths Sample Paper Set 6: revise key chapters and practise time management for the exam. Try it on Learnosphere.",
  "Cbse-Class-11-Maths-Sample-Paper-Set-1": "CBSE Class 11 Maths Sample Paper Set 1: practise exam-style questions and test your preparation before the exam. Try it on Learnosphere.",
  "Cbse-Class-11-Maths-Sample-Paper-Set-10": "CBSE Class 11 Maths Sample Paper Set 10: solve exam-pattern questions, find weak topics and revise with confidence. Try it on Learnosphere.",
  "Cbse-Class-11-Maths-Sample-Paper-Set-2": "CBSE Class 11 Maths Sample Paper Set 2: practise important question types and improve speed and accuracy. Try it on Learnosphere.",
  "Cbse-Class-11-Maths-Sample-Paper-Set-3": "CBSE Class 11 Maths Sample Paper Set 3: check your understanding and see how ready you are for the exam. Try it on Learnosphere.",
  "Cbse-Class-11-Maths-Sample-Paper-Set-4": "CBSE Class 11 Maths Sample Paper Set 4: build exam confidence by practising with another paper in the series. Try it on Learnosphere.",
  "Cbse-Class-11-Maths-Sample-Paper-Set-5": "CBSE Class 11 Maths Sample Paper Set 5: revise key chapters and practise time management for the exam. Try it on Learnosphere.",
  "Cbse-Class-11-Maths-Sample-Paper-Set-6": "CBSE Class 11 Maths Sample Paper Set 6: practise exam-style questions and test your preparation before the exam. Try it on Learnosphere.",
  "Cbse-Class-11-Maths-Sample-Paper-Set-7": "CBSE Class 11 Maths Sample Paper Set 7: solve exam-pattern questions, find weak topics and revise with confidence. Try it on Learnosphere.",
  "Cbse-Class-11-Maths-Sample-Paper-Set-8": "CBSE Class 11 Maths Sample Paper Set 8: practise important question types and improve speed and accuracy. Try it on Learnosphere.",
  "Cbse-Class-11-Maths-Sample-Paper-Set-9": "CBSE Class 11 Maths Sample Paper Set 9: check your understanding and see how ready you are for the exam. Try it on Learnosphere.",
  "Cbse-Class-8-Maths-Sa-1-Sample-Paper": "CBSE Class 8 Maths SA-1 Sample Paper: practise Summative Assessment 1 questions, test your preparation and revise key chapters.",
  "Cbse-Class-8-Maths-Sa-2-Sample-Paper": "CBSE Class 8 Maths SA-2 Sample Paper: practise Summative Assessment 2 questions, check your understanding and revise before exams.",
  "Cbse-Class-9-Maths-Sample-Papers-Sa1": "CBSE Class 9 Maths SA1 sample papers: practise first-term style questions, find weak topics and revise key chapters with confidence.",
  "Cbse-Class-9-Maths-Sample-Papers-Sa2": "CBSE Class 9 Maths SA2 sample papers: practise second-term style questions, improve accuracy and prepare for the final exam.",
  "Cbse-Sample-Paper-Class-8-Maths-Set-1": "CBSE Class 8 Maths Sample Paper Set 1: practise exam-style questions and test your preparation before the exam. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-8-Maths-Set-2": "CBSE Class 8 Maths Sample Paper Set 2: solve exam-pattern questions, find weak topics and revise with confidence. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-8-Maths-Set-3": "CBSE Class 8 Maths Sample Paper Set 3: practise important question types and improve speed and accuracy. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-8-Maths-Set-4": "CBSE Class 8 Maths Sample Paper Set 4: check your understanding and see how ready you are for the exam. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-8-Maths-Set-5": "CBSE Class 8 Maths Sample Paper Set 5: build exam confidence by practising with another paper in the series. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-1": "CBSE Class 9 Maths Sample Paper Set 1: practise exam-style questions and test your preparation before the exam. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-10": "CBSE Class 9 Maths Sample Paper Set 10: solve exam-pattern questions, find weak topics and revise with confidence. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-11": "CBSE Class 9 Maths Sample Paper Set 11: practise exam-style questions and test your preparation before the exam. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-12": "CBSE Class 9 Maths Sample Paper Set 12: solve exam-pattern questions, find weak topics and revise with confidence. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-13": "CBSE Class 9 Maths Sample Paper Set 13: practise important question types and improve speed and accuracy. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-2": "CBSE Class 9 Maths Sample Paper Set 2: check your understanding and see how ready you are for the exam. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-3": "CBSE Class 9 Maths Sample Paper Set 3: build exam confidence by practising with another paper in the series. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-4": "CBSE Class 9 Maths Sample Paper Set 4: revise key chapters and practise time management for the exam. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-5": "CBSE Class 9 Maths Sample Paper Set 5: practise exam-style questions and test your preparation before the exam. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-6": "CBSE Class 9 Maths Sample Paper Set 6: solve exam-pattern questions, find weak topics and revise with confidence. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-7": "CBSE Class 9 Maths Sample Paper Set 7: practise important question types and improve speed and accuracy. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-8": "CBSE Class 9 Maths Sample Paper Set 8: check your understanding and see how ready you are for the exam. Try it on Learnosphere.",
  "Cbse-Sample-Paper-For-Class-9-Maths-Set-9": "CBSE Class 9 Maths Sample Paper Set 9: build exam confidence by practising with another paper in the series. Try it on Learnosphere."
};

import DataTable from "./slugData";
import { getSamplePapersPDF } from "@/src/lib/actions/sample_papers_data_fetch";
import { redirect, notFound } from "next/navigation";

export const revalidate = 60; // ✅ re-fetch every 60s

export default async function SamplePapersPDF({ params }) {
  const { slug } = await params;

  if (!slug) notFound();

  const data = await getSamplePapersPDF(slug);

  if (!data || data.length === 0) {
    notFound();
  }

  return <DataTable data={data} slug={slug} />;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const description = samplePaperMetaDescriptions[slug];
  const customTitle = samplePaperTitles[slug];
  const formattedTitle = slug
    ? `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Learnosphere`
    : "CBSE Sample Papers | Learnosphere";
  return {
    title: customTitle ? { absolute: customTitle } : formattedTitle,
    ...(description ? { description } : {}),
  };
}
