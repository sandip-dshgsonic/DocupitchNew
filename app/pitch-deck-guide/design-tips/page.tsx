'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollProgress from '../../components/animations/ScrollProgress';

export default function DesignTipsGuide() {
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
            
            <h1>Design Tips for Your Pitch Deck</h1>
            
            <h2>Keep it Concise and Clear</h2>
            <p>
              Learn how to communicate your message effectively without overwhelming your audience.
            </p>

            <h2>Use Compelling Visuals</h2>
            <p>
              Discover how to use images, charts, and graphics to enhance your presentation.
            </p>

            <h2>Maintain Consistent Branding</h2>
            <p>
              Ensure your pitch deck reflects your brand identity consistently throughout.
            </p>

            {/* Add more content sections */}
          </motion.article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}