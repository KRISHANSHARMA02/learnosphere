import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/test-series';

export const metadata = {
  title: "Online Mock Tests & Assessment Resources",
  description: "Use online mock tests and assessment resources to measure your knowledge, practise exam-style questions and improve learning.",
  alternates: {
    canonical: buildCanonicalUrl("test-series"),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}