import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/live-one-to-one';

export const metadata = {
  title: "Live One-to-One Online Classes with Expert Tutors | Learnosphere",
  description: "Live one-to-one online classes with expert tutors: personalised lessons, real-time doubt solving and flexible timing for every student.",
  alternates: {
    canonical: buildCanonicalUrl("live-one-to-one"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}