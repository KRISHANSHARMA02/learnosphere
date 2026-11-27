import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE-11thsyllabus';

export const metadata = {
  title: {
    absolute: "CBSE Class 11 Syllabus: Subjects & Curriculum | Learnosphere",
  },
  description: "Explore the CBSE Class 11 syllabus, subject choices and subject-wise curriculum resources for Mathematics, Physics, Chemistry, Biology, Commerce and Humanities subjects.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE-11thsyllabus"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
