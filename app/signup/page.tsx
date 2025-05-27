

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// // import { toast } from "sonner";
// import { ToastContainer, toast } from 'react-toastify';
// import Cookies from "js-cookie";
// import Link from "next/link";
// // import "sonner/dist/style.css";

// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";



// export default function SignupPage() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const[toggleText,setToggleText]=useState("false")

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validate = () => {
//     let isValid = true;
//     const newErrors = { email: "", password: "", confirmPassword: "" };

//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email.";
//       isValid = false;
//       toast.error("Please enter a valid email.")
//     }

//     if (!formData.password || formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters.";
//       isValid = false;
//       toast.error("Password must be at least 6 characters.")
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match.";
//       isValid = false;
//       toast.error("Passwords do not match.")
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (validate()) {
//       setToggleText("true")
//       try {
//         const response = await fetch("/api/auth/register", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           Cookies.remove("docemail");
//           console.log('----61')
//           Cookies.set("docemail", formData.email, { expires: 1 }); // Expires in 1 day
//           console.log('----------------195 signup')
//           toast.success("You Are Being Redirected...");
//           setTimeout(() => {
//             router.push("/verify");
//           }, 2000); // Allow the user to see the toast before redirect
//         } else {
//           if(data.error === "User already exists"){
//             setToggleText("ue")
//             toast.error(`Error: ${data.error}`, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: false,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "light",
//               });
//             // toast("Wow so easy!");
//             // console.log('5556')
//             setTimeout(() => {
//               router.push("/login");
//             }, 2000);

//           }


//         }
//       } catch (err) {
//         console.log("Error:", err);
//         toast.error("An error occurred. Please try again.");
//       }
//     }
//   };

//   return (


// <div className="flex h-screen w-full flex-wrap">
//   <div className="flex w-full justify-center bg-white">
//     <div
//       className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
//       aria-hidden="true"
//     ></div>
//     <div className="z-10 mx-5 mt-[calc(20vh)] h-fit w-full max-w-md overflow-hidden rounded-lg sm:mx-0">
//     <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
//             <img src='/logo.png' style={{ height: '100px', width: '100px' }} className="m-2" />
//             <Link href="/">
//               <span className="text-balance text-2xl font-semibold text-gray-800">
//                 Welcome to DocuPitch
//               </span>
//             </Link>
//             <h3 className="text-balance text-sm text-gray-800">
//               Share pitches. Not attachments.
//             </h3>
//           </div>
//       <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           Create Account
//         </h2>
//       </div>
//       <form
//         className="flex flex-col gap-4 px-4 pt-8 sm:px-16"
//         onSubmit={handleSubmit}
//       >
//         {/* Email Field */}
//         <div className="flex flex-col gap-1">
//           <label className="sr-only" htmlFor="email">
//             Email
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="name@example.com"
//             value={formData.email}
//             onChange={handleChange}
//             className="flex h-10 w-full rounded-md border-0 bg-background bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
//           />
//           {errors.email && (
//             <p className="text-sm text-red-500">{errors.email}</p>
//           )}
//         </div>
//         {/* Password Field */}
//         {/* <div className="flex flex-col gap-1">
//           <label className="sr-only" htmlFor="password">
//             Password
//           </label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleChange}
//             className="flex h-10 w-full rounded-md bg-background bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
//           />
//           {errors.password && (
//             <p className="text-sm text-red-500">{errors.password}</p>
//           )}
//         </div> */}
//         {/* Confirm Password Field */}
//         {/* <div className="flex flex-col gap-1">
//           <label className="sr-only" htmlFor="confirmPassword">
//             Confirm Password
//           </label>
//           <input
//             id="confirmPassword"
//             name="confirmPassword"
//             type="password"
//             placeholder="Confirm your password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="flex h-10 w-full rounded-md bg-background bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
//           />
//           {errors.confirmPassword && (
//             <p className="text-sm text-red-500">{errors.confirmPassword}</p>
//           )}
//         </div> */}
//         {/* Submit Button */}
//         {/* Password Field */}
// <div className="relative flex flex-col gap-1">
//   <label className="sr-only" htmlFor="password">
//     Password
//   </label>
//   <input
//     id="password"
//     name="password"
//     type={showPassword ? "text" : "password"}
//     placeholder="Enter your password"
//     value={formData.password}
//     onChange={handleChange}
//     className="flex h-10 w-full rounded-md bg-background bg-white px-3 py-2 pr-10 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
//   />
//   <button
//     type="button"
//     onClick={() => setShowPassword(!showPassword)}
//     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//   >
//     {showPassword ? (
//       <EyeSlashIcon className="h-5 w-5" />
//     ) : (
//       <EyeIcon className="h-5 w-5" />
//     )}
//   </button>
//   {/* {errors.password && <p className="text-sm text-red-500">{errors.password}</p>} */}
// </div>

// {/* Confirm Password Field */}
// <div className="relative flex flex-col gap-1">
//   <label className="sr-only" htmlFor="confirmPassword">
//     Confirm Password
//   </label>
//   <input
//     id="confirmPassword"
//     name="confirmPassword"
//     type={showConfirmPassword ? "text" : "password"}
//     placeholder="Confirm your password"
//     value={formData.confirmPassword}
//     onChange={handleChange}
//     className="flex h-10 w-full rounded-md bg-background bg-white px-3 py-2 pr-10 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
//   />
//   <button
//     type="button"
//     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//   >
//     {showConfirmPassword ? (
//       <EyeSlashIcon className="h-5 w-5" />
//     ) : (
//       <EyeIcon className="h-5 w-5" />
//     )}
//   </button>
//   {/* {errors.confirmPassword && (
//     <p className="text-sm text-red-500">{errors.confirmPassword}</p>
//   )} */}
// </div>
//         <button
//           type="submit"
//           className="flex h-10 items-center justify-center rounded bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-900 focus:shadow-outline"
//         >
//           {toggleText === 'true' ? (
//             <>
//               <svg
//                 className="mr-2 h-5 w-5 animate-spin"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
//                 ></path>
//               </svg>
//               Redirecting...
//             </>
//           ) : (
//             ''
//           )}
//             {toggleText === 'false' ? (
//            'Sign Up'
//           ) : (
//             ''
//           )}
//             {toggleText === 'ue' ? (
//              'User Already Exists, Try Login...'
//           ) : (
//             ''
//           )}
//         </button>
//       </form>
//       <div className="mt-6 flex flex-col items-center gap-2 px-4 sm:px-16 text-sm">

//         <Link href="/login">
//           <span className="text-blue-600 underline hover:text-blue-800">
//           Already have an account? Log in
//           </span>
//         </Link>
//       </div>
//     </div>

//   </div>
//   <ToastContainer/>
// </div>

//   );
// }





"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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
            toast.error(`Error: ${data.error || "An unexpected error occurred"}`);
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
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <div className="z-10 mx-5 h-fit w-full max-w-md overflow-hidden rounded-lg sm:mx-0">
          <div className="flex flex-col items-start justify-start space-y-3 px-4 py-6 pt-8 text-start sm:px-16">
            <Link href="/">
              <img
                src="/logo.png"
                alt="DocuPitch Logo"
                style={{ height: "100px", width: "100px" }}
                className="m-2"
              />
            </Link>
            <span className="text-3xl font-semibold" style={{ fontFamily: "PP Pangaia" }}>
              Welcome to DocuPitch.
            </span>
            <h3 className="text-lg text-[#4B5563]" style={{ fontFamily: "SF Pro Display Light" }}>
              Create your account to share your pitch deck
            </h3>
          </div>
          <form className="flex flex-col gap-4 px-4 pt-4 sm:px-16" onSubmit={handleSubmit}>
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
                className="h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
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
                  className="h-10 w-full rounded-md border bg-white px-3 py-2 pr-10 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
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
            <div className="flex flex-col gap-1 mt-4">
              <Label htmlFor="confirmPassword" className="text-sm text-gray-700">
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
                  className="h-10 w-full rounded-md border bg-white px-3 py-2 pr-10 text-sm text-gray-900 ring-1 ring-gray-200 placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
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
              className="mt-2 bg-[#F97316] focus:shadow-outline rounded px-4 py-2 text-white transition-colors duration-300"
            >
              {toggleText === "true"
                ? "Redirecting..."
                : toggleText === "ue"
                  ? "User Already Exists, Try Login..."
                  : "Sign Up"}
            </Button>
          </form>
          {/* <div className="mt-6 flex flex-col items-center gap-2 px-4 sm:px-16 text-sm">
            <Link href="/login">
              <span className="text-blue-600 underline hover:text-blue-800">
                Already have an account? Log in
              </span>
            </Link>
          </div> */}
          <div className="mt-6 flex flex-col items-center gap-2 px-4 sm:px-16 text-sm">
            <Link href="/login">
              <span className="text-black hover:underline underline-[#2516f9d4] ">
                Already have an account?{" "}
                <span className="text-[#F97316]  ">Log in</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#FFF7ED] p-6">
        <img
          src="/images/login-pra.png" // Ensure this image exists in your public/images folder
          alt="Signup Illustration"
          className="max-w-[80%] h-auto object-cover mb-6"
          style={{ borderRadius: "8px", boxShadow: "0px 0px 70px #00000040" }}
        />
        <h2
          className="text-2xl font-semibold text-gray-800 text-center mb-2"
          style={{ fontFamily: "PP Pangaia" }}
        >
          Start sharing your pitch deck!
        </h2>
        <p
          className="text-gray-600 text-center max-w-sm"
          style={{ fontFamily: "SF Pro Display Light" }}
        >
          Join DocuPitch today and get real-time insights on how investors interact with your pitch deck.
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
