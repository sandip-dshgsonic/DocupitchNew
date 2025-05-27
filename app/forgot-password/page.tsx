"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import logo from "../../../styles/logo.svg";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToggle(true);
    Cookies.remove("forgotdocemail");
    Cookies.set("forgotdocemail", email, { expires: 1 });

    try {
      const response = await fetch("/api/auth/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Verification code sent to Email");
        setTimeout(() => {
          router.push("/verifycode");
        }, 1000);
      } else {
        toast.error(data.error || "Something went wrong");
        setToggle(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setToggle(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <div className="z-10 mx-5 h-fit w-full max-w-md overflow-hidden rounded-lg sm:mx-0">
          <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-start sm:px-16">
            <Link href="/">
              <img
                src='logo.png'
                style={{ height: "100px", width: "100px" }}
                className="m-2"
                alt="DocuPitch Logo"
              />
            </Link>
            <span
              className="text-3xl font-semibold"
              style={{ fontFamily: "PP Pangaia" }}
            >
              Forgot Password?
            </span>
            <h3
              className="text-lg text-[#4B5563]"
              style={{ fontFamily: "SF Pro Display Light" }}
            >
              Enter your email to reset your password.
            </h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-1 px-4 pt-4 sm:px-16"
          >
            <Label htmlFor="email" className="text-sm text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={toggle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
            />

            <Button
              type="submit"
              disabled={toggle}
              className="mt-4 bg-[#F97316] focus:shadow-outline rounded px-4 py-2 text-white transition-colors duration-300"style={{borderRadius:'8px'}}
            >
              {toggle ? "Sending..." : "Send Verification Code"}
            </Button>

            <div className="mt-4 text-sm text-center">
              Remembered your password?{" "}
              <Link href="/login" className="text-[#F97316] underline hover:text-[#2516f9d4]">
                Go back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right section - Illustration */}
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
          Uncover Hidden Investor Intent 
        </h2>
        <p
          className="text-gray-600 text-center max-w-sm"
          style={{ fontFamily: "SF Pro Display Light" }}
        >
          Identify warm leads by seeing who viewed your deck, how often, and which slides captured the most attention. 
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}
