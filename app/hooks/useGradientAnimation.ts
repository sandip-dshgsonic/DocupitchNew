import { useState, useEffect } from 'react';

export function useGradientAnimation() {
  const [isMounted, setIsMounted] = useState(false);
  const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
    
    // Reset gradient position on mount to ensure consistent initial state
    setGradientPosition({ x: 0, y: 0 });
  }, []);

  return { 
    isMounted,
    gradientPosition,
    setGradientPosition
  };
}