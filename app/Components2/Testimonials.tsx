



'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';



// by aniket
interface Testimonial {
  name: string;
  photo: string;
  feedback: string;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 md:p-6">
      <div className="flex flex-row md:flex-col items-center md:text-center">
        <div className="flex-shrink-0 mr-4 md:mr-0">
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            className="rounded-full w-16 h-16 md:w-24 md:h-24 md:mx-auto md:mb-4"
          />
        </div>
        <div className="flex-grow md:text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {testimonial.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2 italic text-sm md:text-base">
            &quot;{testimonial.feedback}&quot;
          </p>
        </div>
      </div>
    </div>
  );
}

// by aniket

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after component mounts for animation
    setIsVisible(true);
  }, []);

  const testimonials = [
    {
      name: "Sarah Lee",
      photo: "/images/team-3.jpg",
      feedback: "The service was excellent, and I would highly recommend it!",
    },
    {
      name: "Jane Smith",
      photo: "/images/team-4.jpg",
      feedback: "Amazing experience, truly outstanding support!",
    },
    {
      name: "Emily Brown",
      photo: "/images/team-5.webp",
      feedback: "Loved the user-friendly design and prompt responses.",
    },
    {
      name: "Sam Wilson",
      photo: "/images/team-6.webp",
      feedback: "This platform is a game-changer. Highly satisfied!",
    },
    {
      name: "Michael Johnson",
      photo: "/images/team-5.webp",
      feedback: "Great customer service and fantastic results.",
    },
    {
      name: "John Doe",
      photo: "/images/team-7.webp",
      feedback: "I achieved my goals quickly with their help!",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-4 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Are Sayinga
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                x: isVisible ? 0 : (index % 2 === 0 ? -20 : 20) 
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
