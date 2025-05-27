// 'use client';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

// const contactItems = [
//   {
//     icon: MapPinIcon,
//     title: 'Visit Us',
//     content: '8350 Bee Ridge Suite#157 Sarasota FL 34241',
//   },
//   {
//     icon: PhoneIcon,
//     title: 'Call Us',
//     content: '860-990-2447',
//   },
//   {
//     icon: EnvelopeIcon,
//     title: 'Email Us',
//     content: 'support@docupitch.com',
//   },
// ];

// export default function ContactInfo() {
//   return (
//     <motion.div
//       className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10"
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5, delay: 0.4 }}
//     >
//       {/* Left Section */}
//       <div className="flex-1 space-y-6">
//         <motion.h1
//          style={{ fontFamily: 'PP Pangaia' }}
//           className="text-5xl font-bold text-gray-900 dark:text-white"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//         >
//           {/* Contact Us */}
//           We’re Here to Help
//         </motion.h1>
//         <motion.p
//           className="text-gray-700 dark:text-gray-300 max-w-md"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           We’re here to help. Reach out to us through any of the following methods and we’ll get back to you as soon as we can.
//         </motion.p>

//         <div className="space-y-6">
//           {contactItems.map((item, index) => (
//             <motion.div
//               key={item.title}
//               className="flex items-start gap-4"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 + index * 0.1 }}
//             >
//              <div className='w-12 h-12 bg-[#FFEDD5]' style={{borderRadius:'8px'}}>
//              <item.icon className="  text-orange-500 p-3 "  />
//               </div> 
//               {/* <item.icon className="w-10 h-10   text-orange-500 flex-shrink-0 bg-[#FFEDD5]" /> */}
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
//                   {item.title}
//                 </h4>
//                 <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Right Section - Image */}
//       <motion.div
//         className="flex-1 w-full max-w-lg"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.4 }}
//       >
//         <Image
//           src="/images/whth-pra.png" // Make sure this image exists in your public folder
//           alt="Contact Us"
//           width={800}
//           height={500}
//           className="w-full h-auto rounded-xl shadow-lg object-cover"
//         />
//       </motion.div>
//     </motion.div>
//   );
// }

'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const contactItems = [
  {
    icon: MapPinIcon,
    title: 'Visit Us',
    content: '8350 Bee Ridge Suite#157 Sarasota FL 34241',
  },
  {
    icon: PhoneIcon,
    title: 'Call Us',
    content: '860-990-2447',
  },
  {
    icon: EnvelopeIcon,
    title: 'Email Us',
    content: 'support@docupitch.com',
  },
];

export default function ContactInfo() {
  return (
    // <motion.div
    //   className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10"
    //   initial={{ opacity: 0, x: 20 }}
    //   animate={{ opacity: 1, x: 0 }}
    //   transition={{ duration: 0.5, delay: 0.4 }}
    // >
    //   {/* Left Section */}

    //   <div className="flex-1 space-y-6">
    //     <motion.h1
    //       style={{ fontFamily: 'PP Pangaia' }}
    //       className="text-5xl font-bold text-gray-900 dark:text-white"
    //       initial={{ opacity: 0, y: 10 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ delay: 0.1 }}
    //     >
    //       We&apos;re Here to Help
    //     </motion.h1>
    //     <motion.p
    //       className="text-gray-700 dark:text-gray-300 max-w-md"
    //       initial={{ opacity: 0, y: 10 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ delay: 0.2 }}
    //     >
    //       We&apos;re here to help. Reach out to us through any of the following methods and we&apos;ll get back to you as soon as we can.
    //     </motion.p>
    //     <div className="space-y-6">
    //       {contactItems.map((item, index) => (
    //         <motion.div
    //           key={item.title}
    //           className="flex items-start gap-4"
    //           initial={{ opacity: 0, y: 10 }}
    //           animate={{ opacity: 1, y: 0 }}
    //           transition={{ delay: 0.3 + index * 0.1 }}
    //         >
    //           <div className='w-12 h-12 bg-[#FFEDD5]' style={{borderRadius:'8px'}}>
    //             <item.icon className="text-orange-500 p-3" />
    //           </div>
    //           <div>
    //             <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
    //               {item.title}
    //             </h4>
    //             <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
    //           </div>
    //         </motion.div>
    //       ))}
    //     </div>
    //   </div>
    //   {/* Right Section - Image */}
    //   <motion.div
    //     className="flex-1 w-full max-w-lg"
    //     initial={{ opacity: 0, scale: 0.95 }}
    //     animate={{ opacity: 1, scale: 1 }}
    //     transition={{ delay: 0.4 }}
    //   >
    //     <Image
    //       src="/images/whth-pra.png"
    //       alt="Contact Us"
    //       width={800}
    //       height={500}
    //       className="w-full h-auto rounded-xl shadow-lg object-cover"
    //     />
    //   </motion.div>
    // </motion.div>


    <motion.div
      className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:items-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Left Section */}
      <div className="flex-1 space-y-6">
        <motion.h1
          style={{ fontFamily: 'PP Pangaia' }}
          className="text-5xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          We&apos;re Here to Help
        </motion.h1>
        <motion.p
          className="text-gray-700 dark:text-gray-300 max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          We&apos;re here to help. Reach out to us through any of the following methods and we&apos;ll get back to you as soon as we can.
        </motion.p>
        <div className="space-y-6">
          {contactItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="w-12 h-12 bg-[#FFEDD5]" style={{ borderRadius: '8px' }}>
                <item.icon className="text-orange-500 p-3" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Section - Image */}
      <motion.div
        className="flex-1 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Image
          src="/images/whth-pra.png"
          alt="Contact Us"
          width={800}
          height={500}
          className="w-full h-auto rounded-xl shadow-lg object-cover"
        />
      </motion.div>
    </motion.div>


  );
}