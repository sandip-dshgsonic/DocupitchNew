'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import {toast, ToastContainer} from "react-toastify"
import { ThreeDots } from 'react-loader-spinner'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function ResetPassword() {
    const router = useRouter()
  const [email, setEmail] = useState(Cookies.get("forgotdocemail"));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [toggle,setToggle]=useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    if(password !== confirmPassword){
      toast.error("Passwords don't match")
    }else{

    e.preventDefault();
    setToggle(true)
    try {
      const response = await fetch("/api/auth/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        setToggle(false)
        const errorData = await response.json();
        toast.error("Something went wrong")
        throw new Error(errorData.error || "Something went wrong");

      }
  
      const data = await response.json();
      setMessage(data.message);
      toast.success(data.message)
      setToggle(false)
      setTimeout(() => {
        router.push('/login')
      }, 1000);
        
    } catch (error: any) {
        setToggle(false)
        toast.error("Something went wrong")
      setMessage(error.message || "Something went wrong");
    }
  }
  };
  

  return (
    // <form onSubmit={handleSubmit}>
    //   <h2>Reset Password</h2>
    //   <input
    //     type="email"
    //     placeholder="Enter your email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     required
    //   />
    //   <input
    //     type="password"
    //     placeholder="Enter new password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     required
    //   />
    //   <button type="submit">Reset Password</button>
    //   {message && <p>{message}</p>}
    // </form>
    <div className="flex h-screen w-full flex-wrap">
  <div className="flex w-full justify-center bg-white">
    <div
      className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
      aria-hidden="true"
    ></div>
    <div className="z-10 mx-5 mt-[calc(20vh)] h-fit w-full max-w-md overflow-hidden rounded-lg sm:mx-0">
      <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
      <Link href="/">
  <img 
    src="/logo.png" 
    alt="Company Logo"  // Add a meaningful alt text here
    style={{ height: '100px', width: '100px' }} 
    className="m-2" 
  />
</Link>

      </div>
      <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
        <h2 className="text-2xl font-semibold text-gray-800">
          Reset Password
        </h2>
      </div>
      <form
        className="flex flex-col gap-4 px-4 pt-8 sm:px-16"
        onSubmit={handleSubmit}
      >
       
        {/* New Password Field */}
        <div className="flex flex-col gap-3">
      {/* New Password Field */}
      <div className="relative flex flex-col gap-1">
        <label className="sr-only" htmlFor="password">
          New Password
        </label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex h-10 w-full rounded-md border-0 bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-gray-800 disabled:cursor-not-allowed"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-2.5 text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Confirm Password Field */}
      <div className="relative flex flex-col gap-1">
        <label className="sr-only" htmlFor="confirm-password">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          name="confirm-password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="flex h-10 w-full rounded-md border-0 bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-gray-800 disabled:cursor-not-allowed"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-2.5 text-gray-500"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
        >
          {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
    </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="flex h-10 items-center justify-center rounded bg-[#F97316] px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-900 focus:shadow-outline"
        >
          Reset Password
        </button>
         {
                toggle ?<div className="mx-auto"><ThreeDots/></div>:''
              }
      </form>
      {/* {message && (
        <div className="mt-4 px-4 sm:px-16 text-sm text-center text-red-500">
          {message}
        </div>
      )} */}
      <div className="mt-6 flex flex-col items-center gap-2 px-4 sm:px-16 text-sm">
        <Link href="/login">
          <span className="text-blue-600 underline hover:text-blue-800">
            Back to Log in
          </span>
        </Link>
      </div>
    </div>
  </div>
  <ToastContainer/>
</div>

  );
}
