import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Award, Target, ArrowRight, Sparkles, CheckCircle, Heart, Brain, Shield, Activity, Globe, TrendingUp, Star, ArrowUpRight, Play, Pause } from 'lucide-react';

const AboutARPI = () => {
  const [currentPartner, setCurrentPartner] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  // Updated partners data with the 4 specific partners
  const partners = [
    {
      id: 'snubh',
      name: 'Seoul National University Bundang Hospital',
      type: 'Clinical Partner',
      icon: '🏥',
      description: 'Advanced cardiac imaging and AI integration research',
      partnership: '2024',
      projects: '8+ Studies',
      status: 'Active',
      gradient: 'from-red-500 to-pink-600',
      logoUrl: null // Will be added later
    },
    {
      id: 'snuh',
      name: 'Seoul National University Hospital',
      type: 'Research Partner',
      icon: '🏥',
      description: 'Clinical validation and research collaboration for AI-powered cardiac diagnostics',
      partnership: '2023',
      projects: '15+ Studies',
      status: 'Active',
      gradient: 'from-blue-500 to-indigo-600',
      logoUrl: null // Will be added later
    },
    {
      id: 'boramae',
      name: 'Seoul Metropolitan Boramae Hospital',
      type: 'Technology Partner',
      icon: '🏥',
      description: 'Real-world deployment and testing of ECG analysis systems',
      partnership: '2023',
      projects: '6+ Trials',
      status: 'Active',
      gradient: 'from-emerald-500 to-teal-600',
      logoUrl: null // Will be added later
    },
    {
      id: 'ezcaretech',
      name: 'EZCaretech Inc.',
      type: 'Industry Partner',
      icon: '🏢',
      description: 'Healthcare technology integration and platform development',
      partnership: '2024',
      projects: '4+ Projects',
      status: 'Active',
      gradient: 'from-purple-500 to-violet-600',
      logoUrl: null // Will be added later
    }
  ];

  // Auto-sliding functionality
  useEffect(() => {
    if (!isAutoSliding) return;
    
    const interval = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partners.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoSliding, partners.length]);

  const handlePartnerClick = (index: number) => {
    setCurrentPartner(index);
    setIsAutoSliding(false);
    // Resume auto-sliding after 10 seconds
    setTimeout(() => setIsAutoSliding(true), 10000);
  };

  const handleMouseEnter = () => {
    setIsAutoSliding(false);
  };

  const handleMouseLeave = () => {
    setIsAutoSliding(true);
  };

  return (
    <section id="about-arpi-section" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50"></div>
      
      {/* Grid Pattern */}
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

        {/* Company Overview */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Left Side - Company Info */}
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">ARPI Inc.</h3>
                  <p className="text-slate-600">Artificial Intelligence Research & Platform Innovation</p>
                </div>
              </div>
              
              <p className="text-slate-600 leading-relaxed mb-6">
                Founded with a mission to revolutionize healthcare through artificial intelligence, 
                ARPI Inc. specializes in developing cutting-edge medical AI solutions that enhance 
                diagnostic accuracy and improve patient care outcomes.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Founded', value: '2022' },
                  { label: 'Headquarters', value: 'Seoul, Korea' },
                  { label: 'Team Size', value: '50+ Experts' },
                  { label: 'Focus Area', value: 'Medical AI' }
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-slate-50/50 rounded-xl">
                    <div className="text-lg font-bold text-slate-800">{item.value}</div>
                    <div className="text-sm text-slate-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Mission & Values */}
          <div className="space-y-6">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                description: 'To democratize access to advanced cardiac diagnostics through AI-powered solutions that enhance clinical decision-making.',
                gradient: 'from-red-500 to-pink-600'
              },
              {
                icon: Heart,
                title: 'Our Vision',
                description: 'A world where every healthcare professional has access to intelligent diagnostic tools for better patient outcomes.',
                gradient: 'from-blue-500 to-indigo-600'
              },
              {
                icon: Sparkles,
                title: 'Our Values',
                description: 'Innovation, accuracy, accessibility, and collaboration drive everything we do in advancing medical AI.',
                gradient: 'from-emerald-500 to-teal-600'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Our Strategic Partners
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Collaborating with leading healthcare institutions to advance medical AI research and implementation
            </p>
          </div>

          {/* Partners Carousel */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Main Partner Display */}
            <div className="relative h-96 mb-8 overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPartner}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="relative h-full bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-12 shadow-[0_20px_70px_rgba(0,0,0,0.08)] overflow-hidden group">
                    {/* Premium glassy hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500 ease-out"></div>
                    
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">
                      {/* Partner Info */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className={`w-20 h-20 bg-gradient-to-br ${partners[currentPartner].gradient} rounded-3xl flex items-center justify-center shadow-xl`}>
                            {partners[currentPartner].logoUrl ? (
                              <img 
                                src={partners[currentPartner].logoUrl} 
                                alt={partners[currentPartner].name}
                                className="w-12 h-12 object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling.style.display = 'block';
                                }}
                              />
                            ) : null}
                            <span 
                              className="text-3xl"
                              style={{ display: partners[currentPartner].logoUrl ? 'none' : 'block' }}
                            >
                              {partners[currentPartner].icon}
                            </span>
                          </div>
                          <div className="bg-slate-100/80 backdrop-blur-sm rounded-full px-4 py-2">
                            <span className="text-sm font-semibold text-slate-700">
                              {partners[currentPartner].type}
                            </span>
                          </div>
                        </div>

                        <h4 className="text-3xl font-bold text-slate-900 leading-tight">
                          {partners[currentPartner].name}
                        </h4>
                        
                        <p className="text-lg text-slate-600 leading-relaxed">
                          {partners[currentPartner].description}
                        </p>

                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-slate-900">
                              {partners[currentPartner].partnership}
                            </div>
                            <div className="text-sm text-slate-600">Partnership</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-slate-900">
                              {partners[currentPartner].projects}
                            </div>
                            <div className="text-sm text-slate-600">Active</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-green-600 bg-green-50/50 rounded-full px-4 py-2 w-fit">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">{partners[currentPartner].status} Partnership</span>
                        </div>
                      </div>

                      {/* Visual Element */}
                      <div className="relative">
                        <div className="w-full h-64 bg-gradient-to-br from-slate-100/50 to-slate-200/50 rounded-3xl flex items-center justify-center border border-slate-200/30">
                          <div className="text-center">
                            <div className={`w-24 h-24 bg-gradient-to-br ${partners[currentPartner].gradient} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                              <span className="text-4xl">{partners[currentPartner].icon}</span>
                            </div>
                            <div className="text-slate-600 font-medium">
                              Partnership Established
                            </div>
                            <div className="text-2xl font-bold text-slate-900">
                              {partners[currentPartner].partnership}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Partner Navigation Dots */}
            <div className="flex justify-center space-x-3">
              {partners.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handlePartnerClick(index)}
                  className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentPartner 
                      ? 'bg-slate-700 scale-125' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {index === currentPartner && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-slate-700"
                      layoutId="activePartnerDot"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {[
            { 
              icon: Users, 
              label: 'Healthcare Partners', 
              value: '4+', 
              gradient: 'from-blue-500 to-indigo-600',
              description: 'Leading institutions'
            },
            { 
              icon: Brain, 
              label: 'AI Models Deployed', 
              value: '12+', 
              gradient: 'from-purple-500 to-violet-600',
              description: 'Production systems'
            },
            { 
              icon: Activity, 
              label: 'ECGs Analyzed', 
              value: '1M+', 
              gradient: 'from-red-500 to-pink-600',
              description: 'Successful analyses'
            },
            { 
              icon: Award, 
              label: 'Research Papers', 
              value: '25+', 
              gradient: 'from-emerald-500 to-teal-600',
              description: 'Published studies'
            }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-slate-600 font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-12 max-w-4xl mx-auto shadow-[0_20px_70px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.12)] transition-all duration-700 group overflow-hidden">
            {/* Glassy hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Join Our Mission</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Partner with ARPI Inc.
              </h3>
              
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Ready to advance medical AI research? Let's collaborate to improve 
                patient outcomes through innovative healthcare technology.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-[0_8px_32px_rgba(71,85,105,0.3)] hover:shadow-[0_12px_40px_rgba(71,85,105,0.4)] transition-all duration-500 overflow-hidden group"
                >
                  {/* Glassy hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                  <span className="relative z-10">Contact Us</span>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-slate-600 hover:text-slate-800 font-medium transition-colors duration-300"
                >
                  Learn more about partnerships
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;