// 'use client';

// export default function ContactForm() {
//   return (
//     <form className="space-y-6">
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//           Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
//           Subject
//         </label>
//         <input
//           type="text"
//           id="subject"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label htmlFor="message" className="block text-sm font-medium text-gray-700">
//           Message
//         </label>
//         <textarea
//           id="message"
//           rows={4}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//         />
//       </div>
//       <button type="submit" className="btn-primary w-full">
//         Send Message
//       </button>
//     </form>
//   );
// }

'use client';

import { motion } from 'framer-motion';

const inputVariants = {
  focus: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export default function ContactForm() {
  return (
    <motion.form 
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* <motion.div whileFocus="focus" variants={inputVariants}>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
        />
      </motion.div> */}

      {/* <motion.div whileFocus="focus" variants={inputVariants}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
        />
      </motion.div> */}

      {/* <motion.div whileFocus="focus" variants={inputVariants}>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
        />
      </motion.div> */}

      {/* <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg 
                 font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Send Message
      </motion.button> */}
    </motion.form>
  );
}