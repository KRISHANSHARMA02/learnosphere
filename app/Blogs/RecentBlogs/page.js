import RecentBlogsCards from "./recentBlogsCards";
import { getRecentBlogs } from "@/src/lib/actions/blogs";

export const revalidate = 60; // ✅ re-fetch from WordPress every 60s


export default async function CoursePage() {

  const blogs = await getRecentBlogs();

  return <RecentBlogsCards blogs={blogs} />;
}