import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Award, 
  Target, 
  TrendingUp, 
  Globe, 
  Heart, 
  Brain, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Github,
  ExternalLink,
  Star,
  Activity,
  BarChart3,
  Clock,
  Lightbulb,
  Handshake
} from 'lucide-react';

const AboutARPI = () => {
  const [currentPartner, setCurrentPartner] = useState(0);

  // Strategic Partners - Only the 4 specified partners
  const strategicPartners = [
    {
      name: 'Seoul National University Bundang Hospital',
      logo: '🏥'
    },
    {
      name: 'Seoul National University Hospital',
      logo: '🏥'
    },
    {
      name: 'Seoul Metropolitan Boramae Hospital',
      logo: '🏥'
    },
    {
      name: 'EZCaretech Inc.',
      logo: '🏢'
    }
  ];

  // Auto-slide for partners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % strategicPartners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextPartner = () => {
    setCurrentPartner((prev) => (prev + 1) % strategicPartners.length);
  };

  const prevPartner = () => {
    setCurrentPartner((prev) => (prev - 1 + strategicPartners.length) % strategicPartners.length);
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
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Side - Company Story */}
          <div className="space-y-8">
            <div className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
                To democratize advanced cardiac diagnostics through artificial intelligence, 
                making world-class ECG analysis accessible to healthcare providers everywhere, 
                ultimately saving lives through faster, more accurate diagnoses.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
                To become the global leader in AI-powered medical diagnostics, 
                setting new standards for accuracy, speed, and accessibility in healthcare technology 
                while maintaining the highest levels of patient data security and privacy.
              </p>
            </div>
          </div>

          {/* Right Side - Key Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { 
                icon: Users, 
                value: '50+', 
                label: 'Team Members',
                description: 'AI researchers, medical experts, and engineers',
                gradient: 'from-blue-500 to-cyan-600'
              },
              { 
                icon: Award, 
                value: '15+', 
                label: 'Patents Filed',
                description: 'Innovative AI algorithms and medical technologies',
                gradient: 'from-purple-500 to-pink-600'
              },
              { 
                icon: Globe, 
                value: '25+', 
                label: 'Countries',
                description: 'Global reach with healthcare partnerships',
                gradient: 'from-emerald-500 to-teal-600'
              },
              { 
                icon: TrendingUp, 
                value: '99.2%', 
                label: 'AI Accuracy',
                description: 'Clinical validation across diverse populations',
                gradient: 'from-orange-500 to-red-600'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-800 font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-slate-600 leading-relaxed">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Our Core Values</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do at ARPI Inc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Innovation Excellence',
                description: 'Pushing the boundaries of AI and medical technology to create breakthrough solutions that transform healthcare delivery.',
                gradient: 'from-violet-500 to-purple-600'
              },
              {
                icon: Shield,
                title: 'Patient Privacy',
                description: 'Maintaining the highest standards of data security and patient confidentiality in all our products and services.',
                gradient: 'from-emerald-500 to-teal-600'
              },
              {
                icon: Heart,
                title: 'Healthcare Impact',
                description: 'Focusing on solutions that directly improve patient outcomes and support healthcare professionals in their critical work.',
                gradient: 'from-red-500 to-pink-600'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h4>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strategic Partnerships - UPDATED SECTION */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Strategic Partnerships</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Collaborating with leading healthcare institutions to advance AI-powered medical diagnostics
            </p>
          </div>

          {/* Partner Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-12 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPartner}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-6">
                    {strategicPartners[currentPartner].logo}
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    {strategicPartners[currentPartner].name}
                  </h4>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center space-x-4 mt-8">
                <button
                  onClick={prevPartner}
                  className="w-12 h-12 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots Indicator */}
                <div className="flex space-x-2">
                  {strategicPartners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPartner(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentPartner 
                          ? 'bg-slate-900' 
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextPartner}
                  className="w-12 h-12 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Leadership Team */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Leadership Team</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experienced leaders driving innovation in AI and healthcare technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Kim',
                role: 'Chief Executive Officer',
                avatar: '👩‍💼',
                background: 'Former Director of Cardiology AI Research at Seoul National University',
                expertise: ['AI in Healthcare', 'Cardiology', 'Medical Device Development']
              },
              {
                name: 'Dr. Michael Chen',
                role: 'Chief Technology Officer',
                avatar: '👨‍💻',
                background: 'Ex-Google AI Research Scientist with 15+ years in machine learning',
                expertise: ['Machine Learning', 'Computer Vision', 'Medical AI']
              },
              {
                name: 'Dr. Lisa Park',
                role: 'Chief Medical Officer',
                avatar: '👩‍⚕️',
                background: 'Board-certified Cardiologist with 20+ years clinical experience',
                expertise: ['Clinical Cardiology', 'ECG Interpretation', 'Medical Validation']
              }
            ].map((leader, index) => (
              <motion.div
                key={index}
                className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{leader.avatar}</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{leader.name}</h4>
                  <div className="text-blue-600 font-semibold mb-4">{leader.role}</div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{leader.background}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-800 mb-2">Expertise:</div>
                  {leader.expertise.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-sm text-slate-600">{skill}</span>
                    </div>
                  ))}
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
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-12 shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">Get in Touch</h3>
            </div>
            
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Ready to transform your healthcare practice with AI-powered ECG analysis? 
              Contact our team to learn more about ARPI's innovative solutions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Mail, label: 'Email', value: 'contact@arpi.ai', href: 'mailto:contact@arpi.ai' },
                { icon: Phone, label: 'Phone', value: '+82 (0)2-1234-5678', href: 'tel:+82212345678' },
                { icon: MapPin, label: 'Address', value: 'Seoul, South Korea', href: '#location' }
              ].map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex flex-col items-center space-y-3 p-4 rounded-2xl hover:bg-white/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-slate-800">{contact.label}</div>
                    <div className="text-slate-600">{contact.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex items-center justify-center space-x-4">
              {[
                { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
                { icon: Twitter, href: '#twitter', label: 'Twitter' },
                { icon: Github, href: '#github', label: 'GitHub' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;