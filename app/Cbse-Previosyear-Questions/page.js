import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/Cbse-Previosyear-Questions';

export const metadata = {
  title: "CBSE Previous Year Questions: Class-Wise Papers | Learnosphere",
  description: "CBSE previous year questions by class and subject: practise with past papers, understand exam patterns and revise with confidence.",
  alternates: {
    canonical: buildCanonicalUrl("Cbse-Previosyear-Questions"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
