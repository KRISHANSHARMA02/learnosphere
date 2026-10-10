// function for get courses from backend on server side 


import { backendFetch } from "../../helper/appbackend_api";

export async function getAllCourses() {
  try {
    const data = await backendFetch("/api/route/getAllcourses", { method: "POST" });
    return data || [];
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
}


export async function getCourseById(courseId) {
  if (!courseId) return null;
  try {
    const data = await backendFetch("/api/route/getCourseDetailsByIdonWeb", {
      method: "POST",
      body: JSON.stringify({ courseId }),
    });

    
    if (data?.courseDetails) {
      return {
        ...data.courseDetails,
        syllabus: data?.syllabus || [], 
      };
    }
    
    return null;
  } catch (err) {
    console.error("Error fetching course by ID:", err);
    return null;
  }
}