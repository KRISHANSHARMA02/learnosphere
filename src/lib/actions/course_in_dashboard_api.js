import { backendFetch } from "@/src/helper/appbackend_api";

// 1. Fetch Basic Course Info
export async function getCourseDetails(courseId, userId) {
  try {
    const data = await backendFetch("/api/route/getCourseContentById", {
      method: "POST",
      body: JSON.stringify({ courseId, userId }),
    });

    const details = data?.courseDetails;
    if (!details) return null;

    return {
      id: details._id,
      title: details.title,
      description: details.description,
      thumbnail: details.thumbnail,
      price: details.price,
      currency: "₹",
      discountPrice: details.discountPrice,
      isPurchased: true,
      progress: 0,
      lastUpdated: details.updatedAt
        ? new Date(details.updatedAt).toLocaleDateString()
        : "Recently",
      students: details.reviewCount || 1200,
      faqs: details.faqs || [],
    };
  } catch (err) {
    console.error("Error fetching course details:", err);
    return null;
  }
};

  // 2. Fetch Subjects List
export async function getSubjects(courseId) {
  try {
    const json = await backendFetch(
      `/api/route/getCourseSubjectsByCourseId/${courseId}`,
      { method: "GET" }
    );

    return Array.isArray(json.data)
      ? json.data.map((item) => ({
          id: item.subject,
          title: item.subject,
          totalLessons: item.totalLectures || 0,
          videoCount: item.videos || 0,
          noteCount: item.notes || 0,
        }))
      : [];
  } catch (err) {
    console.error("Error fetching subjects:", err);
    return [];
  }
};

  // 3. Fetch Content for Subject (Flattened)
 export async function getSubjectContent({ courseId, subject, userId }) {
  try {
    const jsonData = await backendFetch(
      `/api/route/getCourseContentBySubject`,
      {
        method: "POST",
        body: JSON.stringify({ courseId, subject, userId }),
      }
    );

    if (!jsonData?.data?.length) {
      return { videos: [], notes: [], tests: [] };
    }

    const subjectData = jsonData.data[0];
    const sections = subjectData.sections || [];

    const allLectures = sections.flatMap((s) => s.lectures || []);

    return {
      videos: allLectures
        .filter((l) => l.type === "video")
        .map((v) => ({
          id: v._id,
          title: v.title,
          duration: "10:00",
          url: v.videoUrl,
          status: "pending",
        })),

      notes: allLectures
        .filter((l) => l.type === "note")
        .map((n) => ({
          id: n._id,
          title: n.title,
          size: "PDF",
          url: n.noteUrl,
        })),

      tests: allLectures
        .filter((l) => l.type === "test")
        .map((t) => ({
          id: t._id,
          title: t.title,
        })),
    };
  } catch (err) {
    console.error("Error fetching subject content:", err);
    return { videos: [], notes: [], tests: [] };
  }
};
