'use client'

import React from 'react';
import { Heart, Mail, Phone, MapPin, Github, Twitter, Linkedin, ArrowUpRight, Sparkles, Building2 } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'ECG Analysis', href: '#analysis', description: 'AI-powered diagnostics' },
        { name: 'Features', href: '#features', description: 'Complete feature set' },
        { name: 'Pricing', href: '#pricing', description: 'Flexible plans' },
        { name: 'API Documentation', href: '#api', description: 'Developer resources' }
      ]
    },
    {
      title: 'Research',
      links: [
        { name: 'Published Papers', href: '#papers', description: 'Scientific publications' },
        { name: 'Clinical Studies', href: '#studies', description: 'Research findings' },
        { name: 'Research Network', href: '#network', description: 'Collaboration hub' },
        { name: 'Collaboration', href: '#collaborate', description: 'Partner with us' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#help', description: 'Get assistance' },
        { name: 'Contact Us', href: '#contact', description: 'Reach our team' },
        { name: 'System Status', href: '#status', description: 'Service health' },
        { name: 'Privacy Policy', href: '#privacy', description: 'Data protection' }
      ]
    },
    {
      title: 'Company',
      links: [
        { 
          name: 'About ARPI', 
          href: '#about-arpi-section', 
          description: 'Our mission',
          onClick: () => scrollToSection('about-arpi-section')
        },
        { name: 'Careers', href: '#careers', description: 'Join our team' },
        { name: 'Press Kit', href: '#press', description: 'Media resources' },
        { name: 'Blog', href: 'https://ecgbuddy.tistory.com', description: 'Latest insights', external: true }
      ]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 63, 74, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section - Updated to ARPI Inc. */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-500/25 group-hover:shadow-slate-500/40 transition-all duration-300 group-hover:scale-110">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-2xl opacity-20 blur group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <span className="text-3xl font-bold text-white">ARPI Inc.</span>
            </div>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-md">
              Empowering healthcare professionals with AI-driven ECG analysis 
              for better patient outcomes and streamlined cardiac care.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: Mail, text: 'contact@ecgbuddy.ai', href: 'mailto:contact@ecgbuddy.ai' },
                { icon: Phone, text: '+82 (0)2-1234-5678', href: 'tel:+82212345678' },
                { icon: MapPin, text: 'Seoul, South Korea', href: '#location' }
              ].map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-slate-400 hover:text-red-400 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all duration-300">
                    <contact.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{contact.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-bold text-lg mb-8 flex items-center">
                {section.title}
                <Sparkles className="w-4 h-4 ml-2 text-red-400 opacity-60" />
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="group flex items-start justify-between text-slate-400 hover:text-red-400 transition-all duration-300 w-full text-left"
                      >
                        <div>
                          <div className="font-medium mb-1 flex items-center">
                            {link.name}
                            {link.external && <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" />}
                          </div>
                          <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                            {link.description}
                          </div>
                        </div>
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="group flex items-start justify-between text-slate-400 hover:text-red-400 transition-all duration-300"
                      >
                        <div>
                          <div className="font-medium mb-1 flex items-center">
                            {link.name}
                            {link.external && <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" />}
                          </div>
                          <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                            {link.description}
                          </div>
                        </div>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-700/50">
          <div className="text-slate-400 mb-6 md:mb-0 text-center md:text-left">
            <div className="font-medium">© 2024 ARPI Inc. All rights reserved.</div>
            <div className="text-sm text-slate-500 mt-1">ECG Buddy is a product of ARPI Inc.</div>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {[
              { icon: Twitter, href: '#twitter', label: 'Twitter' },
              { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
              { icon: Github, href: '#github', label: 'GitHub' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="group w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300 hover:scale-110"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;