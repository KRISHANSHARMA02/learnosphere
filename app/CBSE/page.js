import Head from "next/head";
import React from "react";
import Cbse from "@/components/Cbse";

export const generateMetadata = () => {
  return { title: "CBSE Syllabus for Classes 1 to 12 | Learnosphere",};
};
const CBSEPage = () => {
  const metadata = generateMetadata();
  return (
    <>
      <Head><title>{metadata.title}</title></Head>
      <Cbse />
    </>
  );
}
export default CBSEPage;

