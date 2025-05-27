"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import logo from "../../../styles/logo.svg";

export default function Login() {
  const { next } = useParams() as { next?: string };
  const router = useRouter();

  const [isLoginWithEmail, setIsLoginWithEmail] = useState<boolean>(false);
  const [isLoginWithPassword, setIsLoginWithPassword] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailButtonText, setEmailButtonText] = useState<string>(
    "Continue with Email",
  );
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handlePasswordLogin = async () => {
    if (!email) {
      setEmailError("Email is required.");
      return;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      return;
    } else {
      setPasswordError("");
    }

    setIsLoginWithPassword(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      ...(next && next.length > 0 ? { callbackUrl: next } : {}),
    });

    if (res?.ok && !res?.error) {
      toast.success("Logged in successfully!");
      router.push("/documents");
    } else {
      setPasswordError("Invalid credentials. Please try again.");
    }

    setIsLoginWithPassword(false);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side */}
      <div className="flex w-full items-center justify-center bg-white md:w-1/2">
        <div className="z-10 mx-5 h-fit w-full max-w-md overflow-hidden rounded-lg sm:mx-0">
          <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-start sm:px-16">
            <Link href="/">
              <img
                src={logo.src}
                style={{ height: "100px", width: "100px" }}
                className="m-2"
                alt="DocuPitch Logo"
              />
            </Link>
            <span
              className="text-3xl font-semibold"
              style={{ fontFamily: "PP Pangaia" }}
            >
              Welcome to DocuPitch.
            </span>
            <h3
              className="text-lg text-[#4B5563]"
              style={{ fontFamily: "SF Pro Display Light" }}
            >
              Sign in to access your pitch deck analytics
            </h3>
          </div>

          {/* Email Form */}
          <form
            className="flex flex-col gap-1 px-4 pt-4 sm:px-16"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) {
                setEmailError("Email is required.");
                return;
              } else {
                setEmailError("");
              }

              setIsLoginWithEmail(true);
              signIn("email", {
                email: email,
                redirect: false,
                ...(next && next.length > 0 ? { callbackUrl: next } : {}),
              }).then((res) => {
                if (res?.ok && !res?.error) {
                  setEmail("");
                  setEmailButtonText("Email sent - check your inbox!");
                  toast.success("Email sent - check your inbox!");
                } else {
                  setEmailButtonText("Error sending email - try again?");
                  setEmailError("Error sending email - try again?");
                }
                setIsLoginWithEmail(false);
              });
            }}
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
              disabled={isLoginWithEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="placeholder:text-muted-foreground focus-visible:ring-ring h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 focus-visible:ring-1 disabled:cursor-not-allowed"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </form>

          {/* Password Form */}
          <div className="flex flex-col gap-1 px-4 pt-8 sm:px-16">
            <Label htmlFor="password" className="text-sm text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoginWithPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlePasswordLogin();
                }
              }}
              className="placeholder:text-muted-foreground focus-visible:ring-ring h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 focus-visible:ring-1 disabled:cursor-not-allowed"
            />
            {passwordError && (
              <p className="mt-1 text-sm text-red-500">{passwordError}</p>
            )}

            {/* Show Password & Forgot Password */}
            <div className="mt-4 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="accent-gray-800"
                />
                Show Password
              </label>

              <Link href="/forgot-password">
                <span className="text-sm text-[#F97316] underline hover:text-[#2516f9d4]">
                  Forgot Password?
                </span>
              </Link>
            </div>

            <Button
              onClick={handlePasswordLogin}
              loading={isLoginWithPassword}
              className="focus:shadow-outline mt-2 rounded bg-[#F97316] px-4 py-2 text-white transition-colors duration-300"
              style={{borderRadius:'8px'}}
            >
              Login
            </Button>
          </div>

          {/* Sign Up */}
          <div className="mt-6 flex flex-col items-center gap-2 px-4 text-sm sm:px-16">
            <span className="text-black">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up">
                <span className="underline-[#2516f9d4] text-[#F97316] hover:underline">
                  Sign up
                </span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden w-1/2 flex-col items-center justify-center bg-[#FFF7ED] p-6 md:flex">
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
          className="mb-2 text-center text-2xl font-semibold text-gray-800"
          style={{ fontFamily: "PP Pangaia" }}
        >
         See Engagement. Prioritize Smartly
        </h2>
        <p
          className="max-w-sm text-center text-gray-600"
          style={{ fontFamily: "SF Pro Display Light" }}
        >
         Identify warm leads by seeing who viewed your deck, how often, and which slides captured the most attention.
        </p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
        toastClassName="!rounded-xl !shadow-lg !text-sm !p-4 !font-sans !bg-white !text-gray-800"
      />
    </div>
  );
}