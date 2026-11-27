import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";

export const metadata = {
  title: "Online Quiz | Learnosphere",
  description: "Engage your young learner with fun and interactive online quizzes for All Classes. Covering basic subjects like Math, English, and Science, these quizzes help reinforce early learning, track progress, and build confidence. Start today and make learning enjoyable!",
  alternates: {
    canonical: buildCanonicalUrl("Online-Quiz"),
  },
};

export default function Layout({ children }) {
  return children;
}
