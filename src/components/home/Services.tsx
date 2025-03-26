
import React from 'react';
import AnimatedCard from '../shared/AnimatedCard';
import { Monitor, Database, Users, ShoppingCart, BookOpen, BrainCircuit, BarChartBig } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
  return (
    <AnimatedCard 
      className="glass-card p-6 hover:shadow-2xl transition-all duration-500 group h-full" 
      delay={delay}
    >
      <div className="relative w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-imperial-purple to-imperial-deepPurple flex items-center justify-center text-white transform transition-transform duration-500 group-hover:scale-110">
        {icon}
        <div className="absolute inset-0 bg-imperial-purple rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </AnimatedCard>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <Monitor size={28} />,
      title: 'Web Development',
      description: 'Custom websites with responsive design and exceptional user experience.',
    },
    {
      icon: <Database size={28} />,
      title: 'CRM Systems',
      description: 'Tailored customer relationship management solutions to drive business growth.',
    },
    {
      icon: <Users size={28} />,
      title: 'HR Systems',
      description: 'Comprehensive human resource management to streamline operations.',
    },
    {
      icon: <BarChartBig size={28} />,
      title: 'Accounting Systems',
      description: 'Accurate financial tracking and reporting systems for businesses.',
    },
    {
      icon: <BookOpen size={28} />,
      title: 'LMS Systems',
      description: 'Learning management solutions with interactive features for education.',
    },
    {
      icon: <Database size={28} />,
      title: 'Loan Management',
      description: 'Secure and efficient loan processing and management systems.',
    },
    {
      icon: <ShoppingCart size={28} />,
      title: 'E-Commerce',
      description: 'Powerful online stores with seamless shopping experiences.',
    },
    {
      icon: <BrainCircuit size={28} />,
      title: 'AI Solutions',
      description: 'Intelligent systems leveraging machine learning and neural networks.',
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
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
