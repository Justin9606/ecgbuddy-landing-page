import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Heart, Users, Award, MapPin, Mail, Phone, Globe, Linkedin, Twitter, Github, Sparkles, Target, TrendingUp, Shield, Brain, Activity, CheckCircle, ArrowUpRight, Star, Calendar, Zap, ChevronLeft, ChevronRight, Compass, Navigation, Rocket } from 'lucide-react';

const AboutARPI = () => {
  // FIXED: Default to 2025 (index 3) since we're in 2025
  const [selectedMilestone, setSelectedMilestone] = useState(3);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const products = [
    {
      name: 'ECG Buddy',
      description: 'AI-powered ECG analysis platform for healthcare professionals',
      status: 'Live',
      icon: Heart,
      gradient: 'from-red-500 to-pink-600',
      link: '#hero',
      users: '10,000+',
      accuracy: '99.2%'
    },
    {
      name: 'CardioInsight Pro',
      description: 'Advanced cardiac monitoring and analytics suite for enterprise healthcare',
      status: 'Coming Soon',
      icon: Activity,
      gradient: 'from-blue-500 to-indigo-600',
      link: '#',
      users: 'Beta',
      accuracy: '98.7%'
    },
    {
      name: 'MedAI Platform',
      description: 'Comprehensive medical AI infrastructure and development tools',
      status: 'In Development',
      icon: Brain,
      gradient: 'from-purple-500 to-violet-600',
      link: '#',
      users: 'Preview',
      accuracy: '97.5%'
    }
  ];

  // FIXED: Reordered milestones in chronological order (2021 first, 2025 last)
  const milestones = [
    {
      year: '2021',
      title: 'ARPI Founded',
      description: 'Company established with mission to revolutionize healthcare through artificial intelligence and machine learning',
      icon: Building2,
      color: 'purple',
      bgColor: 'bg-purple-500',
      lightColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      shadowColor: 'shadow-purple-500/25',
      glowColor: 'shadow-purple-500/40',
      metrics: ['Founded', 'AI Focus', 'Healthcare'],
      achievement: 'Company Launch',
      position: { x: 15, y: 85 },
      pathColor: '#8B5CF6'
    },
    {
      year: '2023',
      title: 'Series A Success',
      description: 'Raised $15M Series A led by top-tier VCs to accelerate AI healthcare development and global expansion',
      icon: TrendingUp,
      color: 'blue',
      bgColor: 'bg-blue-500',
      lightColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      shadowColor: 'shadow-blue-500/25',
      glowColor: 'shadow-blue-500/40',
      metrics: ['$15M Raised', 'Series A', 'Global VCs'],
      achievement: 'Funding Round',
      position: { x: 35, y: 65 },
      pathColor: '#3B82F6'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'ECG Buddy reaches 10,000+ healthcare professionals across 15 countries with 99.2% accuracy rate and FDA breakthrough approval',
      icon: Target,
      color: 'red',
      bgColor: 'bg-red-500',
      lightColor: 'bg-red-100',
      textColor: 'text-red-600',
      borderColor: 'border-red-200',
      shadowColor: 'shadow-red-500/25',
      glowColor: 'shadow-red-500/40',
      metrics: ['10K+ Users', '15 Countries', 'FDA 510(k)'],
      achievement: 'Major Milestone',
      position: { x: 65, y: 35 },
      pathColor: '#EF4444'
    },
    {
      year: '2025',
      title: 'Global Leadership',
      description: 'Expanding to 25+ countries with 15,000+ users. Launching CardioInsight Pro and establishing strategic partnerships across Asia-Pacific region',
      icon: Rocket,
      color: 'orange',
      bgColor: 'bg-orange-500',
      lightColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-200',
      shadowColor: 'shadow-orange-500/25',
      glowColor: 'shadow-orange-500/40',
      metrics: ['25+ Countries', '15K+ Users', 'APAC Expansion'],
      achievement: 'Current Progress',
      position: { x: 85, y: 10 },
      pathColor: '#F97316'
    }
  ];

  // Enhanced Partners with more details for carousel
  const partners = [
    { 
      name: 'Seoul National University Hospital', 
      type: 'Research Partner',
      description: 'Clinical validation and research collaboration for AI-powered cardiac diagnostics',
      icon: Brain,
      color: 'blue',
      logo: '🏥',
      established: '2022',
      projects: '15+ Studies'
    },
    { 
      name: 'Samsung Medical Center', 
      type: 'Clinical Partner',
      description: 'Real-world deployment and testing of ECG analysis systems',
      icon: Heart,
      color: 'red',
      logo: '🏥',
      established: '2023',
      projects: '8+ Trials'
    },
    { 
      name: 'Asan Medical Center', 
      type: 'Technology Partner',
      description: 'AI algorithm development and optimization for cardiac care',
      icon: Zap,
      color: 'yellow',
      logo: '🏥',
      established: '2023',
      projects: '12+ Projects'
    },
    { 
      name: 'Korean Medical Association', 
      type: 'Industry Partner',
      description: 'Standards development and advocacy for medical AI adoption',
      icon: Users,
      color: 'green',
      logo: '🏛️',
      established: '2024',
      projects: '5+ Initiatives'
    },
    { 
      name: 'Yonsei Severance Hospital', 
      type: 'Research Partner',
      description: 'Advanced cardiac imaging and AI integration research',
      icon: Target,
      color: 'purple',
      logo: '🏥',
      established: '2024',
      projects: '6+ Studies'
    },
    { 
      name: 'Korea University Medical Center', 
      type: 'Clinical Partner',
      description: 'Emergency medicine AI deployment and validation',
      icon: Shield,
      color: 'indigo',
      logo: '🏥',
      established: '2024',
      projects: '4+ Trials'
    }
  ];

  // FIXED: Corrected navigation logic
  const nextMilestone = () => {
    // Next = forward in time (higher index, later year)
    if (selectedMilestone < milestones.length - 1) {
      setSelectedMilestone(selectedMilestone + 1);
    }
  };

  const prevMilestone = () => {
    // Previous = backward in time (lower index, earlier year)
    if (selectedMilestone > 0) {
      setSelectedMilestone(selectedMilestone - 1);
    }
  };

  // FIXED: Check if buttons should be disabled
  const isPrevDisabled = selectedMilestone === 0; // At 2021 (first milestone)
  const isNextDisabled = selectedMilestone === milestones.length - 1; // At 2025 (last milestone)

  return (
    <section id="about-arpi-section" className="relative py-32 overflow-hidden">
      {/* Premium Background with ARPI Brand Colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white to-blue-50/30"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Premium Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-cyan-100/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-100/20 to-blue-100/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Enhanced Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-3 mb-8 shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">About the Company</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          {/* Enhanced ARPI Logo */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-6 relative overflow-hidden group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 50%, #0EA5E9 100%)',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
              <span className="text-3xl font-bold text-white relative z-10">ARPI</span>
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block text-slate-900 mb-2">
              ARPI Inc.
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Advancing Healthcare AI
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            ARPI Inc. is a pioneering healthcare technology company dedicated to revolutionizing 
            medical diagnostics through artificial intelligence. Our flagship product, ECG Buddy, 
            represents our commitment to empowering healthcare professionals with cutting-edge AI tools.
          </motion.p>
        </motion.div>

        {/* Enhanced Products Section */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h3 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center">
              <Sparkles className="w-8 h-8 mr-3 text-blue-600" />
              Our Products
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Innovative AI-powered solutions transforming healthcare delivery and patient outcomes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-out"></div>
                      <product.icon className="w-7 h-7 text-white relative z-10" />
                    </motion.div>
                    <motion.div 
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'Live' ? 'bg-green-100 text-green-700' :
                        product.status === 'Coming Soon' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {product.status}
                    </motion.div>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

                  {/* Product Metrics */}
                  <div className="flex items-center justify-between mb-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-slate-900">{product.users}</div>
                      <div className="text-slate-500">Users</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-slate-900">{product.accuracy}</div>
                      <div className="text-slate-500">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-bold text-slate-900 ml-1">4.9</span>
                      </div>
                      <div className="text-slate-500">Rating</div>
                    </div>
                  </div>

                  <motion.a
                    href={product.link}
                    className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-medium transition-colors duration-300 group/link"
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn more</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-200" />
                  </motion.a>
                </div>

                {/* Enhanced Glassy Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* COMPLETELY REDESIGNED Premium Journey Map Section */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.div 
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-3 mb-8 shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Company Timeline</span>
              <Navigation className="w-4 h-4 text-cyan-600" />
            </motion.div>
            
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="block text-slate-900 mb-2">Our Journey</span>
              <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Through Innovation
              </span>
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Navigate through our key milestones and achievements as we transform healthcare with AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* COMPLETELY REDESIGNED Premium Interactive Journey Map */}
            <motion.div 
              className="relative overflow-hidden group"
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div 
                className="bg-white/95 backdrop-blur-3xl border border-white/50 rounded-3xl p-10 shadow-[0_30px_100px_rgba(59,130,246,0.15)] relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.85) 100%)',
                  backdropFilter: 'blur(30px)',
                  boxShadow: '0 30px 100px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.9)'
                }}
              >
                {/* Premium Glassy Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-2000 ease-out"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-2xl font-bold text-slate-900 flex items-center">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Compass className="w-6 h-6 mr-3 text-blue-600" />
                      </motion.div>
                      Journey Map
                    </h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-slate-600">Interactive</span>
                    </div>
                  </div>
                  
                  {/* COMPLETELY REDESIGNED Interactive SVG Path */}
                  <div className="relative h-96 bg-gradient-to-br from-slate-50/80 via-white/90 to-blue-50/60 rounded-2xl overflow-hidden border border-slate-200/30 shadow-inner">
                    {/* Subtle Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <motion.div 
                        className="absolute inset-0" 
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
                          backgroundSize: '30px 30px'
                        }}
                        animate={{
                          backgroundPosition: ['0px 0px', '30px 30px']
                        }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>

                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Enhanced Animated Path with Premium Gradient */}
                      <motion.path
                        d="M 15,85 Q 25,45 35,65 Q 55,25 65,35 Q 75,10 85,10"
                        stroke="url(#premiumGradient)"
                        strokeWidth="1.2"
                        fill="none"
                        strokeDasharray="4,3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
                      />
                      
                      {/* Glowing Path Effect */}
                      <motion.path
                        d="M 15,85 Q 25,45 35,65 Q 55,25 65,35 Q 75,10 85,10"
                        stroke="url(#glowGradient)"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.4"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 4, ease: "easeInOut", delay: 0.7 }}
                      />
                      
                      {/* Premium Gradient Definitions */}
                      <defs>
                        <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="33%" stopColor="#3B82F6" />
                          <stop offset="66%" stopColor="#EF4444" />
                          <stop offset="100%" stopColor="#F97316" />
                        </linearGradient>
                        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
                          <stop offset="33%" stopColor="#3B82F6" stopOpacity="0.6" />
                          <stop offset="66%" stopColor="#EF4444" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#F97316" stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Premium Interactive Milestone Dots */}
                    {milestones.map((milestone, index) => (
                      <motion.div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${milestone.position.x}%`,
                          top: `${milestone.position.y}%`
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + index * 0.3, duration: 0.6, type: "spring", bounce: 0.4 }}
                      >
                        <motion.button
                          className={`relative w-10 h-10 ${milestone.bgColor} rounded-full border-4 border-white ${milestone.shadowColor} cursor-pointer transition-all duration-500 ${
                            selectedMilestone === index ? `scale-125 ${milestone.glowColor}` : 'hover:scale-110'
                          }`}
                          onClick={() => setSelectedMilestone(index)}
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                          style={{
                            boxShadow: selectedMilestone === index 
                              ? `0 0 30px ${milestone.pathColor}40, 0 8px 25px rgba(0,0,0,0.15)` 
                              : '0 4px 15px rgba(0,0,0,0.1)'
                          }}
                        >
                          {/* Premium Pulsing Effect for Active */}
                          {selectedMilestone === index && (
                            <>
                              <motion.div 
                                className={`absolute inset-0 ${milestone.bgColor} rounded-full opacity-40`}
                                animate={{ 
                                  scale: [1, 2.5, 1],
                                  opacity: [0.4, 0, 0.4]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                              <motion.div 
                                className={`absolute inset-0 ${milestone.bgColor} rounded-full opacity-20`}
                                animate={{ 
                                  scale: [1, 3.5, 1],
                                  opacity: [0.2, 0, 0.2]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 0.5
                                }}
                              />
                            </>
                          )}
                          
                          {/* Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            {React.createElement(milestone.icon, {
                              className: "w-5 h-5 text-white"
                            })}
                          </div>
                        </motion.button>
                        
                        {/* Enhanced Year Labels */}
                        <motion.div
                          className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.2 + index * 0.3, duration: 0.4 }}
                        >
                          <div className="text-xs font-bold text-slate-700 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/50 shadow-sm">
                            {milestone.year}
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* COMPLETELY REDESIGNED Premium Navigation Controls */}
                  <div className="flex items-center justify-between mt-8">
                    <motion.button
                      onClick={prevMilestone}
                      disabled={isPrevDisabled}
                      className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all duration-500 border-2 shadow-lg ${
                        isPrevDisabled 
                          ? 'bg-gray-50/50 text-gray-400 border-gray-200/50 cursor-not-allowed opacity-50' 
                          : 'bg-gradient-to-r from-blue-50/90 to-blue-100/70 backdrop-blur-sm hover:from-blue-100/90 hover:to-blue-200/70 text-blue-700 hover:text-blue-800 border-blue-200/60 hover:border-blue-300/70 hover:shadow-blue-500/20'
                      }`}
                      whileHover={!isPrevDisabled ? { scale: 1.05, x: -3 } : {}}
                      whileTap={!isPrevDisabled ? { scale: 0.95 } : {}}
                      style={{
                        background: !isPrevDisabled ? 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.15) 100%)' : undefined,
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span className="font-semibold">Previous</span>
                    </motion.button>
                    
                    {/* FIXED: Premium Dots with Proper Correspondence */}
                    <div className="flex space-x-4">
                      {milestones.map((milestone, index) => (
                        <motion.button
                          key={index}
                          className={`h-3 rounded-full transition-all duration-500 ${
                            selectedMilestone === index 
                              ? `w-12 shadow-lg` 
                              : 'bg-slate-300 w-3 hover:bg-slate-400 hover:w-4'
                          }`}
                          style={{
                            background: selectedMilestone === index 
                              ? `linear-gradient(135deg, ${milestone.pathColor} 0%, ${milestone.pathColor}80 100%)`
                              : undefined,
                            boxShadow: selectedMilestone === index 
                              ? `0 4px 15px ${milestone.pathColor}30`
                              : undefined
                          }}
                          onClick={() => setSelectedMilestone(index)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={nextMilestone}
                      disabled={isNextDisabled}
                      className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all duration-500 border-2 shadow-lg ${
                        isNextDisabled 
                          ? 'bg-gray-50/50 text-gray-400 border-gray-200/50 cursor-not-allowed opacity-50' 
                          : 'bg-gradient-to-r from-blue-50/90 to-blue-100/70 backdrop-blur-sm hover:from-blue-100/90 hover:to-blue-200/70 text-blue-700 hover:text-blue-800 border-blue-200/60 hover:border-blue-300/70 hover:shadow-blue-500/20'
                      }`}
                      whileHover={!isNextDisabled ? { scale: 1.05, x: 3 } : {}}
                      whileTap={!isNextDisabled ? { scale: 0.95 } : {}}
                      style={{
                        background: !isNextDisabled ? 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.15) 100%)' : undefined,
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <span className="font-semibold">Next</span>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* COMPLETELY REDESIGNED Premium Selected Milestone Details */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMilestone}
                  initial={{ opacity: 0, y: 30, scale: 0.95, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95, rotateX: 10 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative overflow-hidden group"
                >
                  <div 
                    className="bg-white/95 backdrop-blur-3xl border border-white/60 rounded-3xl p-10 shadow-[0_35px_100px_rgba(0,0,0,0.12)] relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.85) 100%)',
                      backdropFilter: 'blur(30px)',
                      boxShadow: '0 35px 100px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)'
                    }}
                  >
                    {/* Premium Glassy Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-2000 ease-out"></div>
                    
                    <div className="relative z-10">
                      {/* Premium Header */}
                      <div className="flex items-center space-x-6 mb-8">
                        <motion.div 
                          className="w-24 h-24 rounded-3xl flex items-center justify-center relative overflow-hidden border border-white/60 shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            background: `linear-gradient(135deg, ${milestones[selectedMilestone].pathColor}25 0%, ${milestones[selectedMilestone].pathColor}15 100%)`,
                            boxShadow: `0 15px 40px ${milestones[selectedMilestone].pathColor}20`
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                          {React.createElement(milestones[selectedMilestone].icon, {
                            className: `w-12 h-12 ${milestones[selectedMilestone].textColor} relative z-10`
                          })}
                        </motion.div>
                        <div>
                          <div className="flex items-center space-x-4 mb-3">
                            <motion.span 
                              className={`text-5xl font-bold ${milestones[selectedMilestone].textColor}`}
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.4, type: "spring" }}
                            >
                              {milestones[selectedMilestone].year}
                            </motion.span>
                          </div>
                          <motion.div 
                            className="text-sm text-blue-700 font-semibold bg-blue-100/70 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                          >
                            {milestones[selectedMilestone].achievement}
                          </motion.div>
                        </div>
                      </div>

                      <motion.h4 
                        className="text-3xl font-bold text-slate-900 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                      >
                        {milestones[selectedMilestone].title}
                      </motion.h4>
                      <motion.p 
                        className="text-lg text-slate-600 leading-relaxed mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {milestones[selectedMilestone].description}
                      </motion.p>

                      {/* Premium Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        {milestones[selectedMilestone].metrics.map((metric, metricIndex) => (
                          <motion.div
                            key={metricIndex}
                            className="text-center p-5 backdrop-blur-sm rounded-2xl shadow-lg relative overflow-hidden group/metric border border-white/40"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.3 + metricIndex * 0.1, duration: 0.4, type: "spring" }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            style={{
                              background: `linear-gradient(135deg, ${milestones[selectedMilestone].pathColor}15 0%, ${milestones[selectedMilestone].pathColor}08 100%)`,
                              boxShadow: `0 8px 25px ${milestones[selectedMilestone].pathColor}15`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover/metric:translate-x-[100%] transition-transform duration-500 ease-out"></div>
                            <div className="relative z-10">
                              <CheckCircle className={`w-6 h-6 ${milestones[selectedMilestone].textColor} mx-auto mb-3`} />
                              <div className={`text-sm font-bold ${milestones[selectedMilestone].textColor}`}>
                                {metric}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        {/* COMPLETELY REDESIGNED Auto-Sliding Partners Carousel */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <motion.div 
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm border border-green-200/50 rounded-full px-6 py-3 mb-8 shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Strategic Partnerships</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </motion.div>
            
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="block text-slate-900 mb-2">Our Partners</span>
              <span className="block bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Leading Healthcare Innovation
              </span>
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Collaborating with premier healthcare institutions to advance medical AI and improve patient outcomes worldwide
            </p>
          </motion.div>

          {/* Auto-Sliding Carousel Container */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            {/* Premium Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
            
            {/* Infinitely Sliding Partners */}
            <motion.div
              className="flex space-x-8"
              animate={{
                x: isCarouselPaused ? undefined : [0, -1920] // Move by total width of all cards
              }}
              transition={{
                x: {
                  duration: 30, // Slower, more elegant speed
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{ width: 'calc(320px * 12)' }} // 6 partners × 2 (duplicated) × 320px width
            >
              {/* Render partners twice for infinite loop */}
              {[...partners, ...partners].map((partner, index) => (
                <motion.div
                  key={`partner-${index}`}
                  className="group relative bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-700 overflow-hidden flex-shrink-0"
                  style={{ 
                    width: '320px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)'
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Premium Glassy Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                  
                  <div className="relative z-10">
                    {/* Partner Header */}
                    <div className="flex items-center space-x-4 mb-6">
                      <motion.div 
                        className="text-4xl"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {partner.logo}
                      </motion.div>
                      <div className="flex-1">
                        <motion.div 
                          className={`inline-flex items-center px-3 py-1.5 bg-${partner.color}-100/70 backdrop-blur-sm text-${partner.color}-700 text-xs font-bold rounded-full border border-${partner.color}-200/50 mb-2`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <partner.icon className="w-3 h-3 mr-1" />
                          {partner.type}
                        </motion.div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </motion.div>
                    </div>

                    {/* Partner Name */}
                    <motion.h4 
                      className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      {partner.name}
                    </motion.h4>
                    
                    {/* Partner Description */}
                    <motion.p 
                      className="text-slate-600 leading-relaxed mb-6 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
                    >
                      {partner.description}
                    </motion.p>

                    {/* Partner Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <motion.div 
                        className="text-center p-3 bg-slate-50/80 backdrop-blur-sm rounded-xl border border-slate-200/50"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-sm font-bold text-slate-900">{partner.established}</div>
                        <div className="text-xs text-slate-500">Partnership</div>
                      </motion.div>
                      <motion.div 
                        className="text-center p-3 bg-slate-50/80 backdrop-blur-sm rounded-xl border border-slate-200/50"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-sm font-bold text-slate-900">{partner.projects}</div>
                        <div className="text-xs text-slate-500">Active</div>
                      </motion.div>
                    </div>

                    {/* Partnership Status */}
                    <motion.div 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.2, duration: 0.4 }}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-green-700">Active Partnership</span>
                      </div>
                      <motion.div
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Status Indicator */}
          <motion.div 
            className="flex items-center justify-center mt-8 space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-4 py-2 shadow-sm">
              <motion.div 
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isCarouselPaused ? 'bg-orange-400' : 'bg-green-400'
                }`}
                animate={{
                  scale: isCarouselPaused ? [1, 1.2, 1] : 1,
                  opacity: isCarouselPaused ? [1, 0.5, 1] : 1
                }}
                transition={{
                  duration: 1,
                  repeat: isCarouselPaused ? Infinity : 0
                }}
              />
              <span className="text-xs font-medium text-slate-600">
                {isCarouselPaused ? 'Paused' : 'Auto-sliding'}
              </span>
            </div>
            <div className="text-xs text-slate-500">
              Hover to pause • {partners.length} Partners
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;