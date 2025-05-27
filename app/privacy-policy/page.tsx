// 'use client';
// import React from 'react';
// import { motion } from 'framer-motion';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import ScrollProgress from '../components/animations/ScrollProgress';
// import MouseSpotlight from '../components/animations/MouseSpotlight';
// export default function PrivacyPolicy() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
//       <ScrollProgress />
//       <MouseSpotlight />
//       <Header />

//       <main className="pt-24 pb-16 relative">
//         {/* Decorative Elements */}
//         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob" />
//           <div className="absolute top-40 right-10 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
//         </div>
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="space-y-12"
//           >
//             {/* Header Section */}
//             <motion.div variants={itemVariants} className="text-center mb-12">
//               <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-purple-600 dark:from-orange-400 dark:to-purple-400 mb-4">
//                 Privacy Policy
//               </h1>
//             </motion.div>
//             <div className="prose prose-lg dark:prose-invert max-w-none">
//               {/* Introduction */}
//               <motion.section variants={itemVariants} className="mb-12">
//                 <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//                   <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
//                     <span className="inline-block w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg mr-3 flex items-center justify-center">
//                       🔒
//                     </span>
//                     Your Pitch Security Matters
//                   </h2>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     At Docupitch, we understand the sensitive nature of your pitch decks and startup information. We&apos;re committed to protecting your intellectual property and ensuring the confidentiality of your business ideas and presentations.
//                   </p>
//                 </div>
//               </motion.section>
//               {/* Information Collection */}
//               <motion.section variants={itemVariants} className="mb-12">
//                 <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//                   <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
//                     <span className="inline-block w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg mr-3 flex items-center justify-center">
//                       📊
//                     </span>
//                     1. Information We Collect
//                   </h2>
//                   <div className="space-y-4">
//                     <p className="text-gray-600 dark:text-gray-300">
//                       To provide our pitch deck creation and management services, we collect:
//                     </p>
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <ul className="list-none space-y-2">
//                         <li className="flex items-center text-gray-600 dark:text-gray-300">
//                           <span className="w-6 h-6 mr-2 text-orange-500 dark:text-orange-400">✓</span>
//                           Startup information
//                         </li>
//                         <li className="flex items-center text-gray-600 dark:text-gray-300">
//                           <span className="w-6 h-6 mr-2 text-orange-500 dark:text-orange-400">✓</span>
//                           Pitch deck content
//                         </li>
//                         <li className="flex items-center text-gray-600 dark:text-gray-300">
//                           <span className="w-6 h-6 mr-2 text-orange-500 dark:text-orange-400">✓</span>
//                           Founder details
//                         </li>
//                       </ul>
//                       <ul className="list-none space-y-2">
//                         <li className="flex items-center text-gray-600 dark:text-gray-300">
//                           <span className="w-6 h-6 mr-2 text-orange-500 dark:text-orange-400">✓</span>
//                           Usage analytics
//                         </li>
//                         <li className="flex items-center text-gray-600 dark:text-gray-300">
//                           <span className="w-6 h-6 mr-2 text-orange-500 dark:text-orange-400">✓</span>
//                           Presentation metrics
//                         </li>
//                         <li className="flex items-center text-gray-600 dark:text-gray-300">
//                           <span className="w-6 h-6 mr-2 text-orange-500 dark:text-orange-400">✓</span>
//                           Feedback data
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </motion.section>
//               {/* Data Usage */}
//               <motion.section variants={itemVariants} className="mb-12">
//                 <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//                   <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
//                     <span className="inline-block w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg mr-3 flex items-center justify-center">
//                       🔄
//                     </span>
//                     2. How We Use Your Information
//                   </h2>
//                   <div className="space-y-4">
//                     <p className="text-gray-600 dark:text-gray-300">
//                       Your information helps us enhance your pitch deck creation experience:
//                     </p>
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Pitch Enhancement</h3>
//                         <ul className="space-y-2 text-gray-600 dark:text-gray-300">
//                           <li>• AI-powered content suggestions</li>
//                           <li>• Design optimization</li>
//                           <li>• Investor preference analysis</li>
//                         </ul>
//                       </div>
//                       <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Platform Improvement</h3>
//                         <ul className="space-y-2 text-gray-600 dark:text-gray-300">
//                           <li>• Template personalization</li>
//                           <li>• Success metrics tracking</li>
//                           <li>• Collaboration features</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.section>
//               {/* Data Protection */}
//               <motion.section variants={itemVariants} className="mb-12">
//                 <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//                   <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
//                     <span className="inline-block w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg mr-3 flex items-center justify-center">
//                       🛡️
//                     </span>
//                     3. Pitch Deck Protection
//                   </h2>
//                   <div className="space-y-4">
//                     <p className="text-gray-600 dark:text-gray-300">
//                       We implement enterprise-grade security to protect your intellectual property:
//                     </p>
//                     <div className="grid md:grid-cols-3 gap-4">
//                       <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
//                         <div className="text-2xl mb-2">🔒</div>
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-2">NDA Protection</h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">Automatic NDA enforcement</p>
//                       </div>
//                       <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
//                         <div className="text-2xl mb-2">🔍</div>
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Access Tracking</h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">View history monitoring</p>
//                       </div>
//                       <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
//                         <div className="text-2xl mb-2">🔐</div>
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Pitch Control</h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">Granular sharing settings</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.section>
//             </div>
//           </motion.div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }
'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/animations/ScrollProgress';
import MouseSpotlight from '../components/animations/MouseSpotlight';
import { privacyPolicy } from '@/data/privacy';
import MouseTrail from '../components/animations/MouseTrail';

// Type definitions for the privacy policy data
type PrivacyItem = {
  section?: string;
  title?: string;
  content?: string;
  introduction?: string;
  effectiveDate?: string;
  lastUpdated?: string;
  policyExplanation?: string;
  acknowledgement?: string;
  subsections?: {
    title: string;
    content?: string;
    items?: string[];
  }[];
  purposeTable?: {
    purpose: string;
    lawfulBasis: string;
    details: string[];
  }[];
  additionalBasisInfo?: string;
  securityMeasures?: {
    title: string;
    content?: string;
    details?: string[];
  }[];
  disclaimer?: string;
  sharingCircumstances?: {
    title: string;
    content: string;
    obligations?: string[];
    reasons?: string[];
    additionalInfo?: string;
  }[];
  rights?: {
    title: string;
    content: string;
  }[];
  californiaRights?: {
    title: string;
    rights: {
      title: string;
      content: string;
    }[];
  };
  exercisingRights?: {
    title: string;
    content: string;
  };
  purposeItems?: {
    title: string;
    content: string;
  }[];
  cookieManagement?: {
    title: string;
    content: string;
  };
  safeguards?: string;
  safeguardTypes?: {
    title: string;
    content: string;
  }[];
  consent?: string;
  laws?: string[];
  legalBinding?: string;
  purposes?: string[];
  accountDataPolicy?: string;
  contactInfo?: {
    company: string;
    attention: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    email: string;
  };
  commitment?: string;
};

// Add type assertion to ensure TypeScript understands the structure
const typedPrivacyPolicy = privacyPolicy as PrivacyItem[];

export default function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Helper function to toggle section expansion
  const toggleSection = (section: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <ScrollProgress />
      <MouseSpotlight />
      <MouseTrail />
      <Header />

      <main className="pt-24 pb-16 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-40 right-10 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="text-center">
              {/* <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-purple-600 dark:from-orange-400 dark:to-purple-400 mb-4">
                Privacy Policy
              </h1> */}
              <div className="text-center">
                {/* <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="inline-block px-3 py-1 bg-orange-100 rounded-full"
                        >
                        </motion.div> */}
                <h1 className="mt-4 text-4xl font-bold tracking-tight dark:text-white">
                  Privacy <span className="text-orange-500">Policy</span>
                </h1>
                {/* <p className="mt-2 text-lg text-gray-600">
                          Transparent pricing with no hidden fees. All plans include core features and updates.
                        </p> */}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Effective Date: {typedPrivacyPolicy[0]?.effectiveDate}, Last Updated: {typedPrivacyPolicy[0]?.lastUpdated}
              </p>
            </motion.div>

            {/* Introduction Section */}
            {typedPrivacyPolicy.length > 0 && typedPrivacyPolicy[0].introduction && (
              <motion.div variants={itemVariants} className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md">
                <p className="text-gray-600 dark:text-gray-300">
                  {typedPrivacyPolicy[0].introduction}
                </p>
                {typedPrivacyPolicy[0].policyExplanation && (
                  <div className="mt-4 rounded-lg bg-orange-50 dark:bg-orange-900/30 p-4">
                    <p className="font-semibold text-orange-700 dark:text-orange-300">
                      {typedPrivacyPolicy[0].policyExplanation}
                    </p>
                  </div>
                )}
                {typedPrivacyPolicy[0].acknowledgement && (
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {typedPrivacyPolicy[0].acknowledgement}
                  </p>
                )}
              </motion.div>
            )}

            {/* Privacy Policy Sections */}
            {typedPrivacyPolicy.map((item, index) => {
              // Skip the first item which is the intro
              if (!item.section || index === 0) return null;

              const isExpanded = expandedSections[item.section] || false;

              return (
                <motion.div
                  key={item.section}
                  variants={itemVariants}
                  className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <button
                    onClick={() => toggleSection(item.section || "")}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <h2 className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                      {item.section}
                    </h2>
                    {isExpanded ? (
                      <ChevronUp className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 space-y-4">
                      {/* Basic Content */}
                      {item.content && (
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.content}
                        </p>
                      )}

                      {/* Basic Subsections */}
                      {item.subsections && item.subsections.length > 0 && (
                        <div className="mt-6 space-y-6">
                          {item.subsections.map((sub, i) => (
                            <div key={i} className="border-t border-gray-100 dark:border-gray-700 pt-4">
                              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {sub.title}
                              </h3>
                              {sub.content && (
                                <p className="text-gray-600 dark:text-gray-300 mb-3">
                                  {sub.content}
                                </p>
                              )}

                              {/* List Items */}
                              {sub.items && sub.items.length > 0 && (
                                <ul className="space-y-2 ml-2">
                                  {sub.items.map((item, j) => (
                                    <li
                                      key={j}
                                      className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                                    >
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Security Measures */}
                      {item.securityMeasures && item.securityMeasures.length > 0 && (
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          {item.securityMeasures.map((measure, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                {measure.title}
                              </h3>
                              {measure.content && (
                                <p className="text-gray-600 dark:text-gray-300">
                                  {measure.content}
                                </p>
                              )}
                              {measure.details && measure.details.length > 0 && (
                                <ul className="mt-2 space-y-1">
                                  {measure.details.map((detail, j) => (
                                    <li key={j} className="text-gray-600 dark:text-gray-300 text-sm">
                                      • {detail}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Sharing Circumstances */}
                      {item.sharingCircumstances && item.sharingCircumstances.length > 0 && (
                        <div className="mt-4 space-y-4">
                          {item.sharingCircumstances.map((circumstance, i) => (
                            <div key={i} className="border-l-4 border-orange-500 pl-4 py-1">
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                {circumstance.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300">
                                {circumstance.content}
                              </p>

                              {circumstance.obligations && circumstance.obligations.length > 0 && (
                                <ul className="mt-2 space-y-1 ml-5">
                                  {circumstance.obligations.map((obligation, j) => (
                                    <li key={j} className="text-gray-600 dark:text-gray-300 text-sm list-disc">
                                      {obligation}
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {circumstance.reasons && circumstance.reasons.length > 0 && (
                                <ul className="mt-2 space-y-1 ml-5">
                                  {circumstance.reasons.map((reason, j) => (
                                    <li key={j} className="text-gray-600 dark:text-gray-300 text-sm list-disc">
                                      {reason}
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {circumstance.additionalInfo && (
                                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm italic">
                                  {circumstance.additionalInfo}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Rights */}
                      {item.rights && item.rights.length > 0 && (
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          {item.rights.map((right, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                {right.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {right.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* California Rights */}
                      {item.californiaRights && (
                        <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            {item.californiaRights.title}
                          </h3>
                          <div className="grid gap-4 md:grid-cols-2">
                            {item.californiaRights.rights.map((right, i) => (
                              <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                  {right.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                  {right.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Exercising Rights */}
                      {item.exercisingRights && (
                        <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {item.exercisingRights.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {item.exercisingRights.content}
                          </p>
                        </div>
                      )}

                      {/* Purpose Items */}
                      {item.purposeItems && item.purposeItems.length > 0 && (
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          {item.purposeItems.map((purpose, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                {purpose.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {purpose.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Purpose Table */}
                      {item.purposeTable && item.purposeTable.length > 0 && (
                        <div className="mt-4 overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Purpose</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lawful Basis</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              {item.purposeTable.map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{row.purpose}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{row.lawfulBasis}</td>
                                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                    <ul className="list-disc pl-5 space-y-1">
                                      {row.details.map((detail, j) => (
                                        <li key={j}>{detail}</li>
                                      ))}
                                    </ul>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Additional Basis Info */}
                      {item.additionalBasisInfo && (
                        <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                            <strong>Note:</strong> {item.additionalBasisInfo}
                          </p>
                        </div>
                      )}

                      {/* Cookie Management */}
                      {item.cookieManagement && (
                        <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {item.cookieManagement.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {item.cookieManagement.content}
                          </p>
                        </div>
                      )}

                      {/* Safeguards */}
                      {item.safeguards && (
                        <div className="mt-4">
                          <p className="text-gray-600 dark:text-gray-300 font-medium">
                            {item.safeguards}
                          </p>
                          {item.safeguardTypes && item.safeguardTypes.length > 0 && (
                            <ul className="mt-2 space-y-2 ml-2">
                              {item.safeguardTypes.map((safeguard, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                                  <div>
                                    <span className="font-medium">{safeguard.title}:</span> {safeguard.content}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                          {item.consent && (
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                              {item.consent}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Laws */}
                      {item.laws && item.laws.length > 0 && (
                        <div className="mt-4">
                          <ul className="space-y-2 ml-2">
                            {item.laws.map((law, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                                <span>{law}</span>
                              </li>
                            ))}
                          </ul>
                          {item.legalBinding && (
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                              {item.legalBinding}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Simple List of Purposes */}
                      {item.purposes && item.purposes.length > 0 && (
                        <div className="mt-4">
                          <ul className="space-y-2 ml-2">
                            {item.purposes.map((purpose, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                                <span>{purpose}</span>
                              </li>
                            ))}
                          </ul>
                          {item.accountDataPolicy && (
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                              {item.accountDataPolicy}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Contact Info */}
                      {item.contactInfo && (
                        <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <address className="not-italic">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">{item.contactInfo.company}</p>
                            <p className="text-gray-600 dark:text-gray-300">{item.contactInfo.attention}</p>
                            <p className="text-gray-600 dark:text-gray-300">{item.contactInfo.address}</p>
                            <p className="text-gray-600 dark:text-gray-300">
                              {item.contactInfo.city}, {item.contactInfo.state} {item.contactInfo.zip}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">{item.contactInfo.country}</p>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                              📧 <a href={`mailto:${item.contactInfo.email.split(' ')[0]}`} className="text-orange-600 dark:text-orange-400 hover:underline">
                                {item.contactInfo.email}
                              </a>
                            </p>
                          </address>
                          {item.commitment && (
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                              {item.commitment}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Disclaimer */}
                      {item.disclaimer && (
                        <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                            {item.disclaimer}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}