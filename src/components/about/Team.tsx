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
        <div className="relative aspect-square overflow-hidden bg-imperial-purple/10">
          {/* Placeholder for when no image is provided */}
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-imperial-purple">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
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
          
          <div className="flex space-x-3">
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
      name: 'Ntsane Foulo',
      role: 'CEO & Founder',
      image: '',
      bio: 'Tech visionary with extensive experience in software development and business strategy.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'ntsane@innovationimperial.com',
      },
    },
    {
      name: 'Mcmarsh Dzwimbu',
      role: 'COO',
      image: '',
      bio: 'Operations expert specializing in business process optimization and team management.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mcmarsh@innovationimperial.com',
      },
    },
    {
      name: 'Enock Ndoy',
      role: 'CTO',
      image: '',
      bio: 'Expert in AI and machine learning with a passion for creating cutting-edge solutions.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'enock@innovationimperial.com',
      },
    }
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={member.name} member={member} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Team;
