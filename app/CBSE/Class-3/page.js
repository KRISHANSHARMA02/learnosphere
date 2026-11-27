import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE_Class-3';

export const metadata = {
  title: "CBSE Class 3 Learning Resources & Curriculum | Learnosphere",
  description: "Help young learners build strong academic foundations with CBSE Class 3 learning resources, essential concepts and engaging educational content.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE/Class-3"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}