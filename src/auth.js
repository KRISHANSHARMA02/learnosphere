import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    jwt: {
      signingKey: {
        kty: "oct",
        kid: process.env.NEXTAUTH_JWT_KEY_ID,
        alg: "HS512",
        k: process.env.NEXTAUTH_JWT_KEY,
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        const { identifier, password, role, deviceInfo } = credentials;

        try {
          const endpoint =
            role === "teacher"
              ? "https://learnospherebackend.learnosphere.in/api/route/login"
              : "https://learnospherebackend.learnosphere.in/api/route/studentlogin";
        

          const response = await axios.post(endpoint, {
            identifier, // Use identifier instead of email
            password,
            deviceInfo, // Send device info to the backend
          });

          if (response.data && response.data.user) {
            return response.data.user; // Return user data
          } else {
            if (response.data && response.data.errors) {
              throw new Error(response.data.errors[0].message);
            } else {
              throw new Error("Invalid credentials");
            }
          }
        } catch (error) {
          console.error("Authorization error:", error.message || error);
          throw new Error(
            error.response?.data?.errors?.[0]?.msg || "Invalid credentials"
          );
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",

        },
        
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      // If it's the first time the user is signing in, add access_token to the token
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      // If the user object is available (first time login), add the email to the token
      if (user?.email) {
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      // Add the email and accessToken to the session object
      session.accessToken = token.accessToken;
      session.user.email = token.email; // Adding email to session
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    error: "/auth/error",
  },

  trustHost: true,
  trustDomain: true,
});
