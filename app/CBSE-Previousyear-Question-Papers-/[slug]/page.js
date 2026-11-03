const cbsePrevYearTitles = {
  "Cbse-Class-12-Maths-Question-Paper-2011": "CBSE Class 12 Maths Question Paper 2011 | Learnosphere",
  "Cbse-Class-12-Maths-Question-Paper-2012": "Class 12 Maths 2012 Paper: CBSE Previous Year | Learnosphere",
  "Cbse-Class-12-Maths-Question-Paper-2013": "CBSE 2013 Class 12 Mathematics Question Paper | Learnosphere",
  "Cbse-Class-12-Maths-Question-Paper-2014": "CBSE Class 12 Maths Question Paper 2014 | Learnosphere",
  "Cbse-Class-12-Maths-Question-Paper-2015": "Class 12 Maths 2015 Paper: CBSE Previous Year | Learnosphere",
  "Cbse-Class-12-Maths-Question-Paper-2016": "CBSE 2016 Class 12 Mathematics Question Paper | Learnosphere",
  "Cbse-Class-12-Maths-Question-Paper-2017": "CBSE Class 12 Maths Question Paper 2017 | Learnosphere",
  "Cbse-Class-12-Maths-Question-Paper-2018": "Class 12 Maths 2018 Paper: CBSE Previous Year | Learnosphere",
  "Cbse-Class-12-Maths-Question-Paper-2019": "CBSE 2019 Class 12 Mathematics Question Paper | Learnosphere",
  "Cbse-Class-12-Maths-Question-Paper-2020": "CBSE Class 12 Maths Question Paper 2020 | Learnosphere",
  "Cbse-Class-12-Maths-Question-Paper-2022": "Class 12 Maths 2022 Paper: CBSE Previous Year | Learnosphere",
  "Cbse-Class-12-Maths-Question-Paper-2023": "CBSE 2023 Class 12 Mathematics Question Paper | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2018": "CBSE 2018 Class 10 Mathematics Question Paper | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2019": "CBSE Class 10 Maths Question Paper 2019 | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2016": "CBSE Class 10 Maths Question Paper 2016 | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2017": "Class 10 Maths 2017 Paper: CBSE Previous Year | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2014": "Class 10 Maths 2014 Paper: CBSE Previous Year | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2015": "CBSE 2015 Class 10 Mathematics Question Paper | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2012": "CBSE 2012 Class 10 Mathematics Question Paper | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2013": "CBSE Class 10 Maths Question Paper 2013 | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2010": "CBSE Class 10 Maths Question Paper 2010 | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2011": "Class 10 Maths 2011 Paper: CBSE Previous Year | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2023": "CBSE Class 10 Maths Question Paper 2023 | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2024": "Class 10 Maths 2024 Paper: CBSE Previous Year | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2022": "CBSE 2022 Class 10 Mathematics Question Paper | Learnosphere",
  "Cbse-Class-10-Maths-Question-Paper-2020": "Class 10 Maths 2020 Paper: CBSE Previous Year | Learnosphere"
};

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
  const customTitle = cbsePrevYearTitles[slug] || cbsePrevYearTitles[slug?.toLowerCase()];
  const title = (slug || "CBSE Previous Year Question Paper").replace(/-/g, " ");
  const description = `Download ${title} with solutions on Learnosphere.`;
  return { title: customTitle ? { absolute: customTitle } : title, description };
}
