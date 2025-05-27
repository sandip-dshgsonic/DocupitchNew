

import Header from './Header';
import Hero from './Hero';
// import DocumentShowcase from './DocumentShowcase';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import Contact from './Contact';
import ScrollProgress from './animations/ScrollProgress';
import MouseTrail from './animations/MouseTrail';
import DocumentShowcase from './DocumentShowcase';
import  DocumentAnimation  from './DocumentAnimation';
import ProductSections from './ProductSections';
import DocumentShowcases from './DocumentShowcases';
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Footer from '../components/Footer';
// import LandingPage from './LandingPage';



// import {
//   FloatingDocumentStack,
//   DocumentCarousel,
//   InteractiveDocumentGrid,
//   DocumentFlow,
//   AnimatedDocumentHero
// } from './components/DocumentShowcase';
// import { DocumentUploadSection, DocumentUploadZone } from './components/DocumentShowcase';
// import { ModernDocumentInterface } from './DocumentShowcase';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <ScrollProgress />
      <MouseTrail />
      {/* <Header /> */}
      {/* <Hero
      /> */}
      <DocumentShowcases />

      <Step1/> 

<Step2/>  

<Step3/>  

<Step4/>

      <Features />
      <DocumentAnimation

      // videoUrl="https://d3x4b1wy4qlu9.cloudfront.net/media/homepage-png/start.mp4"
    
      // videoUrl="https://d3x4b1wy4qlu9.cloudfront.net/media/homepage-png/start.mp4" // by aniket commented all video url here


      />
     

      <ProductSections
      // videoUrl="https://framerusercontent.com/assets/75Bo5HN2vt8kx9I0qMzVwgGp5vY.mp4"

      // videoUrl="https://videos.pexels.com/video-files/4167404/4167404-uhd_1440_1920_24fps.mp4" // by aniket commented all video url here
      />

      <Testimonials />

      <HowItWorks />

      <Pricing />

      {/* <DocumentShowcase
        //  videoUrl="https://framerusercontent.com/assets/FixfUlPJ82L245ybMLgwqIu4g.mp4"
      /> */}

     
      {/* <VideoSection
        videoUrl="your-second-video.mp4"
        title="Second Section"
        description="Description for second section"
        alignment="left"
      /> */}

      <Contact />
      <Footer/>
      {/* <LandingPage /> */}

     
    </main>
  );
}