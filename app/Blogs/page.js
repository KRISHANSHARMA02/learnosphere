import { IoRemoveOutline } from "react-icons/io5";
import Image from "next/image";
import { LiaPagerSolid } from "react-icons/lia";
import studentblog1 from "@/public/studentblog1.jpg";
import studentblog2 from "@/public/studentblog2.jpg";
import parentblog1 from "@/public/parentblog1.png";
import parentblog2 from "@/public/parentblog2.jpg";
import tutorblog1 from "@/public/tutorblog1.jpg";
import tutorblog2 from "@/public/tutorblog2.jpg";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import Uparrow from "@/components/Uparrow";
import Link from "next/link";
import BlogsPage from "@/components/BlogPost";
import Brandapp from "@/components/Brandapp";
import { getAllBlogs } from "@/src/lib/actions/blogs";

export const revalidate = 60; // ✅ re-fetch from WordPress every 60s


export default async function Blogs  () {
  const blogs = await getAllBlogs();

  return (
    <>
      <div>
        <Navbar />
        <div className="mt-28 flex gap-2 justify-center items-center text-[1.5em] font-extrabold">
          <LiaPagerSolid size={40} className="text-orange-600" />
          <h1>
            Learn<span className="text-orange-600">O</span>sphere Blogs
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <IoRemoveOutline className="" size={60} />
        </div>
      </div>
      <BlogsPage blogs={blogs} />
      <br />
      <div className="flex justify-center mt-6">
        <Link
          href="/Blogs/RecentBlogs"
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:border-2 hover:border-orange-700 hover:bg-white hover:text-orange-600"
        >
          View All
        </Link>
      </div>
      <br />
        <div className="flex justify-center items-center flex-col px-2 md:px-4 lg:px-0">
        <Brandapp />
      </div>
      <br />
      <div className="  flex-auto gap-8 w-full  pt-10 px-0 md:flex xl:flex xl:px-10 2xl:px-40 pb-10 ">
        <div className="mx-2 p-2 flex flex-col gap-5 w-full xl:w-[50vw] 2xl:w-[26vw]   ">
          <p className="font-bold text-[1.5em]">Blogs for Students</p>
          <div className="p-4 border flex flex-col gap-4 rounded-lg shadow-2xl transition-all ease-in duration-200 hover:scale-95 ">
            <div className="h-60 ">
              <Image
                className="h-60 w-full rounded-lg"
                src={studentblog1}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[1.5em]">
                Effective Study Techniques for Students
              </p>
              <p className="font-semibold w-full">
                Discover powerful study techniques to enhance your learning
                experience and improve your academic performance.
              </p>
              <Link href="Blogs/StudentBlog/Studentblog1">
                <button className="text-orange-600 font-semibold flex gap-1 items-center">
                  Read More
                  <MdKeyboardDoubleArrowRight />
                </button>
              </Link>
            </div>
          </div>
          <div className="p-4 border flex flex-col gap-4  mt-6 rounded-lg shadow-2xl transition-all ease-in duration-200 hover:scale-95">
            <div className="h-60 ">
              <Image
                className="h-60 w-full rounded-lg"
                src={studentblog2}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[1.5em]">
                Why Book a Tutor for Home Tuition?
              </p>
              <p className="font-semibold w-full">
                Explore the top benefits of personalized home tuition for your
                educational needs.
              </p>
              <Link href="Blogs/StudentBlog/Studentblog2">
                <button className="text-orange-600 font-semibold flex gap-1 items-center">
                  Read More
                  <MdKeyboardDoubleArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-2 p-2 flex flex-col gap-5 w-full xl:w-[50vw] 2xl:w-[26vw] ">
          <p className="font-bold text-[1.5em]">Blogs for Tutors</p>
          <div className="p-4 border flex flex-col gap-4 rounded-lg shadow-2xl transition-all ease-in duration-200 hover:scale-95 ">
            <div className="h-60 ">
              <Image
                className="h-60 w-full rounded-lg"
                src={tutorblog1}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[1.5em]">
                Tailoring Teaching Methods to Individual Learning Styles
              </p>
              <p className="font-semibold w-full">
                Discover how to adapt your teaching methods to suit different
                learning styles and enhance student understanding.
              </p>
              <Link href="Blogs/TutorBlog/Tutorblog1">
                <button className="text-orange-600 font-semibold flex gap-1 items-center">
                  Read More
                  <MdKeyboardDoubleArrowRight />
                </button>
              </Link>
            </div>
          </div>
          <div className="p-4 border flex flex-col gap-4   mt-6 rounded-lg shadow-2xl transition-all ease-in duration-200 hover:scale-95">
            <div className="h-60 ">
              <Image
                className="h-60 w-full rounded-lg"
                src={tutorblog2}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[1.5em]">
                How to Engage Students in Home Tuition
              </p>
              <p className="font-semibold w-full">
                Learn effective strategies to keep students engaged and
                motivated during home tuition sessions.
              </p>
              <Link href="Blogs/TutorBlog/Tutorblog2">
                <button className="text-orange-600 font-semibold flex gap-1 items-center">
                  Read More
                  <MdKeyboardDoubleArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-2 p-2 flex flex-col gap-5 w-full xl:w-[50vw] 2xl:w-[26vw] ">
          <p className="font-bold text-[1.5em]">Blogs for Parents</p>
          <div className="p-4 border flex flex-col gap-4  rounded-lg shadow-2xl transition-all ease-in duration-200 hover:scale-95">
            <div className="h-60 ">
              <Image
                className="h-60 w-full rounded-lg"
                src={parentblog1}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[1.5em]">
                Supporting Your Child's Education at Home
              </p>
              <p className="font-semibold w-full">
                Practical tips for parents to support their child's education
                and foster a positive learning environment at home.
              </p>
              <Link href="Blogs/ParentBlog/Parentblog1">
                <button className="text-orange-600 font-semibold flex gap-1 items-center">
                  Read More
                  <MdKeyboardDoubleArrowRight />
                </button>
              </Link>
            </div>
          </div>
          <div className="p-4 border flex flex-col gap-4   mt-6 rounded-lg shadow-2xl transition-all ease-in duration-200 hover:scale-95">
            <div className="h-60 ">
              <Image
                className="h-60 w-full rounded-lg"
                src={parentblog2}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[1.5em]">
                Encouraging Healthy Screen Time Habits for Children
              </p>
              <p className="font-semibold w-full">
                Tips for parents on how to manage and encourage healthy screen
                time habits for their children.
              </p>
              <Link href="Blogs/ParentBlog/Parentblog2">
                <button className="text-orange-600 font-semibold flex gap-1 items-center">
                  Read More
                  <MdKeyboardDoubleArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="font-bold text-[.9em] md:text-[1.5em] flex justify-center items-center bg-orange-100 p-4 w-full md:w-[40%] mt-6 rounded-xl m-auto">
        <p>Blogs For All India School Education Survey</p>
      </div>
      <div className="p-8 mt-8">
        <p className="font-bold bg-orange-500 rounded-tr-lg rounded-tl-lg border-b-2 border-orange-800 w-full 2xl:w-[20%] xl:w-[25%] text-center text-white p-2 text-[1.2em]">
          Purpose Of Education Survey
        </p>
        <p className="mt-4">
          The main purpose of All India Educational Surveys (AIES) conducted
          periodically by the National Council of Educational Research and
          Training (NCERT), is to collect, compile and disseminate information
          of the country’s overall progress in the area of school education.
          These Surveys provide basic inputs to develop educational plans at
          micro-level as well as at macro-level, to formulate educational
          policies, and to monitor the progress of various educational schemes
          of the Central and State Governments. It covers availability of
          schooling facilities in rural habitations, physical and educational
          facilities in schools, incentive schemes and beneficiaries, medium of
          instruction and languages taught, enrolment particularly of SCs, STs,
          girls and educationally backward minority community, teachers and
          their academic and professional qualifications, library, laboratory,
          ancillary staff and subject-wise enrolment at +2 stage of education.
          In addition, the enrolment and teachers in unrecognised schools,
          Alternative Schools and AIE Centers, Oriental Schools covering
          Sanskrit Pathshalas, Madarsas and Maktabs; Special Schools for
          children with disabilities, and Pre-primary Institutions are covered.
        </p>
        <p className="font-bold mt-10 bg-orange-500 rounded-tr-lg rounded-tl-lg border-b-2 border-orange-800 w-full 2xl:w-[20%] xl:w-[25%] text-center text-white p-2 text-[1.2em]">
          Organisations Involved
        </p>
        <p className="mt-4">
          At the national level three organizations, namely, the Union Ministry
          of Human Resource Development (MHRD), the National Council of
          Educational Research and Training (NCERT) and the National Informatics
          Center (NIC) are involved. The MHRD provides funds for the Survey and
          administrative support for its efficient execution. The NCERT has
          shared responsibility of providing all academic inputs, management and
          coordination of Survey Operations and bringing out the reports for
          dissemination. The NIC has been responsible for all aspects of
          Computerisation of the Survey including software development,
          processing of data and tabulation of results at the district, state
          and national level. In addition to this, NICNET network facility is
          used for faster communication and management of Survey activities. At
          the state level all the 35 State Governments and Union Territory
          administrations are involved in execution of the Survey.
        </p>
        <p className="font-bold mt-10 bg-orange-500 rounded-tr-lg rounded-tl-lg border-b-2 border-orange-800 w-full 2xl:w-[20%] xl:w-[25%] text-center text-white p-2 text-[1.2em]">
          Objectives of the Survey
        </p>
   <p className="mt-4">
          To assess the availability of Schooling facility for primary,
          upper-primary, secondary and higher secondary stages within the
          habitations (including SC/ST) in different population slabs. In case
          the facility is not within the habitation, the distance at which
          available. To assess availability of basic facilities in the
          recognized schools such as building, classrooms, drinking water,
          electricity, urinals, lavatories, furniture for students and teachers,
          incentive schemes and beneficiaries, medical check-up and
          vaccination/inoculation of students. To know class-wise enrolment in
          all stages of recognized schools. To know number of children with
          disabilities in all stages of recognized schools. To find out the
          subject-wise enrolment by sex in academic stream and availability of
          qualified teachers at higher secondary stage of the school. To know
          about the availability of science laboratories and library, physical
          education teachers, librarian, guidance counselor, non-teaching staff
          in secondary and higher secondary schools. To assess the position of
          teachers (by sex and SC/ST/OBC/Others) with academic and professional
          qualifications at different school stages in recognized schools. To
          find out distribution of recognized schools in regard to languages
          taught and languages used as medium of instruction. To find out
          enrolment and teachers in primary/upper primary classes of
          unrecognized schools. To asses the position of enrolment and
          instructors in schools/centres under Education Guarantee Scheme &
          Alternative and Innovative Education (EGS & AIE). To find out number
          of children and teachers by sex in pre-primary schools. To know the
          disability-wise enrolment, teachers, structural facilities, equipments
          and instructional material in special schools. To find out the
          position of enrolment and teachers in oriental schools, viz.,Sanskrit Pathshalas, Maktabs and
          Madarsas  . To estimate the class-wise enrolment
          by single age, new entrants, promotees, repeaters and attendance in
          the context of UEE.
        </p>
      </div>

      <Uparrow />
      <Footer1 />
      <Footer />
    </>
  );
};


export const metadata = {
  title: "Education Blog | Study Tips, Guides & Resources | Learnosphere",
};