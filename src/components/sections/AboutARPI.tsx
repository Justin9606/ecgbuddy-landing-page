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
  Crown,
  Gem,
  Infinity,
  Eye,
  Compass,
} from "lucide-react";

const AboutARPI = () => {
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  // Enhanced timeline data with richer content
  const timelineEvents = [
    {
      id: 1,
      year: "2020",
      quarter: "Q1",
      title: "ARPI Founded",
      subtitle: "The Beginning of Innovation",
      description: "Founded with a revolutionary vision to transform cardiac care through cutting-edge AI technology. Our journey began with a passionate team of engineers, doctors, and researchers united by a common goal.",
      icon: Lightbulb,
      gradient: "from-blue-500 via-blue-600 to-indigo-700",
      bgGradient: "from-blue-50/50 to-indigo-50/30",
      achievements: ["$2M seed funding secured", "Core AI team assembled", "Research partnerships with 3 hospitals"],
      location: "Seoul, Korea",
      teamSize: "5 people",
      highlight: "The spark that started it all"
    },
    {
      id: 2,
      year: "2021",
      quarter: "Q2",
      title: "First AI Breakthrough",
      subtitle: "Intelligence Meets Medicine",
      description: "Developed our groundbreaking ECG analysis AI model achieving 95% accuracy. This milestone marked our entry into the world of medical AI with clinical validation studies.",
      icon: Brain,
      gradient: "from-purple-500 via-purple-600 to-violet-700",
      bgGradient: "from-purple-50/50 to-violet-50/30",
      achievements: ["AI model v1.0 with 95% accuracy", "Clinical trials with 5 hospitals", "3 patent applications filed"],
      location: "Seoul, Korea",
      teamSize: "15 people",
      highlight: "AI that thinks like a cardiologist"
    },
    {
      id: 3,
      year: "2022",
      quarter: "Q3",
      title: "Platform Revolution",
      subtitle: "Real-time Analysis Era",
      description: "Launched ECG Buddy platform with revolutionary real-time analysis capabilities. Achieved critical HIPAA compliance and medical device certification, setting new industry standards.",
      icon: Rocket,
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      bgGradient: "from-emerald-50/50 to-teal-50/30",
      achievements: ["Platform beta with 1,000 users", "HIPAA & SOC 2 compliance", "FDA breakthrough designation"],
      location: "Seoul, Korea",
      teamSize: "35 people",
      highlight: "The platform that changed everything"
    },
    {
      id: 4,
      year: "2023",
      quarter: "Q1",
      title: "Global Expansion",
      subtitle: "Worldwide Healthcare Impact",
      description: "Expanded to international markets with comprehensive multi-language support. Reached 10,000+ healthcare professionals across 25 countries, democratizing cardiac care globally.",
      icon: Globe,
      gradient: "from-orange-500 via-red-500 to-pink-600",
      bgGradient: "from-orange-50/50 to-pink-50/30",
      achievements: ["25 countries launched", "10K+ active users", "12 language support"],
      location: "Global",
      teamSize: "75 people",
      highlight: "Healthcare without borders"
    },
    {
      id: 5,
      year: "2024",
      quarter: "Q2",
      title: "AI Excellence",
      subtitle: "Setting New Standards",
      description: "Achieved unprecedented 99.2% accuracy with our advanced AI model. Won multiple prestigious healthcare innovation awards and secured Series B funding for continued growth.",
      icon: Trophy,
      gradient: "from-red-500 via-pink-600 to-rose-700",
      bgGradient: "from-red-50/50 to-pink-50/30",
      achievements: ["99.2% AI accuracy achieved", "$25M Series B funding", "5 innovation awards won"],
      location: "Global",
      teamSize: "150+ people",
      highlight: "Excellence redefined"
    }
  ];

  const stats = [
    {
      icon: Users,
      label: "Healthcare Professionals",
      value: "150K+",
      gradient: "from-blue-500 via-blue-600 to-indigo-700",
      description: "Trust our platform daily",
      animation: "pulse"
    },
    {
      icon: Globe,
      label: "Countries Served",
      value: "25+",
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      description: "Across 6 continents",
      animation: "rotate"
    },
    {
      icon: Heart,
      label: "ECGs Analyzed",
      value: "1M+",
      gradient: "from-red-500 via-pink-600 to-rose-700",
      description: "Lives potentially saved",
      animation: "beat"
    },
    {
      icon: Award,
      label: "Innovation Awards",
      value: "12",
      gradient: "from-purple-500 via-purple-600 to-violet-700",
      description: "Industry recognition",
      animation: "bounce"
    }
  ];

  const missionVision = [
    {
      icon: Target,
      title: "Our Mission",
      subtitle: "Democratizing Cardiac Care",
      description: "To revolutionize cardiac healthcare by making AI-powered ECG analysis accessible to every healthcare professional worldwide. We believe that advanced diagnostic tools should not be limited by geography or resources.",
      gradient: "from-red-500 via-pink-600 to-rose-700",
      bgGradient: "from-red-50/30 to-pink-50/20",
      features: ["Universal Access", "AI-Powered Accuracy", "Real-time Analysis", "Global Impact"]
    },
    {
      icon: Eye,
      title: "Our Vision",
      subtitle: "The Future of Healthcare",
      description: "To become the global standard for AI-driven cardiac diagnostics, empowering every healthcare provider with intelligent tools that enhance decision-making and improve patient outcomes worldwide.",
      gradient: "from-purple-500 via-violet-600 to-indigo-700",
      bgGradient: "from-purple-50/30 to-violet-50/20",
      features: ["Global Standard", "Intelligent Tools", "Enhanced Decisions", "Better Outcomes"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const timelineVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const getStatAnimation = (animation: string) => {
    switch (animation) {
      case "pulse":
        return {
          scale: [1, 1.05, 1],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        };
      case "rotate":
        return {
          rotate: [0, 360],
          transition: { duration: 8, repeat: Infinity, ease: "linear" }
        };
      case "beat":
        return {
          scale: [1, 1.1, 1, 1.05, 1],
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        };
      case "bounce":
        return {
          y: [0, -5, 0],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        };
      default:
        return {};
    }
  };

  return (
    <section id="about-arpi-section" className="relative py-32 overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 via-transparent to-purple-50/20"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-pink-50/20 via-transparent to-red-50/20"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.4) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Premium Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              background: `linear-gradient(135deg, ${
                i % 4 === 0 ? "#3b82f6, #8b5cf6" :
                i % 4 === 1 ? "#ef4444, #ec4899" :
                i % 4 === 2 ? "#10b981, #06b6d4" :
                "#f59e0b, #ef4444"
              })`,
              left: `${10 + (i * 12)}%`,
              top: `${5 + (i * 15)}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Spectacular Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center space-x-4 bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-full px-8 py-4 mb-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-700 group"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Building2 className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-base font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
              About ARPI Inc.
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-red-500" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-6xl md:text-8xl font-bold mb-8 leading-none"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="block text-slate-900 mb-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Pioneering the future
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              of cardiac care
            </motion.span>
          </motion.h2>

          <motion.div
            className="h-2 w-40 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-full mx-auto mb-8 opacity-60"
            initial={{ width: 0 }}
            whileInView={{ width: 160 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.8 }}
          />

          <motion.p
            className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            ARPI is at the forefront of healthcare AI innovation, developing{" "}
            <span className="font-semibold text-slate-800 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              revolutionary solutions
            </span>{" "}
            that empower medical professionals worldwide to deliver{" "}
            <span className="font-semibold text-slate-800 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              exceptional patient outcomes
            </span>{" "}
            through advanced ECG analysis.
          </motion.p>
        </motion.div>

        {/* Premium Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group cursor-pointer"
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={`relative bg-white/50 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 text-center transition-all duration-700 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.15)] overflow-hidden ${
                hoveredStat === index ? "ring-2 ring-red-500/20" : ""
              }`}>
                {/* Glassy hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                <motion.div
                  className={`relative w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}
                  animate={getStatAnimation(stat.animation)}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  className="relative text-4xl font-bold text-slate-900 mb-2"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>

                <div className="relative text-base font-semibold text-slate-700 mb-2">
                  {stat.label}
                </div>

                <div className="relative text-sm text-slate-500">
                  {stat.description}
                </div>

                {/* Animated border */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  style={{ padding: "2px" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Revolutionary Company Timeline */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center space-x-4 bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-full px-8 py-4 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Calendar className="w-5 h-5 text-slate-600" />
              </motion.div>
              <span className="text-base font-semibold text-slate-700">Our Journey</span>
              <Crown className="w-5 h-5 text-red-500" />
            </motion.div>

            <h3 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Company Timeline
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From a visionary startup to a global healthcare AI leader - discover the extraordinary milestones that shaped our revolutionary journey.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-7xl mx-auto">
            {/* Enhanced Central Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2">
              <motion.div
                className="w-full bg-gradient-to-b from-red-500 via-pink-500 via-purple-500 to-indigo-600 rounded-full shadow-2xl"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: "easeOut" }}
              />
              
              {/* Animated particles along the line */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-lg"
                  animate={{
                    y: ["0%", "100%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "linear",
                  }}
                />
              ))}
              
              {/* Pulsating start indicator */}
              <motion.div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-red-500 to-pink-600 rounded-full shadow-xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                  boxShadow: [
                    "0 0 20px rgba(239, 68, 68, 0.5)",
                    "0 0 40px rgba(239, 68, 68, 0.8)",
                    "0 0 20px rgba(239, 68, 68, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Timeline Events */}
            <div className="space-y-24">
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
                    transition={{ delay: index * 0.3 }}
                  >
                    {/* Enhanced Event Marker */}
                    <motion.div
                      className="absolute left-1/2 transform -translate-x-1/2 z-30 cursor-pointer group"
                      whileHover={{ scale: 1.4 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setActiveTimelineItem(isActive ? null : event.id)}
                    >
                      <motion.div
                        className={`relative w-20 h-20 bg-gradient-to-br ${event.gradient} rounded-full flex items-center justify-center shadow-2xl border-4 border-white transition-all duration-500 ${
                          isActive ? "ring-4 ring-red-500/40 scale-110" : ""
                        }`}
                        animate={isActive ? {
                          boxShadow: [
                            "0 0 30px rgba(239, 68, 68, 0.5)",
                            "0 0 50px rgba(239, 68, 68, 0.8)",
                            "0 0 30px rgba(239, 68, 68, 0.5)",
                          ],
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <event.icon className="w-10 h-10 text-white" />
                        
                        {/* Floating sparkles around marker */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                              top: `${20 + i * 15}%`,
                              left: `${80 + i * 10}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                          />
                        ))}
                      </motion.div>
                      
                      {/* Enhanced Year Badge */}
                      <motion.div
                        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-2xl border border-slate-200/50 rounded-2xl px-4 py-2 shadow-xl"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-sm font-bold text-slate-700">{event.year}</span>
                      </motion.div>
                    </motion.div>

                    {/* Enhanced Event Card */}
                    <motion.div
                      className={`relative w-full max-w-lg ${
                        isLeft ? "mr-auto pr-20" : "ml-auto pl-20"
                      }`}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className={`relative bg-gradient-to-br ${event.bgGradient} backdrop-blur-2xl border border-white/50 rounded-3xl p-10 shadow-[0_20px_70px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_100px_rgba(0,0,0,0.2)] transition-all duration-700 group overflow-hidden`}>
                        {/* Premium glassy hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200 ease-out"></div>

                        {/* Quarter Badge */}
                        <div className="relative inline-flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-2 mb-6 shadow-lg">
                          <Calendar className="w-4 h-4 text-slate-600" />
                          <span className="text-sm font-bold text-slate-700">{event.quarter} {event.year}</span>
                          <Gem className="w-4 h-4 text-red-500" />
                        </div>

                        <motion.h4
                          className="relative text-3xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          {event.title}
                        </motion.h4>

                        <motion.div
                          className="relative text-lg font-semibold text-red-600 mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          {event.subtitle}
                        </motion.div>

                        <motion.p
                          className="relative text-slate-600 leading-relaxed mb-8 text-lg"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          {event.description}
                        </motion.p>

                        {/* Highlight Badge */}
                        <div className="relative inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-200/50 rounded-full px-4 py-2 mb-6">
                          <Star className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-red-700">{event.highlight}</span>
                        </div>

                        {/* Enhanced Achievements */}
                        <div className="relative space-y-3 mb-8">
                          {event.achievements.map((achievement, achievementIndex) => (
                            <motion.div
                              key={achievementIndex}
                              className="flex items-center space-x-3 text-slate-600 bg-white/30 backdrop-blur-sm rounded-xl p-3"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: 0.5 + achievementIndex * 0.1,
                                duration: 0.4,
                              }}
                              whileHover={{ scale: 1.02, x: 5 }}
                            >
                              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                              <span className="font-medium">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Enhanced Meta Information */}
                        <div className="relative flex items-center justify-between pt-6 border-t border-white/30">
                          <div className="flex items-center space-x-6 text-sm text-slate-500">
                            <div className="flex items-center space-x-2 bg-white/40 rounded-full px-3 py-1">
                              <MapPin className="w-4 h-4" />
                              <span className="font-medium">{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/40 rounded-full px-3 py-1">
                              <Users className="w-4 h-4" />
                              <span className="font-medium">{event.teamSize}</span>
                            </div>
                          </div>
                          
                          <motion.button
                            className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-white/30"
                            whileHover={{ x: 5, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.button>
                        </div>

                        {/* Enhanced Connection Line */}
                        <motion.div
                          className={`absolute top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r ${event.gradient} shadow-lg ${
                            isLeft ? "-right-10 w-10" : "-left-10 w-10"
                          }`}
                          initial={{ width: 0 }}
                          whileInView={{ width: 40 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Enhanced Future Indicator */}
            <motion.div
              className="relative flex justify-center mt-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_100px_rgba(0,0,0,0.15)] transition-all duration-700 group">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                    boxShadow: [
                      "0 20px 40px rgba(0,0,0,0.1)",
                      "0 25px 50px rgba(0,0,0,0.2)",
                      "0 20px 40px rgba(0,0,0,0.1)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Infinity className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">The Future Awaits</h4>
                <p className="text-slate-600 leading-relaxed">
                  Continuing to innovate and transform healthcare with revolutionary AI solutions
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Premium Mission & Vision */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {missionVision.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={`relative bg-gradient-to-br ${item.bgGradient} backdrop-blur-2xl border border-white/50 rounded-3xl p-10 transition-all duration-700 shadow-[0_20px_70px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_100px_rgba(0,0,0,0.15)] overflow-hidden`}>
                {/* Premium glassy hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200 ease-out"></div>

                <motion.div
                  className={`relative w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-3xl flex items-center justify-center mb-8 shadow-2xl`}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  <item.icon className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.h3
                  className="relative text-3xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {item.title}
                </motion.h3>

                <motion.div
                  className="relative text-xl font-semibold text-red-600 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {item.subtitle}
                </motion.div>
                
                <motion.p
                  className="relative text-slate-600 leading-relaxed mb-8 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {item.description}
                </motion.p>

                {/* Feature highlights */}
                <div className="relative grid grid-cols-2 gap-3">
                  {item.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center space-x-2 bg-white/40 backdrop-blur-sm rounded-xl p-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.5 + featureIndex * 0.1,
                        duration: 0.4,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;