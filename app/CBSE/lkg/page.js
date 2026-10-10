import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Footer1 from "@/components/Footer1";

export default function Lkg() {
  return (
    <div>
      <Navbar />
      <div className="p-0 md:p-12  flex flex-col font-Poppins justify-center mt-12">
        <div className="">
          <h1 className="p-4  text-2xl md:text-4xl mt-10 font-extrabold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            {" "}
            LKG Syllabus{" "}
          </h1>
        </div>
        <div className="w-full flex flex-col gap-3 mt-4  text-center md:text-start pt-6">
          <p className="">
            LKG is a crucial stage where children are moulded into young
            learners who will go on to become the driving force of society and
            keep the learning wheel moving. It is imperative that students and
            parents are aware of the updated syllabus for each of the subjects
            taught in the CBSE curriculum, like English, Mathematics, General
            Awareness, Environmental Sciences (EVS), etc
          </p>
          <p className="">
            The CBSE (Central Board of Secondary Education) LKG syllabus focuses
            on holistic development through playful and engaging activities.
            Here's an overview:
          </p>
        </div>
        <div className=" none md:flex  flex-wrap gap-8 p-4 md:p-10">
          <div className="flex flex-col gap-6  w-full md:w-[27vw] border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400">
            <Image
              className="w-80 h-64"
              height={150}
              width={150}
              src="/english.jpg"
              alt="kids image"
            />
            <p className="font-extrabold text-[1.2em] text-orange-500">
              {" "}
              Language and Literacy
            </p>
            <ol className="list-disc flex flex-col gap-3 px-2">
              <li>
                Alphabet Recognition: Learning to identify and write both
                uppercase and lowercase letters
              </li>
              <li>
                Vocabulary: Building a basic vocabulary through picture books
                and storytelling.
              </li>
              <li>
                Pre-writing Skills: Tracing lines, shapes, and patterns to
                develop fine motor skills.
              </li>
            </ol>
          </div>

          <div className="flex flex-col gap-6 w-full md:w-[27vw]  border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400">
            <Image
              className="w-80 h-64 "
              height={150}
              width={150}
              src="/math.jpg"
              alt="lkg image"
            />
            <p className="font-extrabold text-[1.2em] text-orange-500">
              {" "}
              Numeracy
            </p>
            <ol className="list-disc flex flex-col gap-3 px-2">
              <li>Number Recognition: Identifying and writing numbers 1-20.</li>
              <li>Counting: Counting objects and understanding quantity.</li>
              <li>
                Basic Math Concepts: Introduction to shapes, sizes, patterns,
                and simple comparisons (big/small, more/less).
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-6 w-full md:w-[27vw]  border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400">
            <Image
              className="w-80 h-64"
              height={150}
              width={150}
              src="/community.jpg"
              alt="lkg img"
            />
            <p className="font-extrabold text-[1.2em] text-orange-500">
              {" "}
              General Awareness
            </p>
            <ol className="list-disc flex flex-col gap-3 px-2">
              <li>
                Myself and My Family:Learning about oneself, family members, and
                relationships.Basic self-introduction and understanding family
                roles.
              </li>
              <li>
                Community Helpers: Recognizing different community helpers
                (doctor, teacher, policeman, etc.).
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-6 w-full md:w-[27vw]  border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400">
            <Image
              className="w-80 h-64"
              height={150}
              width={150}
              src="/environmental.jpg"
              alt="lkg image"
            />
            <p className="font-extrabold text-[1.2em] text-orange-500">
              {" "}
              Environmental Studies
            </p>
            <ol className="list-disc flex flex-col gap-3 px-2">
              <li>
                Nature and Surroundings: Identifying common plants, trees, and
                flowers.Understanding the basics of weather and seasons.
              </li>
              <li>
                Animals and Birds:Learning about common animals and
                birds.Understanding their sounds, habitats, and characteristics.
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-6 w-full md:w-[27vw] border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400">
            <Image
              className="w-80 h-64 "
              height={150}
              width={150}
              src="/health.jpg"
              alt="lkg image"
            />
            <p className="font-extrabold text-[1.2em] text-orange-500">
              {" "}
              Health and Hygiene
            </p>
            <ol className="list-disc flex flex-col gap-3 px-2">
              <li>
                Personal Hygiene: Basic hygiene practices like washing hands,
                brushing teeth, and bathing.Learning about healthy eating
                habits.
              </li>
              <li>
                Safety Rules:Understanding basic safety rules at home, school,
                and on the road.
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-6 w-full md:w-[27vw]  border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400">
            <Image
              className="w-80 h-64 "
              height={150}
              width={150}
              src="/creative.jpg"
              alt="lkg image"
            />
            <p className="font-extrabold text-[1.2em] text-orange-500">
              {" "}
              Creative Arts
            </p>
            <ol className="list-disc flex flex-col gap-3 px-2">
              <li>
                Drawing and Coloring: Drawing simple shapes and objects.Coloring
                within the lines.
              </li>
              <li>
                Craft Activities:Simple paper folding and cutting
                activities.Making basic crafts using safe materials.
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-6 w-full md:w-[27vw]  border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400">
            <Image
              className="w-80 h-64"
              height={150}
              width={150}
              src="/physical.jpg"
              alt="lkg image"
            />
            <p className="font-extrabold text-[1.2em] text-orange-500">
              {" "}
              Physical Development
            </p>
            <ol className="list-disc flex flex-col gap-3 px-2">
              <li>
                Gross Motor Skills: Activities like running, jumping, and
                climbing.Basic exercises and outdoor play.
              </li>
              <li>
                Fine Motor Skills:Activities like threading beads, building
                blocks, and puzzles.Hand-eye coordination games.
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-6 w-full md:w-[27vw]  border-gray-300 shadow-2xl rounded-lg border p-4 transition-all ease-in duration-100 hover:scale-95 hover:border-orange-400">
            <Image
              className="w-80 h-64"
              height={150}
              width={150}
              src="/moral.jpg"
              alt="lkg image"
            />
            <p className="font-extrabold text-[1.2em] text-orange-500">
              {" "}
              Moral Education
            </p>
            <ol className="list-disc flex flex-col gap-3 px-2">
              <li>
                Basic Etiquette:Learning to say please, thank you, sorry, and
                excuse me.Understanding sharing and caring for others.
              </li>
              <li>
                Stories with Morals:Listening to and discussing stories that
                teach moral values.
              </li>
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
    title: "LKG Syllabus - Learnosphere",
    description:
      "LKG is a crucial stage where children are moulded into young learners who will go on to become the driving force of society and keep the learning wheel moving. It is imperative that students and parents are aware of the updated syllabus for each of the subjects taught in the CBSE curriculum, like English, Mathematics, General Awareness, Environmental Sciences (EVS), etc",
    keywords:
      "LKG Syllabus, LKG Syllabus CBSE, LKG Syllabus India, LKG Syllabus 2021, LKG Syllabus 2022, LKG Syllabus 2023, LKG Syllabus 2024, LKG Syllabus 2025,",
  };
};
