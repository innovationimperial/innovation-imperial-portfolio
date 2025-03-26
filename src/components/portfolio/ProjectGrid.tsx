
import React, { useState, useRef, useEffect } from 'react';
import AnimatedCard from '../shared/AnimatedCard';
import { ExternalLink, Play, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  video?: string;
  description: string;
  technologies: string[];
  url?: string;
}

interface ModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        ref={modalRef}
        className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:text-imperial-purple transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {project.video ? (
          <div className="aspect-video relative">
            <video 
              src={project.video} 
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
            />
          </div>
        ) : (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full aspect-video object-cover object-center"
          />
        )}

        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
              <p className="text-imperial-purple">{project.category}</p>
            </div>
            {project.url && (
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-imperial-purple hover:text-imperial-deepPurple"
              >
                <span>Visit</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          <p className="text-gray-600 mb-6">{project.description}</p>

          <div className="mb-4">
            <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; onClick: () => void; delay: number }> = ({ 
  project, 
  onClick,
  delay 
}) => {
  return (
    <AnimatedCard delay={delay} className="group cursor-pointer">
      <div 
        className="relative overflow-hidden rounded-xl shadow-md h-full glass-card"
        onClick={onClick}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-imperial-deepPurple/70 via-imperial-deepPurple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {project.video && (
              <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Play className="text-imperial-purple ml-1" size={24} />
              </div>
            )}
          </div>
          
          {/* Category tag */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-imperial-deepPurple text-xs font-medium">
            {project.category}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-imperial-purple transition-colors mb-2">
            {project.title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech} 
                className="px-2 py-0.5 bg-imperial-purple/10 text-imperial-purple text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </AnimatedCard>
  );
};

const ProjectGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Enterprise CRM Solution',
      category: 'CRM Systems',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      description: 'A comprehensive customer relationship management system for a multinational corporation, featuring advanced analytics, automation, and customer journey tracking.',
      technologies: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'AWS'],
      url: '#',
    },
    {
      id: 2,
      title: 'E-Learning Platform',
      category: 'LMS Systems',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
      video: 'https://player.vimeo.com/progressive_redirect/playback/769025511/rendition/720p/file.mp4?loc=external',
      description: 'An interactive learning management system for universities, supporting video courses, quizzes, assignments, and student progress tracking.',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebRTC', 'Docker'],
    },
    {
      id: 3,
      title: 'Financial Dashboard',
      category: 'Accounting Systems',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      description: 'Real-time financial tracking and reporting system for SMEs, with invoice generation, expense tracking, and tax calculation features.',
      technologies: ['Angular', 'Python', 'Django', 'PostgreSQL', 'Chart.js'],
      url: '#',
    },
    {
      id: 4,
      title: 'HR Management Suite',
      category: 'HR Systems',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
      description: 'Complete human resources platform with employee records, performance reviews, leave management, and payroll processing.',
      technologies: ['React', 'Express.js', 'MongoDB', 'Redux', 'Azure'],
    },
    {
      id: 5,
      title: 'AI-Powered Recommender',
      category: 'AI Solutions',
      image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a',
      video: 'https://player.vimeo.com/progressive_redirect/playback/769025511/rendition/720p/file.mp4?loc=external',
      description: 'Machine learning recommendation engine for an e-commerce platform, analyzing user behavior to provide personalized product suggestions.',
      technologies: ['Python', 'TensorFlow', 'Flask', 'React', 'AWS'],
      url: '#',
    },
    {
      id: 6,
      title: 'Corporate Website',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      description: 'Modern, responsive website for a corporate client with custom CMS, blog, and interactive elements.',
      technologies: ['Next.js', 'Tailwind CSS', 'Contentful', 'Vercel'],
      url: '#',
    },
  ];

  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <span className="inline-block text-sm font-medium px-4 py-1.5 rounded-full bg-imperial-purple/10 text-imperial-deepPurple mb-4">
          Our Portfolio
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">
          Explore Our <span className="text-gradient">Projects</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Browse through our diverse collection of successful projects across various industries and technologies.
        </p>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === category 
                ? 'bg-imperial-purple text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
            delay={index * 100}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectGrid;
