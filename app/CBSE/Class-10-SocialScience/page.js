import ClientPage from '@/components/client/CBSE_Class-10-SocialScience';

export const metadata = {
  title: {
    absolute: "CBSE Class 10 SST Syllabus & Chapter | Learnosphere",
  },
  description: "Explore the CBSE Class 10 SST syllabus for classes 1 to 12, including History, Geography, Civics and Economics chapter lists, marks distribution and map work."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
