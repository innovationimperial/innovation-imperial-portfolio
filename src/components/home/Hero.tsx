
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        const elements = parallaxRef.current.querySelectorAll('.parallax');
        
        elements.forEach((el) => {
          const element = el as HTMLElement;
          const speed = parseFloat(element.getAttribute('data-speed') || '0.1');
          element.style.transform = `translateY(${scrollY * speed}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 bg-hero-pattern"></div>
      
      {/* Purple blurred circles */}
      <div className="absolute -left-24 top-1/4 w-96 h-96 bg-imperial-purple/10 rounded-full blur-[80px]"></div>
      <div className="absolute -right-24 bottom-1/4 w-96 h-96 bg-imperial-deepPurple/20 rounded-full blur-[100px]"></div>
      
      {/* Geometric shapes */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
        <div className="parallax absolute top-1/4 right-[15%] w-40 h-40 border-4 border-imperial-purple/10 rounded-full" data-speed="-0.05"></div>
        <div className="parallax absolute bottom-1/3 left-[10%] w-16 h-16 bg-imperial-deepPurple/5 rounded-lg transform rotate-45" data-speed="0.1"></div>
        <div className="parallax absolute top-[35%] left-[20%] w-24 h-24 border-2 border-imperial-purple/10 rounded-xl" data-speed="0.08"></div>
        <div className="parallax absolute bottom-1/4 right-[30%] w-20 h-20 bg-imperial-purple/5 rounded-full" data-speed="-0.12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block overflow-hidden">
            <span className="inline-block animate-fade-in-up text-sm font-medium px-4 py-1.5 rounded-full bg-imperial-purple/10 text-imperial-deepPurple mb-4">
              Software Engineering Excellence
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Transforming Ideas Into <span className="text-gradient">Powerful Solutions</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-600 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            We specialize in developing cutting-edge websites, enterprise systems, and AI solutions
            tailored for modern businesses seeking technological excellence.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <Link to="/portfolio" className="btn-primary flex items-center">
              Explore Our Work
              <ArrowRight className="ml-2" size={18} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-imperial-purple flex items-start justify-center">
          <div className="w-1.5 h-3 bg-imperial-purple rounded-full mt-2 animate-fade-in-up"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
