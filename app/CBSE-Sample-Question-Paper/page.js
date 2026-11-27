import ClientPage from '@/components/client/CBSE-Sample-Question-Paper';
import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";

export const metadata = {
  title: "CBSE Sample Question Papers for Class 8 to 12 | Learnosphere",
  description: "CBSE sample question papers for Maths by class: practise exam-style questions, test your preparation and revise with Learnosphere.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE-Sample-Question-Paper"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
