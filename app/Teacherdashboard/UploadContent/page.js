"use client";
import React, { useState } from "react";
import UploadNotes from "../UploadContent/pdf/page";
import UploadVideos from "../UploadContent/ConceptVideos/page";
import { BsPersonVideo3 } from "react-icons/bs";
import { AiOutlineFilePdf } from "react-icons/ai";

const UploadContent = () => {
  const [uploadNotes, setUploadNotes] = useState(false);
  const [uploadVideos, setUploadVideos] = useState(false);

  const handleUploadNotes = () => {
    setUploadNotes(true);
  };

  const handleUploadVideos = () => {
    setUploadVideos(true);
  };

  if (uploadNotes) return <UploadNotes />;
  if (uploadVideos) return <UploadVideos />;
  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-[1.8em] text-center text-orange-600 font-extrabold ">
          Upload Your Content
        </h1>
        <ol className="flex flex-col gap-4 font-semibold mx-4 md:mx-10 mt-6 list-decimal text-[.9em] md:text-[1.1em]">
          <li>
            A teacher can earn by conducting live classes or uploading recorded
            lectures
          </li>
          <li>
            A teacher can earn by uploading study materials or notes for
            students to purchase.
          </li>
          <li>
            A teacher can earn by creating and uploading educational videos for
            students to view or download.
          </li>
          <li>
            Use a blackboard or whiteboard to clearly explain topics, helping
            students understand the material more effectively.
          </li>
          <li>Maintain high video quality for a better viewing experience.</li>
          <li>
            Content Verification: After you upload a video, it will undergo a
            verification process. Once approved, you’ll be eligible to receive
            your reward.
          </li>
        </ol>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 md:px-20 gap-1 md:gap-4 ">
        <button
          className="font-bold text-md flex flex-col gap-4 items-center shadow-2xl text-white bg-gradient-to-r from-purple-500 to-red-500  p-4 rounded-lg   mt-8 "
          onClick={handleUploadNotes}
        >
          <AiOutlineFilePdf size={35} />
          Upload Notes
        </button>
        <button
          onClick={handleUploadVideos}
          className="font-bold text-md flex flex-col gap-4 items-center  shadow-2xl text-white bg-gradient-to-r from-blue-600 to-purple-500    p-4 rounded-lg   mt-8 "
        >
          <BsPersonVideo3 size={35} />
          Upload Videos
        </button>
      </div>
    </div>
  );
};

export default UploadContent;
