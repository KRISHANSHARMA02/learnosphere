import React, { Suspense } from "react";
import PaymentPage from "./paymentclient"; // adjust path if needed

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">
          {" "}
          <div className="flex justify-center items-center h-screen">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      }
    >
      <PaymentPage />
    </Suspense>
  );
}
