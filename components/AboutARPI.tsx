'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Heart, Users, Target, Award, Sparkles, ArrowRight, Globe, Brain, Shield, Zap, CheckCircle, Star, TrendingUp } from 'lucide-react';

const AboutARPI = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const stats = [
    { 
      label: 'Years of Research', 
      value: '8+', 
      icon: Target,
      color: 'red',
      description: 'Dedicated to AI healthcare innovation'
    },
    { 
      label: 'Healthcare Partners', 
      value: '50+', 
      icon: Users,
      color: 'pink',
      description: 'Leading medical institutions worldwide'
    },
    { 
      label: 'AI Models Trained', 
      value: '25+', 
      icon: Brain,
      color: 'rose',
      description: 'Specialized cardiac analysis algorithms'
    },
    { 
      label: 'Patient Lives Impacted', 
      value: '1M+', 
      icon: Heart,
      color: 'red',
      description: 'Through our healthcare solutions'
    }
  ];

  const milestones = [
    {
      year: '2016',
      title: 'ARPI Inc. Founded',
      description: 'Established with a vision to revolutionize healthcare through AI',
      icon: Building2,
      gradient: 'from-slate-600 to-slate-700'
    },
    {
      year: '2018',
      title: 'First AI Model',
      description: 'Developed our first cardiac analysis algorithm',
      icon: Brain,
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      year: '2020',
      title: 'FDA Approval',
      description: 'Received FDA clearance for medical device classification',
      icon: Award,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      year: '2022',
      title: 'ECG Buddy Launch',
      description: 'Launched our flagship ECG analysis platform',
      icon: Heart,
      gradient: 'from-red-500 to-pink-600'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Serving healthcare professionals in 50+ countries',
      icon: Globe,
      gradient: 'from-blue-500 to-indigo-600'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Pushing the boundaries of AI in healthcare to create breakthrough solutions',
      icon: Zap,
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Accuracy',
      description: 'Delivering precise, reliable results that healthcare professionals can trust',
      icon: Target,
      gradient: 'from-red-500 to-pink-600'
    },
    {
      title: 'Security',
      description: 'Maintaining the highest standards of data protection and patient privacy',
      icon: Shield,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Collaboration',
      description: 'Working closely with medical professionals to understand real-world needs',
      icon: Users,
      gradient: 'from-purple-500 to-violet-600'
    }
  ];

  return (
    <section id="about-arpi-section" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(71, 85, 105, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-slate-100/30 to-gray-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-red-100/30 to-pink-100/30 rounded-full blur-3xl"></div>
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
            <span className="text-sm font-medium text-slate-700">About Our Company</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="block text-slate-900 mb-2">
              Meet ARPI Inc.
            </span>
            <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
              Pioneering AI Healthcare
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Founded in Seoul, South Korea, ARPI Inc. is at the forefront of artificial intelligence 
            innovation in healthcare. We're dedicated to transforming how medical professionals 
            analyze and interpret cardiac data through cutting-edge AI technology.
          </p>
        </motion.div>

        {/* Company Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 text-center transition-all duration-500 shadow-sm hover:shadow-lg hover:border-slate-300/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                {stat.value}
              </div>
              <div className="text-slate-800 font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-12 mb-20 text-center shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="inline-flex items-center space-x-2 bg-red-100/50 backdrop-blur-sm border border-red-200/50 rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-700">Our Mission</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Empowering Healthcare Through AI Innovation
          </h3>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
            At ARPI Inc., we believe that artificial intelligence has the power to revolutionize 
            healthcare by making accurate, rapid diagnosis accessible to medical professionals 
            worldwide. Our mission is to bridge the gap between complex medical data and 
            actionable clinical insights.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button 
              onClick={() => scrollToSection('mobile-download')}
              className="group relative bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 flex items-center space-x-2 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
              <span className="relative z-10">Try ECG Buddy</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </motion.button>
            
            <button className="text-slate-600 hover:text-slate-800 font-medium transition-colors duration-300">
              Learn More About Our Research
            </button>
          </div>
        </motion.div>

        {/* Company Timeline */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Our Journey</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From a small research team to a global healthcare AI leader
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-200 via-pink-200 to-rose-200 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${milestone.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                          <milestone.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-800">{milestone.year}</div>
                          <div className="text-lg font-semibold text-slate-700">{milestone.title}</div>
                        </div>
                      </div>
                      <p className="text-slate-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="relative z-10 w-6 h-6 bg-white border-4 border-red-400 rounded-full shadow-lg"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 text-center transition-all duration-500 shadow-sm hover:shadow-lg hover:border-slate-300/50 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div 
                className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg transition-all duration-300`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <value.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h4 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
                {value.title}
              </h4>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;