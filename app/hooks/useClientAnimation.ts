import { useState, useEffect } from 'react';

export function useClientAnimation() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return { isMounted };
}