"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  // const [darkMode, setDarkMode] = useState<boolean | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // // Ensure this runs only on the client side after the initial render
  // useEffect(() => {
  //   // Get dark mode from localStorage or system preference
  //   const isDarkMode =
  //     localStorage.getItem("darkMode") === "true" ||
  //     (!("darkMode" in localStorage) &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches);
  //   setDarkMode(isDarkMode);
  //   document.documentElement.classList.toggle("dark", isDarkMode);

  //   const handleScroll = () => setIsScrolled(window.scrollY > 20);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // // Handle toggle of dark mode
  // const toggleDarkMode = () => {
  //   const newDarkMode = !darkMode;
  //   setDarkMode(newDarkMode);
  //   document.documentElement.classList.toggle("dark", newDarkMode);
  //   localStorage.setItem("darkMode", newDarkMode.toString());
  // };

  // // When dark mode is null (still determining), don't render dynamic elements yet
  // if (darkMode === null) {
  //   return null; // Prevent rendering until client-side logic runs
  // }

  return (
    <motion.header
      className={`font-inter fixed z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#FEFEFE] shadow-sm backdrop-blur-md dark:bg-gray-800"
          : "bg-[#FEFEFE] dark:bg-gray-800"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <motion.div className="flex-shrink-0">
            <Link
              href="/"
              className="group flex items-center space-x-3 rounded-lg p-2"
            >
              <motion.div
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-12 w-auto object-contain"
                />
              </motion.div>
              <motion.span
                className="text-2xl font-bold text-orange-500"
              >
                DocuPitch
              </motion.span>  
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <div className="flex items-center space-x-6">
              {/* Pricing Link */}
              <motion.div>
                <Link
                  href="/pricing"
                  className="text-[#4B5563] hover:text-[#F97316] dark:text-gray-300 dark:hover:text-[#F97316]"
                >
                  Pricing
                </Link>
              </motion.div>
              {/* Product Link */}
              <motion.div>
                <Link
                  href="/product"
                  className="text-[#4B5563] hover:text-[#F97316] dark:text-gray-300 dark:hover:text-[#F97316]"
                >
                  Product
                </Link>
              </motion.div>
              {/* About Link */}
              <motion.div>
                <Link
                  href="/about"
                  className="text-[#4B5563] hover:text-[#F97316] dark:text-gray-300 dark:hover:text-[#F97316]"
                >
                  About
                </Link>
              </motion.div>
              {/* Dark Mode Button */}
              {/* <button onClick={toggleDarkMode} className="p-2 rounded-lg">
                {darkMode ? (
                  <Moon size={20} className="text-[#4B5563] hover:text-[#F97316] dark:text-gray-300 dark:hover:text-[#F97316]" />
                ) : (
                  <Sun size={20} className="text-[#4B5563] hover:text-[#F97316]" />
                )}
              </button> */}

              {/* Login Button */}
              <motion.button
                onClick={() => router.push("/login")}
                className="rounded- bg-[#F97316] px-12 py-3 text-white hover:shadow-[0px_0px_75px_rgba(0,0,0,0.6)] "style={{borderRadius:'8px'}}
              >
                Speed Up Fundraising
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 md:hidden text-[#4B5563] dark:text-gray-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div className="rounded-b-2xl bg-white shadow-lg dark:bg-gray-800 md:hidden">
              <div className="space-y-4 px-4 py-6">
                 <motion.div>
                  <Link
                    href="/pricing"
                    className="text-[#4B5563] hover:text-[#F97316] dark:text-gray-300 dark:hover:text-[#F97316]"
                  >
                    Pricing
                  </Link>
                </motion.div>
                 <motion.div>
                  <Link
                    href="/product"
                    className="text-[#4B5563] hover:text-[#F97316] dark:text-gray-300 dark:hover:text-[#F97316]"
                  >
                    Product
                  </Link>
                </motion.div>
                <motion.div>
                  <Link
                    href="/about"
                    className="text-[#4B5563] hover:text-[#F97316] dark:text-gray-300 dark:hover:text-[#F97316]"
                  >
                    About
                  </Link>
                </motion.div>
                {/* Dark Mode button */}
                {/* <button onClick={toggleDarkMode} className="rounded-lg p-2">
                  {darkMode ? (
                    <Moon
                      size={20}
                      className="text-[#4B5563] hover:text-[#F97316] dark:text-gray-300 dark:hover:text-[#F97316]"
                    />
                  ) : (
                    <Sun
                      size={20}
                      className="text-[#4B5563] hover:text-[#F97316]"
                    />
                  )}
                </button> */}

                <motion.button
                  onClick={() => router.push("/login")}
                  className="rounded bg-[#F97316] px-4 py-3 text-white"style={{borderRadius:'8px'}}
                >
                Speed Up Fundraising
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}