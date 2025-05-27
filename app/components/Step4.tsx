'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
const DocumentAnimation = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
     const router = useRouter();
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {/* Dark Mode Toggle Button */}
      {/* <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-800 text-white dark:bg-white dark:text-gray-800 rounded shadow"
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button> */}
      <section className="min-h-[90vh] md:min-h-[90vh] lg:min-h-[90vh] bg-white dark:bg-gray-900 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-300 dark:before:bg-gray-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-300 dark:after:bg-gray-600">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-gray-800 dark:text-white max-w-md"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                4 — Engage & Close
              </h2>
              {/* <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white mb-4">
              Convince anyone, from anywhere
              </h3> */}
              <ul className="space-y-2">
                <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                  <span className="inline-block mr-2 text-green-500">Targeted Follow-Ups: </span>
             Armed with analytics, tailor your message to each prospect—address concerns, highlight key points, or schedule a call.
                </li>
                <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                  <span className="inline-block mr-2 text-green-500"> Built-In E-Signatures:</span>
                  Streamline your process by allowing investors to sign NDAs or term sheets without leaving the platform.
                
                </li>
                <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                  <span className="inline-block mr-2 text-green-500"> CRM Integration:</span>
                  Automatically send new leads and engagement data into your favorite CRM, keeping your deal flow organized and ready for next steps.
                </li>
                </ul>
              <button className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
              onClick={() => router.push('/login')}
              >
                Start Gaining Insights
              </button>
            </motion.div>
            {/* Video Section */}
           <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8 }}
                            className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center"
                        >
                          <img
                            src="/images/step4.webp"
                            alt="Document Flow Demo"
                            loading='lazy'
                            className="max-w-full max-h-full m-auto"
                            style={{ aspectRatio: "16 / 9" }}
                          />
                        </motion.div>
                      </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DocumentAnimation;