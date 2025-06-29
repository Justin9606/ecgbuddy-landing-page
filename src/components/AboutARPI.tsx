import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Award, 
  Target, 
  Lightbulb, 
  Heart, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Globe, 
  Brain, 
  Shield, 
  Zap,
  ArrowUpRight,
  Play,
  Pause
} from 'lucide-react';

const AboutARPI = () => {
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [isPartnersPaused, setIsPartnersPaused] = useState(false);

  // Strategic Partners Data with logo support
  const strategicPartners = [
    {
      id: 'seoul-national',
      name: 'Seoul National University Hospital',
      type: 'Research Partner',
      description: 'Collaborative research and clinical validation for AI-powered cardiac diagnostics',
      logoUrl: null, // Will be replaced with actual logo later
      logoFallback: '🏥',
      year: '2022',
      projects: '15+ Studies',
      status: 'Active Partnership',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50/30 to-indigo-50/20'
    },
    {
      id: 'samsung-medical',
      name: 'Samsung Medical Center',
      type: 'Clinical Partner',
      description: 'Real-world deployment and testing of ECG analysis systems',
      logoUrl: null,
      logoFallback: '🏥',
      year: '2023',
      projects: '8+ Trials',
      status: 'Active Partnership',
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-50/30 to-pink-50/20'
    },
    {
      id: 'asan-medical',
      name: 'Asan Medical Center',
      type: 'Technology Partner',
      description: 'AI algorithm development and optimization for cardiac care',
      logoUrl: null,
      logoFallback: '🏥',
      year: '2023',
      projects: '12+ Projects',
      status: 'Active Partnership',
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50/30 to-teal-50/20'
    },
    {
      id: 'korean-medical',
      name: 'Korean Medical Association',
      type: 'Industry Partner',
      description: 'Standards development and advocacy for medical AI adoption',
      logoUrl: null,
      logoFallback: '🏛️',
      year: '2024',
      projects: '5+ Initiatives',
      status: 'Active Partnership',
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50/30 to-violet-50/20'
    },
    {
      id: 'yonsei-severance',
      name: 'Yonsei Severance Hospital',
      type: 'Research Partner',
      description: 'Advanced cardiac imaging and AI integration research',
      logoUrl: null,
      logoFallback: '🏥',
      year: '2024',
      projects: '6+ Studies',
      status: 'Active Partnership',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50/30 to-red-50/20'
    },
    {
      id: 'kaist',
      name: 'KAIST Medical AI Lab',
      type: 'Research Partner',
      description: 'Cutting-edge AI research and algorithm development',
      logoUrl: null,
      logoFallback: '🔬',
      year: '2024',
      projects: '10+ Projects',
      status: 'Active Partnership',
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-50/30 to-blue-50/20'
    }
  ];

  // Auto-slide partners
  useEffect(() => {
    if (!isPartnersPaused) {
      const interval = setInterval(() => {
        setCurrentPartnerIndex((prev) => (prev + 1) % strategicPartners.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPartnersPaused, strategicPartners.length]);

  const getVisiblePartners = () => {
    const partners = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentPartnerIndex + i) % strategicPartners.length;
      partners.push({ ...strategicPartners[index], displayIndex: i });
    }
    return partners;
  };

  const getPartnerTypeIcon = (type: string) => {
    switch (type) {
      case 'Research Partner': return Brain;
      case 'Clinical Partner': return Heart;
      case 'Technology Partner': return Zap;
      case 'Industry Partner': return Building2;
      default: return Users;
    }
  };

  const getPartnerTypeColor = (type: string) => {
    switch (type) {
      case 'Research Partner': return 'text-blue-600';
      case 'Clinical Partner': return 'text-red-600';
      case 'Technology Partner': return 'text-emerald-600';
      case 'Industry Partner': return 'text-purple-600';
      default: return 'text-slate-600';
    }
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-rose-100/30 to-pink-100/30 rounded-full blur-3xl"></div>
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
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AI-powered healthcare
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            ARPI Inc. is at the forefront of medical AI innovation, developing cutting-edge solutions 
            that transform how healthcare professionals diagnose and treat cardiac conditions.
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
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-slate-900">
                Transforming cardiac care through artificial intelligence
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Founded with a mission to democratize access to expert-level cardiac diagnostics, 
                ARPI Inc. combines cutting-edge AI research with real-world clinical applications 
                to improve patient outcomes worldwide.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our flagship product, ECG Buddy, represents years of research and development, 
                trained on millions of ECG patterns and validated in clinical settings across 
                leading medical institutions.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Founded', value: '2021', icon: Building2 },
                { label: 'Team Members', value: '45+', icon: Users },
                { label: 'Research Papers', value: '12+', icon: Award },
                { label: 'Partner Hospitals', value: '25+', icon: Heart }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <stat.icon className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Content - Mission & Vision */}
          <div className="space-y-8">
            <div className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Our Mission</h4>
              </div>
              <p className="text-slate-600 leading-relaxed">
                To democratize access to expert-level cardiac diagnostics through AI, 
                enabling healthcare professionals worldwide to provide better patient care 
                with confidence and precision.
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Our Vision</h4>
              </div>
              <p className="text-slate-600 leading-relaxed">
                A world where every healthcare provider has access to AI-powered diagnostic 
                tools that enhance clinical decision-making and improve patient outcomes 
                across all healthcare settings.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Strategic Partnerships - UPDATED SECTION */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Strategic Partnerships</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Collaborating with premier healthcare institutions to advance medical AI and improve 
              patient outcomes worldwide
            </p>
          </div>

          {/* Premium Partners Carousel */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPartnersPaused(true)}
            onMouseLeave={() => setIsPartnersPaused(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence mode="wait">
                {getVisiblePartners().map((partner) => {
                  const TypeIcon = getPartnerTypeIcon(partner.type);
                  const typeColor = getPartnerTypeColor(partner.type);
                  
                  return (
                    <motion.div
                      key={`${partner.id}-${currentPartnerIndex}`}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: partner.displayIndex * 0.1,
                        ease: "easeOut"
                      }}
                      className={`group relative bg-gradient-to-br ${partner.bgGradient} backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-700 overflow-hidden cursor-pointer`}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      {/* Premium glassy hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                      
                      {/* Partner Logo */}
                      <div className="relative flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          {partner.logoUrl ? (
                            <img 
                              src={partner.logoUrl} 
                              alt={`${partner.name} logo`}
                              className="w-12 h-12 rounded-2xl object-cover shadow-lg"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className="w-12 h-12 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                            style={{ display: partner.logoUrl ? 'none' : 'flex' }}
                          >
                            {partner.logoFallback}
                          </div>
                          <div className={`inline-flex items-center space-x-2 bg-white/40 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1.5`}>
                            <TypeIcon className={`w-3 h-3 ${typeColor}`} />
                            <span className={`text-xs font-medium ${typeColor}`}>
                              {partner.type}
                            </span>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      </div>

                      {/* Partner Info */}
                      <div className="relative space-y-4">
                        <h4 className="text-xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors duration-300 leading-tight">
                          {partner.name}
                        </h4>
                        
                        <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                          {partner.description}
                        </p>

                        {/* Partnership Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/20">
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">{partner.year}</div>
                            <div className="text-xs text-slate-500">Partnership</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-800">{partner.projects}</div>
                            <div className="text-xs text-slate-500">Active</div>
                          </div>
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-emerald-600">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">{partner.status}</span>
                          </div>
                          <motion.div
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Premium card border effect */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${partner.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Leadership Team */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-4xl font-bold text-slate-900 mb-6">Leadership Team</h3>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Our diverse team of experts combines deep medical knowledge with cutting-edge 
            AI research to drive innovation in healthcare technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Kim',
                role: 'Chief Executive Officer',
                background: 'Former Director of Cardiology at Seoul National University Hospital',
                image: '👩‍⚕️',
                gradient: 'from-blue-500 to-indigo-600'
              },
              {
                name: 'Dr. Michael Chen',
                role: 'Chief Technology Officer',
                background: 'AI Research Lead, Former Google Health',
                image: '👨‍💻',
                gradient: 'from-purple-500 to-violet-600'
              },
              {
                name: 'Dr. Lisa Park',
                role: 'Chief Medical Officer',
                background: 'Cardiologist, Clinical Research Expert',
                image: '👩‍⚕️',
                gradient: 'from-rose-500 to-pink-600'
              }
            ].map((leader, index) => (
              <motion.div
                key={index}
                className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${leader.gradient} rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg`}>
                  {leader.image}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{leader.name}</h4>
                <p className="text-slate-600 font-medium mb-3">{leader.role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{leader.background}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;