import ClientPage from '@/components/client/CBSE-Sample-Papers';

export const metadata = {
  title: "CBSE Sample Papers | Practice Papers for Classes 1–12",
  description: "Practice CBSE sample papers for Classes 1 to 12 and prepare effectively for exams with useful questions, revision material and study resources."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}