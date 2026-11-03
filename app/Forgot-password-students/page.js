import ClientPage from '@/components/client/Forgot-password-students';

export const metadata = {
  title: "Reset Password for Learnosphere Student Accounts",
  description: "Forgot your Learnosphere student password? Reset it quickly and securely to get back into your account and continue learning."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}