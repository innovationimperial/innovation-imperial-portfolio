
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Play, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  avatar: string;
  quote: string;
  rating: number;
  video?: string;
}

const TestimonialSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Emma Thompson',
      company: 'TechGrowth Inc.',
      position: 'CTO',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: 'Innovation Imperial transformed our business with their custom CRM solution. The system was perfectly tailored to our needs and has significantly improved our customer management processes.',
      rating: 5,
      video: 'https://player.vimeo.com/progressive_redirect/playback/769025511/rendition/720p/file.mp4?loc=external',
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Edulearn',
      position: 'CEO',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'The LMS platform developed by Innovation Imperial has revolutionized how we deliver online courses. User engagement increased by 40% and the intuitive interface has received glowing feedback from students.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Sophia Rodriguez',
      company: 'FinanceTrack',
      position: 'CFO',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      quote: 'As a financial services company, accuracy and security are crucial. The accounting system created by Innovation Imperial exceeded our expectations in both areas, while providing a user-friendly interface.',
      rating: 4,
    },
    {
      id: 4,
      name: 'James Wilson',
      company: 'RetailGiant',
      position: 'E-Commerce Director',
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
      quote: 'Our e-commerce sales increased by 65% within three months of launching our new online store built by Innovation Imperial. Their attention to UX design and performance optimization was exceptional.',
      rating: 5,
      video: 'https://player.vimeo.com/progressive_redirect/playback/769025511/rendition/720p/file.mp4?loc=external',
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 8000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) {
      stopAutoplay();
      startAutoplay();
    }
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className="section-container overflow-hidden">
      <div className="text-center mb-16">
        <span className="inline-block text-sm font-medium px-4 py-1.5 rounded-full bg-imperial-purple/10 text-imperial-deepPurple mb-4">
          Client Testimonials
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">
          What Our <span className="text-gradient">Clients Say</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Read what our clients have to say about their experience working with Innovation Imperial.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Main testimonial card */}
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          {/* Background quote icon */}
          <div className="absolute -right-16 -bottom-16 text-imperial-purple/5">
            <Quote size={200} />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            {/* Left side with client info */}
            <div className="md:col-span-2 flex flex-col items-center md:items-start">
              {currentTestimonial.video ? (
                <div className="relative w-full aspect-square max-w-xs rounded-2xl overflow-hidden shadow-xl mb-6">
                  <video 
                    ref={videoRef}
                    src={currentTestimonial.video} 
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />
                  
                  {!isPlaying && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                      onClick={toggleVideo}
                    >
                      <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <Play className="text-imperial-purple ml-1" size={24} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 animate-float">
                  <img 
                    src={currentTestimonial.avatar} 
                    alt={currentTestimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-gray-800 text-center md:text-left">
                {currentTestimonial.name}
              </h3>
              
              <p className="text-imperial-purple font-medium text-center md:text-left">
                {currentTestimonial.position}, {currentTestimonial.company}
              </p>
              
              <div className="flex mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < currentTestimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} 
                  />
                ))}
              </div>
            </div>
            
            {/* Right side with quote */}
            <div className="md:col-span-3 relative">
              <blockquote className="text-lg md:text-xl text-gray-700 italic md:pl-6 md:border-l-2 md:border-imperial-purple/30 animate-fade-in">
                "{currentTestimonial.quote}"
              </blockquote>
            </div>
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full bg-white shadow-md hover:bg-imperial-purple hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-imperial-purple w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="p-2 rounded-full bg-white shadow-md hover:bg-imperial-purple hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      {/* Client logos */}
      <div className="mt-24">
        <h3 className="text-center text-lg font-medium text-gray-500 mb-8">
          Trusted by leading companies
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
          {['Google', 'Microsoft', 'Amazon', 'IBM', 'Oracle'].map((company) => (
            <div key={company} className="text-2xl font-bold text-gray-400">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
