import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Award, Target, ArrowUpRight, Sparkles, CheckCircle, Heart, Brain, Shield, Zap, Globe, Star, TrendingUp, BarChart3, Activity, Clock, FileText, Lightbulb, Handshake, MapPin, Calendar, Phone, Mail, ExternalLink } from 'lucide-react';

const AboutARPI = () => {
  const [currentPartner, setCurrentPartner] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Updated partners list with 4 real partners
  const partners = [
    {
      id: 1,
      name: 'Seoul National University Bundang Hospital',
      type: 'Clinical Partner',
      description: 'Advanced cardiac care and AI-powered diagnostic research collaboration',
      logoUrl: null, // Will be added later
      logoFallback: '🏥',
      location: 'Seongnam, South Korea',
      established: '2003'
    },
    {
      id: 2,
      name: 'Seoul National University Hospital',
      type: 'Research Partner',
      description: 'Leading medical research institution for ECG analysis validation',
      logoUrl: null, // Will be added later
      logoFallback: '🏥',
      location: 'Seoul, South Korea',
      established: '1885'
    },
    {
      id: 3,
      name: 'Seoul Metropolitan Boramae Hospital',
      type: 'Clinical Partner',
      description: 'Emergency medicine and real-time ECG analysis implementation',
      logoUrl: null, // Will be added later
      logoFallback: '🏥',
      location: 'Seoul, South Korea',
      established: '1986'
    },
    {
      id: 4,
      name: 'EZCaretech Inc.',
      type: 'Technology Partner',
      description: 'Healthcare technology integration and platform development',
      logoUrl: null, // Will be added later
      logoFallback: '💻',
      location: 'Seoul, South Korea',
      established: '2015'
    }
  ];

  // Auto-slide functionality with hover pause
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentPartner((prev) => (prev + 1) % partners.length);
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, partners.length]);

  const stats = [
    { 
      icon: Users, 
      label: 'Healthcare Professionals', 
      value: '10,000+', 
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Active users worldwide'
    },
    { 
      icon: Heart, 
      label: 'ECGs Analyzed', 
      value: '1M+', 
      gradient: 'from-red-500 to-pink-600',
      description: 'Processed globally'
    },
    { 
      icon: Award, 
      label: 'Accuracy Rate', 
      value: '99.2%', 
      gradient: 'from-emerald-500 to-teal-600',
      description: 'Clinical validation'
    },
    { 
      icon: Globe, 
      label: 'Countries', 
      value: '25+', 
      gradient: 'from-purple-500 to-violet-600',
      description: 'Global presence'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'FDA Breakthrough Device',
      description: 'Designated as breakthrough medical device technology',
      year: '2024',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      icon: Brain,
      title: 'AI Excellence Award',
      description: 'Recognition for outstanding AI innovation in healthcare',
      year: '2023',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliance',
      description: 'Certified for enterprise-grade security standards',
      year: '2023',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Target,
      title: 'Clinical Validation',
      description: 'Peer-reviewed studies confirming diagnostic accuracy',
      year: '2022',
      gradient: 'from-red-500 to-pink-600'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Kim',
      role: 'Chief Medical Officer',
      expertise: 'Cardiology & AI Research',
      avatar: '👩‍⚕️',
      background: 'Former Director of Cardiology at Seoul National University Hospital'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      expertise: 'Machine Learning & Healthcare',
      avatar: '👨‍💻',
      background: 'Ex-Google Health, Stanford PhD in Computer Science'
    },
    {
      name: 'Dr. James Park',
      role: 'Head of Clinical Research',
      expertise: 'Emergency Medicine',
      avatar: '👨‍⚕️',
      background: 'Emergency Medicine Specialist with 15+ years experience'
    },
    {
      name: 'Lisa Wang',
      role: 'VP of Product',
      expertise: 'Healthcare UX & Design',
      avatar: '👩‍💼',
      background: 'Former Apple Health team, Harvard MBA'
    }
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
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
              cardiac diagnostics
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            ARPI Inc. is a leading healthcare AI company dedicated to revolutionizing cardiac care 
            through advanced machine learning and clinical expertise. Our mission is to make 
            accurate ECG analysis accessible to healthcare professionals worldwide.
          </p>
        </motion.div>

        {/* Company Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 text-center transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50 group overflow-hidden"
              whileHover={{ y: -4 }}
            >
              {/* Glassy hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
              
              <motion.div 
                className={`relative w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <div className="relative text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
              <div className="relative text-slate-600 font-medium mb-2">{stat.label}</div>
              <div className="relative text-sm text-slate-500">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Mission */}
          <div className="relative bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            
            <div className="relative flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Our Mission</h3>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-2"></div>
              </div>
            </div>
            <p className="relative text-slate-600 leading-relaxed text-lg">
              To democratize access to world-class cardiac diagnostics by combining cutting-edge 
              artificial intelligence with clinical expertise, enabling healthcare professionals 
              to deliver faster, more accurate patient care regardless of their location or resources.
            </p>
          </div>

          {/* Vision */}
          <div className="relative bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            
            <div className="relative flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Our Vision</h3>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full mt-2"></div>
              </div>
            </div>
            <p className="relative text-slate-600 leading-relaxed text-lg">
              A world where every patient receives optimal cardiac care through AI-enhanced 
              diagnostics, where geographical barriers are eliminated, and where healthcare 
              professionals are empowered with intelligent tools that save lives.
            </p>
          </div>
        </motion.div>

        {/* Our Partners Section - IMPROVED */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-6 shadow-sm">
              <Handshake className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Our Partners</span>
            </div>
            <h3 className="text-4xl font-bold text-slate-800 mb-4">
              Collaborating with premier healthcare institutions
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Working together to advance medical AI and improve patient outcomes worldwide
            </p>
          </div>

          {/* Partners Carousel - COMPLETELY REDESIGNED */}
          <div className="relative max-w-5xl mx-auto">
            <div 
              className="overflow-hidden rounded-3xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div 
                className="flex transition-transform duration-700 ease-out cursor-pointer"
                style={{ 
                  transform: `translateX(-${currentPartner * 100}%)`,
                  width: `${partners.length * 100}%`
                }}
              >
                {partners.map((partner, index) => (
                  <div 
                    key={partner.id} 
                    className="w-full flex-shrink-0 px-4"
                    style={{ width: `${100 / partners.length}%` }}
                  >
                    <motion.div 
                      className="relative bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group overflow-hidden h-full"
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Consistent glassy hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                      
                      {/* Partner Header */}
                      <div className="relative flex items-start space-x-4 mb-6">
                        <div className="w-16 h-16 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                          {partner.logoUrl ? (
                            <img 
                              src={partner.logoUrl} 
                              alt={partner.name}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling!.style.display = 'block';
                              }}
                            />
                          ) : null}
                          <span 
                            className="text-2xl"
                            style={{ display: partner.logoUrl ? 'none' : 'block' }}
                          >
                            {partner.logoFallback}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="inline-flex items-center space-x-2 bg-slate-100/60 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs font-medium text-slate-700">{partner.type}</span>
                          </div>
                          <h4 className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300 leading-tight">
                            {partner.name}
                          </h4>
                        </div>
                      </div>

                      {/* Partner Description */}
                      <div className="relative mb-6">
                        <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                          {partner.description}
                        </p>
                      </div>

                      {/* Partner Details */}
                      <div className="relative flex items-center justify-between pt-4 border-t border-slate-200/50">
                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                          <MapPin className="w-4 h-4" />
                          <span>{partner.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                          <Calendar className="w-4 h-4" />
                          <span>Est. {partner.established}</span>
                        </div>
                      </div>

                      {/* Active Partnership Indicator */}
                      <div className="relative flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-medium">Active Partnership</span>
                        </div>
                        <motion.div
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Indicators - Subtle and Clean */}
            <div className="flex justify-center space-x-2 mt-8">
              {partners.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentPartner(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPartner 
                      ? 'bg-slate-600 scale-110' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-6 shadow-sm">
              <Award className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Recognition & Awards</span>
            </div>
            <h3 className="text-4xl font-bold text-slate-800 mb-4">Industry recognition</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our commitment to excellence has been recognized by leading healthcare and technology organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50 group overflow-hidden"
                whileHover={{ y: -4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                
                <motion.div 
                  className={`relative w-12 h-12 bg-gradient-to-br ${achievement.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <achievement.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="relative text-lg font-bold text-slate-800 mb-2">{achievement.title}</div>
                <div className="relative text-sm text-slate-600 mb-3 leading-relaxed">{achievement.description}</div>
                <div className="relative text-xs text-slate-500 font-medium">{achievement.year}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leadership Team */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-6 shadow-sm">
              <Users className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Leadership Team</span>
            </div>
            <h3 className="text-4xl font-bold text-slate-800 mb-4">Meet our experts</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A diverse team of medical professionals, AI researchers, and healthcare technology experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 text-center transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50 group overflow-hidden"
                whileHover={{ y: -4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                
                <div className="relative text-4xl mb-4">{member.avatar}</div>
                <div className="relative text-lg font-bold text-slate-800 mb-1">{member.name}</div>
                <div className="relative text-sm text-slate-600 font-medium mb-2">{member.role}</div>
                <div className="relative text-xs text-slate-500 mb-4">{member.expertise}</div>
                <div className="relative text-xs text-slate-500 leading-relaxed">{member.background}</div>
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
          <div className="relative bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-12 max-w-4xl mx-auto shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            
            <div className="relative">
              <div className="inline-flex items-center space-x-2 bg-slate-100/60 backdrop-blur-sm border border-slate-200/50 rounded-full px-4 py-2 mb-6">
                <Building2 className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Get in Touch</span>
              </div>
              
              <h3 className="text-3xl font-bold text-slate-800 mb-6">Ready to transform cardiac care?</h3>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join us in revolutionizing healthcare through AI-powered diagnostics. 
                Let's discuss how we can work together.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.button 
                  className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                  <span>Contact Us</span>
                </motion.button>
                
                <motion.button 
                  className="text-slate-600 hover:text-slate-800 font-medium transition-colors duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                  <span>Schedule a Call</span>
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