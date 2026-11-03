import ClientPage from '@/components/client/Signin';

export const metadata = {
  title: "Sign In to Your Learnosphere Account | Tutors",
  description: "Sign in to your Learnosphere account as a student or tutor to book classes, manage learning and track your progress."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}