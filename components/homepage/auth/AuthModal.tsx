'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

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
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white
                           focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white
                           focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg 
                         hover:from-orange-600 hover:to-orange-700 transition-colors font-semibold"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}