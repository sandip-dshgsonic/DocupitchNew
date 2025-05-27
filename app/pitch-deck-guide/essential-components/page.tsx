'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollProgress from '../../components/animations/ScrollProgress';

export default function EssentialComponentsGuide() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      <ScrollProgress />
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <Link 
              href="/pitch-deck-guide"
              className="inline-flex items-center text-orange-500 hover:text-orange-600 no-underline mb-8"
            >
              ← Back to Guide
            </Link>
            
            <h1>Essential Components of a Pitch Deck</h1>
            
            <h2>Problem and Solution</h2>
            <p>
              Clearly articulate the problem you&apos;re solving and how your solution addresses it effectively.
            </p>

            <h2>Market Opportunity</h2>
            <p>
              Present the size of your target market and your strategy for capturing market share.
            </p>

            <h2>Business Model</h2>
            <p>
              Explain how your company makes money and your path to profitability.
            </p>

            {/* Add more content sections */}
          </motion.article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}