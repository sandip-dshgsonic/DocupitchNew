"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ShieldCheckIcon, ArrowTrendingUpIcon, EyeIcon } from "@heroicons/react/24/outline";


const DocumentFlow = () => {

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption, access controls, and detailed audit logs keep your pitch decks secure.",
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "Real-time Insights",
      description: "Get instant notifications and detailed analytics on how investors interact with your deck.",
    },
    {
      icon: EyeIcon,
      title: "Engagement Tracking",
      description: "Track time spent per slide, identify key areas of interest, and optimize your pitch.",
    },
  ];
  

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
    <div>
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden mt-10"
    >
      {/* Background Decorative Elements */}
    
      {/* Title Section */}
    
      {/* Image Container */}
      <motion.div
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10"
      >
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />

          {/* Main Image - Displaying full image without cropping sides */}
          <motion.div
            className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[684px] bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center"
          >
            <img
              src="/images/HomePageImage.png"
              alt="Document Flow Demo"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>

    <motion.div
      className="mt-8 py-8 px-0 sm:px-2 bg-[#F9FAFB] dark:bg-gray-900"
    >
      <motion.div
        className="bg-white/5 backdrop-blur-lg rounded-lg sm:rounded-xl p-4 sm:p-6 text-center "
      >
        <h1 style={{ fontFamily: 'PP Pangaia', fontWeight:'bold' }} className="text-4xl dark:text-white">Everything you need to pitch successfully</h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-lg rounded-lg sm:rounded-xl text-center px-6 py-2 max-w-screen-md mx-auto"
      >
        <p
          style={{ fontFamily: 'SF Pro Display Light' }}
          className="text-2xl dark:text-gray-300"
        >
          Powerful features to help you track, analyze, and optimize your pitch deck performance
        </p>
      </motion.div>

      {/* Feature Highlights - Adjusted for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 pb-8 sm:mt-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.2 }}
              className="bg-white dark:bg-white/5  
                          rounded-xl p-6 text-center transition-transform duration-300 hover:scale-105"
            >
              <Icon className="h-10 w-10 text-orange-500 mr-auto mb-4 bg-[#FFEDD5] p-1 " style={{borderRadius:'5px'}} />
              <h3 className="text-lg text-left font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-left dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
    </div>
  );
};
export default DocumentFlow;