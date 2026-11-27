import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE_Class-11-Accountancy';

export const metadata = {
  title: "CBSE Class 11 Accountancy | Chapter Notes & Exam Prep | Learnosphere",
  description: "Study CBSE Class 11 Accountancy with chapter-wise notes, accounting concepts and practice resources. Improve your understanding of financial accounting with Learnosphere.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE/Class-11-Accountancy"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}