import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/State_Board';

export const metadata = {
  title: "State Board Education & Study Resources",
  description: "Explore state board curriculum information and learning resources for students across different classes and subjects.",
  alternates: {
    canonical: buildCanonicalUrl("State_Board"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
