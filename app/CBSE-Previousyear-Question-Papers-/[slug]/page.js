import DataTable from "./slugData";
import { getCbsePrevQuePpr } from "@/src/lib/actions/sample_papers_data_fetch";
import { auth } from "@/src/auth";
import jwt from "jsonwebtoken";

export default async function CbsePYQ({ params }) {
  const { slug } = await params;
  if (!slug) return <p>Slug missing</p>;

  const session = await auth();
  let token = null;

  if (session?.user) {
    const secret = process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET_KEY;
    token = jwt.sign(
      { email: session.user.email, role: session.user.role || "student" },
      secret,
      { expiresIn: "1h" }
    );
  }

  const data = await getCbsePrevQuePpr(slug, token);

  if (!data || data.length === 0) return <p>No Previous year papers found</p>;
   
  return (
    <DataTable
      data={data}
      slug={slug}
      initialLoggedIn={Boolean(session?.user)}
    />
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const title = (slug || "CBSE Previous Year Question Paper").replace(/-/g, " ");
  const description = `Download ${title} with solutions on Learnosphere.`;
  return { title, description };
}
