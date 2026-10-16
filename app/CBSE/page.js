import Head from "next/head";
import React from "react";
import Cbse from "@/components/Cbse";

export const generateMetadata = () => {
  return {
     title: "CBSE | Syllabus, Sample Papers & Study Resources | Learnosphere",
    description: "Explore CBSE syllabus, sample papers, previous year questions, quizzes and study resources for Classes 1 to 12. Prepare smarter with Learnosphere.",
    };
};
const CBSEPage = () => {
  const metadata = generateMetadata();
  return (
    <>
      <Head><title>{metadata.title}</title><meta name="description" content={metadata.description} /></Head>
      <Cbse />
    </>
  );
}
export default CBSEPage;

