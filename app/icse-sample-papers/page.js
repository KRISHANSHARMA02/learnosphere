import ClientPage from '@/components/client/icse-sample-papers';

export const metadata = {
  title: "ICSE Practice Papers for Exam Preparation",
  description: "Use ICSE practice papers to review key concepts, assess your preparation and become more familiar with school exam questions."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}