"use client";

import dynamic from "next/dynamic";

const ClientPage = dynamic(
  () => import("@/components/client/competitive-exams_slug"),
  { ssr: false }
);

export default function CompetitiveExamClientWrapper(props) {
  return <ClientPage {...props} />;
}
