import DataTable from "./slugData";
import { getCbsePrevQuePpr } from "@/src/lib/actions/sample_papers_data_fetch";
import { auth } from "@/src/auth";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { decode } from "@auth/core/jwt";

export const dynamic = "force-dynamic";

export default async function CbsePYQ({ params }) {
  const { slug } = await params;
  if (!slug) return <p>Slug missing</p>;

  let user = null;
  try {
    const session = await auth();
    if (session?.user) {
      user = session.user;
    }
  } catch {}

  if (!user) {
    try {
      const cookieStore = await cookies();
      const tokenVal =
        cookieStore.get("authjs.session-token")?.value ||
        cookieStore.get("__Secure-authjs.session-token")?.value ||
        cookieStore.get("next-auth.session-token")?.value ||
        cookieStore.get("__Secure-next-auth.session-token")?.value;

      if (tokenVal) {
        const secret =
          process.env.NEXTAUTH_SECRET ||
          process.env.JWT_SECRET_KEY ;

        for (const salt of [
          "authjs.session-token",
          "__Secure-authjs.session-token",
          "next-auth.session-token",
          "__Secure-next-auth.session-token",
        ]) {
          try {
            const decoded = await decode({ token: tokenVal, secret, salt });
            if (decoded && (decoded.email || decoded.sub)) {
              user = {
                email: decoded.email || decoded.sub,
                role: decoded.role || "student",
              };
              break;
            }
          } catch {}
        }
      }
    } catch {}
  }

  let token = null;
  if (user) {
    const secret =
      process.env.JWT_SECRET_KEY ||
      process.env.NEXTAUTH_SECRET ;
    token = jwt.sign(
      { email: user.email , role: user.role },
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
      initialLoggedIn={Boolean(user)}
    />
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const title = (slug || "CBSE Previous Year Question Paper").replace(/-/g, " ");
  const description = `Download ${title} with solutions on Learnosphere.`;
  return { title, description };
}
