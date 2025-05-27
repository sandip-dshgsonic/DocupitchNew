
'use client';
import { motion } from 'framer-motion';
const inputVariants = {
  focus: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};
export default function ContactForm() {
  return (
    <motion.div
      className="space-y-6 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between p-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Logo Section */}
      <div className="flex-shrink-0 text-center lg:text-left mb-12 lg:mb-16">
        <img
          src="/logo.png"
          alt="DocuPitch Logo"
          className="w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 object-contain mx-auto lg:mx-0"
        />
        <p className="mt-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-md mx-auto lg:mx-0">
          DocuPitch empowers businesses and individuals by simplifying document
          management. Our innovative platform ensures seamless collaboration,
          secure storage, and efficient workflows tailored to your unique needs.
        </p>
      </div>
    </motion.div>
  );
}