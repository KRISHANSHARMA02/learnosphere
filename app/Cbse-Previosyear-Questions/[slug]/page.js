const cbsePyqCustomTitles = {
  "CBSE-Previous-Year-Question-Paper-for-Class-12-Physics": "Class 12 Physics Previous Year Question Papers: CBSE | Learnosphere",
  "CBSE-Previous-Year-Question-Paper-for-Class-12-BusinessStudy": "CBSE Class 12 Business Studies Previous Year Papers | Learnosphere",
  "CBSE-Previous-Year-Question-Paper-for-Class-12-Chemistry": "CBSE Class 12 Chemistry Previous Year Question Papers | Learnosphere",
  "CBSE-Previous-Year-Question-Paper-for-Class-12-Accountancy": "Class 12 Accountancy Previous Year Papers for CBSE | Learnosphere",
  "CBSE-Previous-Year-Question-Paper-for-Class-12-Maths": "CBSE Class 12 Maths Previous Year Question Papers | Learnosphere",
  "CBSE-Previous-Year-Question-Paper-for-Class-12-Biology": "Class 12 Biology Previous Year Papers: CBSE Board | Learnosphere",
  "CBSE-Previous-Year-Question-Paper-for-Class-12-English": "CBSE Class 12 English Previous Year Question Papers | Learnosphere",
  "CBSE-Previous-Year-Question-Paper-for-Class-12-PhysicalEducation": "Class 12 Physical Education Previous Year CBSE Papers | Learnosphere",
  "CBSE-Previous-Year-Question-Paper-for-Class-12-Economics": "CBSE Class 12 Economics Previous Year Papers | Learnosphere",
  "CBSE-Previous-Year-Question-Paper-for-Class-12-PoliticalScience": "Class 12 Political Science Previous Year CBSE Papers | Learnosphere",
  "CBSE-Previous-Year-Question-Paper-for-Class-12-Hindi": "CBSE Class 12 Hindi Previous Year Question Papers | Learnosphere"
};

import DataTable from "./slugData";
import { getCbsePreviousSlug } from "@/src/lib/actions/sample_papers_data_fetch";

export default async function cbsePreviousPpr({ params }) {
  const { slug } = await params;

  if (!slug) return <p>Slug missing</p>

  const data = await getCbsePreviousSlug(slug);

  
  if (!data || data.length === 0) return <p> No Previous Year Question Paper found</p>;

  return <DataTable data={data} slug={slug} />;

}


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const titleMap = {
    "CBSE-Class-10-Maths-Previous-Year-Papers": "CBSE Class 10 Maths Previous Year Papers",
  };
  const descriptionMap = {
    "CBSE-Class-10-Maths-Previous-Year-Papers": "Download CBSE Class 10 Maths previous year question papers to practise important questions and prepare for board exams.",
  };

  const customTitle = cbsePyqCustomTitles[slug];
  const title = customTitle ? { absolute: customTitle } : (titleMap[slug] || "Learnosphere");
  const description = descriptionMap[slug] || "Download CBSE previous year question papers with solutions.";
  
  return { title, description };
}
