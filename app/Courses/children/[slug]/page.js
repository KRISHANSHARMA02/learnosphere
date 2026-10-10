import ChildrenCourseDetail from "./childrenCourseDetails";
import { getCourseById } from "@/src/lib/actions/courses";
import { notFound } from "next/navigation";
import Script from "next/script";

const BASE_URL = "https://learnosphere.in";

export async function generateMetadata(props) {
  const params = await props.params;
  const slug = params.slug;

  // Extract course ID (expecting slug like "kids-math-course-123")
  const courseId = slug?.split("-").pop();

  if (!courseId) {
    return {
      title: "Learnosphere Children's Courses",
      description: "Explore kids courses and learning programs at Learnosphere.",
      alternates: {
        canonical: `${BASE_URL}/Courses/children/${slug || ""}`,
      },
    };
  }

  const course = await getCourseById(courseId);

  if (!course) {
    return {
      title: "Course Not Found | Learnosphere",
      description: "This children's course does not exist or has been removed.",
      alternates: {
        canonical: `${BASE_URL}/Courses/children/${slug}`,
      },
    };
  }

  const seoTitle =
    course.seo_title || `${course.title || "Children's Course"} | Learnosphere`;
  const seoDescription =
    course.seo_description ||
    course.short_description ||
    course.description ||
    `Learn ${course.title} with playful lessons, worksheets and expert tutors.`;
  const canonicalUrl = `${BASE_URL}/Courses/children/${slug}`;

  // pick an image from common fields
  const image =
    course.courseImage || course.image || course.thumbnail || null;
  const images = image ? [image] : [];

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: course.seo_keywords || `${course.title || "Children's Course"}, kids courses, Learnosphere`,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      images,
      type: "article",
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function CoursePage(props) {
  const params = await props.params;
  const slug = params.slug;
  const courseId = slug?.split("-").pop();

   if (!courseId) return notFound();

  const course = await getCourseById(courseId);

  if (!course) return notFound();

   // 🔹 Course Schema (dynamic)
  // const courseSchema = {
  //   "@context": "https://schema.org",
  //   "@type": "Course",
  //   name: course.title,
  //   description:
  //     course.seo_description ||
  //     course.short_description ||
  //     course.description,
  //   provider: {
  //     "@type": "Organization",
  //     name: "Learnosphere",
  //     url: BASE_URL,
  //   },
  //   educationalCredentialAwarded: course.grade || "CBSE",
  //   courseMode: "Online",
  //   url: `${BASE_URL}/Courses/children/${slug}`,
  //   image: course.courseImage,
  // };

  return (
    <>
     {/* ✅ JSON-LD Schema */}
      {/* <Script
        id={`course-schema-${courseId}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema),
        }}
      /> */}

        <ChildrenCourseDetail course={course} />
    </>
  );
}
