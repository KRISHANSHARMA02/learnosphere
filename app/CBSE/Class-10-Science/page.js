import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE_Class-10-Science';

export const metadata = {
  title: "CBSE Class 10 Science Board Exam Preparation | Learnosphere",
  description: "CBSE Class 10 Science help: study chemistry, physics and biology chapters like chemical reactions and electricity, and book an expert tutor.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE/Class-10-Science"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}