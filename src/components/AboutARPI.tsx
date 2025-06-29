import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Heart, Users, Award, MapPin, Mail, Phone, Globe, Linkedin, Twitter, Github, Sparkles, Target, TrendingUp, Shield, Brain, Activity, CheckCircle, ArrowUpRight, Star, Calendar, Zap } from 'lucide-react';

const AboutARPI = () => {
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
      metrics: ['10K+ Users', '15 Countries', '99.2% Accuracy'],
      achievement: 'Major Milestone'
    },
    {
      year: '2024',
      quarter: 'Q2',
      title: 'FDA Breakthrough',
      description: 'Received FDA 510(k) clearance for AI-powered ECG analysis, becoming first Korean company in this category',
      icon: Award,
      color: 'emerald',
      metrics: ['FDA 510(k)', 'First in Korea', 'Class II Device'],
      achievement: 'Regulatory Approval'
    },
    {
      year: '2023',
      quarter: 'Q3',
      title: 'Series A Success',
      description: 'Raised $15M Series A led by top-tier VCs to accelerate AI healthcare development and global expansion',
      icon: TrendingUp,
      color: 'blue',
      metrics: ['$15M Raised', 'Series A', 'Global VCs'],
      achievement: 'Funding Round'
    },
    {
      year: '2021',
      quarter: 'Q1',
      title: 'ARPI Founded',
      description: 'Company established with mission to revolutionize healthcare through artificial intelligence and machine learning',
      icon: Building2,
      color: 'purple',
      metrics: ['Founded', 'AI Focus', 'Healthcare'],
      achievement: 'Company Launch'
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

        {/* Dramatically Enhanced Milestones Section */}
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
              Key Milestones
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our journey of innovation and growth in healthcare AI
            </p>
          </motion.div>

          <div className="relative">
            {/* Enhanced Timeline Line with Gradient and Animation */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 rounded-full"
              style={{ height: '100%' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <motion.div 
                      className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      {/* Enhanced Glassy Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                      
                      <div className="relative z-10">
                        {/* Header with Icon and Year */}
                        <div className="flex items-center space-x-4 mb-6">
                          <motion.div 
                            className={`w-12 h-12 bg-${milestone.color}-100 rounded-2xl flex items-center justify-center relative overflow-hidden`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <milestone.icon className={`w-6 h-6 text-${milestone.color}-600`} />
                          </motion.div>
                          <div>
                            <div className={`text-3xl font-bold text-${milestone.color}-600`}>
                              {milestone.year}
                            </div>
                            <div className="text-sm text-slate-500 font-medium">
                              {milestone.quarter} • {milestone.achievement}
                            </div>
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-slate-900 mb-3">{milestone.title}</h4>
                        <p className="text-slate-600 leading-relaxed mb-6">{milestone.description}</p>

                        {/* Metrics Pills */}
                        <div className="flex flex-wrap gap-2">
                          {milestone.metrics.map((metric, metricIndex) => (
                            <motion.span
                              key={metricIndex}
                              className={`inline-flex items-center px-3 py-1 bg-${milestone.color}-100/50 text-${milestone.color}-700 text-xs font-medium rounded-full border border-${milestone.color}-200/50`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
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
                  </div>

                  {/* Enhanced Timeline Node */}
                  <div className="relative z-10">
                    <motion.div 
                      className={`w-8 h-8 bg-${milestone.color}-500 rounded-full border-4 border-white shadow-lg relative overflow-hidden`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.5, type: "spring" }}
                      whileHover={{ scale: 1.2 }}
                    >
                      {/* Pulsing Effect */}
                      <motion.div 
                        className={`absolute inset-0 bg-${milestone.color}-400 rounded-full`}
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 0, 0.7]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Partners & Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Enhanced Partners */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
              <Users className="w-8 h-8 mr-3 text-blue-600" />
              Our Partners
            </h3>
            <div className="space-y-6">
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

          {/* Enhanced Contact & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
              <Mail className="w-8 h-8 mr-3 text-red-600" />
              Contact Us
            </h3>
            
            {/* Enhanced Contact Information */}
            <div className="space-y-6 mb-8">
              {[
                { icon: MapPin, text: 'Seoul, South Korea', href: '#location', color: 'blue' },
                { icon: Mail, text: 'contact@ecgbuddy.ai', href: 'mailto:contact@ecgbuddy.ai', color: 'red' },
                { icon: Phone, text: '+82 (0)2-1234-5678', href: 'tel:+82212345678', color: 'green' },
                { icon: Globe, text: 'www.arpi.ai', href: 'https://arpi.ai', color: 'purple' }
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-4 text-slate-600 hover:text-slate-900 transition-all duration-300 group bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:shadow-lg relative overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  {/* Glassy Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                  
                  <motion.div 
                    className={`w-12 h-12 bg-${contact.color}-100 rounded-xl flex items-center justify-center group-hover:bg-${contact.color}-200 transition-colors duration-300 relative z-10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <contact.icon className={`w-5 h-5 text-${contact.color}-600`} />
                  </motion.div>
                  <span className="font-medium relative z-10">{contact.text}</span>
                </motion.a>
              ))}
            </div>

            {/* Enhanced Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, href: '#linkedin', label: 'LinkedIn', color: 'blue' },
                  { icon: Twitter, href: '#twitter', label: 'Twitter', color: 'sky' },
                  { icon: Github, href: '#github', label: 'GitHub', color: 'slate' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-14 h-14 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl flex items-center justify-center text-slate-600 hover:text-${social.color}-600 hover:bg-${social.color}-50 hover:border-${social.color}-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}
                    whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {/* Glassy Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-out"></div>
                    <social.icon className="w-6 h-6 relative z-10" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutARPI;