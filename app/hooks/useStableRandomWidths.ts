'use client';

import { useMemo } from 'react';

// Deterministic random number generator with a fixed seed
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export function useStableRandomWidths(count: number, minWidth: number, maxWidth: number) {
  return useMemo(() => {
    const seed = 12345; // Fixed seed for consistent results
    return Array.from({ length: count }, (_, i) => {
      // Use both index and fixed seed for deterministic values
      const random = seededRandom(seed + i);
      return Math.floor(minWidth + random * (maxWidth - minWidth));
    });
  }, [count, minWidth, maxWidth]);
}