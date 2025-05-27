'use client';

import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

export default function AnimatedCounter({ value, suffix = '' }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [value]);

  return <span>{displayValue}{suffix}</span>;
}