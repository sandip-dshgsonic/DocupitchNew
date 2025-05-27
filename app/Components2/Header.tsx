"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, LogIn, Info, Menu, X } from "lucide-react";
import {
  navbarAnimation,
  logoAnimation,
  logoTextAnimation,
  menuItemsAnimation,
  // navigationItemAnimation,
  loginButtonAnimation,
  // mobileMenuAnimation,
} from "./animations/HeaderAnimation";

export default function Header() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  const getTextColorClass = () => {
    if (darkMode) return "text-orange-500";
    return isScrolled ? "text-purple-800" : "text-black-500";
  };

  const getHoverLineColorClass = () => {
    if (darkMode) return "bg-orange-500";
    return isScrolled ? "bg-purple-800" : "bg-black";
  };

  const mobileMenuAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const navigationItemAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    // <motion.header
    //   className={`fixed w-full z-50 font-inter transition-all duration-300 ${
    //     isScrolled
    //       ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
    //       : "bg-transparent dark:bg-transparent"
    //   }`}
      // variants={navbarAnimation}
      // initial="initial"
      // animate="animate"
    // >

    <motion.header
    className={`fixed w-full z-50 font-inter transition-all duration-300 ${
      isScrolled
        ? "bg-white/50 dark:bg-gray-900/50 backdrop-blur-md"
        : "bg-white dark:bg-gray-900 shadow-sm"
    }`}
    variants={navbarAnimation}
    initial="initial"
    animate="animate"
  >
  
  
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <motion.div
            className="flex-shrink-0"
            variants={logoAnimation}
            initial="hidden"
            animate="visible"
          >
            <Link 
              href="/" 
              className="flex items-center space-x-3 group p-2 rounded-lg transition-all duration-300 hover:bg-white/10 dark:hover:bg-gray-800/10"
            >
              <motion.div
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <Image
                  src="/Docupitch_logo.png"
                  alt="Docupitch Logo"
                  width={200}
                  height={200}
                  className="w-auto h-12 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[10deg]"
                  priority
                />
              </motion.div>
              {/* <motion.span
                className={`text-2xl font-bold transition-all duration-300 group-hover:translate-x-1 ${getTextColorClass()}`}
                variants={logoTextAnimation}
              >
                Docupitch
              </motion.span> */}

<motion.span
  className={`text-2xl font-bold transition-all duration-300 group-hover:translate-x-1 text-orange-500 ${getTextColorClass()}`}
  variants={logoTextAnimation}
>
  Docupitch
</motion.span>

            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {/* About Link */}
              <motion.div
                variants={navigationItemAnimation}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href="/about"
                  className={`group flex items-center space-x-2 px-4 py-2 ${getTextColorClass()} relative`}
                >
                  <Info size={18} />
                  <span className="font-medium relative">
                    About
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] ${getHoverLineColorClass()} transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100`} />
                  </span>
                </Link>
              </motion.div>

              {/* Dark Mode Toggle */}
              {/* <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${getTextColorClass()} hover:bg-purple-100 dark:hover:bg-gray-800 transition-colors duration-300`}
              >
                {darkMode ? (
                  <Moon size={20} />
                ) : (
                  <Sun size={20} />
                )}
              </button> */}

<button
  onClick={toggleDarkMode}
  className="p-2 rounded-lg transition-colors duration-300"
>
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`${
      isScrolled ? "text-purple-600" : "text-black-500"
    } dark:text-white`}
  >
    {darkMode ? (
      <Moon size={20} />
    ) : (
      <Sun size={20} />
    )}
  </motion.div>
</button>


              {/* Login Button */}
              <motion.button
                onClick={() => router.push("/login")}
                variants={loginButtonAnimation}
                initial="hidden"
                animate="visible"
                className={`group flex items-center space-x-2 px-6 py-2.5 ${getTextColorClass()} relative`}
              >
                <LogIn size={18} />
                <span className="font-medium relative">
                  Login
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] ${getHoverLineColorClass()} transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100`} />
                </span>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`md:hidden p-2 rounded-lg ${getTextColorClass()} hover:bg-purple-100 dark:hover:bg-gray-800 transition-colors duration-200`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 dark:bg-gray-900/95 shadow-lg rounded-b-2xl overflow-hidden backdrop-blur-md border-t border-gray-100 dark:border-gray-800"
              variants={mobileMenuAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="px-4 py-6 space-y-4">
                <motion.div
                  variants={navigationItemAnimation}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href="/about"
                    className={`group flex items-center space-x-2 px-4 py-2 ${getTextColorClass()} relative`}
                  >
                    <Info size={18} />
                    <span className="relative">
                      About
                      <span className={`absolute bottom-0 left-0 w-full h-[2px] ${getHoverLineColorClass()} transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100`} />
                    </span>
                  </Link>
                </motion.div>
                <div className="flex items-center justify-between px-4 py-2">
                  <span className={getTextColorClass()}>
                    Dark Mode
                  </span>
                  <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-lg ${getTextColorClass()} hover:bg-purple-100 dark:hover:bg-gray-800 transition-colors duration-300`}
                  >
                    {darkMode ? (
                      <Moon size={20} />
                    ) : (
                      <Sun size={20} />
                    )}
                  </button>
                </div>
                <motion.button
                  onClick={() => router.push("/login")}
                  className={`group flex items-center space-x-2 px-4 py-2 ${getTextColorClass()} relative w-full`}
                >
                  <LogIn size={18} />
                  <span className="relative">
                    Login
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] ${getHoverLineColorClass()} transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100`} />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}


// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sun, Moon, LogIn, Info, Menu, X } from "lucide-react";
// import {
//   navbarAnimation,
//   logoAnimation,
//   logoTextAnimation,
//   menuItemsAnimation,
//   darkModeAnimation,
// } from "./animations/HeaderAnimation";

// export default function Header() {
//   const router = useRouter();
//   const [darkMode, setDarkMode] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const isDarkMode = localStorage.getItem("darkMode") === "true" ||
//       (!("darkMode" in localStorage) &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches);

//     setDarkMode(isDarkMode);
//     document.documentElement.classList.toggle("dark", isDarkMode);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleDarkMode = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
//     document.documentElement.classList.toggle("dark", newDarkMode);
//     localStorage.setItem("darkMode", newDarkMode.toString());
//   };


//   const navigationItemAnimation = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.5 }
//     }
//   };
  
//   const lineAnimation = {
//     hidden: { width: "0%" },
//     visible: { width: "0%" },
//     hover: { 
//       width: "100%",
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut"
//       }
//     }
//   };
  
//   const buttonHoverAnimation = {
//     rest: { scale: 1 },
//     hover: { 
//       scale: 1.05,
//       transition: {
//         duration: 0.2,
//         ease: "easeInOut"
//       }
//     }
//   };




//   return (
//     <motion.header
//       className={`fixed w-full z-50 font-inter transition-all duration-300 ${
//         isScrolled
//           ? "bg-white/60 dark:bg-gray-900/60 backdrop-blur-md"
//           : "bg-white/90 dark:bg-gray-900/90"
//       }`}
//       variants={navbarAnimation}
//       initial="initial"
//       animate="animate"
//     >
//       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo Section */}
//           <motion.div
//             className="flex-shrink-0"
//             variants={logoAnimation}
//             initial="initial"
//             animate="animate"
//           >
//             <Link href="/" className="flex items-center space-x-3">
//               <Image
//                 src="/Docupitch_logo.png"
//                 alt="Docupitch Logo"
//                 width={200}
//                 height={200}
//                 className="w-auto h-12 object-contain"
//                 priority
//               />
//               <motion.span
//                 className="text-2xl font-bold text-purple-900 dark:text-white"
//                 variants={logoTextAnimation}
//               >
//                 Docupitch
//               </motion.span>
//             </Link>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//       <div className="flex items-center space-x-6">
//         {/* About Link */}
//         <motion.div
//           variants={navigationItemAnimation}
//           initial="hidden"
//           animate="visible"
//           whileHover="hover"
//           className="relative"
//         >
//           <Link
//             href="/about"
//             className="group flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
//           >
//             <Info size={18} className="group-hover:text-purple-600 transition-colors duration-200" />
//             <span className="font-medium relative">
//               About
//               <motion.div
//                 className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-purple-600 to-orange-500"
//                 initial="hidden"
//                 variants={lineAnimation}
//                 whileHover="hover"
//               />
//             </span>
//           </Link>
//         </motion.div>

//         {/* Dark Mode Toggle */}
//         <motion.div
//           variants={navigationItemAnimation}
//           initial="hidden"
//           animate="visible"
//           whileHover="hover"
//         >
//           <motion.button
//             onClick={toggleDarkMode}
//             className="relative w-12 h-6 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-0.5 shadow-lg hover:shadow-purple-500/25 transition-shadow duration-200"
//             variants={buttonHoverAnimation}
//             whileTap={{ scale: 0.95 }}
//           >
//             <motion.div
//               className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
//               animate={{
//                 x: darkMode ? 24 : 0,
//               }}
//               transition={{
//                 type: "spring",
//                 stiffness: 500,
//                 damping: 30,
//               }}
//             >
//               {darkMode ? (
//                 <Moon size={12} className="text-purple-600" />
//               ) : (
//                 <Sun size={12} className="text-orange-500" />
//               )}
//             </motion.div>
//           </motion.button>
//         </motion.div>

//         {/* Login Button */}
//         <motion.div
//           variants={navigationItemAnimation}
//           initial="hidden"
//           animate="visible"
//           whileHover="hover"
//         >
//           <motion.button
//             onClick={() => router.push("/login")}
//             className="group relative flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-medium overflow-hidden shadow-lg hover:shadow-purple-500/25 transition-shadow duration-200"
//             variants={buttonHoverAnimation}
//             whileTap={{ scale: 0.95 }}
//           >
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//             />
//             <span className="relative flex items-center space-x-2">
//               <LogIn size={18} />
//               <span>Login</span>
//             </span>
//           </motion.button>
//         </motion.div>
//       </div>
//     </div>

//           {/* Mobile Menu Button */}
//           <motion.button
//             className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             variants={menuItemsAnimation}
//             custom={3}
//             initial="initial"
//             animate="animate"
//           >
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </motion.button>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               className="md:hidden bg-white/90 dark:bg-gray-900/90 shadow-lg rounded-b-2xl overflow-hidden backdrop-blur-md"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="px-4 py-6 space-y-4">
//                 <Link
//                   href="/about"
//                   className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
//                 >
//                   <Info size={18} />
//                   <span>About</span>
//                 </Link>
//                 <div className="flex items-center justify-between px-4 py-2">
//                   <span className="text-gray-700 dark:text-gray-200">
//                     Dark Mode
//                   </span>
//                   <motion.button
//                     onClick={toggleDarkMode}
//                     className="relative w-12 h-6 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-0.5"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <motion.div
//                       className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center"
//                       animate={{
//                         x: darkMode ? 24 : 0,
//                       }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 500,
//                         damping: 30,
//                       }}
//                     >
//                       {darkMode ? (
//                         <Moon size={12} className="text-purple-600" />
//                       ) : (
//                         <Sun size={12} className="text-orange-500" />
//                       )}
//                     </motion.div>
//                   </motion.button>
//                 </div>
//                 <button
//                   onClick={() => router.push("/login")}
//                   className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
//                 >
//                   <LogIn size={18} />
//                   <span>Login</span>
//                 </button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>
//     </motion.header>
//   );
// }


// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sun, Moon, LogIn, Info, Menu, X } from "lucide-react";
// import {
//   navbarAnimation,
//   logoAnimation,
//   logoTextAnimation,
//   menuItemsAnimation,
//   darkModeAnimation,
//   loginButtonAnimation
// } from "./animations/HeaderAnimation";

// export default function Header() {
//   const router = useRouter();
//   const [darkMode, setDarkMode] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Initialize dark mode from system preference and localStorage
//   useEffect(() => {
//     const isDarkMode = localStorage.getItem("darkMode") === "true" ||
//       (!("darkMode" in localStorage) &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches);

//     setDarkMode(isDarkMode);
//     document.documentElement.classList.toggle("dark", isDarkMode);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleDarkMode = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
//     document.documentElement.classList.toggle("dark", newDarkMode);
//     localStorage.setItem("darkMode", newDarkMode.toString());
//   };

//   return (
//     <motion.header
//       className={`fixed w-full z-50 font-inter transition-all duration-300 ${
//         isScrolled
//           ? "bg-white/90 dark:bg-gray-900/90 shadow-lg backdrop-blur-lg"
//           : "bg-transparent"
//       }`}
//       variants={navbarAnimation}
//       initial="initial"
//       animate="animate"
//     >
//       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo Section */}
//           <motion.div
//             className="flex-shrink-0"
//             variants={logoAnimation}
//             initial="initial"
//             animate="animate"
//           >
//             <Link href="/" className="flex items-center space-x-3">
//               <Image
//                 src="/Docupitch_logo.png"
//                 alt="Docupitch Logo"
//                 width={200}
//                 height={200}
//                 className="w-auto h-12 object-contain"
//                 priority
//               />
//               <motion.span
//                 className={`text-2xl font-bold transition-colors duration-300 ${
//                   isScrolled ? "text-purple-900" : "text-white"
//                 }`}
//                 variants={logoTextAnimation}
//               >
//                 Docupitch
//               </motion.span>
//             </Link>
//           </motion.div>
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <div className="flex items-center space-x-6">
//               <motion.div
//                 variants={menuItemsAnimation}
//                 custom={0}
//                 initial="initial"
//                 animate="animate"
//               >
//                 <Link href="/about" className="group relative">
//                   <motion.div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
//                     <Info size={18} />
//                     <span>About</span>
//                   </motion.div>
//                 </Link>
//               </motion.div>
//               <motion.div
//                 variants={darkModeAnimation}
//                 initial="initial"
//                 animate="animate"
//               >
//                 <motion.button
//                   onClick={toggleDarkMode}
//                   className="relative w-12 h-6 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-0.5"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <motion.div
//                     className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center"
//                     animate={{
//                       x: darkMode ? 24 : 0,
//                     }}
//                     transition={{
//                       type: "spring",
//                       stiffness: 500,
//                       damping: 30,
//                     }}
//                   >
//                     {darkMode ? (
//                       <Moon size={12} className="text-purple-600" />
//                     ) : (
//                       <Sun size={12} className="text-orange-500" />
//                     )}
//                   </motion.div>
//                 </motion.button>
//               </motion.div>
//               <motion.div
//                 variants={loginButtonAnimation}
//                 initial="initial"
//                 animate="animate"
//               >
//                 <motion.button
//                   onClick={() => router.push("/login")}
//                   className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-lg hover:shadow-purple-500/20 hover:scale-105 transition-all duration-200"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <LogIn size={18} />
//                   <span>Login</span>
//                 </motion.button>
//               </motion.div>
//             </div>
//           </div>
//           {/* Mobile Menu Button */}
//           <motion.button
//             className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             variants={menuItemsAnimation}
//             custom={3}
//             initial="initial"
//             animate="animate"
//           >
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </motion.button>
//         </div>
//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-2xl overflow-hidden"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="px-4 py-6 space-y-4">
//                 <Link
//                   href="/about"
//                   className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
//                 >
//                   <Info size={18} />
//                   <span>About</span>
//                 </Link>
//                 <div className="flex items-center justify-between px-4 py-2">
//                   <span className="text-gray-700 dark:text-gray-200">
//                     Dark Mode
//                   </span>
//                   <motion.button
//                     onClick={toggleDarkMode}
//                     className="relative w-12 h-6 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-0.5"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <motion.div
//                       className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center"
//                       animate={{
//                         x: darkMode ? 24 : 0,
//                       }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 500,
//                         damping: 30,
//                       }}
//                     >
//                       {darkMode ? (
//                         <Moon size={12} className="text-purple-600" />
//                       ) : (
//                         <Sun size={12} className="text-orange-500" />
//                       )}
//                     </motion.div>
//                   </motion.button>
//                 </div>
//                 <motion.button
//                   onClick={() => router.push("/login")}
//                   className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-6 py-3 rounded-lg font-medium text-sm shadow-lg"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <LogIn size={18} />
//                   <span>Login</span>
//                 </motion.button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>
//     </motion.header>
//   );
// }











