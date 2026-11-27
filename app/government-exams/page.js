import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import GovernmentExamsClientWrapper from '@/components/client/government-exams_wrapper';

export const metadata = {
  title: "Government Exam Prep: UPSC, SSC, Railway & Banking | Learnosphere",
  description: "Prepare for government exams like UPSC, SSC, Railway and Banking with expert tutors, study notes and guidance from Learnosphere.",
  alternates: {
    canonical: buildCanonicalUrl("government-exams"),
  },
};

export default function Page(props) {
  return <GovernmentExamsClientWrapper {...props} />;
}