import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoRemoveOutline } from "react-icons/io5";
import kids from "@/public/Kids.png";
import class12 from "@/public/class12.svg";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Exam1 = () => {
  const [showSection, setshowSection] = useState(false);
  // const [hideSection , sethideSection] = useState(false);
  const [showPrimary,setshowPrimary] = useState(false);
  // const [hidePrimary , sethidePrimary] = useState(false);


  const hoverClass = ()=>{
    setshowSection(true);
    
  }
  const leaveClass = ()=>{
    setshowSection(false);
    
  }

  const hoverPrimary = ()=>{
    setshowPrimary(true);
  }
  const leavePrimary = ()=>{
    setshowPrimary(false);
  }

  return (
    <div className="m-4 bg-white">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl md:text-3xl font-bold pt-8 font-Poppins">
          Achieve Your Goals
        </h2>
        <p className="text-base md:text-xl pt-1 pl-3 sm:pl-0 md:pl-0 font-Poppins text-center">
          Book certified and selected educators with{" "}
          <span className="text-[1.5rem] md:text-2xl font-bold font-poppins">
            Learn<b className="text-orange-600">O</b>sphere.in
          </span>{" "}
          platform
        </p>
        <IoRemoveOutline size={70} />
      </div>
      <div className="flex flex-col">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          <div className="bg-slate-50 h-auto relative flex flex-col justify-center items-center border-2 rounded-xl shadow-lg m-3 md:m-0" onMouseEnter={hoverPrimary} onMouseLeave={leavePrimary}>
            <div className="bg-slate-900 rounded-br-xl rounded-bl-xl absolute top-0">
              <h2 className="text-white text-lg font-Poppins font-bold p-2">
                Classes LKG - 3
              </h2>
            </div>
            <div className="flex flex-col md:flex-col lg:flex-row my-14">
              <Image
                src={kids || '/PlaceholderImage.png'} 
                height={300}
                width={300}
                alt="Kids learning in LKG to Class 3"
                priority
                className="rounded-xl p-2 mx-auto"
              />
              <div className="flex flex-col justify-center items-center p-3" >
                <h2 className="text-xl font-bold font-poppins">
                  Learn<b className="text-orange-600">O</b>sphere.in
                </h2>
                <p className="text-lg font-semibold text-balance font-Poppins text-slate-700 p-2 text-center md:text-left">
                  Specially crafted early learning program for young minds
                </p>
                {/* <Link
                  href="/Student"
                  className="bg-orange-600 text-white py-2 font-Poppins font-bold flex gap-2 hover:bg-orange-500 px-4 rounded-md w-full md:w-48 items-center text-center"
                >
                  Book a Free Demo{" "}
                  <IoIosArrowRoundForward
                    size={25}
                    className="text-white animate-ping"
                  />
                </Link> */}
                <Link
  href="/Student"
  className="flex items-center justify-center gap-2 w-full md:w-48 px-4 py-2 bg-orange-600 text-white font-Poppins font-bold rounded-md hover:bg-orange-500 transition duration-200"
>
  <span>Book a Free Demo</span>
  <IoIosArrowRoundForward size={25} className="text-white animate-ping" />
</Link>

              </div>
            </div>
          </div>

          <div className="bg-slate-50 h-auto relative flex flex-col justify-center  items-center border-2 rounded-xl shadow-lg m-3 md:m-0" onMouseEnter={hoverClass} onMouseLeave={leaveClass}>
            <div className="bg-slate-900 rounded-br-xl rounded-bl-xl absolute top-0">
              <h2 className="text-white text-lg font-Poppins font-bold p-2">
                Classes 4 - 12
              </h2>
            </div>
            <div className="flex flex-col md:flex-col  lg:flex-row  items-center my-14">
              <Image
                src={class12 || '/PlaceholderImage.png'}
                height={300}
                width={300}
                priority
                alt="Kids learning in Class-4 to Class - 12"
                className="rounded-xl p-2 w-44 mx-auto"
              />
              <div className="flex flex-col justify-center items-center p-3">
                <h2 className="text-xl font-bold font-poppins">
                  Learn<b className="text-orange-600">O</b>sphere.in
                </h2>
                <p className="text-lg font-semibold text-wrap font-Poppins text-slate-700 p-2 text-center md:text-left">
                  Book educator for any Board class
                </p>
                <Link
                  href="/Student"
                  className="bg-orange-600 text-white py-2 font-Poppins font-bold hover:bg-orange-500 px-3 rounded-md w-full md:w-40 text-center"
                >
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={`flex flex-col ${showPrimary?'block':'hidden'}   `} onMouseEnter={hoverPrimary} onMouseLeave={leavePrimary}>
      <div className="flex flex-col md:flex-row p-4 justify-around">
          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class LKG</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/pages/lkg">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>


          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class UKG</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/pages/ukg">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>

          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class 1st</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/pages/1stexam">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>


          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class 2nd</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/pages/2ndexam">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>

          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class 3rd</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/pages/3rdexam">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>

          </div>
</div> */}

{/* ${hidePrimary?'block':'hidden'}  */}
      {/* <div className={`flex flex-col  ${showSection ? 'block':'hidden'} `} onMouseEnter={hoverClass} onMouseLeave={leaveClass}>
        <div className="flex flex-col justify-between flex-wrap  md:flex-row p-4 md:justify-around">
          <div className=" flex flex-col    rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col  p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class 4th</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/pages/4thexam">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>


          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col  p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class 5th</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/pages/5thexam">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>


          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class 6th</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/pages/6thexam">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>

          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col  p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class 7th</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/pages/7thexam">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>

          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class 8th</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/pages/8thexam">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>


        </div>


        <div className="flex flex-col md:flex-row p-4 justify-around">
          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class 9th</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/pages/9thexam">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>


          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col  p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class 10th</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/10thsyllabus">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>


          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col  p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class 11th</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/pages/11thexam">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div>

          <div className=" flex flex-col rounded-lg border-sm shadow-lg shadow-orange-400 p-4">
            <div className="flex flex-col  p-2 md:p-4">
              <p className="text-lg md:text-xl capitalize  font-bold" >class 12th</p>
              <p className="md:text-lg capitalize  font-semibold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="/12thsyllabus">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div> */}

          {/* <div className=" flex flex-col shadow-lg shadow-orange-500 p-4">
            <div className="flex flex-col sha p-4">
              <p className="text-xl capitalize  font-bold" >class eighth</p>
              <p className="text-xl capitalize  font-bold">foundation</p>
            </div>
            <div className="flex items-center justify-end text-orange-600">
              <button>
                <Link href="">view more</Link>
              </button>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </div>
          </div> */}


        {/* </div>


      </div> */}
      
    </div>
  );
};

export default Exam1;
