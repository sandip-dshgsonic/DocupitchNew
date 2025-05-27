'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface LoadingOverlayProps {
  message?: string;
}

export default function LoadingOverlay({ message = 'Processing...' }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl text-center">
        <ArrowPathIcon className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
        <p className="text-gray-900 dark:text-white font-medium">{message}</p>
      </div>
    </div>
  );
}