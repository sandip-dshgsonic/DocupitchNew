
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/animations/ScrollProgress';
import MouseSpotlight from '../components/animations/MouseSpotlight';
import ContactModal from '../components/contact/ContactModal';
interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
const faqs: FAQItem[] = [
  {
    question: "How do I get started with Docupitch's document analysis?",
    answer: "Getting started is easy: Sign up for an account, upload your document, and our AI will automatically analyze it for key insights. You'll receive a detailed analysis including key points, sentiment, and suggested improvements within minutes.",
    category: "Getting Started"
  },
  {
    question: "What types of documents can Docupitch analyze?",
    answer: "Docupitch supports analysis of business proposals, research papers, legal documents, marketing materials, and technical documentation. We support PDF, DOC, DOCX, TXT, and RTF formats. All files are processed using our advanced AI while maintaining document confidentiality.",
    category: "Technical"
  },
  {
    question: "How does Docupitch's AI analysis work?",
    answer: "Our AI uses advanced natural language processing to analyze document structure, content quality, readability, and key messaging. It identifies areas for improvement, suggests enhancements, and provides actionable recommendations based on industry best practices.",
    category: "Technical"
  },
  {
    question: "How secure is my document data?",
    answer: "We use enterprise-grade encryption (AES-256) for all documents both in transit and storage. Our AI processing occurs in isolated environments, and we automatically delete documents after analysis. We're compliant with GDPR, HIPAA, and other privacy regulations.",
    category: "Security"
  },
  {
    question: "Can I collaborate with my team on document analysis?",
    answer: "Yes! You can share analysis results with team members, leave comments on specific insights, and track document improvements over time. Team members can be assigned different access levels to maintain document security.",
    category: "Collaboration"
  },
  {
    question: "What are the pricing plans for Docupitch?",
    answer: "We offer three tiers: Basic (free) for individual use with limited monthly analyses, Professional for small teams with advanced features, and Enterprise for organizations needing custom solutions. Each tier includes different analysis depths and collaboration features.",
    category: "Billing"
  },
  {
    question: "How accurate is the AI analysis?",
    answer: "Our AI achieves over 95% accuracy in document analysis, validated through extensive testing and user feedback. We continuously train our models on diverse document types to ensure high-quality insights across different industries and contexts.",
    category: "Technical"
  },
  {
    question: "Can I export the analysis results?",
    answer: "Yes, you can export analysis results in multiple formats including PDF, DOCX, and CSV. Reports include detailed metrics, suggestions, and comparative analytics. Enterprise users can also access our API for custom integrations.",
    category: "Technical"
  }
];
export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  
  const filteredFaqs = activeCategory 
    ? faqs.filter(faq => faq.category === activeCategory)
    : faqs;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <ScrollProgress />
      <MouseSpotlight />
      <Header />
        
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
              How can we help with your document analysis?
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get support and learn how to make the most of Docupitch&apos;s AI-powered document analysis
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-orange-500 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Technical Support
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get help with document analysis, AI processing, or platform features
              </p>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Contact Support
              </button>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-500 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Documentation
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Browse our comprehensive guides and API documentation
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg">
                View Docs
              </button>
            </motion.div>
          </div>
          <section className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
             
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left bg-white 
                             dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    <motion.svg
                      className="w-5 h-5 text-gray-500"
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openIndex === index ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Need more help with document analysis?</h2>
            <p className="mb-6">Our AI experts are available 24/7 to assist you with any questions about document processing and analysis</p>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-purple-500 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}