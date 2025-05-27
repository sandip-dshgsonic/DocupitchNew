// 'use client';

// import { motion } from 'framer-motion';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import ScrollProgress from '../components/animations/ScrollProgress';

// export default function PitchDeckGuide() {
//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900">
//       <ScrollProgress />
//       <Header />
      
//       <main className="pt-24 pb-16">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
//               Startup Blog & Resources
//             </h1>
            
//             <div className="grid gap-8">
//               <article className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                   How to Create a Winning Pitch Deck
//                 </h2>
//                 <p className="text-gray-600 dark:text-gray-300 mb-4">
//                   Learn the essential elements of a successful pitch deck and how to present your startup effectively.
//                 </p>
//                 <a href="#" className="text-orange-500 hover:text-orange-600">Read more →</a>
//               </article>

//               <article className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                   Fundraising Strategies for 2024
//                 </h2>
//                 <p className="text-gray-600 dark:text-gray-300 mb-4">
//                   Discover the latest trends and strategies in startup fundraising for the current year.
//                 </p>
//                 <a href="#" className="text-orange-500 hover:text-orange-600">Read more →</a>
//               </article>
//             </div>
//           </motion.div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/animations/ScrollProgress';
import MouseTrail from '../components/animations/MouseTrail';


const blogPosts = [
  {
    id: 'winning-pitch-deck',
    title: 'How to Create a Winning Pitch Deck',
    excerpt: 'Learn the essential elements of a successful pitch deck and how to present your startup effectively.',
    slug: '/blog/winning-pitch-deck'
  },
  {
    id: 'fundraising-2024',
    title: 'Fundraising Strategies for 2024',
    excerpt: 'Discover the latest trends and strategies in startup fundraising for the current year.',
    slug: '/blog/fundraising-strategies-2024'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ScrollProgress />
      <MouseTrail />
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Startup Blog & Resources
            </h1>
            
            <div className="grid gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={post.slug}
                    className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Read more 
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}