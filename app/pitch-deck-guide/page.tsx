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
//               Ultimate Pitch Deck Guide
//             </h1>
            
//             <div className="space-y-8">
//               <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                   Essential Components
//                 </h2>
//                 <ul className="space-y-4 text-gray-600 dark:text-gray-300">
//                   <li>• Problem and Solution</li>
//                   <li>• Market Opportunity</li>
//                   <li>• Business Model</li>
//                   <li>• Traction and Metrics</li>
//                   <li>• Team and Experience</li>
//                 </ul>
//               </section>

//               <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                   Design Tips
//                 </h2>
//                 <ul className="space-y-4 text-gray-600 dark:text-gray-300">
//                   <li>• Keep it concise and clear</li>
//                   <li>• Use compelling visuals</li>
//                   <li>• Maintain consistent branding</li>
//                   <li>• Focus on storytelling</li>
//                 </ul>
//               </section>
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

const sections = [
  {
    id: 'essential-components',
    title: 'Essential Components',
    items: [
      'Problem and Solution',
      'Market Opportunity',
      'Business Model',
      'Traction and Metrics',
      'Team and Experience'
    ]
  },
  {
    id: 'design-tips',
    title: 'Design Tips',
    items: [
      'Keep it concise and clear',
      'Use compelling visuals',
      'Maintain consistent branding',
      'Focus on storytelling'
    ]
  }
];

export default function PitchDeckGuide() {
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
              Ultimate Pitch Deck Guide
            </h1>
            
            <div className="space-y-8">
              {sections.map((section) => (
                <section key={section.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-4 text-gray-600 dark:text-gray-300 mb-4">
                    {section.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                  <Link 
                    href={`/pitch-deck-guide/${section.id}`}
                    className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Learn more 
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </section>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}