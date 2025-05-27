// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';

// type Theme = 'light' | 'dark';

// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const [theme, setTheme] = useState<Theme>('light');
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     // Check system preference
//     const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//     // Get saved theme or use system preference
//     const savedTheme = (localStorage.getItem('theme') as Theme) || systemTheme;
//     setTheme(savedTheme);
//     document.documentElement.classList.toggle('dark', savedTheme === 'dark');
//     setMounted(true);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.classList.toggle('dark');
//   };

//   // Prevent hydration mismatch
//   if (!mounted) {
//     return null;
//   }

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) throw new Error('useTheme must be used within ThemeProvider');
//   return context;
// };





'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Force light theme always
    setTheme('light');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // Optional: You can remove this function or keep it for future use
    // For now, it does nothing to maintain light theme
    console.log('Theme switching is disabled - staying in light mode');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};