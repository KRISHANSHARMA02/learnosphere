import { Suspense } from "react";
import ContentFound from "@/components/SearchResultFound";// or "@/components/ContentFound" if you moved it there

export default function SearchResultPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ContentFound />
    </Suspense>
  );
}