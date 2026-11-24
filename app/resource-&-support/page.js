import ClientPage from '@/components/client/resource-&-support';

export const metadata = {
  title: {
    absolute: "Learnosphere Resources & Support for Students and Teachers | Learnosphere",
  },
  description: "Explore Learnosphere services for students and teachers, including one-to-one tutoring, home tuition, online courses, study materials, quizzes and teaching opportunities."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
