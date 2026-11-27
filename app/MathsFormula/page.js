import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/MathsFormula';

export const metadata = {
  title: "Maths Formulas for All Classes",
  description: "Explore important maths formulas, key concepts and useful equations to simplify calculations and support exam preparation.",
  alternates: {
    canonical: buildCanonicalUrl("MathsFormula"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
