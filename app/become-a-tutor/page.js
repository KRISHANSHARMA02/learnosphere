import TutorJobs from "@/components/client/BecomeATutor";

export const metadata = {
  title: "Become a Tutor at Learnosphere | Teach & Earn Easily",
  description:
    "Become a tutor at Learnosphere and start teaching with flexible hours, easy onboarding, and reliable payouts. Share your skills and earn effortlessly today.",
  alternates: {
    canonical: "https://learnosphere.in/become-a-tutor",
  },

};

export default function Page() {
  return (
    <div>
      <TutorJobs />
    </div>
  );
}
