import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Award, Target, ChevronLeft, ChevronRight, Sparkles, Heart, Brain, Shield, Globe, TrendingUp, CheckCircle, Star, ArrowRight, Zap, Activity, BarChart3, Clock, UserCheck, Lightbulb, Rocket, Eye, Handshake } from 'lucide-react';

const AboutARPI = () => {
  const [currentPartner, setCurrentPartner] = useState(0);

  // ONLY the 4 partners you specified - clean and simple
  const partners = [
    {
      name: 'Seoul National University Bundang Hospital',
      logo: Building2 // Using Building2 icon as placeholder for hospital logo
    },
    {
      name: 'Seoul National University Hospital',
      logo: Building2 // Using Building2 icon as placeholder for hospital logo
    },
    {
      name: 'Seoul Metropolitan Boramae Hospital',
      logo: Building2 // Using Building2 icon as placeholder for hospital logo
    },
    {
      name: 'EZCaretech Inc.',
      logo: Building2 // Using Building2 icon as placeholder for company logo
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextPartner = () => {
    setCurrentPartner((prev) => (prev + 1) % partners.length);
  };

  const prevPartner = () => {
    setCurrentPartner((prev) => (prev - 1 + partners.length) % partners.length);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Animation variants
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

  const stats = [
    { label: 'Years of Innovation', value: '8+', icon: Clock, color: 'red' },
    { label: 'Healthcare Partners', value: '50+', icon: Handshake, color: 'pink' },
    { label: 'Research Papers', value: '25+', icon: Award, color: 'rose' },
    { label: 'AI Models Deployed', value: '12+', icon: Brain, color: 'red' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Innovation',
      description: 'Every solution we develop prioritizes patient safety, comfort, and improved health outcomes.',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      icon: Brain,
      title: 'Scientific Excellence',
      description: 'Rigorous research methodology and evidence-based development guide all our innovations.',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'Building secure, dependable healthcare solutions that professionals can trust with confidence.',
      gradient: 'from-rose-500 to-red-600'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Expanding access to advanced healthcare technology worldwide, bridging gaps in medical care.',
      gradient: 'from-red-600 to-pink-500'
    }
  ];

  const milestones = [
    {
      year: '2016',
      title: 'ARPI Founded',
      description: 'Established with a vision to revolutionize healthcare through AI innovation.',
      icon: Rocket,
      gradient: 'from-red-500 to-pink-600'
    },
    {
      year: '2018',
      title: 'First AI Model',
      description: 'Launched our pioneering ECG analysis algorithm with breakthrough accuracy.',
      icon: Brain,
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      year: '2020',
      title: 'Clinical Validation',
      description: 'Achieved FDA approval and began large-scale clinical deployments.',
      icon: Award,
      gradient: 'from-rose-500 to-red-600'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Extended our reach to healthcare systems across multiple continents.',
      icon: Globe,
      gradient: 'from-red-600 to-pink-500'
    },
    {
      year: '2024',
      title: 'Next Generation',
      description: 'Introducing ECG Buddy with advanced real-time analysis capabilities.',
      icon: Zap,
      gradient: 'from-pink-600 to-red-500'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Kim',
      role: 'Chief Executive Officer',
      expertise: 'Cardiology & Healthcare Innovation',
      avatar: '👩‍⚕️',
      background: 'Former Director of Cardiology at Seoul National University Hospital'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Chief Technology Officer',
      expertise: 'AI & Machine Learning',
      avatar: '👨‍💻',
      background: 'PhD in Computer Science, 15+ years in medical AI research'
    },
    {
      name: 'Dr. Lisa Park',
      role: 'Chief Medical Officer',
      expertise: 'Clinical Research & Validation',
      avatar: '👩‍⚕️',
      background: 'Board-certified cardiologist with 20+ years clinical experience'
    },
    {
      name: 'James Wilson',
      role: 'Chief Operating Officer',
      expertise: 'Healthcare Operations & Strategy',
      avatar: '👨‍💼',
      background: 'Former VP of Operations at leading healthcare technology companies'
    }
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-red-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-rose-100/20 to-red-100/20 rounded-full blur-3xl"></div>
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
            <span className="block bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              AI-powered healthcare
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            ARPI Inc. is a leading healthcare technology company dedicated to transforming 
            cardiac care through innovative AI solutions that empower medical professionals 
            and improve patient outcomes worldwide.
          </p>
        </motion.div>

        {/* Company Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/80 hover:shadow-lg"
            >
              <div className="flex items-center justify-center mb-3">
                <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
              </div>
              <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            variants={itemVariants}
            className="bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To democratize access to advanced cardiac diagnostics by developing 
              AI-powered solutions that enhance clinical decision-making, reduce 
              diagnostic errors, and ultimately save lives through early detection 
              and accurate interpretation of cardiac conditions.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To become the global leader in AI-driven healthcare solutions, 
              creating a world where every healthcare provider has access to 
              intelligent diagnostic tools that deliver specialist-level insights 
              at the point of care, regardless of location or resources.
            </p>
          </motion.div>
        </motion.div>

        {/* Core Values */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that guide our innovation and shape our commitment to healthcare excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 transition-all duration-300 hover:bg-white/60 hover:shadow-lg"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">{value.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strategic Partnerships - CLEAN AND SIMPLE */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Strategic Partnerships</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Collaborating with leading healthcare institutions to advance cardiac care innovation.
            </p>
          </motion.div>

          {/* Clean Partner Slider */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-12 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPartner}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  {/* Partner Logo */}
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <partners[currentPartner].logo className="w-12 h-12 text-white" />
                  </div>
                  
                  {/* Partner Name */}
                  <h4 className="text-2xl font-bold text-slate-900">
                    {partners[currentPartner].name}
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
                  {partners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPartner(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentPartner ? 'bg-slate-600' : 'bg-slate-300 hover:bg-slate-400'
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

        {/* Company Timeline */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Journey</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Key milestones in our mission to transform healthcare through AI innovation.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-200 via-pink-200 to-rose-200 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6">
                      <div className={`w-12 h-12 bg-gradient-to-br ${milestone.gradient} rounded-xl flex items-center justify-center mb-4 ${index % 2 === 0 ? 'ml-auto' : ''}`}>
                        <milestone.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-slate-900 mb-2">{milestone.year}</div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-2">{milestone.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="relative z-10 w-6 h-6 bg-white border-4 border-red-300 rounded-full shadow-lg"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
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
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Leadership Team</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Experienced leaders combining medical expertise with cutting-edge technology innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/60 hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h4 className="text-lg font-semibold text-slate-900 mb-1">{member.name}</h4>
                <div className="text-red-600 font-medium text-sm mb-2">{member.role}</div>
                <div className="text-slate-600 text-xs mb-3">{member.expertise}</div>
                <p className="text-slate-500 text-xs leading-relaxed">{member.background}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-12 max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Partner with ARPI</h3>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Join us in revolutionizing healthcare. Whether you're a healthcare institution, 
              research organization, or technology partner, let's work together to improve 
              patient outcomes through innovative AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => scrollToSection('mobile-download')}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;