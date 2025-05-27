
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheckIcon, 
  AcademicCapIcon, 
  BookOpenIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info & Social Proof */}
          <div>
            <div className="flex-shrink-0 mb-6">
              <Link href="/" className="flex items-center space-x-4">
                <Image 
                  src="/Docupitch_logo.png" 
                  alt="Docupitch Logo" 
                  width={200} 
                  height={200}
                  className="w-auto h-16 object-contain" 
                  priority 
                />
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <TrophyIcon className="h-5 w-5 text-orange-500" />
                <span>Best Pitch Deck Tool 2024</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <AcademicCapIcon className="h-5 w-5 text-orange-500" />
                <span>Featured in TechCrunch</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors
                "
                target="_blank"
                rel="noopener noreferrer">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors"
                 target="_blank"
                 rel="noopener noreferrer">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors"
                 target="_blank"
                 rel="noopener noreferrer">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Pitch Deck Guide
                </Link>
              </li>
              <li>
                <Link href="/ebooks" className="text-gray-400 hover:text-white transition-colors">
                  Fundraising eBook
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Startup Blog
                </Link>
              </li>
            </ul>
          </div> */}


  {/* Resources */}
  <div>
    <h4 className="text-lg font-semibold mb-4">Resources</h4>
    <ul className="space-y-2">
      <li>
        <Link href="/pitch-deck-guide" className="text-gray-400 hover:text-white transition-colors">
          Pitch Deck Guide
        </Link>
      </li>
      <li>
        <Link href="/ebooks" className="text-gray-400 hover:text-white transition-colors">
          Fundraising eBook
        </Link>
      </li>
      <li>
        <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
          Startup Blog
        </Link>
      </li>
    </ul>
  </div>
 

          {/* Connect & Compliance */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center space-x-2 text-gray-400 mb-2">
                  <ShieldCheckIcon className="h-5 w-5 text-orange-500" />
                  <span>GDPR & CCPA Compliant</span>
                </div>
                <p className="text-sm text-gray-400">
                  Your investor data is protected by enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Docupitch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}