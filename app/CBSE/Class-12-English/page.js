import ClientPage from '@/components/client/CBSE_Class-12-English';

export const metadata = {
  title: {
    absolute: "CBSE Class 12 English Syllabus & Chapters | Learnosphere",
  },
  description: "Explore the CBSE Class 12 English Core syllabus, with Flamingo and Vistas chapter lists, reading and writing sections, marks distribution, and assessment."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
