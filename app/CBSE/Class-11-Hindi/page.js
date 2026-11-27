import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE_Class-11-Hindi';

export const metadata = {
  title: "CBSE Class 11 Hindi Core Syllabus & Exam Pattern | Learnosphere",
  description: "Explore the CBSE Class 11 Hindi Core syllabus, prescribed NCERT books, examination pattern, marks distribution and preparation guidance.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE/Class-11-Hindi"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}