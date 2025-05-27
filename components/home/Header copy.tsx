// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import ThemeToggle from './ThemeToggle';

// export default function Header() {
//   const router = useRouter();

//   return (
//     <header className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 shadow-lg">
//       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0">
//             <Link href="/" className="flex items-center space-x-2">
//               <Image 
//                 src="/DocuPitch_logo.png" 
            
//                 alt="DocuPitch Logo" 
//                 width={40} 
//                 height={40}
//                 className="w-auto h-8"
//               />
//               <span className="text-xl font-bold text-gray-900 dark:text-white">DocuPitch</span>
//             </Link>
//           </div>
          
//           <div className="hidden md:flex items-center space-x-8">
//             <Link 
//               href="/about" 
//               className="text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-500 
//                        transition-colors duration-300"
//             >
//               About Us
//             </Link>
//           </div>

//           <div className="flex items-center space-x-4">
//             <ThemeToggle />
//             <button
//               onClick={() => router.push('/login')}
//               className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg 
//                        font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 
//                        shadow-md hover:shadow-lg"
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <header className="fixed w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 shadow-xl border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-4">
              <Image 
                src="/DocuPitch_logo.png" 
                alt="DocuPitch Logo" 
                width={200} 
                height={200}
                className="w-auto h-16 object-contain" 
                priority 
              />
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-wide">
                DocuPitch
              </span>
            </Link>
          </div>

          {/* Action Buttons Section */}
          <div className="flex items-center space-x-4">
            {/* About Us Button */}
            <Link
              href="/about"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-full font-medium 
                         text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md 
                         hover:shadow-lg whitespace-nowrap"
            >
              About Us
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative w-12 h-8 bg-gray-300 dark:bg-gray-700 rounded-full transition-all duration-300 shadow-md"
              aria-label="Toggle Dark Mode"
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 
                            transform ${darkMode ? 'translate-x-4' : 'translate-x-0'}`}
              ></span>
              <div className="absolute inset-0 flex justify-between items-center px-1">
                <span className="text-yellow-500 text-lg">
                  🌞
                </span>
                <span className="text-blue-500 text-lg">
                  🌙
                </span>
              </div>
            </button>

            {/* Login Button */}
            <button
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-full font-semibold 
                         text-sm hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md 
                         hover:shadow-lg"
            >
              Login
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
