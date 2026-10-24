import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { signIn , signOut} from "next-auth/react";


// Social login methods for teachers
export async function Sociallogin(formdata) {

 
    const refCode = new URLSearchParams(window.location.search).get('ref')
    const callbackUrl = refCode ? `/Teacherdashboard?ref=${refCode}` : '/Teacherdashboard'
  
    const action = formdata.get('action')
    await signIn (action,{callbackUrl});


}

// export async function Sociallogin(formdata) {
//   const action = formdata.get("action");

//   const refCode =
//     new URLSearchParams(window.location.search).get("ref");

//   const callbackUrl = refCode
//     ? `/authcallback/teacher-callback?ref=${refCode}`
//     : "/authcallback/teacher-callback";

//   await signIn(action, {
//     callbackUrl,
//   });
// }

export async function Sociallogout() {
    await signOut({callbackUrl :"/Signin"});

}

export async function doCredentialLogin(credentials) {
  try {
    const response = await signIn('credentials', {
      identifier: credentials.identifier, // Change 'email' to 'identifier'
      password: credentials.password,
      role: credentials.role,  // Keep the role field
      deviceInfo: JSON.stringify(credentials.deviceInfo), // Convert deviceInfo to string
      redirect: false,
      callbackUrl: credentials.callbackUrl,
    });

    if (response.error) {
      // Handle the error and return it properly
      return { error: response.error };
    }

    return response; // Return the successful response
  } catch (error) {
    // Return error for the caller
    return { error: error.message || 'Login failed. Please try again.' };
  }
}



//Social login methods for students 
// export async function Socialloginstudent(formdata) {
//   const action = formdata.get("action");

//   // ✅ Read callbackUrl from the current page URL
//   const params = new URLSearchParams(window.location.search);
//   const callbackUrl = params.get("callbackUrl") || "/Userdashboard"; 

//   // Sign in with Google without auto-redirect
//   const result = await signIn(action, { redirect: false });

//   if (result?.error) {
//     console.error("Google login failed:", result.error);
//     return;
//   }

//   // Get NextAuth session to retrieve email
//   const sessionRes = await fetch(`/api/auth/session`);
//   const session = await sessionRes.json();

//   if (!session?.user?.email) return;

//   // Call backend to check if student form is completed
//   const res = await fetch(`${WEB_BACKEND_URL}/api/route/checkStudent`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ identifier: session.user.email }), // ✅ match backend param
//   });

//   const data = await res.json();

//   // 🚀 DYNAMIC REDIRECTION LOGIC
//   if (data.formCompleted) {
//     // If form is completed → go to callbackUrl (dynamic route)
//     window.location.href = callbackUrl;
//   } else {
//     // New user → go to signup
//     window.location.href = "/StudentForm";
//   }
// }

export async function Socialloginstudent(formdata) {
  const action = formdata.get("action");

  const callbackUrl =
    new URLSearchParams(window.location.search).get(
      "callbackUrl"
    ) || "/authcallback/student-callback";

  await signIn(action, {
    callbackUrl,
  });
}

export async function Sociallogoutstudent() {
  await signOut({callbackUrl :"/"});

}

