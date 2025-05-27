'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MouseTrail from '../components/animations/MouseTrail';
import { motion } from 'framer-motion';
import { plans } from '../data/plans';
import { useInView } from 'react-intersection-observer';
import PricingCard from '../components/pricing/PricingCard';
import Link from 'next/link';

// Create a separate component for each pricing card with enhanced shadow styling
function AnimatedPricingCard({ plan, index }: { plan: any; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <div 
      ref={ref}
      className={`${
        !plan.highlighted 
          ? 'shadow-xl hover:shadow-2xl transition-shadow duration-300' 
          : ''
      } rounded-2xl`}
    >
      <PricingCard plan={plan} index={index} inView={inView} />
    </div>
  );
}

export default function PricingPage() {
  const testimonials = [
    {
      text: "Simple way to get my deck across to investors and able to get feedback and analytics.",
      author:"Sarah Putnam",
      title: "CEO, Stealth Healthcare Startup"
    },
    {
      text: "Quick way to get deck across to investors and still know who is viewing the deck.",
      author: "Michael Dorowski",
      title: "CTO, Web3 Startup"
    },
    {
      text: "A simple implementation just what a startup founder needs when he is starting out.",
      author: "Jessica Jing",
      title: "CEO, Agentic Startup"
    }
  ];

  const faqs = [
    {
      question: "What exactly is DocuPitch?",
      answer: "DocuPitch is an AI-native fundraising platform that lets founders build, share, and track pitch decks in one place. It combines deck storage, document signature, granular investor analytics, and automated follow-ups to streamline your fundraising workflow from first email to signed term sheet."
    },
    {
      question: "How does DocuPitch track investor engagement?",
      answer: "Each deck is delivered through a unique, secure link. DocuPitch logs every view, slide-level dwell time, downloads, and comments—all anonymously if you choose—then presents the data on a real-time dashboard so you can see who's most interested, when to follow up, and which slides convert best."
    },
    {
      question: "Is my data (and my investors' data) secure?",
      answer: "Yes. All files are encrypted at rest and in transit (AES-256 &amp; TLS 1.3). You can enable NDA gates, watermarks, and link expirations. Servers are hosted on U.S.-based AWS regions with daily automated backups and SOC 2–aligned security practices."
    },
    {
      question: "Can I generate a deck inside DocuPitch or do I upload my own?",
      answer: "You can upload any existing PDF or PowerPoint, in the future we will have a deck builder feature."
    },
    {
      question: "Can I generate a deck inside DocuPitch or do I upload my own?",
      answer: "You can upload any existing PDF or PowerPoint, in the future we will have a deck builder feature."
    },
    {
      question: "What formats do investors see?",
      answer: "Investors receive a web-based viewer optimized for desktop and mobile—no account required. If they prefer, they can download a PDF that retains your watermarks and permissions."
    },
    {
      question: "How do AI insights work?",
      answer: "DocuPitch analyzes engagement metrics plus your deck's content to suggest next steps—e.g., Investor X revisited the financials 3×; consider sending a deeper revenue model. It also drafts personalized follow-up emails you can send with one click (Coming Soon)."
    },
    {
      question: "What does DocuPitch cost?",
      answer: "We offer three plans: Starter (free for one active deck, 2 links and 10 views), Growth ($29/month, 5 decks, unlimited links and views), and Scale ($99/month, unlimited decks, AI support advanced security controls, premium support)."
    },
     {
      question: "Where do I go for help or onboarding?",
      answer: "Our email at support@docupitch.com connects you to a real human Monday–Friday, 6 a.m.–7 p.m. ET. The Help Center has step-by-step guides and video tutorials, and Growth/Scale customers get a dedicated success manager who can migrate existing decks for you."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 overflow-hidden">
      <Header />
      <MouseTrail />

      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-10 px-4 sm:px-6 lg:px-8"
      />
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full"
        />
        <h1 className="mt-4 text-4xl font-bold tracking-tight dark:text-gray-100">
          Choose Your Perfect <span className="text-orange-500">Plan</span>
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Transparent pricing with no hidden fees. All plans include core features and updates.
        </p>
      </div>

      {/* New Pricing Cards with Enhanced Shadows */}
      <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <AnimatedPricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl font-bold text-center mb-12 dark:text-gray-100">Trusted By Founders Universally</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.2
              }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{testimonial.text}</p>
              <p className="font-medium text-sm dark:text-gray-200">{testimonial.author}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl font-bold text-center mb-12 dark:text-gray-100">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.2
              }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm"
            >
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer bg-white dark:bg-gray-900">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{faq.question}</h3>
                  <motion.span
                    className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </summary>
                <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900">
                  {faq.answer}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-24 mb-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-500 rounded-lg overflow-hidden shadow-lg">
            <div className="px-6 py-12 text-center">
              <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
              <p className="mt-4 text-white text-opacity-90">
                Join thousands of startups founders automating their fundraising by using our platform
              </p>
              <div className="mt-8 flex justify-center space-x-4">
               <Link href="/login" ><button
                  className="bg-white text-orange-500 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 shadow"
                >
                 Speed Up Fundraising
                </button>
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}