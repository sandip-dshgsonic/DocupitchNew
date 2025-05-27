'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
const ProductSections = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <section className="min-h-[90vh] md:min-h-[90vh] lg:min-h-[90vh] bg-white dark:bg-gray-900 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-300 dark:before:bg-gray-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-300 dark:after:bg-gray-600">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
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
                             src="/images/step3.webp"
                             alt="Document Flow Demo"
                             loading='lazy'
                             className="max-w-full max-h-full m-auto"
                             style={{ aspectRatio: "16 / 9" }}
                           />
                         </motion.div>
                       </div>
            {/* Text Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-gray-800 dark:text-white max-w-md"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                3 — Track Engagement
              </h2>
              {/* <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white mb-4">
               View engagement data in one dashboard—know who’s watching, which slides they linger on, and how many times they revisit.
              </h3> */}
              <ul className="space-y-2">
                <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                  <span className="inline-block mr-2 text-green-500">Real-Time Analytics:</span>
                  View engagement data in one dashboard—know who’s watching, which slides they linger on, and how many times they revisit.
                </li>
                <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                  <span className="inline-block mr-2 text-green-500">Slide-by-Slide & Frame-by-Frame Insights: </span>
                  Identify exactly which slides or video segments capture the most attention, and which ones might need improvement.
                </li>
                <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                  <span className="inline-block mr-2 text-green-500"> Heatmaps & Retention Graphs:</span>
                  Get visual insights into high-engagement points, so you can double down on what resonates.
                </li>
              </ul>
              <button
                className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
                onClick={() => router.push('/login')}
              >
                Start Sharing Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductSections;