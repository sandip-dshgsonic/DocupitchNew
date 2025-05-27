'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ContactInfo from './ContactInfo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl relative overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            
            <div className="p-6">
              <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Contact Us
              </h2>
              <ContactInfo />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}