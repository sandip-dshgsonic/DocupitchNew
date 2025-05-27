'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FallbackAnimation from './FallbackAnimation';

const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <FallbackAnimation />
});

interface SafeLottieAnimationProps {
  animationData: any;
  className?: string;
  loop?: boolean;
}

export default function SafeLottieAnimation({
  animationData,
  className = '',
  loop = true
}: SafeLottieAnimationProps) {
  const [error, setError] = useState<Error | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return <FallbackAnimation className={className} />;
  }

  if (error) {
    console.error('Lottie animation error:', error);
    return <FallbackAnimation className={className} />;
  }

  try {
    return (
      <div className={`relative ${className}`}>
        <Lottie
          animationData={animationData}
          loop={loop}
          className="w-full h-full"
          onError={(err) => err as unknown as Error}
        />
      </div>
    );
  } catch (err) {
    console.error('Lottie animation error:', err);
    return <FallbackAnimation className={className} />;
  }
}