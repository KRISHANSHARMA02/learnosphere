import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE_Class-12-BussinessStudies';

export const metadata = {
  title: {
    absolute: "CBSE Class 12 Business Studies Syllabus: Units & Marks | Learnosphere",
  },
  description: "Explore the CBSE Class 12 Business Studies syllabus with all 12 units, topics, marks distribution, project work and exam preparation tips.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE/Class-12-BussinessStudies"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
