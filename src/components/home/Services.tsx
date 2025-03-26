
import React from 'react';
import AnimatedCard from '../shared/AnimatedCard';
import { Monitor, Database, Users, ShoppingCart, BookOpen, BrainCircuit, BarChartBig } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  imageSrc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay, imageSrc }) => {
  return (
    <AnimatedCard 
      className="glass-card hover:shadow-2xl transition-all duration-500 group h-full overflow-hidden" 
      delay={delay}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="relative w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-imperial-purple to-imperial-deepPurple flex items-center justify-center text-white transform transition-transform duration-500 group-hover:scale-110">
          {icon}
          <div className="absolute inset-0 bg-imperial-purple rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </AnimatedCard>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <Monitor size={28} />,
      title: 'Web Development',
      description: 'Custom websites with responsive design and exceptional user experience.',
      imageSrc: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <Database size={28} />,
      title: 'CRM Systems',
      description: 'Tailored customer relationship management solutions to drive business growth.',
      imageSrc: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <Users size={28} />,
      title: 'HR Systems',
      description: 'Comprehensive human resource management to streamline operations.',
      imageSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <BarChartBig size={28} />,
      title: 'Accounting Systems',
      description: 'Accurate financial tracking and reporting systems for businesses.',
      imageSrc: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <BookOpen size={28} />,
      title: 'LMS Systems',
      description: 'Learning management solutions with interactive features for education.',
      imageSrc: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <Database size={28} />,
      title: 'Loan Management',
      description: 'Secure and efficient loan processing and management systems.',
      imageSrc: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <ShoppingCart size={28} />,
      title: 'E-Commerce',
      description: 'Powerful online stores with seamless shopping experiences.',
      imageSrc: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <BrainCircuit size={28} />,
      title: 'AI Solutions',
      description: 'Intelligent systems leveraging machine learning and neural networks.',
      imageSrc: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
  ];

  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <span className="inline-block text-sm font-medium px-4 py-1.5 rounded-full bg-imperial-purple/10 text-imperial-deepPurple mb-4">
          Our Expertise
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">
          Comprehensive <span className="text-gradient">Solutions</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Our wide range of specialized services designed to elevate your business through innovative technology solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animation">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
            delay={index * 100}
            imageSrc={service.imageSrc}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
