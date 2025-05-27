// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const DocumentFlow = () => {
//   const [isPaused, setIsPaused] = useState(false);

//   const handleMouseLeave = () => {
//     setIsPaused(false);
//   };

//   return (
//     <motion.div
//       className="relative min-h-screen overflow-hidden dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 bg-white"
//       initial="hidden"
//       animate="visible"
//       transition={{ duration: 0.5 }}
//     >
//       {/* Modern Title Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, delay: 0.5 }}
//         className="w-full text-center py-8"
//       >
//         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//           DocuPitch In Action
//         </h1>
//         {/* <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
//           Discover the seamless process with our innovative platform.
//         </p> */}
//       </motion.div>

//       {/* Video Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1, duration: 0.5 }}
//         className="w-full sm:max-w-5xl mx-auto rounded-lg overflow-hidden mb-10 pt-10 px-4 sm:px-0"
//       >
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="w-full h-auto aspect-video object-cover rounded-lg shadow-lg"
//         >
//           <source
//             src="https://d3x4b1wy4qlu9.cloudfront.net/videos/hero/hero-analyze.mp4"
//             type="video/mp4"
//           />
//           Your browser does not support the video tag.
//         </video>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default DocumentFlow;


'use client';
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const DocumentFlow = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
    setIsVideoVisible(true);
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen overflow-hidden"
      // style={{ backgroundColor: "#e7e5e1" }}
    >
      {/* Background Decorative Elements */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
      />

      {/* Title Section */}
      <motion.div
        variants={titleVariants}
        className="relative w-full text-center py-6 px-4 sm:py-10"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-2">
            DocuPitch In Action
          </span>
        </h1>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "80%" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-4 rounded-full max-w-md"
        />
        <motion.p
          variants={titleVariants}
          className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4"
        >
          Experience the future of document processing
        </motion.p>
      </motion.div>

      {/* Video Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          {/* Video Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />

          {/* Main Video */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://d3x4b1wy4qlu9.cloudfront.net/videos/hero/hero-analyze.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Loading Overlay */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="absolute inset-0 bg-gray-900 flex items-center justify-center"
            >
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </motion.div>
          </motion.div>

          {/* Video Controls Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
          >
            <div className="flex items-center justify-between text-white">
              <span className="text-sm font-medium">DocuPitch Demo</span>
              <span className="text-sm">HD</span>
            </div>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 px-1"
        >
          {["Intelligent Processing", "Real-time Analysis", "Smart Automation"].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center"
            >
              <p className="text-gray-700 dark:text-gray-300 font-medium">{feature}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DocumentFlow;
