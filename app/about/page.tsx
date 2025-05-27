"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import AnimatedCounter from "../components/animations/AnimatedCounter";
import AnimatedGradientBorder from "../components/animations/AnimatedGradientBorder";
import FloatingElements from "../components/animations/FloatingElements";
import GradientBlob from "../components/animations/GradientBlob";
import InteractiveBackground from "../components/animations/InteractiveBackground";
import LottieWrapper from "../components/animations/LottieWrapper";
import MouseSpotlight from "../components/animations/MouseSpotlight";
import MouseTrail from "../components/animations/MouseTrail";
import ParallaxScroll from "../components/animations/ParallaxScroll";
import ScrollProgress from "../components/animations/ScrollProgress";
import TextReveal from "../components/animations/TextReveal";

export default function AboutPage() {
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const founderInfo = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      image: "/api/placeholder/120/120",
    },
    {
      name: "Emma Ross",
      role: "Co-Founder & CTO",
      image: "/api/placeholder/120/120",
    },
  ];

  const startupValues = [
    {
      icon: "1",
      title: "Innovation First",
      description:
        "Introducing AI Support into the fundraising process for founders to Innovate",
    },
    {
      icon: "2",
      title: "Speed to Value",
      description:
        "Enabling founders to analyze the investors deck view time empowers founders to sharpen their pitch, double down on what resonates, and address what’s unclear ",
    },
    {
      icon: "3",
      title: "User-Centric",
      description: "Building features that resonate with the future of fundraising which is Agentic in nature",
    },
    {
      icon: "4",
      title: "Excellence",
      description: "Come across as company which excels in every facet of your execution - even in fundraising and pitch deck interaction.",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      <ScrollProgress />
      <div className="bg-[#F9FAFB] px-4 pb-20 pt-20 dark:bg-gray-900 sm:px-6 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 text-center"
        >
          <h1
            className="mb-6 text-4xl font-bold dark:text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: "PP Pangaia" }}
          >
            <span className="relative text-[#F97316]">
              About
              <span className="absolute bottom-0 left-0 mt-2 h-1 w-full bg-[#F9731666]"></span>
            </span>{" "}
            Docu
            <span className="text-[#F97316]">Pitch</span>
          </h1>

          <p
            className="mx-auto mt-4 max-w-screen-md text-xl text-[#4B5563] dark:text-gray-300 sm:text-2xl"
            style={{ fontFamily: "SF Pro Display" }}
          >
            We are creating the future of fundraising for all startup founders
            combining AI PitchDeck Copilot with curated investor interaction.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mx-auto mb-16 grid max-w-screen-lg grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-0 lg:grid-cols-4"
        >
          {[
            { value: 130, label: "Pitches Created", suffix: "+" },
            { value: 26, label: "Startup Success Stories", suffix: "+" },
            { value: 92, label: "Pitch Success Rate", suffix: "%" },
            { value: 7, label: "Industries Served", suffix: "+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border border-[#F3F4F6] bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-2 text-3xl font-bold text-[#F97316] sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Company Snapshot Section */}
      <div className="bg-white px-4 py-16 dark:bg-gray-900 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2
              className="mb-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
              style={{ fontFamily: "PP Pangaia" }}
            >
              Our Story
            </h2>
            <p
              className="mb-8 max-w-lg text-lg text-gray-600 dark:text-gray-300 sm:mb-10 sm:text-xl"
              style={{ fontFamily: "SF Pro Display Light" }}
            >
                In early 2024, we watched pitch decks vanish into inboxes—never
                opened, never replied to. As part of an accelerator cohort, we saw
                firsthand how even the most promising startups struggled to get
                meaningful investor engagement. Founders were pouring hours into
                beautifully designed PDFs, only to be met with silence.
                That’s why we built DocuPitch—an AI-native platform that doesn’t
                just create customizable links based on investors, but
                transforms them into interactive, trackable experiences
                investors actually engage with. No more guessing who opened what
                or wondering what happened after the pitch. With DocuPitch, you
                get real-time analytics, warm follow-up suggestions,
                investor-specific insights, and a smarter path to funding
                conversations. We’re not just replacing DocuSign—we’re fixing
                the broken pitch process.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#F97316]">2024</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Founded</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#F97316]">100K</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Funds Raised
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#F97316]">3+</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Team Members
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center lg:mt-0">
            <img
              src="images/about-pra.png"
              alt="Team working together"
              className="w-full max-w-sm rounded-3xl lg:max-w-md"
            />
          </div>
        </div>
      </div>
{/* Mission & Vision Section - Fixed equal height */}
<div className="bg-[#F9FAFB] px-4 py-20 dark:bg-gray-800 sm:px-6">
  <div
    ref={missionRef}
    className="mx-auto grid max-w-screen-lg grid-cols-1 gap-12 lg:grid-cols-2 items-stretch"
  >
    <ParallaxScroll>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={missionInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="h-full space-y-6 rounded-2xl border bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        <h2
          className="text-3xl font-bold text-gray-900 dark:text-white"
          style={{ fontFamily: "PP Pangaia" }}
        >
          Our Mission
        </h2>
        <p
          className="text-xl leading-relaxed text-gray-600 dark:text-gray-300"
          style={{ fontFamily: "SF Pro Display Light" }}
        >
          At DocuPitch, our mission is to transform the way startups communicate with investors—by making pitch decks smarter, stories sharper, and engagement measurable. 
        </p>
      </motion.div>
    </ParallaxScroll>

    <ParallaxScroll>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={missionInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-full space-y-6 rounded-2xl border bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        <h2
          className="text-3xl font-bold text-gray-900 dark:text-white"
          style={{ fontFamily: "PP Pangaia" }}
        >
          Our Vision
        </h2>
        <p
          className="text-xl leading-relaxed text-gray-600 dark:text-gray-300"
          style={{ fontFamily: "SF Pro Display Light" }}
        >
          We are building the future of fundraising: an intelligent, AI-native command center where storytelling, investor engagement, and deal execution converge to guide founders from first pitch to final close. 
        </p>
      </motion.div>
    </ParallaxScroll>
  </div>
</div>


      {/* Values Section - Modified to ensure no gap with Mission section */}
      <div className="bg-[#F9FAFB] px-4 pb-20 dark:bg-gray-800 sm:px-6">
        <motion.div ref={valuesRef}>
          <p
            className="mb-9 pt-16 text-center text-5xl font-bold text-[#F97316] sm:text-7xl md:text-9xl"
            style={{ fontFamily: "PP Pangaia" }}
          >
            Our Values
          </p>
          <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-6 py-16 sm:grid-cols-2">
            {startupValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-[8px] border border-[#999999] bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex flex-col items-start space-y-3">
                  <div className="rounded-md bg-[#FFEDD5] p-3 text-3xl font-bold text-[#F97316]">
                    {value.icon}
                  </div>
                  <h2
                    className="text-2xl font-semibold text-gray-900 dark:text-white"
                    style={{ fontFamily: "PP Pangaia" }}
                  >
                    {value.title}
                  </h2>
                  <p
                    className="text-xl text-gray-600 dark:text-gray-300"
                    style={{ fontFamily: "SF Pro Display Light" }}
                  >
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
