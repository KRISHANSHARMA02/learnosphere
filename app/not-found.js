import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import NotFoundLogo from "@/public/NotFoundLogo.png";

const PageNotFound = () => {
  
  return (
    <>
    <Navbar/>
    <div className="flex flex-col justify-center items-center h-screen">
      <Image src={NotFoundLogo} alt="Page Not Found" className="w-64 h-auto mb-4" />
      <h2 className="font-extrabold text-[6em] animate-pulse text-center bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
        404
      </h2>
      <p className="font-semibold text-center text-[2em]">Oops!</p>
      <p className="font-semibold text-center mt-2 text-[1em]">Error 404 - Page Not Found</p>
      <p className="font-semibold text-center mt-2 text-[.9em]">This page cannot be found. We're working on it.</p>
      <Link 
      href="/" 
      className="text-center mt-4 bg-gradient-to-r from-orange-600 rounded-md to-orange-500 text-white p-2 font-bold text-[1em]"
    >
      Go to homepage
    </Link>
    </div>
    <Footer1/>
<Footer/>    
    </>
  );
};

export default PageNotFound;
