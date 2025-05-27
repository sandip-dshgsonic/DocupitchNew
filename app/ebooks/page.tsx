'use client';

import { motion } from 'framer-motion';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/animations/ScrollProgress';
import MouseTrail from '../components/animations/MouseTrail';

export default function FundraisingEbook() {
  const handleDownload = () => {
    // In a real app, this would be a proper URL to your PDF file
    const pdfUrl = '/ebooks/fundraising-guide.pdf';

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'fundraising-guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                The Complete Fundraising Guide
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Your comprehensive guide to successful startup fundraising
              </p>
              <motion.button
                onClick={handleDownload}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 
                         rounded-xl font-semibold flex items-center gap-2 mx-auto hover:from-orange-600 
                         hover:to-orange-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowDownIcon className="w-5 h-5" />
                Download Free eBook
              </motion.button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                What You&apos;ll Learn
              </h2>
              <ul className="space-y-4">
                {[
                  'Understanding different funding rounds',
                  'Creating compelling pitch materials',
                  'Valuation strategies',
                  'Negotiating with investors',
                  'Due diligence preparation',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
