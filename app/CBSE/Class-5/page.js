import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE_Class-5';

export const metadata = {
  title: "Class 5 CBSE Curriculum & Learning Resources | Learnosphere",
  description: "Discover the Class 5 CBSE curriculum with helpful educational content and practice resources to support students in their daily learning.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE/Class-5"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}