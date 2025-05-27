// 'use client';

// export default function ContactInfo() {
//   return (
//     <div className="space-y-6">
//       <div className="aspect-w-16 aspect-h-9">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1631234567890!5m2!1sen!2sus"
//           className="w-full h-full rounded-lg"
//           loading="lazy"
//         />
//       </div>
//       <div>
//         <h3 className="text-xl font-semibold mb-2">Our Office</h3>
//         <p className="text-gray-600">
//           123 Innovation Street<br />
//           Tech District<br />
//           San Francisco, CA 94105
//         </p>
//       </div>
//     </div>
//   );
// }





'use client';

import { motion } from 'framer-motion';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const contactItems = [
  {
    icon: MapPinIcon,
    title: 'Visit Us',
    content: '123 Innovation Street, Tech District, San Francisco, CA 94105'
  },
  {
    icon: PhoneIcon,
    title: 'Call Us',
    content: '+1 (555) 123-4567'
  },
  {
    icon: EnvelopeIcon,
    title: 'Email Us',
    content: 'hello@docupitch.com'
  }
];

export default function ContactInfo() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {contactItems.map((item, index) => (
        <motion.div
          key={item.title}
          className="flex items-start space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        >
          <div className="flex-shrink-0">
            <item.icon className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="mt-8 aspect-w-16 aspect-h-9"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1631234567890!5m2!1sen!2sus"
          className="w-full h-full rounded-lg shadow-lg"
          loading="lazy"
        />
      </motion.div>
    </motion.div>
  );
}