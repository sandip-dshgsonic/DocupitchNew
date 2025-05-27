'use client';

import { motion, MotionProps } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SafeMotionProps extends MotionProps {
  children?: React.ReactNode;
  className?: string;
}

export default function SafeMotion({ children, className = '', ...props }: SafeMotionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}