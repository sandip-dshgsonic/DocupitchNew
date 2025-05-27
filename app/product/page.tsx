"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { BarChart2, Clock, Eye, FileText, Target, Zap } from "lucide-react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import MouseTrail from "../components/animations/MouseTrail";

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    tabs: false,
    benefits: false,
    cta: false,
  });
  
  // Add dark mode state
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

    const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  // Animation on scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Type assertion to HTMLElement which has dataset property
            const element = entry.target as HTMLElement;
            const section = element.dataset.section;

            if (section) {
              setIsVisible((prev) => ({
                ...prev,
                [section]: true,
              }));
            }
          }
        });
      },
      { threshold: 0.1 },
    );

    // Observe all sections
    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    // Check for dark mode on initial load
    // const isDarkMode =
    //   localStorage.getItem("darkMode") === "true" ||
    //   (!("darkMode" in localStorage) &&
    //     window.matchMedia("(prefers-color-scheme: dark)").matches);
    // setDarkMode(isDarkMode);
    
    // Set up listener for dark mode changes in localStorage
    // const handleStorageChange = (e: StorageEvent) => {
    //   if (e.key === "darkMode") {
    //     setDarkMode(e.newValue === "true");
    //   }
    // };
    
    // window.addEventListener("storage", handleStorageChange);

    // return () => {
    //   sections.forEach((section) => observer.unobserve(section));
    //   window.removeEventListener("storage", handleStorageChange);
    // };
  }, []);

  // Watch for dark mode changes and sync with document
  // useEffect(() => {
  //   if (darkMode !== null) {
  //     document.documentElement.classList.toggle("dark", darkMode);
  //   }
  // }, [darkMode]);

  const features = [
    {
      icon: FileText,
      title: "Pitch Deck Optimization",
      description:
        "AI-powered insights to refine and improve your pitch deck's design and content.",
    },
    {
      icon: BarChart2,
      title: "Investor Engagement Tracking",
      description:
        "Detailed analytics on how investors interact with your pitch deck.",
    },
    {
      icon: Eye,
      title: "Viewer Insights",
      description:
        "Real-time tracking of who views your deck, when, and for how long.",
    },
    {
      icon: Target,
      title: "Targeted Sharing",
      description:
        "Create custom viewing links for different investor groups and track individual interactions.",
    },
  ];

  const productTabs = [
    {
      id: "overview",
      title: "How It Works",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Pitch Deck Sharing Reimagined
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1. Upload Deck",
                description:
                  "Easily upload your pitch deck with our intuitive interface.",
                icon: FileText,
              },
              {
                step: "2. Generate Insights Link",
                description:
                  "Create a smart, trackable sharing link for investors.",
                icon: Zap,
              },
              {
                step: "3. Track Performance",
                description:
                  "Gain real-time insights into investor engagement and interest.",
                icon: BarChart2,
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className={`transform rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-6 text-center transition-all duration-500 ${
                  isVisible.tabs
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mx-auto mb-4 text-orange-500">
                  {React.createElement(item.icon, {
                    size: 40,
                    className: "animate-bounce-subtle",
                  })}
                </div>
                <h3 className="mb-2 text-lg font-semibold dark:text-white">{item.step}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "tracking",
      title: "Investor Tracking",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Advanced Pitch Deck Intelligence
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Transform how you share and understand investor interactions with
            your pitch deck.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Clock,
                title: "Engagement Timing",
                description:
                  "See exactly how long investors spend on each slide, identifying areas of highest interest.",
              },
              {
                icon: Eye,
                title: "Viewer Demographics",
                description:
                  "Gain insights into the type of investors viewing your deck, including company and role.",
              },
            ].map((trackingFeature, index) => (
              <div
                key={trackingFeature.title}
                className={`flex transform items-center space-x-4 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-6 transition-all duration-500 ${
                  isVisible.tabs
                    ? "translate-x-0 opacity-100"
                    : index % 2 === 0
                      ? "-translate-x-20 opacity-0"
                      : "translate-x-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-orange-500">
                  {React.createElement(trackingFeature.icon, {
                    size: 40,
                    className: "animate-pulse-slow",
                  })}
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    {trackingFeature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {trackingFeature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes scale {
          0% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fadeUp {
          animation: fadeUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-scale {
          animation: scale 0.5s ease-out forwards;
        }

        .animate-delay-100 {
          animation-delay: 100ms;
        }

        .animate-delay-200 {
          animation-delay: 200ms;
        }

        .animate-delay-300 {
          animation-delay: 300ms;
        }

        .animate-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        <Header />
        <MouseTrail />
        {/* Hero Section */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" data-section="hero">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <div
              className={`mb-4 inline-block transform rounded-full bg-orange-100 px-3 py-1 transition-all duration-700 ${
                isVisible.hero ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            ></div>
            <h1
              className={`mb-4 transform text-4xl font-bold transition-all duration-700 md:text-5xl ${
                isVisible.hero
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <span className="text-orange-500">DocuPitch</span>: Smart Pitch
              Deck Sharing
            </h1>
            <p
              className={`mx-auto mb-8 max-w-2xl transform text-lg text-gray-600 dark:text-gray-300 transition-all duration-700 ${
                isVisible.hero
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              Purpose-built for startups and investors. Transform how you share
              pitch decks with advanced tracking, insights, and optimization
              tools that turn presentations into opportunities.
            </p>
            <div
              className={`flex transform justify-center space-x-4 transition-all duration-700 ${
                isVisible.hero
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <button onClick={handleLoginRedirect} className="transform rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-orange-600">
                Speed Up Fundraising
              </button>
             
            </div>
          </div>
        </div>
        {/* Features Section */}
        <div
          className="mx-auto max-w-7xl bg-gray-50 dark:bg-gray-900 px-4 py-16 sm:px-6 lg:px-8"
          data-section="features"
        >
          <div className="mb-12 text-center">
            <h2
              className={`mb-4 transform text-3xl font-bold text-gray-800 dark:text-white transition-all duration-700 ${
                isVisible.features
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Elevate Your Pitch Deck Strategy
            </h2>
            <p
              className={`mx-auto max-w-2xl transform text-lg text-gray-600 dark:text-gray-300 transition-all duration-700 ${
                isVisible.features
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              DocuPitch provides startups and investors with unprecedented
              insights and control over pitch deck sharing.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`transform rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-center shadow-sm transition-all duration-500 hover:shadow-md ${
                  isVisible.features
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mx-auto mb-4 text-orange-500">
                  {React.createElement(feature.icon, {
                    size: 40,
                    className:
                      "transform transition-all duration-300 group-hover:scale-110",
                  })}
                </div>
                <h3 className="mb-2 text-lg font-semibold dark:text-white">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Product Tabs */}
        <div
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
          data-section="tabs"
        >
          <div className="mb-12 flex justify-center">
            <div
              className={`inline-flex transform rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all duration-700 ${
                isVisible.tabs
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {productTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-orange-500 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`transform rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-sm transition-all duration-500 ${
              isVisible.tabs ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {productTabs.find((tab) => tab.id === activeTab)?.content}
          </div>
        </div>
        {/* Startup & Investor Benefits - Simple Mobile Version */}
        <div className="bg-white dark:bg-gray-800 py-16" data-section="benefits">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
                Designed for Startup Success
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                DocuPitch bridges the gap between startups and investors with
                intelligent pitch deck sharing.
              </p>
            </div>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-6">
                <h3 className="mb-4 text-xl font-bold text-orange-500">
                  For Startups
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {[
                    "Create compelling, data-driven pitch decks",
                    "Track investor interest in real-time",
                    "Understand which slides resonate most",
                    "Optimize pitches based on actual engagement",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-6">
                <h3 className="mb-4 text-xl font-bold text-orange-500">
                  For Investors
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {[
                    "Effortless pitch deck review",
                    "Detailed insights into startup presentations",
                    "Compare and evaluate multiple pitches",
                    "Make data-informed investment decisions",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2 text-green-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Call to Action */}
        <div className="bg-orange-500 text-white" data-section="cta">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2
              className={`mb-4 transform text-3xl font-bold transition-all duration-700 ${
                isVisible.cta
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Transform Your Pitch Deck Strategy
            </h2>
            <p
              className={`mb-8 transform text-lg text-white text-opacity-90 transition-all duration-700 ${
                isVisible.cta
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Join innovative startups and forward-thinking investors who are
              revolutionizing pitch communications.
            </p>
            <div
              className={`flex transform justify-center space-x-4 transition-all duration-700 ${
                isVisible.cta
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <button onClick={handleLoginRedirect} className="transform rounded-lg bg-white px-6 py-3 text-sm font-medium text-orange-500 shadow transition-all duration-300 hover:scale-105 hover:bg-gray-100">
                 Speed Up Fundraising
              </button>
             
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
}