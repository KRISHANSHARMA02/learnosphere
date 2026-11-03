import ClientPage from '@/components/client/academics';

export const metadata = {
  description: "Explore academic courses on Learnosphere, including computer science and IT, with study notes, expert tutors and flexible online learning."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}