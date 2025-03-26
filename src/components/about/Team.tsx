
import React, { useState } from 'react';
import AnimatedCard from '../shared/AnimatedCard';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedCard 
      className="relative group h-full"
      delay={index * 100}
    >
      <div 
        className="relative h-full glass-card overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
          <p className="text-imperial-purple font-medium mb-3">{member.role}</p>
          
          <div 
            className={`overflow-hidden transition-all duration-500 ${
              isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
          </div>
          
          <div className="flex space-x-3 mt-3">
            {member.social.linkedin && (
              <a 
                href={member.social.linkedin}
                className="w-8 h-8 rounded-full bg-imperial-purple/10 flex items-center justify-center text-imperial-purple hover:bg-imperial-purple hover:text-white transition-colors duration-300"
              >
                <Linkedin size={16} />
              </a>
            )}
            {member.social.twitter && (
              <a 
                href={member.social.twitter}
                className="w-8 h-8 rounded-full bg-imperial-purple/10 flex items-center justify-center text-imperial-purple hover:bg-imperial-purple hover:text-white transition-colors duration-300"
              >
                <Twitter size={16} />
              </a>
            )}
            {member.social.email && (
              <a 
                href={`mailto:${member.social.email}`}
                className="w-8 h-8 rounded-full bg-imperial-purple/10 flex items-center justify-center text-imperial-purple hover:bg-imperial-purple hover:text-white transition-colors duration-300"
              >
                <Mail size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Alex Morgan',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      bio: 'Tech visionary with 15+ years of experience in software development and business strategy.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'alex@innovationimperial.com',
      },
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      bio: 'Expert in AI and machine learning with a passion for creating cutting-edge solutions.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sarah@innovationimperial.com',
      },
    },
    {
      name: 'David Rodriguez',
      role: 'Head of Web Development',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
      bio: 'Frontend specialist who creates beautiful, responsive, and accessible web experiences.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'david@innovationimperial.com',
      },
    },
    {
      name: 'Priya Sharma',
      role: 'Lead Systems Architect',
      image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56',
      bio: 'Systems design expert specializing in enterprise-grade solutions and infrastructure.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'priya@innovationimperial.com',
      },
    },
  ];

  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <span className="inline-block text-sm font-medium px-4 py-1.5 rounded-full bg-imperial-purple/10 text-imperial-deepPurple mb-4">
          Our Team
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">
          Meet the <span className="text-gradient">Innovators</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Our diverse team of experts brings together unique skills, experiences, and perspectives 
          to create exceptional solutions for our clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={member.name} member={member} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Team;
