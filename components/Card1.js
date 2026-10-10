import React from "react";
import Image from "next/image";
import advantage1 from "@/public/advantage1.svg";
import advantage3 from "@/public/advantage3.png";
import advantage2 from "@/public/advantage2.svg";

import { IoRemoveOutline } from "react-icons/io5";

const Card1 = () => {
  return (
    <div className="bg-[#fff] m-1 md:m-16 mb-20">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold pt-8 ml-5 md:ml-0 font-Poppins text-center ">
          Discover the Learnosphere advantage
        </h2>

        <IoRemoveOutline size={70} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:gird-cols-2 lg:grid-cols-3 gap- m-2 lg:m-0">
        <div className="flex justify-center items-center flex-col">
          <Image
            src={advantage1 || '/PlaceholderImage.png'}
            alt="Conceptual clarity through visualisation"
            width={400}
            height={400}
            className=" object-cover h-[300px] rounded-lg shadow-lg"
            priority
            quality={100}
          />

          <h3 className="text-xl font-Poppins mt-10 text-center">
            Conceptual clarity<br></br>
            through visualisation
          </h3>
        </div>

        <div className="flex justify-center items-center flex-col">
          <Image
            src={advantage2}
            alt="Top-Rated and Reliable Educators"
            width={400}
            height={400}
            className="object-cover rounded-lg h-[300px] shadow-lg"
            priority
            quality={100}
          />

          <h3 className="text-xl font-Poppins text-center mt-10">
            Verified and<br></br> High-Quality Teachers
          </h3>
        </div>

        <div className="flex justify-center items-center flex-col">
          <Image
            src={advantage3}
            alt="Variety of Subjects and Skill Levels"
            width={400}
            height={300}
            className="object-cover rounded-lg h-[300px] shadow-lg"
            quality={100}
            priority
          />

          <h3 className="text-xl font-Poppins text-center mt-10">
            Wide Range of <br></br>Subjects and Levels
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Card1;
