import React from "react";
import {
  FaHighlighter,
  FaInfoCircle,
  FaRegSmile,
  FaChalkboardTeacher,
} from "react-icons/fa";

const VideoInstructions = () => {
  return (
    <div className="mx-auto p-2 bg-white rounded-xl w-full font-Poppins">
      <h2 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center">
        Video Upload Instructions
      </h2>

      <p className="text-gray-600 mb-4 text-center underline text-xs sm:text-sm md:text-base lg:text-lg">
        Please follow these instructions to ensure a smooth video upload
        experience.
      </p>

      <div className="space-y-6">
       
    {/* New Instruction: Black/Whiteboard for Teaching */}
    <div className="flex items-start bg-white rounded-lg p-4 shadow-sm">
          <FaChalkboardTeacher className="text-teal-500 w-6 h-6 mr-4" />
          <span className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">
            Use a blackboard or whiteboard to clearly explain topics, helping students understand the material more effectively.
          </span>
        </div>
       
        {/* Instruction Item 4 */}
        <div className="flex items-start bg-white rounded-lg p-4 shadow-sm">
          <FaInfoCircle className="text-yellow-500 w-6 h-6 mr-4" />
          <span className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">
            Provide a clear and concise title and description to help users find
            relevant content.
          </span>
        </div>

        {/* Instruction Item 3 */}
        <div className="flex items-start bg-white rounded-lg p-4 shadow-sm">
          <FaHighlighter className="text-purple-500 w-6 h-6 mr-4" />
          <span className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">
            Maintain high video quality for a better viewing experience.
          </span>
        </div>

        {/* New Instruction: Content Verification */}
        <div className="flex items-start bg-white rounded-lg p-4 shadow-sm">
          <FaInfoCircle className="text-indigo-500 w-6 h-6 mr-4" />
          <span className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">
            <strong>Content Verification:</strong> After you upload a video, it will undergo a verification process. Once approved, you’ll be eligible to receive your reward.
          </span>
        </div>

        {/* Instruction Item 5 */}
        <div className="flex items-start bg-white rounded-lg p-4 shadow-sm">
          <FaRegSmile className="text-pink-500 w-6 h-6 mr-4" />
          <span className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">
            Ensure any content in the video adheres to our content policies.
          </span>
        </div>

    

        {/* Teacher Category Instructions */}
        <div className="flex items-start bg-white rounded-lg p-4 shadow-sm">
          <FaRegSmile className="text-orange-500 w-6 h-6 mr-4" />
          <span className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">
            Based on the length of your video, the reward and category will be
            determined:
            <ul className="list-disc pl-5 mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
              <li>
                <strong>Bronze Category:</strong> Videos up to <strong>5 minutes</strong> – Reward: <strong>₹50</strong>
              </li>
              <li>
                <strong>Silver Category:</strong> Videos longer than <strong>5 minutes</strong> but less than <strong>20 minutes</strong> – Reward: <strong>₹50 to ₹200</strong>
              </li>
              <li>
                <strong>Gold Category:</strong> Videos longer than <strong>20 minutes</strong> – Reward: <strong>₹200 and above</strong>
              </li>
            </ul>
          </span>
        </div>


        {/* Additional Condition */}
        <div className="flex items-start bg-white rounded-lg p-4 shadow-sm">
          <FaInfoCircle className="text-red-500 w-6 h-6 mr-4" />
          <span className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">
            <strong>Note:</strong> You will be eligible to redeem your reward
            money once you meet at least one of the following conditions:
            <ul className="list-disc pl-5 mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
              <li>Upload <strong>15 videos</strong> on the platform.</li>
              <li>Accumulate a total of <strong>₹1500</strong> in reward amount.</li>
            </ul>
          </span>
        </div>
      </div>

      <p className="mt-8 text-gray-600 text-center text-xs sm:text-sm md:text-base lg:text-lg">
        If you encounter any issues uploading your video, please contact support
        for assistance.
      </p>
    </div>
  );
};

export default VideoInstructions;

