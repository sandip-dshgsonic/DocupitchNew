'use client';

interface GradientBorderBaseProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientBorderBase({ children, className = '' }: GradientBorderBaseProps) {
  return (
    <div className={`relative ${className}`}>
      <div 
        className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500"
        style={{ backgroundSize: '200% 200%', backgroundPosition: '0% 50%' }}
      />
      <div className="relative bg-white dark:bg-gray-900 rounded-lg p-[1px]">
        {children}
      </div>
    </div>
  );
}