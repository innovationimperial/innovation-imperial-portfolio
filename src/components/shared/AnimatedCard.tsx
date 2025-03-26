
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in';
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  className,
  children,
  delay = 0,
  animation = 'fade-in-up',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100');
              entry.target.classList.add(`animate-${animation}`);
              entry.target.classList.remove('opacity-0');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [animation, delay]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'opacity-0 transition-all duration-500 ease-out will-change-transform',
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
