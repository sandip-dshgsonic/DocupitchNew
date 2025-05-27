'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";

const ProductSections = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}
      style={{ backgroundColor: "#fdf0d7" }}
    >
      
      {/* Dark Mode Toggle Button */}
      {/* <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-800 text-white dark:bg-white dark:text-gray-800 rounded shadow"
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button> */}

      <section className="min-h-[90vh] md:min-h-[90vh] lg:min-h-[90vh] bg-white dark:bg-gray-900 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-300 dark:before:bg-gray-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-300 dark:after:bg-gray-600">
         {/* Section Title */}
         <div className="text-center py-8">
         <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-white">
            How it Worksb
          </h1>
          {/* <p className="text-gray-600 dark:text-gray-400 mt-2 text-base lg:text-lg">
            A step-by-step guide to getting started
          </p> */}
        </div>
        <div className="container mx-auto max-w-7xl px-4 py-9 md:py-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 dark:bg-gray-600"></div>


 {/* Video Section */}
 <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-[100%] md:w-[90%] lg:w-[89%] mx-auto"
            >
              <video
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://d3x4b1wy4qlu9.cloudfront.net/media/homepage-png/start.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>


            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-gray-800 dark:text-white max-w-md"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                1 — Upload Your Deck
              </h2>
              {/* <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white mb-4">
                Generate, discover, or build a template
              </h3> */}
              <ul className="space-y-2">
                <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                  <span className="inline-block mr-2 text-green-500"> Simple Drag-and-Drop:</span>
                  Easily upload your PDF or video pitch deck—no complicated file management required.
                </li>
                <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                  <span className="inline-block mr-2 text-green-500">Automatic Formatting:</span>
                   Our platform optimizes your content for both desktop and mobile, ensuring flawless playback and viewing.
                </li>
                <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
                  <span className="inline-block mr-2 text-green-500">Custom Branding:</span>
                   Add your logo, color palette, and other design elements for a consistent, professional look.
                </li>
              </ul>
              <button
                className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
                onClick={() => router.push("/login")}
              >
                Start Exploring Now
              </button>
            </motion.div>

           
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSections;


// 'use client';

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter } from "next/navigation";

// const ProductSections = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//     const router = useRouter();

//   const toggleDarkMode = () => {
//     setIsDarkMode((prev) => !prev);
//   };

//   return (
//     <div className={isDarkMode ? 'dark' : ''}>
//       {/* Dark Mode Toggle Button */}
//       {/* <button
//         onClick={toggleDarkMode}
//         className="absolute top-4 right-4 px-4 py-2 bg-gray-800 text-white dark:bg-white dark:text-gray-800 rounded shadow"
//       >
//         {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//       </button> */}

//       <div className="flex flex-col w-full relative bg-white dark:bg-gray-900 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-300 dark:before:bg-gray-700 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-300 dark:after:bg-gray-700">
//         {/* First Section - Product Card Close-up */}
//         <section className="h-[90vh] md:h-[90vh] lg:h-[90vh] w-full bg-white dark:bg-gray-900 flex relative">
//           {/* Vertical Line */}
//           <div className="hidden lg:block absolute top-10 bottom-10 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 dark:bg-gray-700"></div>

//           {/* Video Section */}
//           <div className="w-full md:w-1/2 flex items-center justify-center p-4">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="relative w-[90%] md:w-[80%] lg:w-[70%] h-auto"
//             >
//               <video
//                 className="w-full h-auto object-cover rounded-lg shadow-lg"
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//               >
//                 <source
//                   src="https://d3x4b1wy4qlu9.cloudfront.net/media/homepage-png/start.mp4"
//                   type="video/mp4"
//                 />
//                 Your browser does not support the video tag.
//               </video>
//             </motion.div>
//           </div>

//           {/* Text Section */}
//           <div className="w-full md:w-1/2 flex items-center px-8 md:px-12">
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="max-w-md"
//             >
//               <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
//                 1 — Start
//               </h2>
//               <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white mb-4">
//                 Generate, discover, or build a template
//               </h3>
//               <ul className="space-y-2">
//                 <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
//                   <span className="inline-block mr-2 text-green-500">✔</span>
//                   Start with AI or expert-made templates.
//                 </li>
//                 <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
//                   <span className="inline-block mr-2 text-green-500">✔</span>
//                   Create custom templates for your team.
//                 </li>
//                 <li className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
//                   <span className="inline-block mr-2 text-green-500">✔</span>
//                   Upload your own fonts and brand assets.
//                 </li>
//               </ul>

//               {/* <motion.div
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
//               </motion.div> */}
//               <button className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
//                onClick={() => router.push("/login")}>
//                Start Exploring Now
//               </button>
//             </motion.div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ProductSections;
