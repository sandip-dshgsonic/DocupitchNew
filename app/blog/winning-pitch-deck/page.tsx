'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollProgress from '../../components/animations/ScrollProgress';

export default function WinningPitchDeckPost() {
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
            
            <h1>How to Create a Winning Pitch Deck</h1>
            
            <p className="lead">
              A well-crafted pitch deck is essential for securing investment. Learn how to create 
              a compelling presentation that effectively communicates your startup&apos;s value proposition.
            </p>

            <h2>Key Elements of a Successful Pitch Deck</h2>
            <ul>
              <li>Problem and Solution Slides</li>
              <li>Market Size and Opportunity</li>
              <li>Business Model</li>
              <li>Traction and Metrics</li>
              <li>Team Background</li>
              <li>Financial Projections</li>
              <li>Funding Ask</li>
            </ul>

            {/* Add more content sections */}
          </motion.article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}