"use client";

import dynamic from "next/dynamic";

const ClientPage = dynamic(
  () => import("@/components/client/academics"),
  { ssr: false }
);

export default function AcademicsClientWrapper(props) {
  return <ClientPage {...props} />;
}
