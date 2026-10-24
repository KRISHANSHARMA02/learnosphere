import { backendFetch } from "@/src/helper/appbackend_api";

// Helper: Check if student has purchased / enrolled in this course
export async function checkStudentEnrollment(courseId, userId) {
  if (!courseId || !userId) return false;
  try {
    const data = await backendFetch("/api/route/getEnrolledCourses", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });

    if (Array.isArray(data)) {
      return data.some((item) => {
        const cId = item.course?._id || item.course?.id || item._id;
        return String(cId) === String(courseId);
      });
    }
    return false;
  } catch (err) {
    console.error("Error verifying enrollment status:", err);
    return false;
  }
}

// 1. Fetch Basic Course Info
export async function getCourseDetails(courseId, userId) {
  try {
    const isPurchased = await checkStudentEnrollment(courseId, userId);

    let details = null;
    let syllabus = [];

    // If NOT purchased (recommended course):
    // Use the public metadata endpoint - never requests video/notes URLs
    if (!isPurchased) {
      const data = await backendFetch("/api/route/getCourseDetailsByIdonWeb", {
        method: "POST",
        body: JSON.stringify({ courseId }),
      });
      details = data?.courseDetails;
      syllabus = data?.syllabus || [];
    } else {
      // If purchased: fetch full course content
      const data = await backendFetch("/api/route/getCourseContentById", {
        method: "POST",
        body: JSON.stringify({ courseId, userId }),
      });
      details = data?.courseDetails;
    }

    if (!details) return null;

    return {
      id: details._id,
      title: details.title,
      description: details.description,
      thumbnail: details.thumbnail,
      price: details.price,
      currency: "₹",
      discountPrice: details.discountPrice,
      isPurchased, // true for purchased, false for recommended
      progress: 0,
      lastUpdated: details.updatedAt
        ? new Date(details.updatedAt).toLocaleDateString()
        : "Recently",
      students: details.reviewCount || 1200,
      faqs: details.faqs || [],
      syllabus,
    };
  } catch (err) {
    console.error("Error fetching course details:", err);
    return null;
  }
}

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
}

// 3. Fetch Content for Subject
export async function getSubjectContent({ courseId, subject, userId }) {
  try {
    const isPurchased = await checkStudentEnrollment(courseId, userId);

    // If NOT purchased (recommended course):
    // Fetch only syllabus metadata from the public endpoint - NO video/notes URLs requested
    if (!isPurchased) {
      const data = await backendFetch("/api/route/getCourseDetailsByIdonWeb", {
        method: "POST",
        body: JSON.stringify({ courseId }),
      });

      const syllabus = data?.syllabus || [];
      const matchedSubject = syllabus.find(
        (s) =>
          String(s.subject).toLowerCase().trim() ===
          String(subject).toLowerCase().trim()
      );

      const sections = matchedSubject?.sections || [];
      const allLectures = sections.flatMap((s) => s.lectures || []);

      return {
        isPurchased: false,
        courseId,
        videos: allLectures
          .filter((l) => l.type === "video")
          .map((v, idx) => ({
            id: v._id || `vid_${idx}`,
            title: v.title,
            duration: "10:00",
            url: null, // Stripped / Never sent
            isLocked: true,
            status: "locked",
          })),

        notes: allLectures
          .filter((l) => l.type === "note")
          .map((n, idx) => ({
            id: n._id || `note_${idx}`,
            title: n.title,
            size: "PDF",
            url: null, // Stripped / Never sent
            isLocked: true,
          })),

        tests: allLectures
          .filter((l) => l.type === "test")
          .map((t, idx) => ({
            id: t._id || `test_${idx}`,
            title: t.title,
            isLocked: true,
          })),
      };
    }

    // If purchased: fetch full content with videoUrl and noteUrl
    const jsonData = await backendFetch(
      `/api/route/getCourseContentBySubject`,
      {
        method: "POST",
        body: JSON.stringify({ courseId, subject, userId }),
      }
    );

    if (!jsonData?.data?.length) {
      return { isPurchased: true, courseId, videos: [], notes: [], tests: [] };
    }

    const subjectData = jsonData.data[0];
    const sections = subjectData.sections || [];
    const allLectures = sections.flatMap((s) => s.lectures || []);

    return {
      isPurchased: true,
      courseId,
      videos: allLectures
        .filter((l) => l.type === "video")
        .map((v) => ({
          id: v._id,
          title: v.title,
          duration: v.duration || "10:00",
          url: v.videoUrl,
          isLocked: false,
          status: "pending",
        })),

      notes: allLectures
        .filter((l) => l.type === "note")
        .map((n) => ({
          id: n._id,
          title: n.title,
          size: "PDF",
          url: n.noteUrl,
          isLocked: false,
        })),

      tests: allLectures
        .filter((l) => l.type === "test")
        .map((t) => ({
          id: t._id,
          title: t.title,
          isLocked: false,
        })),
    };
  } catch (err) {
    console.error("Error fetching subject content:", err);
    return { isPurchased: false, courseId, videos: [], notes: [], tests: [] };
  }
}
