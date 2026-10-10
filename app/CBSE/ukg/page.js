import React from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";


export default function Lkg() {
  return (
    <div>
      <Navbar />
      <div className="p-0 md:p-12  flex flex-col font-Poppins justify-center mt-12">
        <div className="">
          <h1 className="p-4  text-2xl md:text-4xl mt-10 font-extrabold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            {" "}
            UKG Syllabus{" "}
          </h1>
        </div>
        <div className=" w-full flex flex-col gap-3 mt-4  text-center md:text-start pt-6">
          <p className="">
            UKG is one of the most significant classes for students as they are
            introduced to brand-new subjects and chapters. The curriculum of UKG
            consists of Maths, Hindi, and English chapters along with other
            additions such as EVS, Arts & Crafts, etc. Students might need some
            assistance in completing the syllabus for subjects like Mathematics,
            English, and Hindi. The experts in Learnosphere have formulated the
            solutions to all the chapters included in the Mathematics, English,
            and Hindi textbooks. Along with that, there are additional questions
            and important notes that students can refer to in order to cement
            their knowledge
          </p>
        </div>
     
      <div className=' none md:flex  flex-wrap gap-8 p-4 md:p-10'>
      <div className='flex flex-col gap-6  w-full md:w-[27vw] border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400'>
      <Image className=' w-80 h-64' height={150} width={150} src='/english.jpg' alt='ukg image'/>
      <p className='font-extrabold text-[1.2em] text-orange-500'> Language and Literacy</p>
      <ol className='list-disc flex flex-col gap-3 px-2'>
      <li>Alphabet Knowledge:Recognizing and writing both uppercase and lowercase letters.Understanding letter sounds and phonics.</li>
      <li>Vocabulary Development:Expanding vocabulary through stories, rhymes, and picture books.Learning new words related to everyday objects, animals, and nature.</li>
      <li>Reading Skills: Simple word formation and reading small sentences. Listening to and participating in storytelling sessions.</li>
      <li>Writing Skills:Writing simple words and sentences.Tracing and writing letters, numbers, and simple words.</li>
      </ol>
      </div>
      
     

      <div className='flex flex-col gap-6 w-full md:w-[27vw]  border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400'>
      <Image className='w-80 h-64 ' height={150} width={150} src='/math.jpg' alt='ukg image'/>
      <p className='font-extrabold text-[1.2em] text-orange-500'> Numeracy</p>
      <ol className='list-disc flex flex-col gap-3 px-2'>
      <li>Number Recognition and Writing: Identifying and writing numbers from 1 to 50.Understanding number sequence and counting.</li>
      <li>Comparisons and Patterns: Understanding more/less, bigger/smaller, and similar/different.Identifying and creating simple patterns with shapes and colors.</li>
      <li>Basic Mathematical Concepts: Understanding concepts of addition and subtraction using objects and pictures.Recognizing and drawing basic shapes (circle, square, triangle, rectangle).</li>
     </ol>
     </div>
     <div className='flex flex-col gap-6 w-full md:w-[27vw]  border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400'>
     <Image className='w-80 h-64' height={150} width={150} src='/community.jpg' alt='ukg image'/>
      <p className='font-extrabold text-[1.2em] text-orange-500'> General Awareness</p>
      <ol className='list-disc flex flex-col gap-3 px-2'>
      <li>Myself and My Family:Discussing family members, their roles, and relationships.Sharing personal details like name, age, and hobbies.</li>
      <li>Community Helpers:Learning about various community helpers (doctor, teacher, postman, etc.).Understanding their roles and contributions to society.</li>
      <li>Environment:Exploring the environment, plants, animals, and their habitats.Understanding basic weather conditions and seasons.</li>
     
      </ol>
      </div>
      
      <div className='flex flex-col gap-6 w-full md:w-[27vw] border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400'>
      <Image className='w-80 h-64 ' height={150} width={150} src='/health.jpg' alt='ukg '/>
      <p className='font-extrabold text-[1.2em] text-orange-500'> Health and Hygiene</p>
      <ol className='list-disc flex flex-col gap-3 px-2'>
      <li>Personal Hygiene:Practicing good hygiene habits like brushing teeth, washing hands, and bathing.Understanding the importance of clean surroundings.
      </li>
      <li>Safety Rules:Learning basic safety rules at home, school, and outdoors.Understanding the importance of wearing helmets, seat belts, and not talking to strangers.</li>
      </ol>
      </div>
      <div className='flex flex-col gap-6 w-full md:w-[27vw]  border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400'>
      <Image className='w-80 h-64 ' height={150} width={150} src='/creative.jpg' alt='ukg image'/>
      <p className='font-extrabold text-[1.2em] text-orange-500'> Creative Arts</p>
      <ol className='list-disc flex flex-col gap-3 px-2'>
      <li>Drawing and Painting:Drawing and coloring simple shapes, objects, and scenes.Exploring different colors and art materials.</li>
      <li>Craft Activities:Engaging in simple craft activities using paper, clay, and other material.Creating items related to themes and festivals.</li>
      </ol>
      </div>
      <div className='flex flex-col gap-6 w-full md:w-[27vw]  border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400'>
      <Image className='w-80 h-64' height={150} width={150} src='/physical.jpg' alt='ukg '/>
      <p className='font-extrabold text-[1.2em] text-orange-500'> Physical Development</p>
      <ol className='list-disc flex flex-col gap-3 px-2'>
      <li>Gross Motor Skills: Participating in physical activities like running, jumping, and climbing.Engaging in games that improve balance and coordination.</li>
      <li>Fine Motor Skills:Activities like threading beads, cutting paper, and using clay.Engaging in puzzles and building blocks to enhance hand-eye coordination.</li>
      </ol>
      </div>
      <div className='flex flex-col gap-6 w-full md:w-[27vw]  border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400'>
      <Image className='w-80 h-64' height={150} width={150} src='/moral.jpg' alt='ukg '/>
      <p className='font-extrabold text-[1.2em] text-orange-500'> Moral Education</p>
      <ol className='list-disc flex flex-col gap-3 px-2'>
      <li>Basic Etiquette and Manners:Learning polite words like please, thank you, sorry, and excuse me.Understanding the importance of sharing, caring, and kindness.</li>
      <li>Stories with Morals:Listening to and discussing stories that teach values like honesty, friendship, and respect.</li>
      </ol>
      </div>
      </div>
      </div>
<Footer1 />
      <Footer />
    </div>
  );
}

export const generateMetadata = () => {
  return {
    title: "UKG Syllabus - Learnosphere",
    description: "UKG is one of the most significant classes for students as they are introduced to brand-new subjects and chapters.",
    keywords: "UKG Syllabus, UKG Curriculum, UKG Subjects, UKG Mathematics, UKG English, UKG Hindi, UKG General Awareness, UKG Environmental Science",
  };
}
