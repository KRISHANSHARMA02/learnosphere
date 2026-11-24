import ClientPage from '@/components/client/CBSE_Class-12-Math';

export const metadata = {
  title: {
    absolute: "CBSE Class 12 Maths Syllabus, Chapters & Exam Pattern | Learnosphere",
  },
  description: "Explore the CBSE Class 12 Maths syllabus with all 13 chapters, unit-wise marks distribution, exam pattern, internal assessment and official syllabus PDF."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
