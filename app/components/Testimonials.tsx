
// // 'use client';
// // import { motion } from 'framer-motion';
// // import { useEffect, useState } from 'react';
// // function TestimonialCard({ testimonial }) {
// //   return (
// //     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 md:p-6">
// //       <div className="flex flex-row md:flex-col items-center md:text-center">
// //         <div className="flex-shrink-0 mr-4 md:mr-0">
// //           <img
// //             src={testimonial.photo}
// //             alt={testimonial.name}
// //             className="rounded-full w-16 h-16 md:w-24 md:h-24 md:mx-auto md:mb-4"
// //           />
// //         </div>
// //         <div className="flex-grow md:text-center">
// //           <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
// //             {testimonial.name}
// //           </h3>
// //           <p className="text-gray-600 dark:text-gray-400 mt-2 italic text-sm md:text-base">
// //           &quot;{testimonial.feedback}&quot;
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // export default function Testimonials() {
// //   const [isVisible, setIsVisible] = useState(false);
// //   useEffect(() => {
// //     // Set visible after component mounts for animation
// //     setIsVisible(true);
// //   }, []);
// //   const testimonials = [
// //     {
// //       name: "Sarah Lee",
// //       photo: "/images/team-3.jpg",
// //       feedback: "The service was excellent, and I would highly recommend it!",
// //     },
// //     // {
// //     //   name: "Jane Smith",
// //     //   photo: "/images/team-4.jpg",
// //     //   feedback: "Amazing experience, truly outstanding support!",
// //     // },
// //     {
// //       name: "Emily Brown",
// //       photo: "/images/team-5.jpg",
// //       feedback: "Loved the user-friendly design and prompt responses.",
// //     },
// //     {
// //       name: "Sam Wilson",
// //       photo: "/images/team-6.png",
// //       feedback: "This platform is a game-changer. Highly satisfied!",
// //     },
// //     {
// //       name: "Michael Johnson",
// //       photo: "/images/team-5.png",
// //       feedback: "Great customer service and fantastic results.",
// //     },
// //     {
// //       name: "John Doe",
// //       photo: "/images/team-7.png",
// //       feedback: "I achieved my goals quickly with their help!",
// //     },
// //   ];
// //   return (
// //     <section className="bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
// //       <div className="max-w-7xl mx-auto px-4 md:px-6">
// //         <div className="text-center mb-4 md:mb-8">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
// //             transition={{ duration: 0.5 }}
// //           >
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
// //               What Our Users Are Saying
// //             </h2>
// //           </motion.div>
// //         </div>
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
// //           {testimonials.map((testimonial, index) => (
// //             <motion.div
// //               key={testimonial.name}
// //               initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
// //               animate={{ 
// //                 opacity: isVisible ? 1 : 0, 
// //                 x: isVisible ? 0 : (index % 2 === 0 ? -20 : 20) 
// //               }}
// //               transition={{ duration: 0.5, delay: index * 0.2 }}
// //             >
// //               <TestimonialCard testimonial={testimonial} />
// //             </motion.div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // by aniket
// // 'use client';
// // import { motion } from 'framer-motion';
// // import { useEffect, useState } from 'react';

// // // Define the type for testimonials
// // interface Testimonial {
// //   name: string;
// //   photo: string;
// //   feedback: string;
// // }

// // function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
// //   return (
// //     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 md:p-6">
// //       <div className="flex flex-row md:flex-col items-center md:text-center">
// //         <div className="flex-shrink-0 mr-4 md:mr-0">
// //           <img
// //             src={testimonial.photo}
// //               loading="lazy"
// //             alt={testimonial.name}
// //             style={{width:'80px',height:'80px'}}
// //             className="rounded-full w-16 h-16 md:w-24 md:h-24 md:mx-auto md:mb-4"
// //           />
// //         </div>
// //         <div className="flex-grow md:text-center">
// //           <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
// //             {testimonial.name}
// //           </h3>
// //           <p className="text-gray-600 dark:text-gray-400 mt-2 italic text-sm md:text-base">
// //             &quot;{testimonial.feedback}&quot;
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function Testimonials() {
// //   const [isVisible, setIsVisible] = useState(false);

// //   useEffect(() => {
// //     setIsVisible(true);
// //   }, []);

// //   const testimonials: Testimonial[] = [
// //     {
// //       name: "Sarah Lee",
// //       photo: "/images/team-3.jpg",
// //       feedback: "The service was excellent, and I would highly recommend it!",
// //     },
// //     {
// //       name: "Emily Brown",
// //       photo: "/images/team-5.webp",
// //       feedback: "Loved the user-friendly design and prompt responses.",
// //     },
// //     {
// //       name: "Sam Wilson",
// //       photo: "/images/team-6.webp",
// //       feedback: "This platform is a game-changer. Highly satisfied!",
// //     },
// //     {
// //       name: "Michael Johnson",
// //       photo: "/images/team-5.webp",
// //       feedback: "Great customer service and fantastic results.",
// //     },
// //     {
// //       name: "John Doe",
// //       photo: "/images/team-7.webp",
// //       feedback: "I achieved my goals quickly with their help!",
// //     },
// //   ];

// //   return (
// //     <section className="bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
// //       <div className="max-w-7xl mx-auto px-4 md:px-6">
// //         <div className="text-center mb-4 md:mb-8">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
// //             transition={{ duration: 0.5 }}
// //           >
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'PP Pangaia' }}>
// //               What Our Users Are Saying
// //             </h2>
// //           </motion.div>
// //         </div>
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
// //           {testimonials.map((testimonial, index) => (
// //             <motion.div
// //               key={testimonial.name}
// //               initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
// //               animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : (index % 2 === 0 ? -20 : 20) }}
// //               transition={{ duration: 0.5, delay: index * 0.2 }}
// //             >
// //               <TestimonialCard testimonial={testimonial} />
// //             </motion.div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // // by aniket end

// 'use client';
// import { motion, useAnimation } from 'framer-motion';
// import { useEffect } from 'react';

// // Define the type for testimonials
// interface Testimonial {
//   name: string;
//   photo: string;
//   feedback: string;
// }

// function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl px-6 py-4 w-[350px] md:w-[400px] flex-shrink-0">
//       <div className="flex items-center mb-3">
//         <img
//           src={testimonial.photo}
//           loading="lazy"
//           alt={testimonial.name}
//           className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-purple-500 mr-4"
//         />
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//           {testimonial.name}
//         </h3>
//       </div>
//       <p className="text-gray-600 dark:text-gray-400 italic text-sm md:text-base">
//         “{testimonial.feedback}”
//       </p>
//     </div>
//   );
// }


// export default function Testimonials() {
//   const controls = useAnimation();

//   useEffect(() => {
//     controls.start({
//       x: ['0%', '-50%'],
//       transition: {
//         repeat: Infinity,
//         repeatType: 'loop',
//         duration: 40,
//         ease: 'linear',
//       },
//     });
//   }, [controls]);

//  const testimonials: Testimonial[] = [
//   {
//     name: "David Rodriguez",
//     photo: "/images/team-5.webp",
    
//     feedback: "Docupitch has revolutionized how I share sensitive documents with clients. The PDF signature functionality is seamless and saves me hours each week on contracts.",
//   },
//   {
//     name: "Aisha Patel",
//     photo: "/images/team-3.jpg",
//     feedback: "Using Docupitch to upload documents and instantly share them via secure links has made remote collaboration effortless. The signature feature is legally compliant and extremely user-friendly.",
//   },
//   {
//     name: "Thomas Nguyen",
//     photo: "/images/team-6.webp",
//     feedback: "As a legal professional, document security is paramount. Docupitch gives me peace of mind with its secure sharing options and professional e-signature capabilities.",
//   },
//   {
//     name: "Rebecca Kim",
//     photo: "/images/team-5.webp",
//     feedback: "My team needed a solution for sharing large presentations securely. Docupitch's instant public URL generation and access control features exceeded our expectations.",
//   },
//   {
//     name: "Jamal Washington",
//     photo: "/images/team-7.webp",
//     feedback: "Docupitch's ability to handle PDF, PPT, and DOC files while offering electronic signatures has streamlined our entire contract process. Couldn't recommend it more highly!",
//   },
// ];


//   const loopedTestimonials = [...testimonials, ...testimonials];

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900 py-10 md:py-14 overflow-hidden relative">
//   <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
//     <div className="text-center mb-12 relative z-20">
//       <h2
//         className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
//         style={{ fontFamily: 'PP Pangaia' }}
//       >
//         What Our Users Are Saying
//       </h2>
//     </div>

//     {/* Testimonials row */}
//     <div className="relative z-20">
//       <motion.div className="flex gap-6 pt-40 pb-40 w-max" animate={controls}>
//         {loopedTestimonials.map((testimonial, index) => (
//           <TestimonialCard key={index} testimonial={testimonial} />
//         ))}
//       </motion.div>
//     </div>
//   </div>

//   {/* Upward-facing semi-circle under heading
//   <div className="absolute bottom-[-40px] pb-20 left-0 w-full z-0 dark:text-gray-500">
//     <svg width="100%" height="80" viewBox="0 0 100 20" preserveAspectRatio="none">
//       <path
//         d="M0,20 Q50,0 100,20"
//         stroke="black"
//         strokeWidth="2"
//         fill="none"
//       />
//     </svg>
//   </div>

//   Downward-facing semi-circle under testimonials
//   <div className="absolute  top-[100px] pt-20 left-0 w-full z-0 dark:text-gray-500">
//     <svg width="100%" height="80" viewBox="0 0 100 20" preserveAspectRatio="none">
//       <path
//         d="M0,0 Q50,20 100,0"
//         stroke="black"
//         strokeWidth="2"
//         fill="none"
//       />
//     </svg>
//   </div> */}

//   {/* Upward-facing semi-circle under heading */}
// <div className="absolute bottom-[-40px] pb-20 left-0 w-full z-0">
//   <svg width="100%" height="80" viewBox="0 0 100 20" preserveAspectRatio="none">
//     <path
//       d="M0,20 Q50,0 100,20"
//       stroke="currentColor"
//       className="text-black dark:text-white"
//       strokeWidth="2"
//       fill="none"
//     />
//   </svg>
// </div>

// {/* Downward-facing semi-circle under testimonials */}
// <div className="absolute top-[100px] pt-20 left-0 w-full z-0">
//   <svg width="100%" height="80" viewBox="0 0 100 20" preserveAspectRatio="none">
//     <path
//       d="M0,0 Q50,20 100,0"
//       stroke="currentColor"
//       className="text-black dark:text-white"
//       strokeWidth="2"
//       fill="none"
//     />
//   </svg>
// </div>
// </section>

  
//   );
// }
'use client';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      text: "Simple way to get my deck across to investors and able to get feedback and analytics.",
      author: "Sarah Putnam",
      title: "CEO, Stealth Healthcare Startup"
    },
    {
      text: "Quick way to get deck across to investors and still know who is viewing the deck.",
      author: "Michael Dorowski",
      title: "CTO, Web3 Startup"
    },
    {
      text: "A simple implementation just what a startup founder needs when he is starting out.",
      author: "Jessica Jing",
      title: "CEO, Agentic Startup"
    }
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            Trusted By Founders Universally
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2
                }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{testimonial.text}</p>
                <p className="font-medium text-sm dark:text-gray-200">{testimonial.author}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}