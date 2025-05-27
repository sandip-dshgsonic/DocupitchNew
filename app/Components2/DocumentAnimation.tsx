'use client';


import React from 'react';
import { motion } from 'framer-motion';

const DocumentAnimation = () => {
  return (
    <section className="min-h-screen bg-gray-900 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-600">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center relative">
          {/* Vertical Line */}
          <div className="hidden lg:block absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-600"></div>
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-xl"
          >
            <h1 className="text-5xl font-bold mb-8 leading-tight">
              Transforming your documents into actionable insights
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">
              Transform your documents into actionable insights with DocuPitch—analyze engagement, track reader behavior, and{' '}
              <span className="text-orange-500 font-medium">
                uncover valuable data to optimize your content like never before.
              </span>
            </p>
          </motion.div>

        
                  <video
                className="w-full h-[550px] object-cover rounded-lg shadow-lg"  
                autoPlay
                loop
                muted
                playsInline
              >
                    <source src="https://d3x4b1wy4qlu9.cloudfront.net/media/homepage-png/start.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
        </div>
      </div>
    </section>
  );
};

export default DocumentAnimation;