import EarningPayouts from "@/components/client/EarningAndPayouts";


export const metadata = {
  title: "Learnosphere Payouts for Tutors | Earn with Teaching",
  description:
    "Learnosphere offers transparent payouts for tutors with flexible teaching options and reliable earnings. Start teaching today and get paid on time, every time.",
  alternates: {
    canonical: "https://learnosphere.in/earning-&-payouts",
  },

};

export default function Page() {
  return (
    <div>
      <EarningPayouts />
    </div>
  );
}
