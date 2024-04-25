import React from "react";
import { Link } from "react-scroll";
import { IoIosArrowDropup } from "react-icons/io";

const Uparrow = () => {
  return (
    <div>
      <Link to="home" smooth
                  duration={500} className="fixed right-4 bottom-10 rounded-lg hidden md:block cursor-pointer p-2 bg-orange-500 text-white text-4xl z-50 hover:scale-110 duration-150">
        <IoIosArrowDropup />
      </Link>
    </div>
  );
};

export default Uparrow;