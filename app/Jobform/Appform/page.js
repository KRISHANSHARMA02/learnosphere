import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/Jobform_Appform';

export const metadata = {
  description: "Apply for app developer jobs at Learnosphere: fill in the application form and share your skills to join our growing education team.",
  alternates: {
    canonical: buildCanonicalUrl("Jobform/Appform"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}