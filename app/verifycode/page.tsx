
// 'use client'
// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ThreeDots } from 'react-loader-spinner'
// import Cookies from "js-cookie";
// import {toast, ToastContainer} from "react-toastify"

// export default function VerifyOTP() {
//   const router = useRouter();
//   const [email, setEmail] = useState(Cookies.get("forgotdocemail"));
//   const [otp, setOtp] = useState("");
//   const [toggle, setToggle] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setToggle(true);
//     try {
//       const response = await fetch("/api/auth/verifyotp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.message);
//         setTimeout(() => {
//           router.push("/resetpassword");
//         }, 1000);
//       } else {
//         toast.error("Invalid or expired code");
//         setToggle(false);
//         setTimeout(() => {
//           router.push("/resetpassword");
//         }, 1000);
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//       setToggle(false);
//       setTimeout(() => {
//         router.push("/resetpassword");
//       }, 1000);
//     }
//   };

//   const handleResendCode = async () => {
//     setResendLoading(true);
//     try {
//       const response = await fetch("/api/auth/sendotp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Verification code resent to your email");
//       } else {
//         toast.error("Failed to resend code");
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//     setResendLoading(false);
//   };

//   return (
//     <div className="flex h-screen w-full flex-wrap">
//       <div className="flex w-full justify-center bg-white">
//         <div className="z-10 mx-5 mt-[calc(20vh)] h-fit w-full max-w-md overflow-hidden rounded-lg sm:mx-0">
//           <div className="flex flex-col items-center space-y-3 px-4 py-6 text-center sm:px-16">
//             <img src="/logo.png" style={{ height: '100px', width: '100px' }} className="m-2" />
//             <h3 className="text-2xl font-semibold text-gray-800">Verify Code</h3>
//             <p className="text-sm text-gray-800">Enter the Verification Code sent to your email.</p>
//           </div>
//           <form className="flex flex-col gap-4 px-4 pt-8 sm:px-16" onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-1">
//               <label className="sr-only" htmlFor="otp">Verification Code</label>
//               <input
//                 id="otp"
//                 name="otp"
//                 type="text"
//                 placeholder="Enter Verification Code"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//                 className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus:ring-gray-800"
//               />
//             </div>
//             <button
//               type="submit"
//               className="flex h-10 items-center justify-center rounded bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-900"
//             >
//               Verify
//             </button>
//             {toggle && <div className="mx-auto"><ThreeDots/></div>}
//           </form>
//           <div className="mt-6 flex flex-col items-center gap-2 px-4 sm:px-16 text-sm">
//             <button
//               onClick={handleResendCode}
//               disabled={resendLoading}
//               className="text-blue-600 underline hover:text-blue-800"
//             >
//               {resendLoading ? 'Resending...' : "Didn't receive the Verification Code? Resend"}
//             </button>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }


'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VerifyOTP() {
  const router = useRouter();
  const [email, setEmail] = useState(Cookies.get("forgotdocemail") || "");
  const [otp, setOtp] = useState("");
  const [toggle, setToggle] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToggle(true);
    try {
      const response = await fetch("/api/auth/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/resetpassword");
        }, 1000);
      } else {
        toast.error("Invalid or expired code");
        setToggle(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setToggle(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    try {
      const response = await fetch("/api/auth/sendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Verification code resent to your email");
      } else {
        toast.error("Failed to resend code");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setResendLoading(false);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <div className="z-10 mx-5 h-fit w-full max-w-md overflow-hidden rounded-lg sm:mx-0">
          <div className="flex flex-col items-start justify-start space-y-3 px-4 py-6 pt-8 text-start sm:px-16">
            <Link href="/">
              <img
                src="logo.png"
                style={{ height: "100px", width: "100px" }}
                className="m-2"
                alt="DocuPitch Logo"
              />
            </Link>
            <span
              className="text-3xl font-semibold"
              style={{ fontFamily: "PP Pangaia" }}
            >
              Verify Code
            </span>
            <h3
              className="text-lg text-[#4B5563]"
              style={{ fontFamily: "SF Pro Display Light" }}
            >
              Enter the Verification Code sent to your email.
            </h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-1 px-4 pt-4 sm:px-16"
          >
            <Label htmlFor="otp" className="text-sm text-gray-700">
              Verification Code
            </Label>
            <Input
              id="otp"
              placeholder="Enter verification code"
              type="text"
              disabled={toggle}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
            />

            <Button
              type="submit"
              disabled={toggle}
              className="mt-4 bg-[#F97316] focus:shadow-outline rounded px-4 py-2 text-white transition-colors duration-300"
            >
              {toggle ? "Verifying..." : "Verify"}
            </Button>

            {toggle && (
              <div className="mt-4 flex justify-center">
                <ThreeDots height="40" width="40" color="#000" />
              </div>
            )}

            <div className="mt-4 text-sm text-center">
              Didn’t receive the verification code?{" "}
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendLoading}
                className="text-[#F97316] underline hover:text-[#2516f9d4] disabled:text-gray-500"
              >
                {resendLoading ? "Resending..." : "Resend"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#FFF7ED] p-6">
        <img
          src="/images/login-pra.png"
          alt="Verification Illustration"
          className="max-w-[80%] h-auto object-cover mb-6"
          style={{ borderRadius: "8px", boxShadow: "0px 0px 70px #00000040" }}
        />
        <h2
          className="text-2xl font-semibold text-gray-800 text-center mb-2"
          style={{ fontFamily: "PP Pangaia" }}
        >
          Secure your access
        </h2>
        <p
          className="text-gray-600 text-center max-w-sm"
          style={{ fontFamily: "SF Pro Display Light" }}
        >
          Enter the code we sent to your email to verify your identity and reset your password.
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}
