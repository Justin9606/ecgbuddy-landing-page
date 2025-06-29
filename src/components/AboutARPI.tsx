import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Heart, Users, Award, MapPin, Mail, Phone, Globe, Linkedin, Twitter, Github, Sparkles, Target, TrendingUp, Shield, Brain, Activity, CheckCircle, ArrowUpRight, Star } from 'lucide-react';

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
      link: '#hero'
    },
    {
      name: 'CardioInsight Pro',
      description: 'Advanced cardiac monitoring and analytics suite',
      status: 'Coming Soon',
      icon: Activity,
      gradient: 'from-blue-500 to-indigo-600',
      link: '#'
    },
    {
      name: 'MedAI Platform',
      description: 'Comprehensive medical AI infrastructure and tools',
      status: 'In Development',
      icon: Brain,
      gradient: 'from-purple-500 to-violet-600',
      link: '#'
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'ECG Buddy Launch',
      description: 'Successfully launched ECG Buddy with 10,000+ healthcare professionals',
      icon: Target,
      color: 'red'
    },
    {
      year: '2023',
      title: 'FDA Approval',
      description: 'Received FDA approval for AI-powered ECG analysis technology',
      icon: Award,
      color: 'emerald'
    },
    {
      year: '2022',
      title: 'Series A Funding',
      description: 'Raised $15M Series A to accelerate AI healthcare development',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      year: '2021',
      title: 'Company Founded',
      description: 'ARPI Inc. established with mission to revolutionize healthcare AI',
      icon: Building2,
      color: 'purple'
    }
  ];

  const partners = [
    { name: 'Seoul National University Hospital', type: 'Research Partner' },
    { name: 'Samsung Medical Center', type: 'Clinical Partner' },
    { name: 'Asan Medical Center', type: 'Technology Partner' },
    { name: 'Korean Medical Association', type: 'Industry Partner' }
  ];

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
            <span className="text-sm font-medium text-slate-700">About the Company</span>
          </div>
          
          {/* ARPI Logo Placeholder */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-6">
              <span className="text-3xl font-bold text-white">ARPI</span>
            </div>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="block text-slate-900 mb-2">
              ARPI Inc.
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Advancing Healthcare AI
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            ARPI Inc. is a pioneering healthcare technology company dedicated to revolutionizing 
            medical diagnostics through artificial intelligence. Our flagship product, ECG Buddy, 
            represents our commitment to empowering healthcare professionals with cutting-edge AI tools.
          </p>
        </motion.div>

        {/* Products Section */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Products</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Innovative AI-powered solutions transforming healthcare delivery and patient outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50"
                whileHover={{ y: -4 }}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <product.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === 'Live' ? 'bg-green-100 text-green-700' :
                      product.status === 'Coming Soon' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {product.status}
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-3">{product.name}</h4>
                  <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

                  <a
                    href={product.link}
                    className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-medium transition-colors duration-300"
                  >
                    <span>Learn more</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Milestones Section */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Key Milestones</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our journey of innovation and growth in healthcare AI
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-10 h-10 bg-${milestone.color}-100 rounded-xl flex items-center justify-center`}>
                          <milestone.icon className={`w-5 h-5 text-${milestone.color}-600`} />
                        </div>
                        <div className={`text-2xl font-bold text-${milestone.color}-600`}>{milestone.year}</div>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{milestone.title}</h4>
                      <p className="text-slate-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <div className={`w-6 h-6 bg-${milestone.color}-500 rounded-full border-4 border-white shadow-lg`}></div>
                  </div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Partners & Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Partners */}
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
            <div className="space-y-4">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{partner.name}</div>
                      <div className="text-sm text-slate-600">{partner.type}</div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact & Social */}
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
            
            {/* Contact Information */}
            <div className="space-y-6 mb-8">
              {[
                { icon: MapPin, text: 'Seoul, South Korea', href: '#location' },
                { icon: Mail, text: 'contact@arpi.ai', href: 'mailto:contact@arpi.ai' },
                { icon: Phone, text: '+82 (0)2-1234-5678', href: 'tel:+82212345678' },
                { icon: Globe, text: 'www.arpi.ai', href: 'https://arpi.ai' }
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-4 text-slate-600 hover:text-slate-900 transition-all duration-300 group bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl p-4 hover:shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-300">
                    <contact.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{contact.text}</span>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
                  { icon: Twitter, href: '#twitter', label: 'Twitter' },
                  { icon: Github, href: '#github', label: 'GitHub' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
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