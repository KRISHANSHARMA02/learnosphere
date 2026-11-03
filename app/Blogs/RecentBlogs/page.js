import RecentBlogsCards from "./recentBlogsCards";
import { getRecentBlogs } from "@/src/lib/actions/blogs";

export const revalidate = 60; // ✅ re-fetch from WordPress every 60s


export default async function CoursePage() {

  const blogs = await getRecentBlogs();

  return <RecentBlogsCards blogs={blogs} />;
}
export const metadata = {
  title: { absolute: "Latest Education News & Board Exam Updates | Learnosphere" },
  description: "Read the latest education blogs from Learnosphere: study tips, exam updates, CBSE news and guides for students, parents and tutors.",
};
