import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import MiddleEastCountryPage from "./slugcontent";

export async function generateMetadata(props) {
  const params = await props.params;
  const slug = params.slug;

  const BASE_URL = "https://learnosphere.in";   // ← Your real domain

  try {
    const res = await fetch(
      `${WEB_BACKEND_URL}/api/route/content/v1/get-middle-east-content/${slug}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    if (!data.success || !data.page) {
      return {
        title: "Middle East Education Guide | Learnosphere",
        description:
          "Explore CBSE learning resources, guides, and tutoring options for Middle East students.",
        alternates: {
          canonical: `${BASE_URL}/middle-east/${slug}`,
        },
      };
    }

    const page = data.page;

    return {
      title: page.seo_title || `CBSE Education in ${page.country_name} | Learnosphere`,
      description:
        page.seo_description ||
        page.short_intro ||
        `Complete CBSE education guide for ${page.country_name} including admissions, syllabus, and online tuition.`,

      keywords:
        page.seo_keywords ||
        `CBSE ${page.country_name}, CBSE online tuition ${page.country_name}, Learnosphere`,

      openGraph: {
        title: page.seo_title || `Study in ${page.country_name} - CBSE Guide`,
        description: page.seo_description || page.short_intro,
        images: page.hero_image ? [page.hero_image] : [],
        url: `${BASE_URL}/middle-east/${slug}`
      },

      // ⭐ AUTOMATIC CANONICAL URL
      alternates: {
        canonical: `${BASE_URL}/middle-east/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: "Learnosphere Middle East Guide",
      description:
        "Your trusted resource for CBSE learning in Middle East countries.",
      alternates: {
        canonical: `${BASE_URL}/middle-east/${slug}`,
      },
    };
  }
}

export default async function Page(props) {
  const params = await props.params;    // FIXED
  const slug = params.slug;

  return <MiddleEastCountryPage slug={slug} />;
}
