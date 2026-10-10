import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Footer1 from '@/components/Footer1';
import SyllabusVisitTracker from '@/components/SyllabusVisitTracker';

const Syllabussc = () => {
  const metadata = generateMetadata();

  return (
    <div>
      <SyllabusVisitTracker page="CBSE_11th_Syllabus" classNum="11" />
      <Navbar />
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      
      <div className="p-12 flex flex-col font-Poppins justify-center mt-12">
        <div>
          <h1 className="p-4 text-4xl font-extrabold bg-black text-orange-500  w-full md:w-1/5 m-auto text-center  rounded-lg shadow-2xl shadow-orange-900">Class 11th</h1>
        </div>
        <div className="pt-6">
          <p className="text-start w-[90%] m-auto ">
          For all students, the syllabus for Class 11 is an essential guide for understanding what to learn and which topics are important. By following the term-wise CBSE Class 11 Syllabus, students can effectively prepare and evaluate the covered material. Adhering to the 2024-25 term-wise syllabus is crucial for success in the final exams. We at Vedantu offer the CBSE Class 11 term-wise syllabus for all subjects to help you in your studies. Download the syllabus as a PDF for free to get started. <br />
          The Central Board of Secondary Education (CBSE) for the academic year 2024-25 has released the revised syllabus for Class 11 across all subjects. CBSE, an autonomous and self-governing body established under the Department of Education (D.O.Ed), provides this updated syllabus to guide students in their preparation. The CBSE Revised Syllabus 2024-25 for Class 11 encompasses all core subjects, including Physics, Chemistry, Mathematics, and Biology,English,Hindi,Economics,Bussness Studies,Political Science,Accountancy ensuring comprehensive coverage for the board exams.
          </p>
        </div>
        <div className="pt-6   ml-0 md:ml-12">
          <table className="table-auto w-full text-center ">
            <tbody>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link className='flex justify-between w-full font-semibold' href="/CBSE/Class-11-Math">
                  <p>1</p>
                  CBSE Term Wise Syllabus for Class 11 Maths
                  <p>1</p></Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link className='flex justify-between w-full font-semibold' href="/CBSE/Class-11-Physics">
                  <p>2</p>
                  CBSE Term Wise Syllabus for Class 11 Physics
                  <p>2</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link className='flex justify-between w-full font-semibold' href="/CBSE/Class-11-Chemistry">
                  <p>3</p>CBSE Term Wise Syllabus for Class 11 Chemistry<p>3</p></Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link className='flex justify-between w-full font-semibold' href="/CBSE/Class-11-Biology">
                  <p>4</p>
                  CBSE Term Wise Syllabus for Class 11 Biology
                  <p>4</p></Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white  hover:border-none ">
                  <Link className='flex justify-between w-full font-semibold' href="/CBSE/Class-11-English"><p>5</p>CBSE Term Wise Syllabus for Class 11 English<p>5</p></Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link className='flex justify-between w-full font-semibold' href="/CBSE/Class-11-Hindi"><p>6</p>CBSE Term Wise Syllabus for Class 11 Hindi<p>6</p></Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link className='flex justify-between w-full font-semibold' href="/CBSE/Class-11-Accountancy"><p>7</p>CBSE Term Wise Syllabus for Class 11 Accountancy<p>7</p></Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link className='flex justify-between w-full font-semibold' href="/CBSE/Class-11-BussinessStudies"><p>8</p>CBSE Term Wise Syllabus for Class 11 Business Studies<p>8</p></Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link className='flex justify-between w-full font-semibold' href="/CBSE/Class-11-Economics"><p>9</p>CBSE Term Wise Syllabus for Class 11 Economics<p>9</p></Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link className='flex justify-between w-full font-semibold' href="/CBSE/Class-11-PoliticalScience"><p>10</p>CBSE Term Wise Syllabus for Class 11 Political Science<p>10</p></Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer1 />
      <Footer />
    </div>
  );
};

export default Syllabussc;


export const generateMetadata = () => {
  return {
    title: "Class 11 Syllabus - Learnosphere",
    description:
      "Get the latest CBSE Class 11 Syllabus for English, Mathematics, Physics, Chemistry, Biology, Accountancy, Business Studies, Economics, and Political Science for the 2024-25 academic year. Prepare effectively for your exams with our detailed syllabus and study resources.",
    keywords:
      "CBSE Class 11 Syllabus, Class 11 Syllabus , Class 11 Syllabus 2024-25, Class 11 Syllabus 2024-25 CBSE, Class 11 Syllabus, Class 11 Syllabus 2024-25 CBSE, Class 11 Syllabus 2024-25 PDF, Class 11 Syllabus ",
  };
};
