'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {theme === 'dark' ? (
          <MoonIcon className="w-4 h-4 text-gray-800" />
        ) : (
          <SunIcon className="w-4 h-4 text-orange-500" />
        )}
      </motion.div>
    </button>
  );
}