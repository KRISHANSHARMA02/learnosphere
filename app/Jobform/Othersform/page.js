import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/Jobform_Othersform';

export const metadata = {
  description: "Apply for other job roles at Learnosphere: submit your details through our simple application form and join our education team.",
  alternates: {
    canonical: buildCanonicalUrl("Jobform/Othersform"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}