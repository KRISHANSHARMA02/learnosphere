import React, { Suspense } from "react";
import MobileCourseCards from "./mobileCourseCards"; // adjust path if needed

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center"></div>}>
      <MobileCourseCards />
    </Suspense>
  );
}