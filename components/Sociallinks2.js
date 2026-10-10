"use client"
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Sociallinks2 = () => {
  // Define the custom message
  const customMessage = encodeURIComponent("Hello! I'm interested in learning more about your services.");

  const links = [
    {
      id: 1,
      child: (
        <>
          <FaWhatsapp size={30} />
        </>
      ),
      
      href: `https://wa.me/918769600449?text=${customMessage}`,
      style: "bg-green-500 hover:bg-green-500 hover:text-white duration-300",
    },
  ];

  return (
    <div className="flex items-center z-50 fixed bottom-4 right-0 w-max h-44">
      <ul className="flex gap-2 fixed right-4 bottom-[10rem] z-50 flex-col justify-between">
        {links.map(({ id, child, href, style }) => (
          <li
            key={id}
            className={`flex justify-between items-center z-50 h-16 animate-bounce px-4 rounded-full hover:scale-110 duration-150 ${style}`}
          >
            <a
              href={href}
              className="flex justify-between items-center w-full text-white"
              alt="WhatsApp"
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
};

export default Sociallinks2;
