'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import FallbackAnimation from './FallbackAnimation';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <FallbackAnimation />
});

interface LottieWrapperProps {
  animationPath: string;
  className?: string;
  loop?: boolean;
}

export default function LottieWrapper({
  animationPath,
  className = '',
  loop = true
}: LottieWrapperProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch(animationPath);
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.statusText}`);
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        console.error('Failed to load animation:', err);
        setError(err as Error);
      }
    };

    loadAnimation();
  }, [animationPath]);

  if (error || !animationData) {
    return <FallbackAnimation className={className} />;
  }

  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        className="w-full h-full"
        // onError={(err) => {
        //   console.error('Lottie animation error:', err);
        //   setError(err);
        // }}
        // by aniket
        onError={(err) => {
          console.error("Lottie animation error:", err);
          setError(err as unknown as Error);
        }}
        
        // by aniket
      />
    </div>
  );
}