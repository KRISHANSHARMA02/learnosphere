"use client";

import dynamic from "next/dynamic";

const ClientPage = dynamic(
  () => import("@/components/client/government-exams"),
  { ssr: false }
);

export default function GovernmentExamsClientWrapper(props) {
  return <ClientPage {...props} />;
}
