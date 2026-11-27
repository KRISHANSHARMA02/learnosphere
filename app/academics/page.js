import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import AcademicsClientWrapper from '@/components/client/academics_wrapper';

export const metadata = {
  description: "Explore academic courses on Learnosphere, including computer science and IT, with study notes, expert tutors and flexible online learning.",
  alternates: {
    canonical: buildCanonicalUrl("academics"),
  },
};

export default function Page(props) {
  return <AcademicsClientWrapper {...props} />;
}