import { motion } from 'framer-motion';
import { useClientAnimation } from '../../hooks/useClientAnimation';

interface BaseAnimationProps {
  children: React.ReactNode;
  initialStyle?: Record<string, any>;
  animateStyle?: Record<string, any>;
  className?: string;
}

export default function BaseAnimation({ 
  children, 
  initialStyle = {}, 
  animateStyle = {}, 
  className = '' 
}: BaseAnimationProps) {
  const { isMounted } = useClientAnimation();

  if (!isMounted) {
    return (
      <div className={className} style={initialStyle}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initialStyle}
      animate={animateStyle}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}