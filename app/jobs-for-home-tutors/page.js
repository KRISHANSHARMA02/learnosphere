import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/jobs-for-home-tutors';

export const metadata = {
  title: "Home tutor jobs in Jaipur - Find the Best Tuition Teachers Nearby!",
  description: "Jobs for home tutors in India: join Learnosphere, create your profile, connect with students near you and start earning by teaching.",
  alternates: {
    canonical: buildCanonicalUrl("jobs-for-home-tutors"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}