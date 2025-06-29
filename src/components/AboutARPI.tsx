import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Heart, Users, Award, Sparkles, ArrowRight } from 'lucide-react';

const AboutARPI = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const partners = [
    {
      id: 1,
      name: 'Seoul National University Hospital',
      type: 'Research Partner',
      description: 'Leading medical research and AI-powered cardiac care innovation',
      logoUrl: null, // Will be replaced with actual logo later
      logoFallback: '🏥',
      gradient: 'from-blue-500/20 to-indigo-500/20',
      borderGradient: 'from-blue-200/50 to-indigo-200/50'
    },
    {
      id: 2,
      name: 'Samsung Medical Center',
      type: 'Clinical Partner',
      description: 'Real-world deployment and testing of ECG analysis systems',
      logoUrl: null,
      logoFallback: '🏥',
      gradient: 'from-red-500/20 to-pink-500/20',
      borderGradient: 'from-red-200/50 to-pink-200/50'
    },
    {
      id: 3,
      name: 'Asan Medical Center',
      type: 'Technology Partner',
      description: 'AI algorithm development and optimization for cardiac care',
      logoUrl: null,
      logoFallback: '🏥',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      borderGradient: 'from-emerald-200/50 to-teal-200/50'
    },
    {
      id: 4,
      name: 'Korean Medical Association',
      type: 'Industry Partner',
      description: 'Standards development and advocacy for medical AI adoption',
      logoUrl: null,
      logoFallback: '🏛️',
      gradient: 'from-amber-500/20 to-orange-500/20',
      borderGradient: 'from-amber-200/50 to-orange-200/50'
    },
    {
      id: 5,
      name: 'Yonsei Severance Hospital',
      type: 'Research Partner',
      description: 'Advanced cardiac imaging and AI integration research',
      logoUrl: null,
      logoFallback: '🏥',
      gradient: 'from-purple-500/20 to-violet-500/20',
      borderGradient: 'from-purple-200/50 to-violet-200/50'
    },
    {
      id: 6,
      name: 'Korea University Medical Center',
      type: 'Clinical Partner',
      description: 'Clinical validation and real-world implementation studies',
      logoUrl: null,
      logoFallback: '🏥',
      gradient: 'from-rose-500/20 to-pink-500/20',
      borderGradient: 'from-rose-200/50 to-pink-200/50'
    }
  ];

  // Auto-slide functionality - pauses on hover
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(partners.length / 3));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, partners.length]);

  // Get visible partners (3 at a time)
  const getVisiblePartners = () => {
    const startIndex = currentIndex * 3;
    const visiblePartners = [];
    for (let i = 0; i < 3; i++) {
      const partnerIndex = (startIndex + i) % partners.length;
      visiblePartners.push(partners[partnerIndex]);
    }
    return visiblePartners;
  };

  const visiblePartners = getVisiblePartners();

  return (
    <section id="about-arpi-section" className="relative py-32 overflow-hidden">
      {/* Premium Background with Enhanced Glassy Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white/90 to-gray-50/80 backdrop-blur-3xl"></div>
      
      {/* Sophisticated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(71, 85, 105, 0.4) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Premium Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-gradient-to-br from-slate-200/30 via-gray-200/20 to-slate-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-gradient-to-br from-gray-200/30 via-slate-200/20 to-gray-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Premium Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/70 backdrop-blur-2xl border border-slate-200/60 rounded-full px-6 py-3 mb-8 shadow-[0_8px_32px_rgba(71,85,105,0.08)]">
            <Building2 className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">About ARPI Inc.</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
              Our Partners
            </span>
            <span className="block bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 bg-clip-text text-transparent">
              in Healthcare Innovation
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Collaborating with premier healthcare institutions to advance medical AI and improve 
            patient outcomes worldwide
          </p>
        </motion.div>

        {/* Premium Partners Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94] // Premium easing
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {visiblePartners.map((partner, index) => (
                  <motion.div
                    key={`${partner.id}-${currentIndex}`}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    className={`group relative bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl overflow-hidden transition-all duration-700 shadow-[0_8px_32px_rgba(71,85,105,0.08)] hover:shadow-[0_20px_60px_rgba(71,85,105,0.15)] cursor-pointer`}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Premium Glassy Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                    
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${partner.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative p-8">
                      {/* Partner Type Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${partner.borderGradient} backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/30`}>
                          <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                          <span className="text-xs font-semibold text-slate-700">{partner.type}</span>
                        </div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ArrowRight className="w-4 h-4 text-slate-500" />
                        </motion.div>
                      </div>

                      {/* Logo Section */}
                      <div className="flex items-center space-x-4 mb-6">
                        <motion.div 
                          className="w-16 h-16 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                        >
                          {partner.logoUrl ? (
                            <img 
                              src={partner.logoUrl} 
                              alt={`${partner.name} logo`}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling.style.display = 'block';
                              }}
                            />
                          ) : null}
                          <span 
                            className="text-2xl"
                            style={{ display: partner.logoUrl ? 'none' : 'block' }}
                          >
                            {partner.logoFallback}
                          </span>
                        </motion.div>
                      </div>

                      {/* Partner Info */}
                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300 leading-tight">
                        {partner.name}
                      </h3>
                      
                      <p className="text-slate-600 leading-relaxed text-sm group-hover:text-slate-700 transition-colors duration-300">
                        {partner.description}
                      </p>

                      {/* Active Partnership Indicator */}
                      <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-slate-200/50">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-emerald-600">Active Partnership</span>
                      </div>
                    </div>

                    {/* Premium Border Effect */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${partner.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`}></div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Elegant Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-12">
            {Array.from({ length: Math.ceil(partners.length / 3) }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'bg-slate-600 scale-125' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Company Mission Statement */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative bg-white/50 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-12 max-w-4xl mx-auto shadow-[0_20px_70px_rgba(71,85,105,0.1)] transition-all duration-700 group overflow-hidden">
            {/* Premium Glassy Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-slate-100/60 backdrop-blur-sm border border-slate-200/50 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Our Mission</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 group-hover:text-slate-900 transition-colors duration-300">
                Transforming Healthcare with AI
              </h3>
              
              <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                ARPI Inc. is dedicated to revolutionizing cardiac care through cutting-edge artificial intelligence. 
                We partner with leading medical institutions to develop, validate, and deploy AI-powered solutions 
                that enhance diagnostic accuracy and improve patient outcomes worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">6+</div>
                  <div className="text-sm text-slate-600">Partner Institutions</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-slate-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">50K+</div>
                  <div className="text-sm text-slate-600">ECGs Analyzed</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-slate-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">99.2%</div>
                  <div className="text-sm text-slate-600">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;