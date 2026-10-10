"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const BookingParentPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Automatically send users to the Requests list
    router.push("/Teacherdashboard/Booking/BookingRequests");
  }, [router]);

  return null; // Render nothing while redirecting
};

export default BookingParentPage;