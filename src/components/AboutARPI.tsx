import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Award, Target, ArrowRight, Sparkles, CheckCircle, Heart, Activity, Brain, Shield, Globe, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const AboutARPI = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Updated partners data with the 4 specific partners
  const partners = [
    {
      id: 'snubh',
      name: 'Seoul National University Bundang Hospital',
      type: 'Clinical Partner',
      description: 'Advanced cardiac care and AI integration research',
      year: '2023',
      projects: '15+ Studies',
      status: 'Active Partnership',
      logoUrl: null, // Will be added later
      logoFallback: '🏥'
    },
    {
      id: 'snuh',
      name: 'Seoul National University Hospital',
      type: 'Research Partner',
      description: 'AI algorithm development and clinical validation',
      year: '2022',
      projects: '20+ Projects',
      status: 'Active Partnership',
      logoUrl: null, // Will be added later
      logoFallback: '🏥'
    },
    {
      id: 'boramae',
      name: 'Seoul Metropolitan Boramae Hospital',
      type: 'Technology Partner',
      description: 'Real-world deployment and testing of ECG analysis systems',
      year: '2024',
      projects: '8+ Trials',
      status: 'Active Partnership',
      logoUrl: null, // Will be added later
      logoFallback: '🏥'
    },
    {
      id: 'ezcaretech',
      name: 'EZCaretech Inc.',
      type: 'Industry Partner',
      description: 'Healthcare technology integration and platform development',
      year: '2023',
      projects: '12+ Solutions',
      status: 'Active Partnership',
      logoUrl: null, // Will be added later
      logoFallback: '🏢'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % partners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused, partners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % partners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + partners.length) % partners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="about-arpi-section" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-slate-100/30 to-gray-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-gray-100/30 to-slate-100/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-8 shadow-sm">
            <Building2 className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">About ARPI Inc.</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="block text-slate-900 mb-2">
              Pioneering the future of
            </span>
            <span className="block bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              AI-powered healthcare
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Collaborating with premier healthcare institutions to advance medical AI and improve 
            patient outcomes worldwide
          </p>
        </motion.div>

        {/* Partners Carousel - UNIFORM GLASSY DESIGN */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Our Partners</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Working together with leading institutions to transform cardiac care through innovative AI solutions
            </p>
          </div>

          {/* Carousel Container */}
          <div 
            className="relative max-w-6xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main Carousel */}
            <div className="relative overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
                  {/* UNIFORM GLASSY CARD DESIGN */}
                  <div className="relative bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-12 shadow-[0_20px_70px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.12)] transition-all duration-700 group overflow-hidden">
                    {/* Glassy hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                    
                    <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                      {/* Logo Section */}
                      <div className="text-center lg:text-left">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl mb-6 shadow-lg">
                          {partners[currentSlide].logoUrl ? (
                            <img 
                              src={partners[currentSlide].logoUrl} 
                              alt={partners[currentSlide].name}
                              className="w-16 h-16 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling.style.display = 'block';
                              }}
                            />
                          ) : null}
                          <span 
                            className="text-4xl"
                            style={{ display: partners[currentSlide].logoUrl ? 'none' : 'block' }}
                          >
                            {partners[currentSlide].logoFallback}
                          </span>
                        </div>
                        
                        <div className="inline-flex items-center space-x-2 bg-slate-100/60 backdrop-blur-sm border border-slate-200/50 rounded-full px-4 py-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm font-medium text-slate-700">{partners[currentSlide].type}</span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="lg:col-span-2 text-center lg:text-left">
                        <h3 className="text-3xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors duration-300">
                          {partners[currentSlide].name}
                        </h3>
                        
                        <p className="text-slate-600 text-lg leading-relaxed mb-8 group-hover:text-slate-700 transition-colors duration-300">
                          {partners[currentSlide].description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-slate-800 mb-2">{partners[currentSlide].year}</div>
                            <div className="text-slate-500 text-sm">Partnership</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-slate-800 mb-2">{partners[currentSlide].projects}</div>
                            <div className="text-slate-500 text-sm">Active</div>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-center lg:justify-start space-x-2 text-green-600 bg-green-50/50 backdrop-blur-sm border border-green-200/50 rounded-full px-4 py-2 inline-flex">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">{partners[currentSlide].status}</span>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl flex items-center justify-center text-slate-600 hover:text-slate-800 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots Indicator */}
              <div className="flex items-center space-x-2">
                {partners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-slate-600 w-8' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl flex items-center justify-center text-slate-600 hover:text-slate-800 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          {[
            { icon: Users, label: 'Healthcare Partners', value: '4+', description: 'Leading institutions' },
            { icon: Award, label: 'Research Projects', value: '50+', description: 'Active collaborations' },
            { icon: Target, label: 'Clinical Trials', value: '25+', description: 'Ongoing studies' },
            { icon: Globe, label: 'Countries', value: '3+', description: 'Global presence' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-slate-600" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
              <div className="text-slate-600 font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-12 shadow-sm">
            <div className="inline-flex items-center space-x-2 bg-slate-100/60 backdrop-blur-sm border border-slate-200/50 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Our Mission</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Transforming cardiac care through intelligent technology
            </h3>
            
            <p className="text-xl text-slate-600 leading-relaxed">
              At ARPI Inc., we're dedicated to developing cutting-edge AI solutions that empower 
              healthcare professionals to deliver faster, more accurate cardiac diagnoses. Through 
              strategic partnerships with leading medical institutions, we're building the future 
              of cardiovascular medicine.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;