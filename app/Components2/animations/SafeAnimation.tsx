'use client';

import { motion, MotionProps } from 'framer-motion';
import { useAnimationConfig } from '../../hooks/useAnimationConfig';

interface SafeAnimationProps extends Omit<MotionProps, 'transition'> {
  children: React.ReactNode;
  className?: string;
  fallbackStyle?: Record<string, any>;
  disableSSR?: boolean;
}

export default function SafeAnimation({ 
  children, 
  className = '', 
  fallbackStyle = {},
  disableSSR = false,
  initial,
  animate,
  ...props 
}: SafeAnimationProps) {
  const { isMounted, isReducedMotion, transition } = useAnimationConfig();

  // Return static version during SSR or when reduced motion is preferred
  if (!isMounted || isReducedMotion || (disableSSR && typeof window === 'undefined')) {
    return (
      <div className={className} style={fallbackStyle}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
}