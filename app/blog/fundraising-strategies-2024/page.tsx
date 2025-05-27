'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollProgress from '../../components/animations/ScrollProgress';

export default function FundraisingStrategiesPost() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ScrollProgress />
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center text-orange-500 hover:text-orange-600 no-underline mb-8"
            >
              ← Back to Blog
            </Link>
            
            <h1>Fundraising Strategies for 2024</h1>
            
            <p className="lead">
              Stay ahead of the curve with the latest fundraising trends and strategies for startups in 2024.
            </p>

            <h2>Key Trends in Startup Fundraising</h2>
            <ul>
              <li>Rise of Alternative Funding Sources</li>
              <li>Focus on Sustainable Growth</li>
              <li>Importance of Data-Driven Metrics</li>
              <li>Remote Fundraising Best Practices</li>
              <li>ESG Considerations</li>
            </ul>

            {/* Add more content sections */}
          </motion.article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}