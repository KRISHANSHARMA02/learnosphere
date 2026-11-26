import PartTime from "@/components/client/PartTimeTutorJob";

export const metadata = {
  title: "Part-Time Tutor Jobs at Learnosphere | Apply to Teach",
  description:
    "Explore part-time tutoring opportunities with Learnosphere. Apply to teach online or provide home tuition, share your subject expertise and connect with students.",
  alternates: {
    canonical: "https://learnosphere.in/part-time-tutor-jobs",
  },

};

export default function Page() {
  return (
    <div>
      <PartTime />
    </div>
  );
}
