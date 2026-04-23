'use client';

import { useRef, useEffect, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  /** Delay before transition starts, in milliseconds */
  delay?: number;
  /** Extra Tailwind classes applied to the wrapper div */
  className?: string;
}

/**
 * Wraps content in a div that fades in (opacity + slide-up) the first time
 * the element enters the viewport, using IntersectionObserver.
 */
export default function FadeInSection({
  children,
  delay = 0,
  className = '',
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // trigger once only
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
