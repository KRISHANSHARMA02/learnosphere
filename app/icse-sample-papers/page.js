import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/icse-sample-papers';

export const metadata = {
  title: {
    absolute: "ICSE Sample Papers for Classes 8 to 10 | Learnosphere",
  },
  description: "Explore ICSE sample papers for Classes 8, 9 and 10. Access Maths practice papers, question sets and available solutions for exam preparation.",
  alternates: {
    canonical: buildCanonicalUrl("icse-sample-papers"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
