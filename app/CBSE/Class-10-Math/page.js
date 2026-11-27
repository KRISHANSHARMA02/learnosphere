import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE_Class-10-Math';

export const metadata = {
  title: "CBSE Class 10 Maths Board Exam Preparation | Learnosphere",
  description: "CBSE Class 10 Maths made simple: explore chapters like real numbers, polynomials and trigonometry, and book an expert tutor with Learnosphere.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE/Class-10-Math"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}