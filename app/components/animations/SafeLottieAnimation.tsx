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
        {/* <Lottie
          animationData={animationData}
          loop={loop}
          className="w-full h-full"
          onError={(err) => setError(err)}
        /> */}
        {/* by aniket */}
        <Lottie
  animationData={animationData}
  loop={loop}
  className="w-full h-full"
  onError={(event) => {
    console.error("Lottie animation error:", event);

    // Ensure `event` is treated as an Error
    const errorInstance = event instanceof Error ? event : new Error("Lottie animation encountered an error");

    setError(errorInstance);
  }}
/>
{/* by aniket end */}
      </div>
    );
  } catch (err) {
    console.error('Lottie animation error:', err);
    return <FallbackAnimation className={className} />;
  }
}