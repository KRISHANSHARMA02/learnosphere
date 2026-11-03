import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
// import htmlParser from "html-react-parser";
import parse, { domToReact } from "html-react-parser";
import he from "he"; // For decoding HTML entities
import { FaqItem } from "@/components/Faqs";

export async function generateStaticParams() {
  const res = await fetch(
    "https://blogs.learnosphere.in/wp-json/wp/v2/posts?_embed&&per_page=100",
    { cache: "no-store" }
  );
  const blogs = await res.json();

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

const blogMetaDescriptions = {
  "10-best-ai-tools-for-teaching-to-boost-engagement-in-2025": "Discover 10 AI tools teachers can use to boost classroom engagement, save prep time and personalise learning. Practical picks for Indian educators.",
  "2024-2025-board-exam-success-top-tips-from-tutors": "Board exam tips from experienced tutors: revision plans, time management and answer-writing strategies to help CBSE students score higher.",
  "2025-new-year-of-unstoppable-success": "Start the new year with clear goals, smart study habits and steady motivation. Learnosphere shares ideas to help students and families aim higher in 2025.",
  "benefits-of-online-quiz-for-students": "Learn how online quizzes help students revise faster, spot weak topics and build exam confidence. Explore the benefits of quiz-based learning.",
  "best-home-tuition-for-students-connect-with-a-nearby-tutor-easily": "Looking for home tuition? See how to find a verified tutor near you, compare options and book a demo class easily with Learnosphere.",
  "cbse-class-10-12-private-candidate-exam-form-2026": "CBSE Class 10 and 12 private candidate exam form 2026: who can apply, key steps and what to prepare. Read the update before you register.",
  "cbse-ctet-answer-key-2024": "How to check the CBSE CTET answer key 2024, understand the marking and raise objections. A quick guide for CTET candidates.",
  "cbse-date-sheet-2026-download-cbse-class-10th-12th-pdfs": "CBSE date sheet 2026 for Class 10 and 12: check exam dates, download the PDF and plan your revision with a clear timetable.",
  "cbse-introduces-sugar-boards-in-schools-to-tackle-rising-type-2-diabetes-in-children": "CBSE introduces sugar boards in schools to tackle rising type 2 diabetes in children. Learn what they are and what parents should know.",
  "cbse-syllabus-2025‑26-what-you-need-to-know": "CBSE syllabus 2025-26 explained: key changes, subjects and topics students and parents need to know before planning the year.",
  "cbse-syllabus-for-class-1-5": "CBSE syllabus for Class 1 to 5: subjects, key topics and learning goals for primary students. A simple guide for parents and teachers.",
  "cbse-syllabus-for-class-10th": "CBSE Class 10 syllabus explained: subject-wise topics, key chapters and tips to plan your board exam preparation with confidence.",
  "cbse-syllabus-your-complete-guide-to-subjects-topics-updates": "A complete guide to the CBSE syllabus: subjects, topics and updates for every class, so students and parents can plan study better.",
  "celebrate-maha-shivratri-2025-with-devotion-and-learning": "Celebrate Maha Shivratri 2025 with devotion and learning. Discover its meaning, traditions and simple ways to share its values with children.",
  "class-10-12-exam-rescheduling-notice": "Class 10 and 12 exam rescheduling notice: see what changed, how it affects your timetable and how to adjust your revision plan.",
  "countdown-to-cbse-12th-2024-25": "The countdown to CBSE Class 12 2024-25 board exams is on. Get revision tips, time management ideas and ways to stay calm and focused.",
  "holi-2025-the-festival-of-colors": "Holi 2025, the festival of colours: learn its story, meaning and safe, fun ways for children and families to celebrate together.",
  "home-tuition": "Home tuition gives students one-on-one attention at home. Learn how it works, who it suits and how to find a trusted tutor in India.",
  "home-tuition-and-the-advantages": "Explore the advantages of home tuition: personal attention, flexible timing, focused doubt-solving and better confidence for students.",
  "home-tuition-made-easy-with-learnosphere": "Home tuition made easy: browse verified tutors, book a free demo and start personalised learning at home or online with Learnosphere.",
  "home-tuition-vs-class-tuition-which-one-is-right-for-you": "Home tuition vs class tuition: compare attention, cost, flexibility and results to choose the right option for your child.",
  "how-ai-is-changing-the-way-students-study-in-india-beyond-just-screen-time": "See how AI is changing the way students study in India, from personalised practice to smarter doubt-solving, and what it means beyond screen time.",
  "how-challenges-help-to-build-student-adaptability": "Challenges can help students grow. Learn how setbacks build adaptability, resilience and problem-solving skills, and how parents can support them.",
  "how-learnosphere-is-revolutionizing-education-for-students-tutors-and-parents": "See how Learnosphere is changing education for students, tutors and parents with verified tutors, home and online classes, and simple booking.",
  "how-to-cover-the-cbse-board-exam-syllabus": "Learn how to cover the CBSE board exam syllabus: build a study plan, prioritise chapters and revise on time with practical tips.",
  "how-to-get-started-home-tuition-tutor-jobs-learnosphere": "Want to start home tuition tutor jobs? See how to join Learnosphere, create your profile and begin teaching students near you.",
  "how-to-get-started-with-tutoring-jobs-in-india": "How to get started with tutoring jobs in India: skills needed, ways to find students and tips to build a steady tutoring income.",
  "how-to-market-yourself-as-a-home-tutor": "Learn how to market yourself as a home tutor: build a strong profile, show your results and attract more students in your area.",
  "how-to-prepare-for-exams-using-online-quizzes": "Prepare for exams with online quizzes: practise topics, find weak areas and track progress. Learn how to use quizzes in your study plan.",
  "how-to-start-a-tutoring-career-a-step-by-step-guide": "Start a tutoring career step by step: choose subjects, set fees, find students and build a reputation as a trusted tutor.",
  "india-republic-day-2025": "India Republic Day 2025: learn why January 26 matters, the story of the Constitution and ways students can celebrate the day.",
  "jee-main-2026-advisory-schedule-guidelines": "JEE Main 2026 advisory: key schedule details and exam guidelines every aspirant should know. Read before you plan your preparation.",
  "kerala-reduces-class-10-syllabus-by-25-what-parents-should-know": "Kerala reduces the Class 10 syllabus by 25%. See what changed and what parents should know to support their child's exam preparation.",
  "learnosphere-book-tutors-or-start-earning-by-teaching": "Book a tutor or start earning by teaching on Learnosphere. Find verified home and online tutors, or join as an educator in India.",
  "maha-kumbh-mela-2025-a-journey-of-spiritual-awakening": "Maha Kumbh Mela 2025: a journey of spiritual awakening. Learn about its meaning, traditions and why it matters in Indian culture.",
  "neet-2025-study-guide-for-step-by-step-preparation": "NEET 2025 study guide with a step-by-step plan: subjects, revision strategy, mock tests and tips to prepare effectively.",
  "no-detention-policy-out-for-students": "No-detention policy ends for students: see what the change means, how it may affect exams and what parents should know.",
  "online-gk-quizzes-for-students-and-learners": "Test your general knowledge with online GK quizzes for students and learners. Build awareness, curiosity and exam readiness.",
  "online-quiz-for-class-1": "Online quiz for Class 1: fun, simple questions that help young learners practise basics and build confidence. Start learning today.",
  "online-quiz-for-studies": "Use online quizzes for studies to revise faster, check understanding and improve scores. Learn how to make quizzes part of daily study.",
  "online-quizzes-are-best-for-class-1-12-students-learning": "Why online quizzes work for Class 1 to 12 students: instant practice, better retention and confidence. Explore quiz-based learning.",
  "pariksha-pe-charcha-2025": "Pariksha Pe Charcha 2025: key takeaways on exam stress, focus and confidence for students, parents and teachers.",
  "redefining-modern-education": "Redefining modern education: how technology, personalised learning and one-on-one tutoring are shaping the way students learn today.",
  "revolutionary-dashboard-for-students": "Discover a student dashboard to track progress, manage learning and stay on top of studies with Learnosphere.",
  "simplifying-education-for-teachers-and-students": "Simplifying education for teachers and students: see how digital tools make teaching, learning and tracking progress easier.",
  "sof-imo-result-2024-25": "SOF IMO result 2024-25: how to check your International Mathematics Olympiad result, understand the scorecard and plan next steps.",
  "ssc-cgl-syllabus-2025-for-tier-1-tier-2-exam-pattern-topics-and-preparation-tips": "SSC CGL syllabus 2025 for Tier 1 and Tier 2: exam pattern, topics and preparation tips to plan your study.",
  "state-boards-of-education-in-india-everything-you-need-to-know-in-2025": "State boards of education in India explained for 2025: how they work, how they differ from CBSE and what students should know.",
  "study-smarter-not-harder-strategies-exam-preparation": "Study smarter, not harder: proven exam preparation strategies including planning, active recall and revision to boost marks.",
  "succeed-as-home-tutor-in-india": "How to succeed as a home tutor in India: build trust, plan lessons, communicate with parents and grow your tutoring work.",
  "teach-earn-succeed-how-to-start-your-journey-with-learnosphere": "Teach, earn and succeed: learn how to start your journey as a tutor with Learnosphere, from joining and profile setup to finding students.",
  "the-best-home-tuition-near-me": "Searching for the best home tuition near me? Learn how to choose a verified tutor, compare options and book a demo class with Learnosphere.",
  "the-best-home-tutor-jobs-for-class-1-to-5": "Explore the best home tutor jobs for Class 1 to 5: what primary tutors teach, skills parents look for and how to find students near you.",
  "the-best-platforms-for-home-tutor-jobs": "Compare the best platforms for home tutor jobs in India: how they work, what to look for and how to find students and earn steadily.",
  "the-cbse-class-12-english-syllabus-explained-key-topics-and-tips": "CBSE Class 12 English syllabus explained: key topics, sections and exam tips to help students plan their preparation and score better.",
  "the-future-of-learning-personalized-education-in-the-digital-age": "The future of learning is personalised: see how digital tools and one-on-one tutoring adapt to each student's pace and goals.",
  "top-10-teaching-skills-every-educator-should-master": "Top 10 teaching skills every educator should master, from clear communication and classroom management to technology use and feedback.",
  "top-5-tutoring-skills-every-tutor-should-have-for-success": "Top 5 tutoring skills every tutor needs for success: communication, patience, planning, subject expertise and building trust with students.",
  "top-educational-games-for-students-that-make-learning-fun": "Discover top educational games for students that make learning fun, build thinking skills and keep children engaged with their studies.",
  "ultimate-guide-to-part-time-tutoring-jobs": "Ultimate guide to part-time tutoring jobs: how to start, what to charge, where to find students and how to balance teaching with other work.",
  "why-adaptive-tutors-are-key": "Why adaptive tutors are key to better learning: how they adjust to each student's pace, strengths and gaps to improve results.",
  "why-home-tuition-is-the-best-investment": "Is home tuition the best investment for your child? See how personal attention, flexible schedules and doubt-solving improve learning.",
  "why-ncert-books-great-for-cbse-students": "Why NCERT books are great for CBSE students: clear concepts, exam-aligned content and practical tips to use them for effective preparation.",
  "youngsters-embrace-edtech-startups-transforming-education": "How young people are embracing edtech startups and transforming education in India, with new ways to learn, teach and connect."
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(
    `https://blogs.learnosphere.in/wp-json/wp/v2/posts?slug=${slug}&_embed&&per_page=100`,
    { cache: "no-store" }
  );
  const blogs = await res.json();

  if (!blogs || blogs.length === 0) {
    return { title: "Blog post not found" };
  }

  const meta = { title: blogs[0].title.rendered };
  if (blogMetaDescriptions[slug]) {
    meta.description = blogMetaDescriptions[slug];
  }
  return meta;
}


const BlogPost = async ({ params }) => {
  const { slug } = await params;

  const fetchPosts = async () => {
    const res = await fetch(
      "https://blogs.learnosphere.in/wp-json/wp/v2/posts?_embed&&per_page=100",
      { cache: "no-store" }
    );
    return res.json();
  };

  const [blogs, currentPost] = await Promise.all([
    fetchPosts(),
    fetch(
      `https://blogs.learnosphere.in/wp-json/wp/v2/posts?slug=${slug}&_embed&&per_page=100`,
      { cache: "no-store" }
    ).then((res) => res.json()),
  ]);

  if (!currentPost || currentPost.length === 0) {
    return <p>Blog post not found</p>;
  }

  const post = currentPost[0];
  const imageUrl = post["_embedded"]?.["wp:featuredmedia"]?.[0]?.["source_url"];
  const content = he.decode(post.content.rendered); // Decode HTML entities in content

  const replace = (domNode) => {
    if (domNode.name === "img") {
      return null;
    }

    if (domNode.name === "a") {
      return (
        <a
          href={domNode.attribs?.href}
          target={domNode.attribs?.target || "_self"}
          rel={domNode.attribs?.rel || "noopener noreferrer"}
          className="text-blue-600 hover:underline"
        >
          {domNode.children[0]?.data}
        </a>
      );
    }

    if (domNode.name === "h1") {
      return (
        <h1 className="text-4xl font-bold text-gray-900 my-6 text-align: left px-2">
          {domNode.children[0]?.data}
        </h1>
      );
    }

    if (domNode.name === "h2") {
      return (
        <h2 className="text-3xl font-semibold text-gray-800 my-6 px-2">
          {domNode.children.map((child, index) => {
            if (child.name === "strong") {
              return (

                <strong key={index} className="font-bold text-black">
                  {child.children?.[0]?.data}
                </strong>

              );
            }
            // Add paragraph spacing here
            if (domNode.name === "p") {
              return (
                <p key={index} className="mb-4 leading-relaxed">
                  {domToReact(domNode.children, { replace })}
                </p>
              );
            }

            if (child.name === "em") {
              return (
                <em key={index} className="italic text-gray-600">
                  {child.children?.map((emChild, emIndex) => {
                    if (emChild.name === "strong") {
                      return (
                        <strong key={emIndex} className="font-bold text-black">
                          {emChild.children?.[0]?.data}
                        </strong>
                      );
                    }
                    return emChild.data || null;
                  })}
                </em>
              );
            }

            if (child.name === "a") {
              return (
                <a
                  key={index}
                  href={child.attribs?.href}
                  target={child.attribs?.target || "_self"}
                  rel={child.attribs?.rel || "noopener noreferrer"}
                  className="text-blue-600 hover:underline"
                >
                  {child.children?.[0]?.data}
                </a>
              );
            }

            return child.data || null;
          })}
        </h2>
      );
    }

    if (domNode.name === "h3") {
      return (
        <h3 className="text-2xl font-medium text-black my-6 px-2">
          {domNode.children.map((child, index) => {
            if (child.name === "strong") {
              return (
                <strong key={index} className="font-bold text-black">
                  {child.children?.[0]?.data}
                </strong>
              );
            }
            // Add paragraph spacing here
            if (domNode.name === "p") {
              return (
                <p key={index} className="mb-4 leading-relaxed">
                  {domToReact(domNode.children, { replace })}
                </p>
              );
            }
            if (child.name === "em") {
              return (
                <em key={index} className="italic text-gray-600">
                  {child.children?.map((emChild, emIndex) => {
                    if (emChild.name === "strong") {
                      return (
                        <strong key={emIndex} className="font-bold text-black">
                          {emChild.children?.[0]?.data}
                        </strong>
                      );
                    }
                    return emChild.data || null;
                  })}
                </em>
              );
            }
            if (child.name === "a") {
              return (
                <a
                  key={index}
                  href={child.attribs?.href}
                  target={child.attribs?.target || "_self"}
                  rel={child.attribs?.rel || "noopener noreferrer"}
                  className="text-blue-600 hover:underline"
                >
                  {child.children?.[0]?.data}
                </a>
              );
            }

            return child.data || null;
          })}
        </h3>
      );
    }

    if (domNode.name === "h4") {
      return (
        <h4 className="text-xl font-semibold text-gray-700 my-6 px-2">
          {domNode.children[0]?.data}
        </h4>
      );
    }
    // Add paragraph spacing here
    if (domNode.name === "p") {
      return (
        <p className="my-4 leading-relaxed">
          {domToReact(domNode.children, { replace })}
        </p>
      );
    }
    if (domNode.name === "ul") {
      const validChildren = domNode.children?.filter(
        (child) => child?.children?.[0]?.data?.trim()
      );

      if (!validChildren || validChildren.length === 0) {
        return null;
      }

      return (
        <ul className="list-disc pl-6 space-y-3 my-4 px-2">
          {validChildren.map((child, index) => (
            <li key={index} className="leading-relaxed text-base text-gray-800">
              {child.children[0].data}
            </li>
          ))}
        </ul>
      );
    }
    // Add paragraph spacing here
    if (domNode.name === "p") {
      return (
        <p className="mb-4 leading-relaxed">
          {domToReact(domNode.children, { replace })}
        </p>
      );
    }
    if (domNode.name === "ol") {
      const validChildren = domNode.children?.filter(
        (child) => child.name === "li" && child.children?.length > 0
      );

      if (!validChildren || validChildren.length === 0) {
        return null;
      }

      return (
        <ol className="list-decimal pl-6 space-y-3 my-4 px-2 text-left">
          {validChildren.map((child, index) => (
            <li key={index} className="leading-relaxed text-base text-gray-800">
              {child.children.map((liChild, liIndex) => {
                if (liChild.name === "strong") {
                  return (
                    <strong key={liIndex} className="font-bold text-black">
                      {liChild.children?.[0]?.data}
                    </strong>
                  );
                }

                if (liChild.name === "a") {
                  return (
                    <a
                      key={liIndex}
                      href={liChild.attribs?.href}
                      target={liChild.attribs?.target || "_self"}
                      rel={liChild.attribs?.rel || "noopener noreferrer"}
                      className="text-blue-600 hover:underline"
                    >
                      {liChild.children?.[0]?.data}
                    </a>
                  );
                }

                return liChild.data || null;
              })}
            </li>
          ))}
        </ol>
      );
    }

    if (
      domNode.name === "figure" &&
      domNode.attribs?.class?.includes("wp-block-table")
    ) {
      return (
        <div className="overflow-x-auto my-6 px-2">
          {domToReact(domNode.children, { replace })}
        </div>
      );
    }

    if (domNode.name === "table") {
      return (
        <div className="overflow-x-auto my-6 px-2">
          <table className="table-auto w-full border border-gray-300">
            {domToReact(domNode.children, { replace })}
          </table>
        </div>
      );
    }

    if (domNode.name === "thead") {
      return (
        <thead className="bg-gray-200">
          {domToReact(domNode.children, { replace })}
        </thead>
      );
    }

    if (domNode.name === "tbody") {
      return <tbody>{domToReact(domNode.children, { replace })}</tbody>;
    }

    if (domNode.name === "tr") {
      return (
        <tr className="border-b border-gray-300">
          {domToReact(domNode.children, { replace })}
        </tr>
      );
    }

    if (domNode.name === "td") {
      return (
        <td className="px-4 py-3 border border-gray-200 text-sm text-left">
          {domToReact(domNode.children, { replace })}
        </td>
      );
    }

    if (domNode.name === "th") {
      return (
        <th className="px-4 py-3 border border-gray-200 font-semibold text-left bg-gray-100">
          {domToReact(domNode.children, { replace })}
        </th>
      );
    }
    // Add paragraph spacing here
    if (domNode.name === "p") {
      return (
        <p className="mb-4 leading-relaxed">
          {domToReact(domNode.children, { replace })}
        </p>
      );
    }
    if (
      domNode.name === "div" &&
      domNode.attribs?.class?.includes("wp-block-aioseo-faq")
    ) {
      const questionNode = domNode.children?.find(
        (child) =>
          child.name === "h3" &&
          child.attribs?.class?.includes("aioseo-faq-block-question")
      );

      const answerNode = domNode.children?.find(
        (child) =>
          child.name === "div" &&
          child.attribs?.class?.includes("aioseo-faq-block-answer")
      );

      const questionText = questionNode?.children?.[0]?.data || "";

      const answerContent = answerNode
        ? domToReact(answerNode.children, { replace })
        : null;

      return (
        <div className="px-2 my-6">
          <FaqItem
            key={questionText}
            question={questionText}
            answer={
              <div className="text-gray-900 py-2">
                {answerContent}
              </div>
            }
          />
        </div>
      );
    }
  };

  // Now use the `replace` function here:
  const parsedContent = parse(content, { replace });

  const currentIndex = blogs.findIndex((blog) => blog.slug === slug);
  const previousPost = blogs[currentIndex - 1] || null;
  const nextPost = blogs[currentIndex + 1] || null;

  return (
    <>
      <Navbar />
      <div className="max-w-full mt-28 md:mt-28 mx-5 md:mx-14 px-4 md:px-8 ">
        {/* Breadcrumb navigation or routing showing */}
        <nav className="text-gray-600 text-sm mb-4" aria-label="Breadcrumb">
          <ul className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">
                Home
              </a>
            </li>
            <li>/</li>

            <li>
              <a href="/Blogs" className="text-blue-600 hover:underline">
                Blogs
              </a>
            </li>
            <li>/</li>

            {/* Blog Title Showing*/}
            <li className="text-gray-800 font-semibold truncate">
              {he.decode(post.title.rendered)}
            </li>
          </ul>
        </nav>

        {/* main content start */}
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          {/* main content (Left Side) */}
          <div className="flex-1 md:w-3/4">
            <header className="mb-6 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {he.decode(post.title.rendered)}
              </h1>
              <p className="text-gray-600 text-sm md:text-lg">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </header>

            {/* Featured image */}
            <div className="relative w-full mb-6 rounded-lg overflow-hidden shadow-lg">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={he.decode(post.title.rendered)}
                  width={1280}
                  height={768}
                  style={{ objectFit: "contain" }}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                  No image available
                </div>
              )}
            </div>

            {/* Render HTML content without images */}
            <div className="prose prose-sm sm:prose md:prose-lg lg:prose-xl max-w-none text-gray-800 m-0 md:m-5 p-1 md:p-5 ">
              {parsedContent}
            </div>
          </div>

          {/* sidebar (Right Side) */}
          <div className="md:w-1/4 sm:w-1/2 w-full p-5 border-l border-gray-300 mt-5 md:mt-0">
            <h2 className="text-xl font-semibold mb-4">Latest Blogs</h2>
            <ul>
              {blogs.slice(0, 5).map((blog) => {
                const blogImageUrl =
                  blog["_embedded"]?.["wp:featuredmedia"]?.[0]?.["source_url"];

                return (
                  <li
                    key={blog.id}
                    className="mb-4 flex items-center space-x-3 overflow-hidden border-b border-gray-200 pb-3"
                  >
                    {/* Image Section */}
                    {blogImageUrl ? (
                      <div className="flex-shrink-0 w-20 h-26">
                        <Image
                          src={blogImageUrl}
                          alt={he.decode(blog.title.rendered)}
                          width={200}
                          height={100}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 flex items-center justify-center rounded-lg text-sm text-gray-500">
                        No Image
                      </div>
                    )}

                    {/* Title Section */}
                    <a
                      href={`/Blog/${blog.slug}`}
                      className="text-blue-600 hover:underline flex-grow block text-sm md:text-base leading-tight"
                    >
                      {he.decode(blog.title.rendered)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Footer1 />
      <Footer />
    </>
  );
};

export default BlogPost;
