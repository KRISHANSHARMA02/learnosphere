import { Suspense } from "react";
import LiveContent from "@/components/client/TestSeriesContent";
import AppLoader from "@/components/widgets/AppLoader";

export default function Page() {
  return (
    <Suspense fallback={<AppLoader />}>
      <LiveContent />
    </Suspense>
  );
}