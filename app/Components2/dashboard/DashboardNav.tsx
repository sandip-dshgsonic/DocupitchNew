'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderIcon, Cog6ToothIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function DashboardNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link 
        href="/dashboard" 
        className={`nav-link flex items-center space-x-1 ${
          isActive('/dashboard') ? 'text-orange-600 dark:text-orange-500' : ''
        }`}
      >
        <FolderIcon className="w-5 h-5" />
        <span>My Documents</span>
      </Link>
      <Link 
        href="/about" 
        className={`nav-link flex items-center space-x-1 ${
          isActive('/about') ? 'text-orange-600 dark:text-orange-500' : ''
        }`}
      >
        <InformationCircleIcon className="w-5 h-5" />
        <span>About Us</span>
      </Link>
      <Link 
        href="/dashboard/settings" 
        className={`nav-link flex items-center space-x-1 ${
          isActive('/dashboard/settings') ? 'text-orange-600 dark:text-orange-500' : ''
        }`}
      >
        <Cog6ToothIcon className="w-5 h-5" />
        <span>Settings</span>
      </Link>
    </nav>
  );
}