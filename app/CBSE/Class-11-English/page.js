import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE_Class-11-English';

export const metadata = {
  title: "CBSE Class 11 English Core Syllabus: Chapters & Exam Pattern",
  description: "Explore the CBSE Class 11 English Core syllabus, Hornbill and Snapshots chapters, grammar, writing skills and examination pattern.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE/Class-11-English"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}