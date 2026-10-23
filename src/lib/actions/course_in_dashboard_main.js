// Helper function (internal to server)
import { backendFetch } from "@/src/helper/appbackend_api";
import { getAllCourses } from "@/src/lib/actions/courses";

const formatDate = (dateString) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Normalize grade: e.g. "12", "12th", "Grade 12", "Class 12" -> "Class 12"
const normalizeClassName = (rawClass) => {
  if (!rawClass) return "";
  const str = String(rawClass).trim();
  const digit = str.match(/\d+/)?.[0];
  if (digit) {
    return `Class ${digit}`;
  }
  return str;
};

export async function fetchStudentDashboardData(studentId, studentClass, studentStream) {
  try {
    // 1️⃣ Check enrollment from backend (Proxy call via Next.js server)
    if (studentId) {
      try {
        const enrolledCourses = await backendFetch(
          "/api/route/getEnrolledCourses",
          {
            method: "POST",
            body: JSON.stringify({ userId: studentId }),
            cache: "no-store", // Ensure fresh data
          }
        );

        if (Array.isArray(enrolledCourses) && enrolledCourses.length > 0) {
          return {
            studentName: "Student",
            hasEnrollment: true,
            myCourses: enrolledCourses.map((item) => {
              let progressValue = 0;
              if (typeof item.progress === "number") {
                progressValue = item.progress;
              } else if (item.isCompleted) {
                progressValue = 100;
              }

              return {
                id: item.course?._id || item.course?.id || item._id,
                title: item.course?.title || "Course",
                progress: progressValue,
                thumbnail: item.course?.thumbnail || "",
                lastAccessed: formatDate(item.course?.updatedAt),
              };
            }),
            recommendedCourses: [],
          };
        }
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
      }
    }

    // 2️⃣ Fetch recommended if NO enrollments (Proxy call via Next.js server)
    const normalizedClass = normalizeClassName(studentClass);
    let coursesList = [];

    if (normalizedClass) {
      try {
        const recommendedData = await backendFetch(
          "/api/route/getRecommendedCourses",
          {
            method: "POST",
            body: JSON.stringify({
              userId: studentId || "",
              class: normalizedClass,
              stream: studentStream || "",
            }),
            cache: "no-store",
          }
        );

        if (Array.isArray(recommendedData)) {
          coursesList = recommendedData;
        } else if (
          recommendedData &&
          Array.isArray(recommendedData.recommendedCourses)
        ) {
          coursesList = recommendedData.recommendedCourses;
        }
      } catch (err) {
        console.error("Error fetching recommended courses from API:", err);
      }
    }

    // 3️⃣ Fallback to getAllCourses if recommended endpoint returns no courses
    if (!coursesList || coursesList.length === 0) {
      try {
        const allCourses = await getAllCourses();
        if (Array.isArray(allCourses) && allCourses.length > 0) {
          const studentDigit = String(studentClass || "").match(/\d+/)?.[0];
          let matched = [];

          if (studentDigit) {
            matched = allCourses.filter((c) => {
              const cDigit = String(c.class || "").match(/\d+/)?.[0];
              return cDigit && cDigit === studentDigit;
            });
          }

          if (matched.length > 0) {
            coursesList = matched;
          } else {
            // If student's class has no specific courses or class is not set, show all courses
            coursesList = allCourses;
          }
        }
      } catch (err) {
        console.error("Error fetching fallback courses:", err);
      }
    }

    // 4️⃣ Prioritize courses matching the student's stream (e.g., Commerce, PCM, PCB)
    if (studentStream && coursesList.length > 0) {
      const streamLower = String(studentStream).toLowerCase();
      coursesList.sort((a, b) => {
        const aMatches =
          (a.subject && a.subject.toLowerCase().includes(streamLower)) ||
          (a.title && a.title.toLowerCase().includes(streamLower));
        const bMatches =
          (b.subject && b.subject.toLowerCase().includes(streamLower)) ||
          (b.title && b.title.toLowerCase().includes(streamLower));

        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0;
      });
    }

    return {
      studentName: "Student",
      hasEnrollment: false,
      myCourses: [],
      recommendedCourses: coursesList.map((course) => ({
        id: course._id || course.id,
        title: course.title,
        rating: course.rating || 4.8,
        students: course.reviewCount || 120,
        price: course.discountPrice || course.price,
        currency: "₹",
        category: course.subject || course.class || "General",
        thumbnail: course.thumbnail,
      })),
    };
  } catch (error) {
    console.error("Server Action Error:", error);
    return {
      studentName: "Student",
      hasEnrollment: false,
      myCourses: [],
      recommendedCourses: [],
    };
  }
}
