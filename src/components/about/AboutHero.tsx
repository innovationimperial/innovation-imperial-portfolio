
import React from 'react';

const AboutHero: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
      
      {/* Purple blurred circle */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-imperial-purple/10 rounded-full blur-[80px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-left">
            <span className="inline-block text-sm font-medium px-4 py-1.5 rounded-full bg-imperial-purple/10 text-imperial-deepPurple mb-4">
              About Innovation Imperial
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              We Build <span className="text-gradient">Tomorrow's</span> Tech Solutions
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Innovation Imperial is a leading software engineering company specializing in developing cutting-edge solutions for businesses of all sizes. With a team of expert developers and a passion for innovation, we create custom software that drives business growth and operational excellence.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-imperial-purple mb-2">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-imperial-purple mb-2">200+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-imperial-purple mb-2">50+</div>
                <div className="text-gray-600">Team Members</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in-right">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Innovation Imperial team" 
                className="w-full h-auto"
                loading="lazy"
              />
              
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-imperial-deepPurple/40 to-transparent opacity-60"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-24 h-24 border-4 border-imperial-purple/30 rounded-xl z-0"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-imperial-purple/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
