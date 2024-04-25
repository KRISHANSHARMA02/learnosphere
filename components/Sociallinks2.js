"use client"
import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Sociallinks2 = () => {
    const links = [
        {
          id: 1,
          child: (
            <>
          <FaLinkedin size={20} />
            </>
          ),
          href: "",
          
        },
        {
          id: 2,
          child: (
            <>
               <FaWhatsapp size={20} />
            </>
          ),
          href: "https://wa.me/7221041071",
        },
        {
          id: 3,
          child: (
            <>
               <HiOutlineMail size={20} />
            </>
          ),
          href:'mailto:learnoshpere@gmail.com',
        },
        {
          id: 4,
          child: (
            <>
               <FaInstagram size={20} />
            </>
          ),
            href: "",
        },
      ];


    return (
        <div className="flex items-center z-50 fixed bottom-4 right-0 w-full h-48 lg:hidden ">
          
          <ul className='flex  gap-2 fixed right-2 bottom-[2.5rem] z-50 flex-col justify-between'>
            {links.map(({ id, child, href,download }) => (
              <li
                key={id}
                className={
                  "flex justify-between items-center z-50 h-16 px-4 rounded-lg hover:scale-110 duration-150 bg-gray-500"
                }
              >
                <a
                  href={href}
                  className="flex justify-between items-center w-full text-white"
                  download={download}
                  target="_blank"
                  rel="noreferrer"
                >
                  {child}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default Sociallinks2
