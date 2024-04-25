"use client"
import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaInstagram } from "react-icons/fa";


const Sociallinks = () => {
    const links = [
        {
          id: 1,
          child: (
            <>
              LinkedIn <FaLinkedin size={30} />
            </>
          ),
          href: "",
          style: "rounded-tr-md",
        },
        {
          id: 2,
          child: (
            <>
              Whats app <FaWhatsapp size={30} />
            </>
          ),
          href: "https://wa.me/7221041071",
        },
        {
          id: 3,
          child: (
            <>
              Mail <HiOutlineMail size={30} />
            </>
          ),
          href: 'mailto:learnoshpere@gmail.com'
        
        },
        {
            id: 4,
            child: (
              <>
                Instagram <FaInstagram size={30} />
              </>
            ),
            href: "",
            style: "rounded-br-md",
          }
      ];


    return (
        <div className="hidden lg:flex flex-col z-50 top-[38%] left-0 fixed">
          <ul>
            {links.map(({ id, child, href, style, download }) => (
              <li
                key={id}
                className={
                  "flex justify-between items-center w-40 h-14 px-4 ml-[-100px] hover:ml-[-10px] hover:rounded-md duration-300 bg-gray-500" +
                  " " +
                  style
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

export default Sociallinks