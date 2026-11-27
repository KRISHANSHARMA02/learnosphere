import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE_Class-2';

export const metadata = {
  title: {
    absolute: "CBSE Class 2 Syllabus: Subjects and Learning Areas | Learnosphere"
  },
  description: "Explore the CBSE Class 2 syllabus with NCERT books for English, Hindi and Maths, chapter lists, learning areas and study guidance for parents.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE/Class-2"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}