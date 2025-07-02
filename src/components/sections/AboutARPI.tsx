"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Users,
  Award,
  Globe,
  Sparkles,
  TrendingUp,
  Building2,
  Lightbulb,
  Target,
  Rocket,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  MapPin,
  Trophy,
  Zap,
  Brain,
  Shield,
  Activity,
} from "lucide-react";

const AboutARPI = () => {
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);

  // Enhanced timeline data with icons and more details
  const timelineEvents = [
    {
      id: 1,
      year: "2020",
      quarter: "Q1",
      title: "ARPI Founded",
      description: "Founded with a vision to revolutionize cardiac care through AI technology. Started with a small team of passionate engineers and medical professionals.",
      icon: Lightbulb,
      gradient: "from-blue-500 to-indigo-600",
      achievements: ["Initial funding secured", "Core team assembled", "Research partnerships established"],
      location: "Seoul, Korea",
      teamSize: "5 people"
    },
    {
      id: 2,
      year: "2021",
      quarter: "Q2",
      title: "First AI Model",
      description: "Developed our first ECG analysis AI model with 95% accuracy. Began clinical validation studies with leading medical institutions.",
      icon: Brain,
      gradient: "from-purple-500 to-violet-600",
      achievements: ["AI model v1.0 released", "Clinical trials initiated", "Patent applications filed"],
      location: "Seoul, Korea",
      teamSize: "15 people"
    },
    {
      id: 3,
      year: "2022",
      quarter: "Q3",
      title: "Platform Launch",
      description: "Launched ECG Buddy platform with real-time analysis capabilities. Achieved HIPAA compliance and medical device certification.",
      icon: Rocket,
      gradient: "from-emerald-500 to-teal-600",
      achievements: ["Platform beta launch", "HIPAA compliance", "First 1,000 users"],
      location: "Seoul, Korea",
      teamSize: "35 people"
    },
    {
      id: 4,
      year: "2023",
      quarter: "Q1",
      title: "Global Expansion",
      description: "Expanded to international markets with multi-language support. Reached 10,000+ healthcare professionals worldwide.",
      icon: Globe,
      gradient: "from-orange-500 to-red-500",
      achievements: ["International launch", "10K+ users", "Multi-language support"],
      location: "Global",
      teamSize: "75 people"
    },
    {
      id: 5,
      year: "2024",
      quarter: "Q2",
      title: "AI Excellence",
      description: "Achieved 99.2% accuracy with our advanced AI model. Won multiple healthcare innovation awards and secured Series B funding.",
      icon: Trophy,
      gradient: "from-red-500 to-pink-600",
      achievements: ["99.2% AI accuracy", "Series B funding", "Innovation awards"],
      location: "Global",
      teamSize: "150+ people"
    }
  ];

  const stats = [
    {
      icon: Users,
      label: "Team Members",
      value: "150+",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: Globe,
      label: "Countries",
      value: "25+",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: Heart,
      label: "ECGs Analyzed",
      value: "1M+",
      gradient: "from-red-500 to-pink-600"
    },
    {
      icon: Award,
      label: "Awards Won",
      value: "12",
      gradient: "from-purple-500 to-violet-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const timelineVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about-arpi-section" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
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
            <span className="text-sm font-medium text-slate-700">About ARPI</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="block text-slate-900 mb-2">Pioneering the future</span>
            <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
              of cardiac care
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            ARPI is at the forefront of healthcare AI innovation, developing cutting-edge solutions 
            that empower medical professionals to provide better patient outcomes through advanced ECG analysis.
          </p>
        </motion.div>

        {/* Stats Grid */}
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
              className="relative bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 text-center transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50 group"
              whileHover={{ y: -4 }}
            >
              <motion.div
                className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
              
              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none rounded-2xl"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Company Timeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-6 shadow-sm">
              <Calendar className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Our Journey</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Company Timeline
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From a small startup to a global healthcare AI leader - discover the milestones that shaped our journey.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Central Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
              <motion.div
                className="w-full bg-gradient-to-b from-red-500 via-pink-500 to-red-600 rounded-full shadow-lg"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              {/* Pulsating effect at the top */}
              <motion.div
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-lg"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Timeline Events */}
            <div className="space-y-16">
              {timelineEvents.map((event, index) => {
                const isLeft = index % 2 === 0;
                const isActive = activeTimelineItem === event.id;

                return (
                  <motion.div
                    key={event.id}
                    className={`relative flex items-center ${
                      isLeft ? "justify-start" : "justify-end"
                    }`}
                    variants={timelineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {/* Event Marker */}
                    <motion.div
                      className="absolute left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setActiveTimelineItem(isActive ? null : event.id)}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${event.gradient} rounded-full flex items-center justify-center shadow-xl border-4 border-white transition-all duration-300 ${
                        isActive ? "ring-4 ring-red-500/30" : ""
                      }`}>
                        <event.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Year Badge */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-full px-3 py-1 shadow-sm">
                        <span className="text-xs font-bold text-slate-700">{event.year}</span>
                      </div>
                    </motion.div>

                    {/* Event Card */}
                    <motion.div
                      className={`relative w-full max-w-md ${
                        isLeft ? "mr-auto pr-16" : "ml-auto pl-16"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden">
                        {/* Glassy hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                        {/* Quarter Badge */}
                        <div className="relative inline-flex items-center space-x-2 bg-slate-100/80 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                          <Calendar className="w-3 h-3 text-slate-600" />
                          <span className="text-xs font-semibold text-slate-700">{event.quarter} {event.year}</span>
                        </div>

                        <h4 className="relative text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300">
                          {event.title}
                        </h4>

                        <p className="relative text-slate-600 leading-relaxed mb-6">
                          {event.description}
                        </p>

                        {/* Achievements */}
                        <div className="relative space-y-2 mb-6">
                          {event.achievements.map((achievement, achievementIndex) => (
                            <motion.div
                              key={achievementIndex}
                              className="flex items-center space-x-2 text-sm text-slate-600"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: achievementIndex * 0.1,
                                duration: 0.3,
                              }}
                            >
                              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              <span>{achievement}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Meta Information */}
                        <div className="relative flex items-center justify-between pt-4 border-t border-slate-200/50">
                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{event.teamSize}</span>
                            </div>
                          </div>
                          
                          <motion.button
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Connection Line to Marker */}
                        <div className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r ${event.gradient} ${
                          isLeft ? "-right-8" : "-left-8"
                        }`} />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Future Indicator */}
            <motion.div
              className="relative flex justify-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-6 text-center shadow-lg">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">The Future</h4>
                <p className="text-sm text-slate-600">
                  Continuing to innovate and transform healthcare with AI
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Target,
              title: "Our Mission",
              description: "To democratize advanced cardiac care by making AI-powered ECG analysis accessible to healthcare professionals worldwide, ultimately saving lives through early detection and accurate diagnosis.",
              gradient: "from-red-500 to-pink-600"
            },
            {
              icon: Star,
              title: "Our Vision",
              description: "To become the global standard for AI-driven cardiac diagnostics, empowering every healthcare provider with the tools they need to deliver exceptional patient care.",
              gradient: "from-purple-500 to-violet-600"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50 group overflow-hidden"
              whileHover={{ y: -4 }}
            >
              {/* Glassy hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

              <motion.div
                className={`relative w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <item.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="relative text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="relative text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;