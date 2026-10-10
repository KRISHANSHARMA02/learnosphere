"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react"; // Assuming you're using next-auth for session
import Image from "next/image";
import ReferPicture from "@/public/Refer2-removebg-preview.png";
import { FaChalkboardTeacher, FaWhatsapp } from "react-icons/fa";
import { PiChalkboardTeacherThin } from "react-icons/pi";
import { IoCheckmarkDone, IoRemoveOutline } from "react-icons/io5";
import { GiCash } from "react-icons/gi";
import { BiLogoGmail } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { FaCommentSms } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const ReferralCodeFetcher = () => {
  const { data: session, status } = useSession(); // Fetch session data
  const [referralCode, setReferralCode] = useState(null);
  const [referralLink, setReferralLink] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [referrerName, setReferrerName] = useState(null);

  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    if (referralCode) {
      setReferralLink(`https://learnosphere.in/Signin?ref=${referralCode}`);
    }
  }, [referralCode]);
  
  useEffect(() => {
    const fetchReferralCode = async () => {
      setError("");
      setReferralCode(null);
    
      setReferrerName(null);

      if (status === "authenticated" && session?.user?.email) {
        try {
          // Fetch referral code using the email from session
          const response = await axios.get(
            `https://learnospherebackend.learnosphere.in/api/route/get-referral/${session.user.email}`
          );
          setReferralCode(response.data.referralCode);
         
          setReferrerName(response.data.referrerName);
        } catch (err) {
          setError(err.response?.data.errors[0]?.msg || "Something went wrong");
        }
      } else {
        setError("User not authenticated");
      }
    };

    fetchReferralCode();
  }, [session, status]);

  const shareOnWhatsApp = () => {
    if (referralCode) {
      const message = `I just found an awesome way to [learn/teach] smarter with Learnosphere! Since I know you'll love it too, here’s a little gift use my referral code [${referralCode}] when you sign up and grab [reward/discount]!No FOMO! Join now: ${referralLink} Let’s grow together! `;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const shareOnEmail = () => {
    if (referralCode) {
      const subject = `Join now Using My Referral Code`;
      const body = `I just found an awesome way to [learn/teach] smarter with Learnosphere! Since I know you'll love it too, here’s a little gift —use my referral code [${referralCode}] when you sign up and grab [reward/discount]!No FOMO! Join now: ${referralLink} Let’s grow together! `;
      const emailUrl = `mailto:?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = emailUrl;
    }
  };

  const shareViaSMS = () => {
    if (referralCode) {
      const message = `I just found an awesome way to [learn/teach] smarter with Learnosphere! Since I know you'll love it too, here’s a little gift —use my referral code [${referralCode}] when you sign up and grab [reward/discount]!No FOMO! Join now: ${referralLink} Let’s grow together! `;
      const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
      window.location.href = smsUrl;
    }
  };

  const handleCopy = () => {
    if (referralLink) {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          toast.success("Referral Link Copied!");
        })
        .catch(() => {
          toast.error("Failed to Copy!");
        });
    }
  };
  

  const handleCopy1 = () => {
    if (referralCode) {
      navigator.clipboard
        .writeText(referralCode)
        .then(() => {
          toast.success("Referral Code Copied!");
        })
        .catch(() => {
          toast.error("Failed to Copy!");
        });
    }
  };

  return (
    <div className=" p-6 bg-white shadow-lg  rounded-lg">
      <ToastContainer position="top-center" autoClose={4000} />
      <div className="bg-gradient-to-r  flex flex-col-reverse sm:flex-row p-4 from-blue-200  to-green-200 rounded-xl">
        <div className="w-full md:w-[60%] lg:w-[70%] px-2 lg:px-10 mt-2 sm:mt-8 md:mt-14 2xl:mt-28  flex flex-col gap-3">
          <h1 className="text-[1em] lg:text-[1.4em] font-bold">
            Refer and Earn: Grow While You Earn
          </h1>
          <p className="font-semibold text-[.8em] lg:text-[1em]">
            Refer and Earn programs help tutors earn extra income by referring
            students or fellow tutors. Successful referrals can lead to cash
            rewards, discounts, or bonuses. This allows tutors to grow their
            network while benefiting from additional earnings.
          </p>

          <button className="font-bold text-start text-[1.2em] mt-4 ">
            Share Your Referral:
          </button>
          <div className=" flex   gap-4  rounded-lg  items-center ">
            <FaWhatsapp
              className="bg-green-500 text-white p-2  rounded-full"
              size={40}
              onClick={shareOnWhatsApp}
            />
            <BiLogoGmail
              className="text-red-500 bg-white p-2 rounded-full "
              size={40}
              onClick={shareOnEmail}
            />
            <FaCommentSms
              className="bg-yellow-500 text-white p-2 rounded-full"
              size={40}
              onClick={shareViaSMS}
            />
          </div>
        </div>

        <div className="w-full md:w-[40%] md:mt-16 lg:mt-0 lg:w-[30%]">
          <Image src={ReferPicture} alt="" />
        </div>
      </div>
      <div className="flex flex-col justify-center  items-center">
        <h3 className="flex text-[1.4em] font-bold mt-8 text-center">
          How It Works ?
        </h3>
        <IoRemoveOutline size={50} className="mt-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-4  mt-8">
          <div className="border-gray-300 border  p-4 rounded-xl flex flex-col gap-2">
            <FaChalkboardTeacher
              className=" text-yellow-500 rounded-xl p-3 bg-white"
              size={60}
            />
            <h3 className="font-bold text-[1.3em]">
              Invite Your Friends & Earn Rewards!{" "}
            </h3>
            <p>
              Share your referral code with fellow tutors and earn exciting
              rewards for every successful sign-up. Expand your network, help
              others kickstart their tutoring journey, and enjoy extra earnings
              along the way. Start referring today and grow together!
            </p>
          </div>
          <div className=" border-gray-300 border  p-4 rounded-xl flex flex-col gap-2">
            <PiChalkboardTeacherThin
              className=" text-blue-500 rounded-xl p-3 bg-white"
              size={60}
            />
            <h3 className="font-bold text-[1.3em]">Friend Signs Up</h3>
            <p>
              Once your friend signs up using your invite, both of you unlock
              exciting rewards! The more friends you invite, the more you earn.
              It's that simple—spread the word, help others join, and enjoy the
              benefits together!
            </p>
          </div>
          <div className=" border-gray-300 border  p-4 rounded-xl flex flex-col gap-2">
            <GiCash
              className=" text-green-500 rounded-xl p-3 bg-white"
              size={60}
            />
            <h3 className="font-bold text-[1.3em]">Earn Rewards</h3>
            <p>
              Earn rewards when both teachers upload 15 unique videos each,
              related to their own subjects. The videos should be distinct,
              ensuring high-quality content!
            </p>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {referralCode ? (
        <div className="w-full mt-8">
          <h3 className="text-[1.3em] mt-3 font-bold">Invite Your Friends </h3>
          <div className="flex gap-1 w-full sm:w-[60vw] lg:w-[37vw] border border-gray-300 rounded-xl shadow-2xl p-1 sm:p-6 m-auto flex-col mt-6  items-center">
            <div className="mt-4   items-center w-full m-auto p-3 flex justify-between border border-gray-200 rounded-xl">
              <p className="text-black" onClick={handleCopy}>
                <strong>{referralLink}</strong>
              </p>
              <button
                onClick={handleCopy}
                className=" w-8 bg-gray-200  text-black p-2 rounded-md "
              >
                <MdContentCopy />
              </button>
            </div>
            <p className="text-orange-600 font-bold text-[1em]">OR</p>
            <div className="mt-4   items-center m-auto w-full   p-3 flex justify-between border border-gray-200 rounded-xl">
              <p className="text-black font-semibold " onClick={handleCopy1}>
                Referral Code: <strong>{referralCode}</strong>
              </p>
              <button
                onClick={handleCopy1}
                className=" w-8 bg-gray-200  text-black p-2 rounded-md "
              >
                <MdContentCopy />
              </button>
            </div>
            <p className="text-orange-600 font-bold text-[1em]">OR</p>
            <div className=" flex  justify-center  cursor-pointer p-3    gap-4  rounded-lg  items-center ">
              <FaWhatsapp
                className="bg-green-500 text-white p-2  rounded-full"
                size={32}
                onClick={shareOnWhatsApp}
              />
              <BiLogoGmail
                className="text-red-500 bg-white p-2 rounded-full "
                size={32}
                onClick={shareOnEmail}
              />
              <FaCommentSms
                className="bg-yellow-500 text-white p-2 rounded-full"
                size={32}
                onClick={shareViaSMS}
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Fetching referral code...</p>
      )}

      {referrerName && referrerName !== "No referrer found" && (
        <div className="w-80 flex justify-end items-end">
          <p className=" text-[.9em]  text-center font-semibold text-green-500 mt-2 border border-orange-500 p-2 rounded-full">
            Referred by: {referrerName}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReferralCodeFetcher;
