import React from "react";
import Image from "next/image";
import demandEdu from "@/public/demandEdu.jpg";

import Homeclass from "@/public/Homeclass.jpg";

import { IoRemoveOutline } from "react-icons/io5";

const Services = () => {
 

  return (
    <div name="services">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold pt-8 ">SERVICES</h1>
        <p className="text-xl pt-1 pl-[4.75rem] sm:pl-0 md:pl-0">
          Offerings to support every learning need.
        </p>
        <IoRemoveOutline size={70} />
      </div>
      <div className="    bg-white">
        <div className=" bg-slate-50 flex justify-center flex-col md:flex-row gap-6 items-center border-2 rounded-tr-[40px] shadow-md m-10">
          <Image src={Homeclass} height={400} width={400} alt="Homeclass" className="rounded-xl m-4 shadow-md" />
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-3xl font-bold p-3">Educators on Call</h1>
            <p className="text-lg font-semibold text-balance text-slate-700 p-2">"With our platform, students can easily connect with experienced teachers for personalized tutoring sessions tailored to their individual needs. Whether it's academic support, exam preparation, or enrichment activities, our on-demand service ensures that learning is convenient, efficient, and accessible to all.Personalized learning experiences brought to your doorstep"</p>
          </div>
        </div>
        <div className=" bg-orange-100 flex justify-center flex-col md:flex-row gap-6 items-center border-2 rounded-tl-[40px] shadow-md m-10">
          <div className="flex flex-col justify-center items-start m-2">
            <h1 className="text-3xl font-bold p-3">Empowering Education, On-Demand</h1>
            <p className="text-lg font-semibold text-balance text-slate-700 p-2">" From homework help to exam preparation, our on-demand solution offers personalized support tailored to each student's unique needs. With just a click, embark on a journey of discovery and knowledge, transforming education into a convenient and enriching experience like never before."</p>
          </div>
          <Image src={demandEdu} height={500} width={500} alt="Homeclass" className="rounded-xl m-4 shadow-md" />
        </div>
       
         
        
      </div>
    </div>
  );
};
export default Services;
