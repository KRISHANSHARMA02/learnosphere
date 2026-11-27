import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE_Class-12-Accountancy';

export const metadata = {
  title: "CBSE Class 12 Accountancy | Notes & Study Material | Learnosphere",
  description: "Explore CBSE Class 12 Accountancy notes, important concepts and chapter-wise study material to strengthen your accounting knowledge and prepare for exams.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE/Class-12-Accountancy"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}