
// "use client";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import {
//   DocumentDuplicateIcon,
//   UserGroupIcon,
  
//   CloudIcon,
//   SparklesIcon,
// } from "@heroicons/react/24/outline";
// import { CheckCircleIcon } from "@heroicons/react/24/solid";
// import { features } from '../data/features';

// export default function Features() {


// // Sample features array
// const features = [
//   {
//     title: "Specialized Analytics",
//     description: "Built specifically for pitch deck tracking and investor engagement analysis",
//   },
//   {
//     title: "Investor-Ready Features",
//     description: "Tools designed for fundraising and investor communications",
//   },
//   {
//     title: "Startup-Friendly Pricing",
//     description: "Flexible plans that grow with your startup's needs",
//   },
//   {
//     title: "Dedicated Support",
//     description: "24/7 support from team members who understand startup needs",
//   },
// ];


//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });
//   return (
//     <section
//       id="features"
//       className="relative  overflow-hidden py-10 bg-[#E5E7EB] dark:bg-gray-900"
//     >
//       {/* Enhanced background with multiple layers */}
//       <div className="absolute inset-0 bg-grid-pattern opacity-5" />
//       {/* <StaticBackground /> */}
//       <div className="absolute inset-0 " />
//       <div className="max-w-7xl mx-auto relative z-10 ">
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7 }}
//         >
//           <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text mb-6 dark:text-white" style={{ fontFamily: 'PP Pangaia' }}>
//             Why Choose DocuPitch Over DocuSign?
//           </h2>
//           <p className="text-xl max-w-2xl mx-auto dark:text-gray-300" style={{ fontFamily: 'SF Pro Display Lights' }}>
//           Purpose-built for startups and investors with specialized features for pitch deck sharing and tracking
//           </p>
//         </motion.div>
//         <div
//           ref={ref}
//           className=" relative z-10"
//         >
//          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
//   {features.map((feature, index) => (
//     <motion.div
//       key={feature.title}
//       initial={{ opacity: 0, y: 20 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5, delay: index * 0.2 }}
//       className="flex items-start gap-4  p-6 "
//     >
//       <CheckCircleIcon className="w-8 h-8 text-purple-500 mt-1 flex-shrink-0" />
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
//           {feature.title}
//         </h3>
//         <p className="text-gray-600 dark:text-gray-300 text-base">
//           {feature.description}
//         </p>
//       </div>
//     </motion.div>
//   ))}
// </div>

//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  DocumentDuplicateIcon,
  UserGroupIcon,
  CloudIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function Features() {

  const features = [
    {
      title: "Specialized Analytics",
      description: "Built specifically for pitch deck tracking and investor engagement analysis",
    },
    {
      title: "Investor-Ready Features",
      description: "Tools designed for fundraising and investor communications",
    },
    {
      title: "Startup-Friendly Pricing",
      description: "Flexible plans that grow with your startup's needs",
    },
    {
      title: "Dedicated Support",
      description: "24/7 support from team members who understand startup needs",
    },
  ];

  const icons = [
    DocumentDuplicateIcon,
    UserGroupIcon,
    CloudIcon,
    SparklesIcon,
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="features"
      className="relative overflow-hidden py-10 bg-[#E5E7EB] dark:bg-gray-900"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-3xl md:text-4xl font-extrabold bg-clip-text mb-6 dark:text-white"
            style={{ fontFamily: "PP Pangaia" }}
          >
            Why Choose DocuPitch Over DocuSign?
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto dark:text-gray-300"
            style={{ fontFamily: "SF Pro Display Lights" }}
          >
            Purpose-built for startups and investors with specialized features
            for pitch deck sharing and tracking
          </p>
        </motion.div>
        <div ref={ref} className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = icons[index];
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex items-start gap-4 p-6"
                >
                  <IconComponent className="w-8 h-8 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-base">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

