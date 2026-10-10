import React from "react";
import Picture from "@/public/WhatsApp Image 2025-01-08 at 15.30.39.jpeg";
import Image from "next/image";
import { IoSendSharp } from "react-icons/io5";

const WhatsApp = () => {
  const customMessage = encodeURIComponent(
    "Hello! I'm interested in learning more about your services."
  );

  return (
    <div
      className="fixed bottom-6 right-6 h-auto w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[37vw] xl:w-[27vw] 2xl:w-[18vw] bg-contain bg-center font-Poppins rounded-2xl z-50 mx-0 md:mx-10"
      style={{ backgroundImage: "url('/whatsapp-body.jpg')" }}
    >
      <div className="pt-2 px-4 bg-green-700 h-12 md:h-16 rounded-tr-2xl rounded-tl-2xl z-50">
        <div className="flex gap-3 items-center">
          <Image
            src={Picture}
            alt="Logo Image"
            height={100}
            width={100}
            className="rounded-full h-8 md:h-12 w-8 md:w-12 bg-contain"
          />
          <p className="font-semibold text-white text-[.8em] md:text-[1.1em]">
            Learn<b className="text-orange-600">O</b>sphere Helpline
          </p>
        </div>
      </div>

      <div className="px-2 pt-5 w-[60vw] sm:w-[42vw] md:w-[40vw] lg:w-[30vw] xl:w-[23vw] 2xl:w-[15vw] z-50">
        <p className="bg-white p-2 text-[.9em] md:text-[1em] rounded-lg text-gray-900">
          Hello, How Can I Help You Today?
        </p>
      </div>

      <div className="bg-white rounded-bl-2xl text-center rounded-br-2xl mt-[53px] p-4 w-full z-50">
        <a
          href={`https://wa.me/8769600449?text=${customMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 rounded-full p-2 flex gap-2 justify-center items-center w-full font-semibold text-white text-[1.1em]"
        >
          Start Chat
          <IoSendSharp size={18} />
        </a>
      </div>
    </div>
  );
};

export default WhatsApp;
