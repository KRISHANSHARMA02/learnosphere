import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/Refer&Earn';

export const metadata = {
  description: "Refer and earn with Learnosphere: invite friends or fellow tutors to join and earn rewards for every successful referral.",
  alternates: {
    canonical: buildCanonicalUrl("Refer&Earn"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}