"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [toggleText, setToggleText] = useState("false");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
      toast.error("Please enter a valid email.");
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
      toast.error("Password must be at least 6 characters.");
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
      toast.error("Passwords do not match.");
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setToggleText("true");
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          Cookies.remove("docemail");
          Cookies.set("docemail", formData.email, { expires: 1 }); // Expires in 1 day
          toast.success("You Are Being Redirected...");
          setTimeout(() => {
            router.push("/verify");
          }, 2000);
        } else {
          if (data.error === "User already exists") {
            setToggleText("ue");
            toast.error("User already exists. Redirecting to login...");
            // toast.error(`Error: ${data.error}`, {
            //   position: "top-center",
            //   autoClose: 1000,
            //   hideProgressBar: false,
            //   closeOnClick: false,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "light",
            // });
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          } else {
            toast.error(`An error occurred. Please try again.`);
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }
        }
      } catch (err) {
        console.log("Error:", err);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Section - Form */}
      <div className="flex w-full items-center justify-center bg-white md:w-1/2">
        <div className="z-10 mx-5 h-fit w-full max-w-md overflow-hidden rounded-lg sm:mx-0">
          <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-start sm:px-16">
            <Link href="/">
              <img
                src="/logo.png"
                alt="DocuPitch Logo"
                style={{ height: "100px", width: "100px" }}
                className="m-2"
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
              Join DocuPitch and turn every pitch into data-driven opportunity
            </h3>
          </div>
          <form
            className="flex flex-col gap-4 px-4 pt-4 sm:px-16"
            onSubmit={handleSubmit}
          >
            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="text-sm text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="placeholder:text-muted-foreground focus-visible:ring-ring h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 focus-visible:ring-1"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="password" className="text-sm text-gray-700">
                Password
              </Label>

              {/* only this div is relative & has the height of the input */}
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="placeholder:text-muted-foreground focus-visible:ring-ring h-10 w-full rounded-md border bg-white px-3 py-2 pr-10 text-sm text-gray-900 ring-1 ring-gray-200 focus-visible:ring-1"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mt-4 flex flex-col gap-1">
              <Label
                htmlFor="confirmPassword"
                className="text-sm text-gray-700"
              >
                Confirm Password
              </Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="placeholder:text-muted-foreground focus-visible:ring-ring h-10 w-full rounded-md border bg-white px-3 py-2 pr-10 text-sm text-gray-900 ring-1 ring-gray-200 focus-visible:ring-1"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="focus:shadow-outline mt-2 rounded bg-[#F97316] px-4 py-2 text-white transition-colors duration-300" style={{ borderRadius: '8px' }}
            >
              {toggleText === "true"
                ? "Redirecting..."
                : toggleText === "ue"
                  ? "User Already Exists, Try Login..."
                  : "Sign Up"}
            </Button>
          </form>
          <div className="mt-6 flex flex-col items-center gap-2 px-4 text-sm sm:px-16">
            <span className="text-black">
              Already have an account?{" "}
              <Link href="/login">
                <span className="underline-[#2516f9d4] text-[#F97316] hover:underline">
                  Log in
                </span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Right Section - Illustration */}
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
          Spot the Investors Who Matter Most
        </h2>
        <p
          className="max-w-sm text-center text-gray-600"
          style={{ fontFamily: "SF Pro Display Light" }}
        >
          Identify warm leads by seeing who viewed your deck, how often, and
          which slides captured the most attention.
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
