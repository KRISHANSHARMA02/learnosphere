import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE_Class-4';

export const metadata = {
  title: "CBSE Class 4 Syllabus: Subjects & NCERT Books",
  description: "Explore the CBSE Class 4 syllabus, NCERT books for English, Hindi, Maths and EVS, subject-wise learning areas and study resources.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE/Class-4"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
