import { useState, useEffect } from 'react';

export function useAnimationConfig() {
  const [isMounted, setIsMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsMounted(true);
    
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleMotionPreference = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMotionPreference);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return {
    isMounted,
    isReducedMotion,
    windowSize,
    // Common animation configuration
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  };
}