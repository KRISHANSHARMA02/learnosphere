"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const Teacherdashboard = () => {

  const router = useRouter();

  useEffect(() => {
    // Redirect to /Teacherdashboard/Home
    router.push("/Teacherdashboard/Home");
  }, [router]);

  return null; // Render nothing as it's just a redirect
};


export default Teacherdashboard;

 
