import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/ICSE-Sample-Papers-Page';

export const metadata = {
  title: "ICSE Sample Papers for Classes 8 to 12 | Learnosphere",
  description: "ICSE sample papers for Classes 8 to 12: practise exam-style papers, test your preparation and revise with Learnosphere.",
  alternates: {
    canonical: buildCanonicalUrl("ICSE-Sample-Papers-Page"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
