"use client";

import dynamic from "next/dynamic";

const ClientPage = dynamic(
  () => import("@/components/client/government-exams_slug"),
  { ssr: false }
);

export default function GovernmentExamsSlugClientWrapper(props) {
  return <ClientPage {...props} />;
}
