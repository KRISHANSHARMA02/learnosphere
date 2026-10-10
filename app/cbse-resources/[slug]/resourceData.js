export function getResourceContent(slug) {
  if (!slug) return null;

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

  // Set default fallbacks for content generation
  const subjStr = subject || "this subject";
  const clsStr = classLevel ? `Class ${classLevel}` : "your class";

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
