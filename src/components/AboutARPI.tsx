import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Heart, Users, Award, MapPin, Mail, Phone, Globe, Linkedin, Twitter, Github, Sparkles, Target, TrendingUp, Shield, Brain, Activity, CheckCircle, ArrowUpRight, Star, Calendar, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const AboutARPI = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

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

  const milestones = [
    {
      year: '2024',
      quarter: 'Q4',
      title: 'Global Expansion',
      description: 'ECG Buddy reaches 10,000+ healthcare professionals across 15 countries with 99.2% accuracy rate',
      icon: Target,
      color: 'red',
      bgColor: 'bg-red-500',
      lightColor: 'bg-red-100',
      textColor: 'text-red-600',
      metrics: ['10K+ Users', '15 Countries', '99.2% Accuracy'],
      achievement: 'Major Milestone',
      position: { x: 85, y: 20 }
    },
    {
      year: '2024',
      quarter: 'Q2',
      title: 'FDA Breakthrough',
      description: 'Received FDA 510(k) clearance for AI-powered ECG analysis, becoming first Korean company in this category',
      icon: Award,
      color: 'emerald',
      bgColor: 'bg-emerald-500',
      lightColor: 'bg-emerald-100',
      textColor: 'text-emerald-600',
      metrics: ['FDA 510(k)', 'First in Korea', 'Class II Device'],
      achievement: 'Regulatory Approval',
      position: { x: 65, y: 60 }
    },
    {
      year: '2023',
      quarter: 'Q3',
      title: 'Series A Success',
      description: 'Raised $15M Series A led by top-tier VCs to accelerate AI healthcare development and global expansion',
      icon: TrendingUp,
      color: 'blue',
      bgColor: 'bg-blue-500',
      lightColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      metrics: ['$15M Raised', 'Series A', 'Global VCs'],
      achievement: 'Funding Round',
      position: { x: 35, y: 40 }
    },
    {
      year: '2021',
      quarter: 'Q1',
      title: 'ARPI Founded',
      description: 'Company established with mission to revolutionize healthcare through artificial intelligence and machine learning',
      icon: Building2,
      color: 'purple',
      bgColor: 'bg-purple-500',
      lightColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      metrics: ['Founded', 'AI Focus', 'Healthcare'],
      achievement: 'Company Launch',
      position: { x: 15, y: 80 }
    }
  ];

  const partners = [
    { 
      name: 'Seoul National University Hospital', 
      type: 'Research Partner',
      description: 'Clinical validation and research collaboration',
      icon: Brain,
      color: 'blue'
    },
    { 
      name: 'Samsung Medical Center', 
      type: 'Clinical Partner',
      description: 'Real-world deployment and testing',
      icon: Heart,
      color: 'red'
    },
    { 
      name: 'Asan Medical Center', 
      type: 'Technology Partner',
      description: 'AI algorithm development and optimization',
      icon: Zap,
      color: 'yellow'
    },
    { 
      name: 'Korean Medical Association', 
      type: 'Industry Partner',
      description: 'Standards development and advocacy',
      icon: Users,
      color: 'green'
    }
  ];

  const nextMilestone = () => {
    setSelectedMilestone((prev) => (prev + 1) % milestones.length);
  };

  const prevMilestone = () => {
    setSelectedMilestone((prev) => (prev - 1 + milestones.length) % milestones.length);
  };

  return (
    <section id="about-arpi-section" className="relative py-32 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <motion.div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.3) 1px, transparent 0)`,
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

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-rose-100/30 to-pink-100/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
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
            className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-8 shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Building2 className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">About the Company</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
              className="w-24 h-24 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-6 relative overflow-hidden group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
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
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
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
              <Sparkles className="w-8 h-8 mr-3 text-purple-600" />
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

        {/* COMPLETELY REDESIGNED Milestones Section - Interactive Journey Map */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h3 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center">
              <Calendar className="w-8 h-8 mr-3 text-blue-600" />
              Our Journey
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Navigate through our key milestones and achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Journey Map */}
            <motion.div 
              className="relative bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_20px_70px_rgba(0,0,0,0.1)] overflow-hidden group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Glassy Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
              
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  Journey Map
                </h4>
                
                {/* Interactive SVG Path */}
                <div className="relative h-80 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Animated Path */}
                    <motion.path
                      d="M 15,80 Q 35,20 65,60 Q 85,10 85,20"
                      stroke="url(#gradient)"
                      strokeWidth="0.5"
                      fill="none"
                      strokeDasharray="2,1"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                    
                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="25%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#10B981" />
                        <stop offset="75%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#EF4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Interactive Milestone Dots */}
                  {milestones.map((milestone, index) => (
                    <motion.button
                      key={index}
                      className={`absolute w-6 h-6 ${milestone.bgColor} rounded-full border-4 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-300 ${
                        selectedMilestone === index ? 'scale-125 ring-4 ring-blue-200' : ''
                      }`}
                      style={{
                        left: `${milestone.position.x}%`,
                        top: `${milestone.position.y}%`
                      }}
                      onClick={() => setSelectedMilestone(index)}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* Pulsing Effect for Active */}
                      {selectedMilestone === index && (
                        <motion.div 
                          className={`absolute inset-0 ${milestone.bgColor} rounded-full opacity-30`}
                          animate={{ 
                            scale: [1, 2, 1],
                            opacity: [0.3, 0, 0.3]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </motion.button>
                  ))}
                  
                  {/* Year Labels */}
                  {milestones.map((milestone, index) => (
                    <div
                      key={`label-${index}`}
                      className="absolute text-xs font-bold text-slate-600 transform -translate-x-1/2"
                      style={{
                        left: `${milestone.position.x}%`,
                        top: `${milestone.position.y + 8}%`
                      }}
                    >
                      {milestone.year}
                    </div>
                  ))}
                </div>
                
                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-6">
                  <motion.button
                    onClick={prevMilestone}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Previous</span>
                  </motion.button>
                  
                  <div className="flex space-x-2">
                    {milestones.map((_, index) => (
                      <motion.button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          selectedMilestone === index ? 'bg-blue-500 w-6' : 'bg-slate-300'
                        }`}
                        onClick={() => setSelectedMilestone(index)}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                  
                  <motion.button
                    onClick={nextMilestone}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm font-medium">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Selected Milestone Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMilestone}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_20px_70px_rgba(0,0,0,0.1)] relative overflow-hidden group"
                >
                  {/* Glassy Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center space-x-4 mb-6">
                      <motion.div 
                        className={`w-16 h-16 ${milestones[selectedMilestone].lightColor} rounded-2xl flex items-center justify-center relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <milestones[selectedMilestone].icon className={`w-8 h-8 ${milestones[selectedMilestone].textColor}`} />
                      </motion.div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`text-3xl font-bold ${milestones[selectedMilestone].textColor}`}>
                            {milestones[selectedMilestone].year}
                          </span>
                          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                            {milestones[selectedMilestone].quarter}
                          </span>
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                          {milestones[selectedMilestone].achievement}
                        </div>
                      </div>
                    </div>

                    <h4 className="text-2xl font-bold text-slate-900 mb-4">
                      {milestones[selectedMilestone].title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {milestones[selectedMilestone].description}
                    </p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-2">
                      {milestones[selectedMilestone].metrics.map((metric, metricIndex) => (
                        <motion.span
                          key={metricIndex}
                          className={`inline-flex items-center px-3 py-1 ${milestones[selectedMilestone].lightColor} ${milestones[selectedMilestone].textColor} text-sm font-medium rounded-full border border-${milestones[selectedMilestone].color}-200/50`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: metricIndex * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {metric}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Partners Section (Removed Contact) */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h3 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 mr-3 text-blue-600" />
              Our Partners
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Collaborating with leading healthcare institutions to advance medical AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-500 group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                {/* Glassy Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                
                <div className="relative z-10 flex items-center space-x-4">
                  <motion.div 
                    className={`w-12 h-12 bg-${partner.color}-100 rounded-xl flex items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <partner.icon className={`w-6 h-6 text-${partner.color}-600`} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 mb-1">{partner.name}</div>
                    <div className="text-sm text-slate-600 mb-2">{partner.description}</div>
                    <div className={`inline-flex items-center px-2 py-1 bg-${partner.color}-100/50 text-${partner.color}-700 text-xs font-medium rounded-full`}>
                      {partner.type}
                    </div>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;