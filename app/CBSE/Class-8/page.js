import ClientPage from '@/components/client/CBSE_Class-8';

export const metadata = {
  title: {
    absolute: "CBSE Class 8 Syllabus: Subjects & NCERT Books | Learnosphere"
  },
  description: "Explore the CBSE Class 8 syllabus with NCERT textbooks, subject-wise learning areas and resources for English, Mathematics, Science, Social Science and languages."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
