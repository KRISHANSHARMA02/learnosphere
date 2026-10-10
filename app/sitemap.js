import fs from "fs";
import path from "path";
import { getAllBlogs } from "@/src/lib/actions/blogs";
import { getAllCourses } from "@/src/lib/actions/courses";
import { getStateBoardSlug } from "./api/boards/[slug]/route";
import {
  getSamplePapersSlug,
  getSamplePapersPDFSlug,
  getIcseSamplePapersSlug,
} from "@/src/lib/actions/sample_papers_data_fetch";

// Escape XML entities
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
  });
}

export default async function sitemap() {
  const baseUrl = "https://learnosphere.in";
  const appDir = path.join(process.cwd(), "app");
  const staticRoutes = [];

  const excludedFolders = [
    "api",
    "actions",
    "userdashboard",
    "teacherdashboard",
    "studentform",
    "signin",
    "mobileappviewcourses",
    "forgot-password-students",
    "forgot-password-teachers",
    "reset-password-student",
    "reset-password-teachers",
    "authcallback",

  ];
  const excludedFiles = [
    "layout.js",
    "not-found.js",
    "error.js",
    "sitemap.js",
    "robots.js",
  ];

  function walkDir(dir, routePrefix = "") {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      // Skip excluded folders
      if (stat.isDirectory()) {
        if (excludedFolders.includes(file.toLowerCase())) return;
        if (file.startsWith("[") && file.endsWith("]")) return; // skip dynamic folders
        walkDir(fullPath, `${routePrefix}/${file}`);
      } else if (stat.isFile() && file.endsWith(".js")) {
        // Skip excluded files
        if (excludedFiles.includes(file.toLowerCase())) return;
        if (file.startsWith("[") && file.endsWith("].js")) return; // skip dynamic route files

        let route = routePrefix;
        if (file !== "page.js") route += `/${file.replace(".js", "")}`;

        staticRoutes.push({
          url: escapeXml(`${baseUrl}${route.replace(/\/index$/, "")}`),
          lastModified: new Date(),
          changefreq: "daily",
          priority: route === "" ? 1 : 0.8,
        });
      }
    });
  }

  walkDir(appDir);

  // --- Dynamic blogs ---
  let blogs = [];
  try {
    blogs = await getAllBlogs();
  } catch (err) {
    console.error("Error fetching blogs for sitemap:", err);
  }

  const blogsRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/Blog/${encodeURIComponent(blog.slug)}`,
    priority: 0.7,
    lastModified: new Date(),
  }));

  //   const coursesRoutes = [];
  //   try {
  //     const courses = await getAllCourses();
  //     coursesRoutes.push(
  //       ...courses.map((data) => ({
  //         url: `${baseUrl}/Courses/${data.slug}`,
  //         priority: 0.7,
  //         lastModified: new Date(),
  //       }))
  //     );
  //   } catch (err) {
  //     console.error("Error fetching courses for sitemap:", err);
  //   }

  const samplePapersRoutes = [];
  try {
    const samplePapers = await getSamplePapersSlug();
    samplePapersRoutes.push(
      ...samplePapers.map((slug) => ({
        url: `${baseUrl}/CBSE-Sample-Papers/${slug}`,
        priority: 0.7,
        lastModified: new Date(),
      }))
    );
  } catch (err) {
    console.error("Error fetching sample papers for sitemap:", err);
  }

  const samplePapersPDFRoutes = [];
  try {
    const samplePapersPDF = await getSamplePapersPDFSlug();
    samplePapersPDFRoutes.push(
      ...samplePapersPDF.map((data) => ({
        url: `${baseUrl}/CBSE-Sample-Question-Paper/${data.slug}`,
        priority: 0.7,
        lastModified: new Date(),
      }))
    );
  } catch (err) {
    console.error("Error fetching sample papers PDF for sitemap:", err);
  }

  const IcseSamplePapersRoutes = [];
  try {
    const icseSamplePapers = await getIcseSamplePapersSlug();
    IcseSamplePapersRoutes.push(
      ...icseSamplePapers.map((data) => ({
        url: `${baseUrl}/icse-sample-papers/${data.slug}`,
        priority: 0.7,
        lastModified: new Date(),
      }))
    );
  } catch (error) {
    console.error("Error fetching ICSE sample papers for sitemap:", error);
  }

  const StateBoardRoutes = [];
  
    const stateBoards = getStateBoardSlug();
  StateBoardRoutes.push(
    ...stateBoards.map((slug) => ({
      url:  `${baseUrl}/State_Board/${slug}`,
      priority: 0.7,
      lastModified: new Date(),
    }))
  );
  

  return [
    ...staticRoutes,
    ...blogsRoutes,
    ...samplePapersRoutes,
    ...samplePapersPDFRoutes,
    ...IcseSamplePapersRoutes,
    ...StateBoardRoutes
  ];
}
