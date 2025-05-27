'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '../ThemeToggle';
import DashboardNav from './DashboardNav';

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  return (
    <header className="fixed w-full bg-white dark:bg-gray-900 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Image 
                src="/logo.png" 
                alt="DocuPitch Logo" 
                width={40} 
                height={40}
                className="w-auto h-8"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">DocuPitch</span>
            </Link>
            <DashboardNav />
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-orange-600 
                       dark:hover:text-orange-500 transition-colors"
            >
              <UserCircleIcon className="h-6 w-6" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}