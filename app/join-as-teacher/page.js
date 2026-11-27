import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import JoinAsTeacher from "@/components/client/JoinAsTeacher";

export const metadata = {
  title: "Join as a Teacher on Learnosphere | Educator Opportunities",
  description:
    "Join Learnosphere as a teacher. Showcase your teaching expertise, choose your subjects and preferred teaching modes, set your base rate and connect with interested students.",
  alternates: {
    canonical: "https://learnosphere.in/join-as-teacher",
  },

  alternates: {
    canonical: buildCanonicalUrl("join-as-teacher"),
  },
};

export default function Page() {
  return (
    <div>
      <JoinAsTeacher />
    </div>
  );
}
