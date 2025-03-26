
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-imperial-purple to-imperial-blue bg-clip-text text-transparent">
              Innovation Imperial
            </h3>
            <p className="text-gray-600 max-w-xs">
              Specializing in developing websites, CRM, HR systems, accounting systems, 
              LMS, loan management systems, e-commerce stores, and AI solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-imperial-blue hover:text-imperial-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-imperial-blue hover:text-imperial-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-imperial-blue hover:text-imperial-purple transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-imperial-blue hover:text-imperial-purple transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-imperial-blue">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-gray-600 hover:text-imperial-blue transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-imperial-blue">Our Services</h4>
            <ul className="space-y-2">
              {['Web Development', 'CRM Systems', 'HR Systems', 'E-commerce', 'AI Solutions', 'Accounting Systems'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-imperial-blue transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-imperial-blue">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 text-imperial-blue" size={20} />
                <span className="text-gray-600">123 Innovation Street, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-imperial-blue" size={20} />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-imperial-blue" size={20} />
                <span className="text-gray-600">contact@innovationimperial.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Innovation Imperial. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-gray-500 hover:text-imperial-blue text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-imperial-blue text-sm">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-imperial-blue text-sm">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Royal Blue Bottom Bar */}
      <div className="mt-8 py-4 bg-imperial-blue">
        <div className="container mx-auto px-4">
          <div className="text-center text-white text-sm">
            Designed with ❤️ by Innovation Imperial
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
