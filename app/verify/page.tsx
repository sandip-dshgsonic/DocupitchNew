



"use client"; // Mark this file as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import for programmatic navigation
// import { toast } from "sonner";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import { CreateUserEmailProps, CustomUser } from "@/lib/types";

export default function VerifyEmail() {
  const [formData, setFormData] = useState({ email: Cookies.get("docemail"), verificationCode: "" });
  const[toggleText,setToggleText]=useState(false)
  const[message,setMessage]=useState('')
  const[error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const router = useRouter(); // Initialize the router

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Inside VerifyEmail component

const handleResendCode = async () => {
  setLoading(true)
  try {
    const response = await fetch("/api/auth/resend-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Verification code resent successfully!");
      setLoading(false)
    } else {
      toast.error(data.error || "Failed to resend code");
      setLoading(false)

    }
  } catch (err) {
    toast.error("Error resending code");
    setLoading(false)

  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormData


    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
  
console.log('verify')
      if (response.ok) {
        setToggleText(true)
        console.log('verify done')
        toast.success('Registeration Successful, Redirecting...')
        try {
          await fetch("/api/auth/send-welcome-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }), // or other relevant data
          });
          console.log("Welcome email sent");
        } catch (emailErr) {
          console.error("Failed to send welcome email", emailErr);
        }
        router.push("/login");
        console.log('verify done 2')
        
        setMessage(data.message);
        router.push("/login");
        setError("");
      } else {
        setMessage("");
        setError(data.error);
        toast.error('Verification Failed!!')

        // If verification fails, delete the user and redirect to signup
        await fetch("/api/auth/delete-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });

        // Redirect to signup page
        setTimeout(() => {
          router.push("/sign-up");
        }, 1000);
       
      }
    } catch (err) {
      setError("An error occurred.");
      toast.error('Some Error Occured')
      await fetch("/api/auth/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      setTimeout(() => {
        router.push("/sign-up");
      }, 1000);
    }
  };

  return (
   
<div className="flex h-screen w-full">
  {/* Left Section - Form */}
  <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
    <div className="z-10 mx-5 h-fit w-full max-w-md overflow-hidden sm:mx-0">
      <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-start sm:px-16">
        <Link href="/">
          <img
            src="/logo.png"
            style={{ height: "100px", width: "100px" }}
            alt="logo"
            className="m-2"
          />
        </Link>
        <span
          className="text-3xl font-semibold text-gray-800"
          style={{ fontFamily: "PP Pangaia" }}
        >
          Verify Code
        </span>
        <h3
          className="text-lg text-gray-600"
          style={{ fontFamily: "SF Pro Display Light" }}
        >
          Enter the verification code sent to your email.
        </h3>
      </div>

      <form
        className="flex flex-col gap-1 px-4 pt-4 sm:px-16"
        onSubmit={handleSubmit}
      >
        <label htmlFor="verificationCode" className="text-sm text-gray-700">
          Verification Code
        </label>
        <input
          id="verificationCode"
          type="text"
          name="verificationCode"
          value={formData.verificationCode}
          onChange={handleChange}
          placeholder="Enter verification code"
          className="h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
        />

        <button
          type="submit"
          className="mt-4 bg-[#F97316] hover:bg-[#E86305] focus:shadow-outline flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors duration-300"
        >
          {toggleText ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
                ></path>
              </svg>
              Registration Successful, Redirecting...
            </>
          ) : (
            "Verify"
          )}
        </button>
        
        <div className="mt-4 text-sm text-center">
          Didn&apos;t receive the verification code?{" "}
          <button
            type="button"
            onClick={handleResendCode}
            className="text-[#F97316] underline hover:text-blue-600"
          >
            Resend Verification Code
          </button>
        </div>

        {loading ? (
          <div className="mt-4 flex justify-center">
            <ThreeDots />
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  </div>

  {/* Right Section - Illustration */}
  <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#FFF7ED] p-6">
     <img
          src="/images/HomePageImage.png"
          alt="Login Illustration"
          className="mb-6 w-full max-w-[90%] object-contain"
          style={{ 
            borderRadius: "8px", 
            boxShadow: "0px 0px 70px #00000040",
            maxHeight: "70vh"
          }}
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
      Enter the code we sent to your email to verify your identity and access DocuPitch.
    </p>
  </div>
  
  <ToastContainer />
</div>

  );
}
