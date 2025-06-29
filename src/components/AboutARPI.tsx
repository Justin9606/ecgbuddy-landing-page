import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Award, Target, ArrowUpRight, CheckCircle, Sparkles, Heart, Brain, Shield, Activity, Globe, Zap, TrendingUp, Calendar, MapPin, Mail, Phone, Linkedin, Twitter, Github, ExternalLink, Star, Clock, BarChart3, Lightbulb, Rocket, Eye, Handshake } from 'lucide-react';

const AboutARPI = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const partnerships = [
    {
      id: 1,
      name: 'Seoul National University Hospital',
      type: 'Research Partner',
      description: 'Collaborative research and clinical validation for AI-powered cardiac diagnostics',
      year: '2022',
      projects: '15+ Studies',
      status: 'Active',
      icon: Brain,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50/50 to-indigo-50/30',
      borderColor: 'blue-200/40',
      logo: '🏥' // Placeholder - will be replaced with actual logo
    },
    {
      id: 2,
      name: 'Samsung Medical Center',
      type: 'Clinical Partner',
      description: 'Real-world deployment and testing of ECG analysis systems',
      year: '2023',
      projects: '8+ Trials',
      status: 'Active',
      icon: Heart,
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-50/50 to-pink-50/30',
      borderColor: 'red-200/40',
      logo: '🏥' // Placeholder - will be replaced with actual logo
    },
    {
      id: 3,
      name: 'Asan Medical Center',
      type: 'Technology Partner',
      description: 'AI algorithm development and optimization for cardiac care',
      year: '2023',
      projects: '12+ Projects',
      status: 'Active',
      icon: Zap,
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50/50 to-orange-50/30',
      borderColor: 'amber-200/40',
      logo: '🏥' // Placeholder - will be replaced with actual logo
    },
    {
      id: 4,
      name: 'Korean Medical Association',
      type: 'Industry Partner',
      description: 'Standards development and advocacy for medical AI adoption',
      year: '2024',
      projects: '5+ Initiatives',
      status: 'Active',
      icon: Shield,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50/50 to-teal-50/30',
      borderColor: 'emerald-200/40',
      logo: '🏛️' // Placeholder - will be replaced with actual logo
    },
    {
      id: 5,
      name: 'Yonsei Severance Hospital',
      type: 'Research Partner',
      description: 'Advanced cardiac imaging and AI integration research',
      year: '2024',
      projects: '6+ Studies',
      status: 'Active',
      icon: Activity,
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50/50 to-violet-50/30',
      borderColor: 'purple-200/40',
      logo: '🏥' // Placeholder - will be replaced with actual logo
    },
    {
      id: 6,
      name: 'Korea University Medical Center',
      type: 'Clinical Partner',
      description: 'Large-scale clinical trials and validation studies',
      year: '2024',
      projects: '10+ Trials',
      status: 'Active',
      icon: Globe,
      gradient: 'from-cyan-500 to-blue-600',
      bgGradient: 'from-cyan-50/50 to-blue-50/30',
      borderColor: 'cyan-200/40',
      logo: '🏥' // Placeholder - will be replaced with actual logo
    }
  ];

  const CARDS_TO_SHOW = 4;
  const SLIDE_INTERVAL = 4000;

  // Auto-sliding logic with smooth infinite loop
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentSlide(prev => (prev + 1) % partnerships.length);
      }, SLIDE_INTERVAL);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, partnerships.length]);

  // Get visible cards with infinite loop logic
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < CARDS_TO_SHOW; i++) {
      const index = (currentSlide + i) % partnerships.length;
      cards.push(partnerships[index]);
    }
    return cards;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const visibleCards = getVisibleCards();

  return (
    <section id="about-arpi-section" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-white to-gray-50/20"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-rose-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-full px-6 py-3 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
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
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Left Side - Company Story */}
          <div className="space-y-8">
            <div className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Our Vision</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                To democratize advanced cardiac diagnostics through AI, making world-class ECG analysis 
                accessible to healthcare providers everywhere, ultimately saving lives through faster, 
                more accurate diagnoses.
              </p>
              <div className="flex items-center space-x-2 text-blue-600">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">Global Healthcare Impact</span>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Our Mission</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Developing innovative AI solutions that enhance clinical decision-making, reduce diagnostic 
                errors, and improve patient outcomes in cardiovascular care through cutting-edge technology 
                and rigorous scientific validation.
              </p>
              <div className="flex items-center space-x-2 text-purple-600">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">Patient-Centered Innovation</span>
              </div>
            </div>
          </div>

          {/* Right Side - Company Stats */}
          <div className="space-y-6">
            {[
              {
                icon: Users,
                label: 'Healthcare Professionals',
                value: '10,000+',
                description: 'Trust our AI solutions',
                gradient: 'from-blue-500 to-indigo-600'
              },
              {
                icon: Activity,
                label: 'ECGs Analyzed',
                value: '1M+',
                description: 'Processed globally',
                gradient: 'from-red-500 to-pink-600'
              },
              {
                icon: Award,
                label: 'Accuracy Rate',
                value: '99.2%',
                description: 'Clinical validation',
                gradient: 'from-emerald-500 to-teal-600'
              },
              {
                icon: Globe,
                label: 'Countries Served',
                value: '25+',
                description: 'Worldwide presence',
                gradient: 'from-purple-500 to-violet-600'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                    <div className="text-slate-600 font-medium mb-1">{stat.label}</div>
                    <div className="text-sm text-slate-500">{stat.description}</div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500 opacity-60" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strategic Partnerships Section - IMPROVED */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-full px-6 py-3 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <Handshake className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Strategic Partnerships</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="block text-slate-900 mb-2">
                Collaborating with premier
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                healthcare institutions
              </span>
            </h3>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Working together to advance medical AI and improve patient outcomes worldwide
            </p>
          </div>

          {/* Enhanced Sliding Partnership Cards */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Cards Container with Smooth Sliding */}
            <div className="overflow-hidden rounded-3xl">
              <motion.div 
                className="flex gap-6"
                animate={{ 
                  x: `${-currentSlide * (100 / CARDS_TO_SHOW)}%`
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }}
                style={{ width: `${(partnerships.length * 100) / CARDS_TO_SHOW}%` }}
              >
                {partnerships.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    className={`relative bg-gradient-to-br ${partner.bgGradient} backdrop-blur-2xl border border-${partner.borderColor} rounded-3xl p-8 transition-all duration-700 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] group overflow-hidden cursor-pointer`}
                    style={{ width: `${100 / CARDS_TO_SHOW}%`, flexShrink: 0 }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    {/* Glassy hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                    
                    {/* Partner Logo Placeholder */}
                    <div className="relative flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-white/40">
                          {partner.logo}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <partner.icon className="w-4 h-4 text-slate-600" />
                            <span className="text-sm font-medium text-slate-600">{partner.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 font-medium">{partner.status}</span>
                          </div>
                        </div>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500 opacity-80" />
                    </div>

                    {/* Partner Info */}
                    <div className="relative mb-6">
                      <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300">
                        {partner.name}
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-sm mb-4">
                        {partner.description}
                      </p>
                    </div>

                    {/* Partnership Stats */}
                    <div className="relative flex items-center justify-between mb-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-800">{partner.year}</div>
                        <div className="text-xs text-slate-500">Partnership</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-800">{partner.projects}</div>
                        <div className="text-xs text-slate-500">Active</div>
                      </div>
                    </div>

                    {/* Partnership Status */}
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50/50 backdrop-blur-sm rounded-full px-3 py-1">
                        <CheckCircle className="w-3 h-3" />
                        <span className="text-xs font-medium">Active Partnership</span>
                      </div>
                      <motion.div
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Elegant Navigation Dots */}
            <div className="flex justify-center mt-12 space-x-3">
              {partnerships.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'bg-slate-800 scale-125' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {index === currentSlide && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-slate-800"
                      layoutId="activeDot"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Subtle Progress Indicator */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="h-1 bg-slate-200/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-slate-600 to-slate-800 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: `${((currentSlide + 1) / partnerships.length) * 100}%`
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>Partnership {currentSlide + 1}</span>
                <span>{partnerships.length} Total</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Our Core Values
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide our innovation and drive our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: 'Innovation',
                description: 'Pushing the boundaries of medical AI through continuous research and development',
                gradient: 'from-yellow-500 to-orange-600'
              },
              {
                icon: Shield,
                title: 'Trust & Security',
                description: 'Maintaining the highest standards of data protection and patient privacy',
                gradient: 'from-green-500 to-emerald-600'
              },
              {
                icon: Heart,
                title: 'Patient-Centric',
                description: 'Every solution designed with patient outcomes and safety as the top priority',
                gradient: 'from-red-500 to-pink-600'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-4">{value.title}</h4>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leadership Team */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Leadership Team
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Experienced leaders driving innovation in medical AI and healthcare technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Kim',
                role: 'Chief Executive Officer',
                bio: 'Former Director of Cardiac AI at Samsung Medical Center with 15+ years in medical technology',
                avatar: '👩‍⚕️',
                linkedin: '#',
                email: 'sarah.kim@arpi.ai'
              },
              {
                name: 'Dr. Michael Chen',
                role: 'Chief Technology Officer',
                bio: 'AI researcher and former Google Health engineer specializing in medical machine learning',
                avatar: '👨‍💻',
                linkedin: '#',
                email: 'michael.chen@arpi.ai'
              },
              {
                name: 'Dr. Lisa Park',
                role: 'Chief Medical Officer',
                bio: 'Board-certified cardiologist and clinical researcher with expertise in ECG interpretation',
                avatar: '👩‍⚕️',
                linkedin: '#',
                email: 'lisa.park@arpi.ai'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-6xl mb-6">{member.avatar}</div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">{member.name}</h4>
                <div className="text-blue-600 font-medium mb-4">{member.role}</div>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">{member.bio}</p>
                <div className="flex items-center justify-center space-x-4">
                  <a href={member.linkedin} className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={`mailto:${member.email}`} className="text-slate-400 hover:text-red-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-12 shadow-[0_20px_70px_rgba(0,0,0,0.08)] max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">Get in Touch</h3>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Ready to transform your cardiac care with AI? Let's discuss how ARPI can help your organization.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="font-medium text-slate-800 mb-2">Email Us</div>
                <a href="mailto:contact@arpi.ai" className="text-blue-600 hover:text-blue-700 transition-colors">
                  contact@arpi.ai
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="font-medium text-slate-800 mb-2">Call Us</div>
                <a href="tel:+82212345678" className="text-green-600 hover:text-green-700 transition-colors">
                  +82 (0)2-1234-5678
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="font-medium text-slate-800 mb-2">Visit Us</div>
                <div className="text-purple-600">Seoul, South Korea</div>
              </div>
            </div>
            
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-[0_8px_32px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.4)] transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Demo
              <ArrowUpRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;