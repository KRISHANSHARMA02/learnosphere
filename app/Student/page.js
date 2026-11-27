import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/Student';

export const metadata = {
  title: "Book a Home Tutor or Online Educator | Learnosphere",
  description: "Book a home tutor near you with Learnosphere: search verified educators by subject and class, compare profiles and book a free demo.",
  alternates: {
    canonical: buildCanonicalUrl("Student"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}