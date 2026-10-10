import PartTime from "@/components/client/PartTimeTutorJob";

export const metadata = {
  title: "Part-Time Tutor Jobs | Start Teaching with Learnosphere",
  description:
    "Find part-time tutor jobs at Learnosphere and teach students with flexible schedules and secure payouts. Start teaching today and earn from your skills.",
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
