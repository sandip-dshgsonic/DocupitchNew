// // components/TermsOfServiceContent.tsx
// "use client";

// import React, { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { termsOfService } from "@/data/terms";

// interface TermsOfServiceContentProps {
//   showHeader?: boolean;
//   compact?: boolean;
// }

// const TermsOfServiceContent: React.FC<TermsOfServiceContentProps> = ({
//   showHeader = true,
//   compact = false
// }) => {
//   const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

//   // Helper function to toggle section expansion
//   const toggleSection = (section: string): void => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header Section - Optional */}
//       {showHeader && (
//         <div className="text-center">
//           <h1 className="mt-4 text-4xl font-bold tracking-tight">
//             Terms Of <span className="text-orange-500">Services</span>
//           </h1>
//           <p className="text-gray-600">
//             Effective Date: {termsOfService[0]?.effectiveDate}, Last Updated: {termsOfService[0]?.lastUpdated}
//           </p>
//         </div>
//       )}

//       {/* Introduction Section */}
//       {termsOfService.length > 0 && termsOfService[0].introduction && (
//         <div className="rounded-2xl bg-white p-6 shadow-md">
//           <p className="text-gray-600">
//             {termsOfService[0].introduction}
//           </p>
//           {termsOfService[0].agreementStatement && (
//             <div className="mt-4 rounded-lg bg-orange-50 p-4">
//               <p className="font-semibold text-orange-700">
//                 {termsOfService[0].agreementStatement}
//               </p>
//             </div>
//           )}
//           {termsOfService[0].organizationRepresentation && (
//             <p className="mt-4 text-gray-600">
//               {termsOfService[0].organizationRepresentation}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Terms Sections */}
//       {termsOfService.map((item, index) => {
//         // Skip the first item which is the intro
//         if (!item.section || index === 0) return null;

//         const isExpanded = expandedSections[item.section] || false;

//         return (
//           <div
//             key={item.section}
//             className="rounded-2xl bg-white p-6 shadow-md"
//           >
//             <button
//               onClick={() => toggleSection(item.section || "")}
//               className="flex w-full items-center justify-between text-left"
//             >
//               <h2 className="flex items-center text-2xl font-semibold text-gray-900">
//                 {item.section}
//               </h2>
//               {isExpanded ? (
//                 <ChevronUp className="h-6 w-6 text-gray-500" />
//               ) : (
//                 <ChevronDown className="h-6 w-6 text-gray-500" />
//               )}
//             </button>

//             {isExpanded && (
//               <div className="mt-4 space-y-4">
//                 {/* Basic Content */}
//                 {item.content && (
//                   <p className="text-gray-600">
//                     {item.content}
//                   </p>
//                 )}

//                 {/* Restrictions List */}
//                 {item.restrictions && item.restrictions.length > 0 && (
//                   <div className="mt-4">
//                     <h3 className="mb-3 text-lg font-semibold text-gray-800">
//                       Restrictions:
//                     </h3>
//                     <ul className="space-y-2 pl-5">
//                       {item.restrictions.map((restriction, i) => (
//                         <li
//                           key={i}
//                           className="flex items-start gap-2 text-gray-600"
//                         >
//                           <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
//                           <span>{restriction}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {/* Enforcement Policy */}
//                 {item.enforcementPolicy && (
//                   <div className="mt-4 rounded-lg bg-gray-50 p-4">
//                     <p className="text-gray-600">
//                       {item.enforcementPolicy}
//                     </p>
//                   </div>
//                 )}

//                 {/* Subsections */}
//                 {item.subsections && item.subsections.length > 0 && (
//                   <div className="mt-6 space-y-6">
//                     {item.subsections.map((sub, i) => (
//                       <div key={i} className="border-t border-gray-100 pt-4">
//                         <h3 className="mb-2 text-lg font-semibold text-gray-800">
//                           {sub.title}
//                         </h3>
//                         <p className="text-gray-600">
//                           {sub.content}
//                         </p>

//                         {/* E-Signature Terms */}
//                         {sub.eSignatureTerms && sub.eSignatureTerms.length > 0 && (
//                           <div className="mt-3 rounded-lg bg-gray-50 p-4">
//                             <ul className="space-y-2">
//                               {sub.eSignatureTerms.map((term, j) => (
//                                 <li
//                                   key={j}
//                                   className="flex items-start gap-2 text-gray-600"
//                                 >
//                                   <svg
//                                     className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                   >
//                                     <path
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                       strokeWidth={2}
//                                       d="M5 13l4 4L19 7"
//                                     />
//                                   </svg>
//                                   <span>{term}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         {/* Termination Reasons */}
//                         {sub.terminationReasons && sub.terminationReasons.length > 0 && (
//                           <div className="mt-3 rounded-lg bg-gray-50 p-4">
//                             <ul className="space-y-2">
//                               {sub.terminationReasons.map((reason, j) => (
//                                 <li
//                                   key={j}
//                                   className="flex items-start gap-2 text-gray-600"
//                                 >
//                                   <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
//                                   <span>{reason}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         {/* Termination Effects */}
//                         {sub.terminationEffects && sub.terminationEffects.length > 0 && (
//                           <div className="mt-3 rounded-lg bg-gray-50 p-4">
//                             <ul className="space-y-2">
//                               {sub.terminationEffects.map((effect, j) => (
//                                 <li
//                                   key={j}
//                                   className="flex items-start gap-2 text-gray-600"
//                                 >
//                                   <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
//                                   <span>{effect}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         {/* Subsection Restrictions */}
//                         {sub.restrictions && sub.restrictions.length > 0 && (
//                           <div className="mt-3 rounded-lg bg-gray-50 p-4">
//                             <ul className="space-y-2">
//                               {sub.restrictions.map((restriction, j) => (
//                                 <li
//                                   key={j}
//                                   className="flex items-start gap-2 text-gray-600"
//                                 >
//                                   <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
//                                   <span>{restriction}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         );
//       })}

//       {/* Disclaimer */}
//       {termsOfService[termsOfService.length - 1]?.disclaimer && (
//         <div className="mt-8 rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
//           {termsOfService[termsOfService.length - 1].disclaimer}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TermsOfServiceContent;

// components/TermsOfServiceContent.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { termsOfService } from "@/data/terms";

interface TermsOfServiceContentProps {
  showHeader?: boolean;
  compact?: boolean;
}

const TermsOfServiceContent: React.FC<TermsOfServiceContentProps> = ({
  showHeader = true,
  compact = false
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  // Effect to detect and set dark mode based on localStorage or system preference
  useEffect(() => {
    // Get dark mode from localStorage or system preference
    const isDarkMode =
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDarkMode);
  }, []);

  // Listen for changes to dark mode
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'darkMode') {
        setDarkMode(e.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Helper function to toggle section expansion
  const toggleSection = (section: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // When dark mode is null (still determining), don't render yet
  if (darkMode === null) {
    return null; // Prevent rendering until client-side logic runs
  }

  return (
    <div className="space-y-8">
      {/* Header Section - Optional */}
      {showHeader && (
        <div className="text-center">
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Terms Of <span className="text-orange-500">Service</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Effective Date: {termsOfService[0]?.effectiveDate}, Last Updated: {termsOfService[0]?.lastUpdated}
          </p>
        </div>
      )}

      {/* Introduction Section */}
      {termsOfService.length > 0 && termsOfService[0].introduction && (
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md">
          <p className="text-gray-600 dark:text-gray-300">
            {termsOfService[0].introduction}
          </p>
          {termsOfService[0].agreementStatement && (
            <div className="mt-4 rounded-lg bg-orange-50 dark:bg-orange-900/30 p-4">
              <p className="font-semibold text-orange-700 dark:text-orange-300">
                {termsOfService[0].agreementStatement}
              </p>
            </div>
          )}
          {termsOfService[0].organizationRepresentation && (
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {termsOfService[0].organizationRepresentation}
            </p>
          )}
        </div>
      )}

      {/* Terms Sections */}
      {termsOfService.map((item, index) => {
        // Skip the first item which is the intro
        if (!item.section || index === 0) return null;

        const isExpanded = expandedSections[item.section] || false;

        return (
          <div
            key={item.section}
            className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md"
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

                {/* Restrictions List */}
                {item.restrictions && item.restrictions.length > 0 && (
                  <div className="mt-4">
                    <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Restrictions:
                    </h3>
                    <ul className="space-y-2 pl-5">
                      {item.restrictions.map((restriction, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                        >
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
                          <span>{restriction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Enforcement Policy */}
                {item.enforcementPolicy && (
                  <div className="mt-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 p-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.enforcementPolicy}
                    </p>
                  </div>
                )}

                {/* Subsections */}
                {item.subsections && item.subsections.length > 0 && (
                  <div className="mt-6 space-y-6">
                    {item.subsections.map((sub, i) => (
                      <div key={i} className="border-t border-gray-100 dark:border-gray-700 pt-4">
                        <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                          {sub.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {sub.content}
                        </p>

                        {/* E-Signature Terms */}
                        {sub.eSignatureTerms && sub.eSignatureTerms.length > 0 && (
                          <div className="mt-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 p-4">
                            <ul className="space-y-2">
                              {sub.eSignatureTerms.map((term, j) => (
                                <li
                                  key={j}
                                  className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                                >
                                  <svg
                                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  <span>{term}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Termination Reasons */}
                        {sub.terminationReasons && sub.terminationReasons.length > 0 && (
                          <div className="mt-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 p-4">
                            <ul className="space-y-2">
                              {sub.terminationReasons.map((reason, j) => (
                                <li
                                  key={j}
                                  className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                                >
                                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
                                  <span>{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Termination Effects */}
                        {sub.terminationEffects && sub.terminationEffects.length > 0 && (
                          <div className="mt-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 p-4">
                            <ul className="space-y-2">
                              {sub.terminationEffects.map((effect, j) => (
                                <li
                                  key={j}
                                  className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                                >
                                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                                  <span>{effect}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Subsection Restrictions */}
                        {sub.restrictions && sub.restrictions.length > 0 && (
                          <div className="mt-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 p-4">
                            <ul className="space-y-2">
                              {sub.restrictions.map((restriction, j) => (
                                <li
                                  key={j}
                                  className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                                >
                                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                                  <span>{restriction}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Disclaimer */}
      {termsOfService[termsOfService.length - 1]?.disclaimer && (
        <div className="mt-8 rounded-lg bg-gray-50 dark:bg-gray-700/50 p-4 text-sm text-gray-500 dark:text-gray-400">
          {termsOfService[termsOfService.length - 1].disclaimer}
        </div>
      )}
    </div>
  );
};

export default TermsOfServiceContent;