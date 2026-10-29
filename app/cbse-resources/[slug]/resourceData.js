/**
 * Known CBSE Resource slugs from database (cbsepreviousquestions.list3) and API (cbseRelatedData.json).
 */
export const STATIC_DB_RESOURCE_SLUGS = new Set([
  // list3 items from MySQL cbsepreviousquestions table
  "chemistry-2015-board-paper",
  "ncert-solutions-for-class-9-maths",
  "cbse-class-10-maths-objective-questions",
  "study-apps-for-class-10",
  "class-10-biology-notes",
  "sample-papers-of-science-for-class-9-sa1",
  "ncert-solutions-for-class-10-science",
  "electrostatics-potential-and-capacitance-class-12-notes",
  "maths-worksheet-for-class-3",
  "chemistry-notes-for-class-12",
  "science-experiments-app",
  "cbse-class-7-maths",
  "cbse-class-6-science",
  "class-7th-science-sample-question-paper",
  "ncert-solutions-for-class-6-social-science-civics-chapter-1",
  // Curated topics from backend cbseRelatedData.json / cbse-related API
  "cbse-books-for-class-11",
  "extra-question-for-class-9-science",
  "parabola",
  "coordination-compounds-class-12-notes",
  "combustion-and-flame-class-8-important-questions",
  "cbse-class-9-exam-prep-tips"
]);

export function isCurriculumPattern(slug) {
  if (!slug || typeof slug !== "string") return false;
  const s = slug.toLowerCase().trim();
  const subjPattern = "(maths|math|science|chemistry|physics|biology|english|hindi|social-science|economics|accountancy|business-studies)";
  const clsPattern = "(1[0-2]|[1-9])";

  if (new RegExp(`^${subjPattern}-notes-class-${clsPattern}$`).test(s)) return true;
  if (new RegExp(`^ncert-solutions-class-${clsPattern}-${subjPattern}$`).test(s)) return true;
  if (new RegExp(`^important-questions-${subjPattern}$`).test(s)) return true;
  if (new RegExp(`^cbse-class-${clsPattern}-${subjPattern}-.*$`).test(s)) return true;
  return false;
}

// In-memory cache for live database list3 slugs
let cachedDbSlugs = null;
let lastFetchTime = 0;
const CACHE_TTL = 60 * 1000; // 1 minute

async function getDynamicDatabaseSlugs() {
  const now = Date.now();
  if (cachedDbSlugs && now - lastFetchTime < CACHE_TTL) {
    return cachedDbSlugs;
  }

  const slugs = new Set(STATIC_DB_RESOURCE_SLUGS);

  try {
    const backendUrl = process.env.WEB_BACKEND_URL || "https://learnospherebackend.learnosphere.in";
    const endpoints = [
      "/api/route/CbsePreviousyearQuestions/CBSE-Class-12-Maths-Previous-Year-Papers",
      "/api/route/CbsePreviousyearQuestions/CBSE-Class-10-Maths-Previous-Year-Papers"
    ];

    for (const ep of endpoints) {
      const res = await fetch(`${backendUrl}${ep}`, {
        cache: "no-store",
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        const json = await res.json();
        const rows = json?.data || [];
        for (const row of rows) {
          if (row.list3 && Array.isArray(row.list3)) {
            for (const item of row.list3) {
              if (typeof item === "string") {
                const s = item
                  .toLowerCase()
                  .trim()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "");
                if (s) slugs.add(s);
              }
            }
          }
        }
      }
    }
    cachedDbSlugs = slugs;
    lastFetchTime = now;
  } catch (err) {
    // Graceful fallback to static set on error
    return slugs;
  }

  return slugs;
}

/**
 * Validates whether the slug exists in actual CBSE database or API data.
 */
export async function validateCbseResourceSlug(slug) {
  if (!slug || typeof slug !== "string") return false;
  const cleanSlug = slug.toLowerCase().trim();

  // Basic sanity check: prevent invalid characters or extreme length
  if (!/^[a-z0-9-]+$/.test(cleanSlug) || cleanSlug.length > 150) {
    return false;
  }

  // 1. Check known static database slugs & curriculum patterns
  if (STATIC_DB_RESOURCE_SLUGS.has(cleanSlug)) return true;
  if (isCurriculumPattern(cleanSlug)) return true;

  // 2. Query backend cbse-related API for dynamic database/API entries
  try {
    const backendUrl = process.env.WEB_BACKEND_URL || "https://learnospherebackend.learnosphere.in";
    const res = await fetch(`${backendUrl}/api/route/cbse-related/${cleanSlug}`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.success && json?.data) {
        return true;
      }
    }
  } catch (e) {
    // Ignore and proceed
  }

  // 3. Check dynamic database items from cbsepreviousquestions table
  try {
    const dbSlugs = await getDynamicDatabaseSlugs();
    if (dbSlugs.has(cleanSlug)) return true;
  } catch (e) {
    // Ignore
  }

  return false;
}

export function getResourceContent(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();

  // 1. Convert the slug back to a readable title
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // 2. Detect class level from the title
  let classLevel = null;
  const classMatch = title.match(/Class\s*(\d{1,2})/i) || title.match(/(\d{1,2})th/i);
  if (classMatch) {
    classLevel = classMatch[1];
  } else if (/Sa1|Sa2/i.test(title)) {
    // Inference from common terms
    classLevel = "10";
  }

  // 3. Detect subject from the title
  let subject = null;
  const subjects = [
    'Maths', 'Math', 'Science', 'Chemistry', 'Physics', 'Biology', 
    'English', 'Hindi', 'Social Science', 'Economics', 'Accountancy', 'Business Studies'
  ];
  for (const sub of subjects) {
    if (title.toLowerCase().includes(sub.toLowerCase())) {
      subject = sub;
      break;
    }
  }

  const isKnownDb = STATIC_DB_RESOURCE_SLUGS.has(cleanSlug);
  const isCurriculum = isCurriculumPattern(cleanSlug);

  // If slug has no class and no subject, and is not a known database/curriculum resource, return null (invalid)
  if (!isKnownDb && !isCurriculum && (!classLevel || !subject)) {
    return null;
  }

  // Set default fallbacks for content generation
  const subjStr = subject || (cleanSlug.includes('math') ? 'Maths' : cleanSlug.includes('science') ? 'Science' : 'this subject');
  const clsStr = classLevel ? `Class ${classLevel}` : 'Class 10';

  // 4. Return the structured object
  return {
    title,
    classLevel,
    subject,
    description: [
      `Welcome to the ultimate learning hub for ${title}. At Learnosphere, we are dedicated to providing you with the best educational resources tailored for ${clsStr}. Our comprehensive materials are designed to help you build a strong foundation in ${subjStr} and excel in your academic journey.`,
      `Studying ${title} requires consistency and the right guidance. Our expert educators at Learnosphere have curated these materials to simplify complex concepts. Whether you are preparing for your upcoming board exams or competitive tests, these resources will serve as your reliable study companion.`,
      `Remember to practice regularly and revise the key concepts. We recommend going through the syllabus thoroughly and attempting previous year papers. With Learnosphere's structured approach, mastering ${subjStr} for ${clsStr} has never been easier.`
    ],
    syllabusLinks: generateSyllabusLinks(classLevel, subject),
    faqs: [
      {
        question: `What is the best way to study for ${title}?`,
        answer: `The best approach is to follow the NCERT curriculum strictly, practice regularly with sample papers, and clarify doubts immediately using Learnosphere's expert resources.`
      },
      {
        question: `Is ${title} important for board exams?`,
        answer: `Yes, topics covered in ${clsStr} ${subjStr} hold significant weightage in board exams. A thorough understanding will ensure high scores.`
      },
      {
        question: `How can Learnosphere help with ${title}?`,
        answer: `Learnosphere provides concise notes, important questions, previous year papers, and video lectures to make learning engaging and effective.`
      },
      {
        question: `Are there previous year papers available for ${title}?`,
        answer: `Absolutely! We provide a collection of previous year question papers for ${clsStr} ${subjStr} to help you understand the exam pattern and practice effectively.`
      }
    ],
    pypLinks: generatePypLinks(classLevel, subject),
    relatedLinks: generateRelatedLinks(classLevel, subject)
  };
}

function generateSyllabusLinks(classLevel, subject) {
  const links = [];
  
  if (classLevel === "10") {
    links.push({ title: 'CBSE Class 10 Syllabus', href: '/CBSE-10thsyllabus' });
    if (subject) links.push({ title: `Class 10 ${subject} Syllabus`, href: `/CBSE/Class-10-${subject}` });
  } else if (classLevel === "11") {
    links.push({ title: 'CBSE Class 11 Syllabus', href: '/CBSE-11thsyllabus' });
  } else if (classLevel === "12") {
    links.push({ title: 'CBSE Class 12 Syllabus', href: '/CBSE-12thsyllabus' });
    if (subject) links.push({ title: `Class 12 ${subject} Syllabus`, href: `/CBSE/Class-12-${subject}` });
  } else if (classLevel && parseInt(classLevel) < 10) {
    links.push({ title: `CBSE Class ${classLevel} Syllabus`, href: `/CBSE/Class-${classLevel}` });
  } else {
    links.push({ title: 'General CBSE Syllabus', href: '/CBSE_Syllabus' });
  }
  links.push({ title: 'All CBSE Resources', href: '/CBSE' });
  return links;
}

function generatePypLinks(classLevel, subject) {
  const links = [];
  const baseCls = classLevel === "12" ? "12" : "10";
  const startYear = baseCls === "12" ? 2023 : 2024;
  
  for (let i = 0; i < 5; i++) {
    const year = startYear - i;
    links.push({
      title: `CBSE Class ${baseCls} Maths Question Paper ${year}`,
      slug: `Cbse-Class-${baseCls}-Maths-Question-Paper-${year}`
    });
  }
  return links;
}

function generateRelatedLinks(classLevel, subject) {
  const baseSubj = subject || "Science";
  const baseCls = classLevel || "10";
  const clsStr = `Class ${baseCls}`;

  return [
    { title: `${baseSubj} Notes for ${clsStr}`, href: `/cbse-resources/${baseSubj.toLowerCase()}-notes-class-${baseCls}` },
    { title: `NCERT Solutions for ${clsStr} ${baseSubj}`, href: `/cbse-resources/ncert-solutions-class-${baseCls}-${baseSubj.toLowerCase()}` },
    { title: `Previous Year Questions ${clsStr}`, href: `/Cbse-Previosyear-Questions` },
    { title: `Important Questions for ${baseSubj}`, href: `/cbse-resources/important-questions-${baseSubj.toLowerCase()}` },
    { title: 'View All Subjects', href: '/CBSE' }
  ];
}
