import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/Forgot-password-teachers';

export const metadata = {
  title: "Reset Password for Learnosphere Tutor Accounts",
  description: "Forgot your Learnosphere tutor password? Reset it quickly and securely to get back into your account and keep teaching.",
  alternates: {
    canonical: buildCanonicalUrl("Forgot-password-teachers"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}