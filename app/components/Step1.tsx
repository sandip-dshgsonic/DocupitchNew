
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import {
  CloudArrowUpIcon,
  LinkIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";


const ProductSections = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <div className={isDarkMode ? 'dark mt-5' : 'mt-5'}
      style={{ backgroundColor: "#fdf0d7" }}
    >
      <section className=" bg-white dark:bg-gray-900 " >
        <div style={{ border:'2px solid lightgrey' , borderRadius:'5px'}} className='w-full max-w-7xl mx-auto px-4 my-16 sm:px-6 lg:px-8'>
         <div className="text-center py-8">
           <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-white" style={{ fontFamily: 'PP Pangaia' }}>
              How it Works
           </h1>
           <p className='text-xl pt-4 dark:text-gray-300' style={{ fontFamily: 'SF Pro Display Light' }}>
           Experience our streamlined process for managing and tracking your pitch decks
           </p>
         </div>


         <motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="text-gray-800 dark:text-white w-full max-w-7xl"
>


  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[
  {
    title: "Upload Your Deck",
    description: "Drag and drop your PDF or video pitch deck",
    icon: <CloudArrowUpIcon className="h-10 w-10 text-purple-600" />, // Cloud upload
  },
  {
    title: "Share Secure Link",
    description: "Generate secure, trackable sharing links",
    icon: <LinkIcon className="h-10 w-10 text-purple-600" />, // Chain link
  },
  {
    title: "Track Engagement",
    description: "Monitor viewer activity in real-time",
    icon: <ChartBarIcon className="h-10 w-10 text-purple-600" />, // Line graph/chart
  },
  {
    title: "Engage & Close",
    description: "Use insights to follow up and close deals",
    icon: <UserGroupIcon className="h-10 w-10 text-purple-600" />, // Handshake
  },
]
.map(({ title, description, icon }, index) => (
      <div
        key={index}
        className="flex items-start bg-white dark:bg-white/5  p-5 "
      >
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    ))}
  </div>

  {/* <div className="mt-8 text-center lg:text-left">
    <button
      className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
      onClick={() => router.push("/login")}
    >
      Start Exploring Now
    </button>
  </div> */}
</motion.div>
</div>
      </section>
    </div>
  );
};
export default ProductSections;