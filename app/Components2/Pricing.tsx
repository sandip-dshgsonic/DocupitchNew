// 'use client';

// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import PricingCard from './pricing/PricingCard';
// import { plans } from '../data/plans';

// export default function Pricing() {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <section id="pricing" className="section-padding">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="heading-lg mb-4">Simple Pricing for Everyone</h2>
//         </div>

//         <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {plans.map((plan, index) => (
//             <PricingCard
//               key={plan.name}
//               plan={plan}
//               index={index}
//               inView={inView}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// Pricing.jsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PricingCard from './pricing/PricingCard';
import { plans } from '../data/plans';

export default function Pricing() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="pricing" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">Simple Pricing for Everyone</h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
