
// export default function Footer() {
//   return (
//     <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white">
//       {/* Desktop View */}
//       <div className="border-2xl mx-auto hidden max-w-7xl px-6 md:block lg:px-8">
//         <div className="flex w-full justify-between py-16">
//           {/* 1. Logo + Tagline */}
//           <div className="flex max-w-sm flex-col space-y-8 text-left">
//             <div className="transform transition-transform duration-300 hover:scale-105">
//               <Link href="/">
//                 <Image
//                   src="/logo.png"
//                   alt="DocuPitch Logo"
//                   width={200}
//                   height={200}
//                   className="h-16 w-auto cursor-pointer object-contain brightness-110"
//                   priority
//                 />
//               </Link>
//             </div>
//             <p className="text-lg text-gray-400">
//               DocuPitch helps startups build and share investor-ready pitch
//               decks with real-time analytics on viewer activity. Track who
//               viewed your deck, when, and for how long—then close the deal with
//               secure, legally binding e-signatures.
//             </p>
//           </div>

//           {/* 2. Company (center section) */}
//           <div className="flex justify-center">
//             <div className="text-center">
//               <h4 className="mb-6 inline-flex items-center space-x-2 text-lg font-semibold text-white/90">
//                 <span>Company</span>
//               </h4>
//               <ul className="space-y-4">
//                 <li>
//                   <Link
//                     href="/about"
//                     className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
//                   >
//                     <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
//                       About Us
//                     </span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/privacy"
//                     target="_blank"
//                     className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
//                   >
//                     <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
//                       Privacy Policy
//                     </span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/terms"
//                     target="_blank"
//                     className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
//                   >
//                     <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
//                       Terms Of Service
//                     </span>
//                   </Link>
//                 </li>
//                 {/* <li>
//                   <Link
//                     href="/blog"
//                     className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
//                   >
//                     <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
//                       Startup Blog
//                     </span>
//                   </Link>
//                 </li> */}
//               </ul>
//             </div>
//           </div>

//           {/* Empty right column to maintain layout */}
//           <div className="flex justify-end">
//             <div className="text-right" />
//           </div>
//         </div>
//       </div>

//       {/* Mobile View */}
//       <div className="mx-auto max-w-7xl px-6 md:hidden">
//         <div className="flex flex-col space-y-10 py-12">
//           {/* Logo + Tagline */}
//           <div className="flex flex-col space-y-6 text-center">
//             <div className="flex justify-center">
//               <div className="transform transition-transform duration-300 hover:scale-105">
//                 <Link href="/">
//                   <Image
//                     src="/logo.png"
//                     alt="DocuPitch Logo"
//                     width={200}
//                     height={200}
//                     className="h-16 w-auto cursor-pointer object-contain brightness-110"
//                     priority
//                   />
//                 </Link>
//               </div>
//             </div>
//             <p className="text-base text-gray-400">
//               DocuPitch helps startups build and share investor-ready pitch
//               decks with real-time analytics on viewer activity. Track who
//               viewed your deck, when, and for how long—then close the deal with
//               secure, legally binding e-signatures.
//             </p>
//           </div>

//           {/* Company Section */}
//           <div className="text-center">
//             <h4 className="mb-6 inline-flex items-center space-x-2 text-lg font-semibold text-white/90">
//               <span>Company</span>
//             </h4>
//             <ul className="space-y-4">
//               <li>
//                 <Link
//                   href="/about"
//                   className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
//                 >
//                   <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
//                     About Us
//                   </span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/privacy"
//                   target="_blank"
//                   className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
//                 >
//                   <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
//                     Privacy Policy
//                   </span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/terms"
//                   target="_blank"
//                   className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
//                 >
//                   <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
//                     Terms Of Service
//                   </span>
//                 </Link>
//               </li>
//               {/* <li>
//                 <Link
//                   href="/blog"
//                   className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
//                 >
//                   <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
//                     Startup Blog
//                   </span>
//                 </Link>
//               </li> */}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Row (no extra margin above) */}
//       <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
//         <div className="flex flex-col items-center justify-between border-t border-gray-800/50 pt-6 md:flex-row">
//           <p className="text-center text-sm text-gray-400 md:text-left">
//             © {new Date().getFullYear()} DocuPitch. All rights reserved.
//           </p>
//           <div className="flex space-x-6">
//             <a
//               href="https://x.com/DocuPitch"
//               className="transform text-gray-400 transition-all duration-300 hover:scale-110 hover:text-orange-400"
//             >
//               <span className="sr-only">Twitter</span>
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//               </svg>
//             </a>
//             <a
//               href="https://www.linkedin.com/company/docupitch"
//               className="transform text-gray-400 transition-all duration-300 hover:scale-110 hover:text-orange-400"
//             >
//               <span className="sr-only">LinkedIn</span>
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//       {/* Gradient Overlay */}
//       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
//     </footer>
//   );
// }

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Desktop View */}
      <div className="mx-auto hidden max-w-7xl px-6 md:block lg:px-8">
        <div className="flex w-full justify-between py-6">
          {/* 1. Logo + Tagline */}
          <div className="flex max-w-sm flex-col space-y-6 text-left">
            <div className="transform transition-transform duration-300 hover:scale-105">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="DocuPitch Logo"
                  width={200}
                  height={200}
                  className="h-16 w-auto cursor-pointer object-contain brightness-110"
                  priority
                />
              </Link>
            </div>
            <p className="text-lg text-gray-400">
              DocuPitch helps startups build and share investor-ready pitch
              decks with real-time analytics on viewer activity. Track who
              viewed your deck, when, and for how long—then close the deal with
              secure, legally binding e-signatures.
            </p>
          </div>

          {/* 2. Company (center section) */}
          <div className="flex justify-center">
            <div className="text-center">
              <h4 className="mb-6 inline-flex items-center space-x-2 text-lg font-semibold text-white/90">
                <span>Company</span>
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
                  >
                    <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
                      About 
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
                  >
                    <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
                      Privacy Policy
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-services"
                    target="_blank"
                    className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
                  >
                    <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
                      Terms Of Service
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Social Icons (right section) */}
          <div className="flex justify-end">
            <div className="text-right">
              <h4 className="mb-6 text-lg font-semibold text-white/90">
                Follow Us
              </h4>
              <div className="flex justify-end space-x-6">
                <a
                  href="https://x.com/DocuPitch"
                  className="transform text-gray-400 transition-all duration-300 hover:scale-110 hover:text-orange-400"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/docupitch"
                  className="transform text-gray-400 transition-all duration-300 hover:scale-110 hover:text-orange-400"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="mx-auto max-w-7xl px-6 md:hidden">
        <div className="flex flex-col space-y-8 py-10">
          {/* Logo + Tagline */}
          <div className="flex flex-col space-y-4 text-center">
            <div className="flex justify-center">
              <div className="transform transition-transform duration-300 hover:scale-105">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="DocuPitch Logo"
                    width={200}
                    height={200}
                    className="h-16 w-auto cursor-pointer object-contain brightness-110"
                    priority
                  />
                </Link>
              </div>
            </div>
            <p className="text-base text-gray-400">
              DocuPitch helps startups build and share investor-ready pitch
              decks with real-time analytics on viewer activity. Track who
              viewed your deck, when, and for how long—then close the deal with
              secure, legally binding e-signatures.
            </p>
          </div>

          {/* Company Section */}
          <div className="text-center">
            <h4 className="mb-6 inline-flex items-center space-x-2 text-lg font-semibold text-white/90">
              <span>Company</span>
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
                >
                  <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
                >
                  <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-services"
                  target="_blank"
                  className="group pointer-events-none flex items-center justify-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-orange-400"
                >
                  <span className="pointer-events-auto transition-transform duration-300 group-hover:translate-x-1">
                    Terms Of Service
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Icons Section */}
          <div className="text-center">
            <h4 className="mb-6 text-lg font-semibold text-white/90">
              Follow Us
            </h4>
            <div className="flex justify-center space-x-6">
              <a
                href="https://x.com/DocuPitch"
                className="transform text-gray-400 transition-all duration-300 hover:scale-110 hover:text-orange-400"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/docupitch"
                className="transform text-gray-400 transition-all duration-300 hover:scale-110 hover:text-orange-400"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mx-auto max-w-7xl px-6 pb-6 lg:px-8">
        <div className="flex flex-col items-center justify-between border-t border-gray-800/50 pt-4 md:flex-row">
          <p className="text-center text-sm text-gray-400 md:text-left">
            © {new Date().getFullYear()} DocuPitch. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
    </footer>
  );
}




