import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/CBSE_Class-11-PoliticalScience';

export const metadata = {
  title: "CBSE Class 11 Political Science Exam Prep | Learnosphere",
  description: "CBSE Class 11 Political Science: understand the Constitution, rights and key political concepts with study support and expert tutors.",
  alternates: {
    canonical: buildCanonicalUrl("CBSE/Class-11-PoliticalScience"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}