import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/Cbse-Notes';

export const metadata = {
  title: "CBSE Study Notes, Important Questions & Project Ideas | Learnosphere",
  description: "CBSE notes from Learnosphere: study material, exam tips and important questions by class and subject to help students revise smarter.",
  alternates: {
    canonical: buildCanonicalUrl("Cbse-Notes"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
