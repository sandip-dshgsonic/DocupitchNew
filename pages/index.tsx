
import Head from 'next/head';
import { useEffect, useState } from 'react';
// import Header from '../app/components/Header';
import Hero from '../app/components/Hero';
// import DocumentShowcase from './components/DocumentShowcase';
import Features from '../app/components/Features';
import Testimonials from '../app/components/Testimonials';
import Pricing from '../app/components/Pricing';
import Contact from '../app/components/Contact';
import Footer from '../app/components/Footer';
import ScrollProgress from '../app/components/animations/ScrollProgress';
import MouseTrail from '../app/components/animations/MouseTrail';
import DocumentShowcases from '../app/components/DocumentShowcases';
import Step1 from '../app/components/Step1'
import Header from '@/app/components/Header';


export default function home() {



  return (
    <>
      <ScrollProgress />
      <Head>

        <title>DocuPitch</title>
        <meta name="google-site-verification" content="eyFvDKcwkv7EfuPOt2wno_YCvSV_WaUCwcPx9rKWQ98" />
        <meta name="description" content="Discover actionable insights with startup pitch deck analytics. Analyze presentation performance, track investor engagement, and optimize your storytelling for funding success. The ultimate tool for data-driven pitch perfection." />

        <meta property="og:url" content="https://docupitch.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DocuPitch | Analytics for Startup Pitch Decks" />
        <meta property="og:description" content="Discover actionable insights with startup pitch deck analytics. Analyze presentation performance, track investor engagement, and optimize your storytelling for funding success. The ultimate tool for data-driven pitch perfection." />
        <meta property="og:image" content="/DOCUPITCH.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="docupitch.com" />
        <meta property="twitter:url" content="https://docupitch.com/" />
        <meta name="twitter:title" content="DocuPitch | Analytics for Startup Pitch Decks" />
        <meta name="twitter:description" content="Discover actionable insights with startup pitch deck analytics. Analyze presentation performance, track investor engagement, and optimize your storytelling for funding success. The ultimate tool for data-driven pitch perfection." />
        <meta name="twitter:image" content="/DOCUPITCH.jpg" />
      </Head>

      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* <ScrollProgress/> */}
        <MouseTrail />
        {/* <Header />
         */}
         <Header />
        <Hero
        />
        <DocumentShowcases />

        <Step1 />
        <Features />

        <Testimonials />

        <Pricing />

        <Contact />
        <Footer />


      </main>
    </>
  );
}