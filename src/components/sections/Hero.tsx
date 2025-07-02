"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  Heart,
  Zap,
  Shield,
  Sparkles,
  Activity,
  Brain,
  Users,
  Award,
  TrendingUp,
  Target,
  Clock,
  BarChart3,
  CheckCircle,
  Star,
} from "lucide-react";
import { HighlightableElement, HighlightableArrayItem } from "@/components/admin/InteractivePreview";

interface HeroProps {
  onElementClick?: (elementPath: string, elementType: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onElementClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Testimonial rotation with user controls
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartAnalysis = () => {
    const element = document.getElementById("mobile-download");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const testimonials = [
    {
      text: "ECG Buddy has revolutionized our emergency department workflow",
      author: "Dr. Sarah Kim",
      role: "Emergency Medicine, Seoul National University Hospital",
      avatar: "👩‍⚕️",
      hospital: "Seoul National University Hospital",
      rating: 5,
    },
    {
      text: "The AI accuracy is remarkable - it's like having a cardiologist available 24/7",
      author: "Dr. Michael Chen",
      role: "Cardiology, Samsung Medical Center",
      avatar: "👨‍⚕️",
      hospital: "Samsung Medical Center",
      rating: 5,
    },
    {
      text: "Integration with our EMR system was seamless and intuitive",
      author: "Dr. Lisa Park",
      role: "Internal Medicine, Asan Medical Center",
      avatar: "👩‍⚕️",
      hospital: "Asan Medical Center",
      rating: 5,
    },
  ];

  // COMPLETELY STATIC metrics - no animation at all
  const staticMetrics = [
    {
      label: "Analyses Today",
      value: "1,247",
      icon: Activity,
      color: "red",
    },
    {
      label: "Active Users",
      value: "892",
      icon: Users,
      color: "pink",
    },
    {
      label: "Accuracy Rate",
      value: "99.2%",
      icon: Target,
      color: "rose",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50/30 via-white to-pink-50/20 pt-24">
      {/* Enhanced Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 63, 74, 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
            animation: "gridMove 20s linear infinite",
          }}
        ></div>
      </div>

      {/* Enhanced Floating Orbs with Mouse Interaction */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{
              background: `linear-gradient(135deg, ${
                i % 3 === 0
                  ? "#ff3f4a, #ff6b7a"
                  : i % 3 === 1
                  ? "#ff6b7a, #ff8fa3"
                  : "#ff8fa3, #ffb3c1"
              })`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              x: mousePosition.x * 0.02 * (i + 1),
              y: mousePosition.y * 0.02 * (i + 1),
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              x: { duration: 0.5 },
              y: { duration: 0.5 },
              scale: {
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: {
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center">
          {/* Enhanced Floating Badge with Social Proof */}
          <motion.div
            className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-red-100/50 rounded-full px-6 py-3 mb-12 shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.12)] transition-all duration-500 group cursor-pointer mt-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <motion.div
                className="w-2 h-2 bg-red-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 w-2 h-2 bg-red-400 rounded-full"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
              Trusted by 10,000+ Healthcare Professionals
            </span>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-red-500" />
              <motion.div
                animate={{ rotate: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-4 h-4 text-red-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Main Heading with Typewriter Effect */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-none mb-4">
              <HighlightableElement
                dataPath="mainHeading.line1"
                elementType="text"
                label="Main Heading Line 1"
                onElementClick={onElementClick}
                disabled={!onElementClick}
              >
                <motion.span
                  className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Revolutionize
                </motion.span>
              </HighlightableElement>
              <HighlightableElement
                dataPath="mainHeading.line2"
                elementType="text"
                label="Main Heading Line 2"
                onElementClick={onElementClick}
                disabled={!onElementClick}
              >
                <motion.span
                  className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  ECG Analysis
                </motion.span>
              </HighlightableElement>
            </h1>
            <motion.div
              className="h-1 w-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto opacity-60"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </motion.div>

          {/* Enhanced Subtitle */}
          <HighlightableElement
            dataPath="subtitle"
            elementType="richtext"
            label="Subtitle"
            onElementClick={onElementClick}
            disabled={!onElementClick}
          >
            <motion.p
              className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Transform complex cardiac data into clear, actionable insights with
              our
              <span className="font-medium text-slate-800">
                {" "}
                AI-powered platform
              </span>{" "}
              trusted by
              <span className="font-medium text-red-600">
                {" "}
                healthcare professionals worldwide
              </span>
              .
            </motion.p>
          </HighlightableElement>

          {/* Interactive Testimonial Carousel */}
          <motion.div
            className="mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-2xl p-6 shadow-[0_8px_32px_rgba(255,63,74,0.08)] transition-all duration-500">
              <AnimatePresence mode="wait">
                <HighlightableArrayItem
                  dataPath="testimonials"
                  index={currentTestimonial}
                  label="Testimonial"
                  onElementClick={onElementClick}
                  disabled={!onElementClick}
                >
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center space-x-4 mb-4"
                  >
                    <span className="text-2xl">
                      {testimonials[currentTestimonial].avatar}
                    </span>
                    <div className="text-left">
                      <p className="text-slate-700 font-medium italic">
                        "{testimonials[currentTestimonial].text}"
                      </p>
                      <div className="text-sm text-slate-500 mt-2 flex items-center space-x-2">
                        <span className="font-semibold">
                          {testimonials[currentTestimonial].author}
                        </span>
                        <span>•</span>
                        <span>{testimonials[currentTestimonial].role}</span>
                        <div className="flex items-center ml-2">
                          {[
                            ...Array(testimonials[currentTestimonial].rating),
                          ].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <Sparkles className="w-3 h-3 text-yellow-500 fill-current" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </HighlightableArrayItem>
              </AnimatePresence>

              {/* Interactive Navigation Dots */}
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-red-500"
                        : "bg-slate-300 hover:bg-slate-400"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* COMPLETELY STATIC Metrics Dashboard - NO ANIMATION */}
          <motion.div
            className="mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="grid grid-cols-3 gap-6">
              {staticMetrics.map((metric, index) => (
                <HighlightableArrayItem
                  key={`static-metric-${index}`}
                  dataPath="metrics"
                  index={index}
                  label="Metric"
                  onElementClick={onElementClick}
                  disabled={!onElementClick}
                >
                  <motion.div
                    className="bg-white/30 backdrop-blur-2xl border border-red-100/50 rounded-2xl p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <metric.icon
                        className={`w-5 h-5 text-${metric.color}-500`}
                      />
                    </div>
                    <div
                      className={`text-2xl font-bold text-${metric.color}-600`}
                    >
                      {metric.value}
                    </div>
                    <div className="text-sm text-slate-600">{metric.label}</div>
                  </motion.div>
                </HighlightableArrayItem>
              ))}
            </div>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <HighlightableElement
              dataPath="ctaButtons.primary"
              elementType="button"
              label="Primary CTA Button"
              onElementClick={onElementClick}
              disabled={!onElementClick}
            >
              <motion.button
                onClick={handleStartAnalysis}
                className="group relative bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-[0_8px_32px_rgba(255,63,74,0.3)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.4)] transition-all duration-500 flex items-center space-x-3 overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glassy hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>

                <span className="relative z-10">Start Analysis</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 relative z-10" />
                </motion.div>
              </motion.button>
            </HighlightableElement>

            <HighlightableElement
              dataPath="ctaButtons.secondary"
              elementType="button"
              label="Secondary CTA Button"
              onElementClick={onElementClick}
              disabled={!onElementClick}
            >
              <motion.button
                className="group relative bg-white/60 backdrop-blur-2xl border border-red-100/50 text-slate-700 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3 shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.12)] overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glassy hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>

                <Play className="w-5 h-5 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">Watch Demo</span>
              </motion.button>
            </HighlightableElement>
          </motion.div>

          {/* Enhanced Stats Cards with Better Animations */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            {[
              {
                icon: Heart,
                label: "ECGs Analyzed",
                value: "1M+",
                gradient: "from-red-500 to-pink-500",
                description: "Processed globally",
                trend: "+23% this month",
              },
              {
                icon: Clock,
                label: "Analysis Speed",
                value: "<30s",
                gradient: "from-orange-400 to-red-500",
                description: "Average processing time",
                trend: "40% faster than competitors",
              },
              {
                icon: Shield,
                label: "Accuracy Rate",
                value: "99.2%",
                gradient: "from-pink-500 to-red-500",
                description: "Clinical validation",
                trend: "FDA approved",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 transition-all duration-500 shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_20px_60px_rgba(255,63,74,0.15)] overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Glassy hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                <motion.div
                  className={`relative w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-300 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="relative text-4xl font-bold text-slate-800 mb-2 transition-colors">
                  {stat.value}
                </div>
                <div className="relative text-slate-600 font-medium mb-2">
                  {stat.label}
                </div>
                <div className="relative text-sm text-slate-500 mb-3">
                  {stat.description}
                </div>

                {/* Trend indicator */}
                <div className="relative flex items-center justify-center space-x-1 text-xs text-green-600 bg-green-50/50 rounded-full px-3 py-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.trend}</span>
                </div>

                <motion.div
                  className={`h-1 bg-gradient-to-r ${stat.gradient} rounded-full mt-4 origin-left`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 2 + index * 0.2 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* REDESIGNED Premium Trust Indicators */}
          <motion.div
            className="mt-20 flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            {[
              {
                icon: Award,
                text: "FDA Approved",
                subtext: "Medical Device",
                gradient: "from-emerald-500 to-teal-600",
                bgGradient: "from-emerald-50/50 to-teal-50/50",
                borderColor: "emerald-200/50",
              },
              {
                icon: Shield,
                text: "HIPAA Compliant",
                subtext: "Enterprise Security",
                gradient: "from-blue-500 to-indigo-600",
                bgGradient: "from-blue-50/50 to-indigo-50/50",
                borderColor: "blue-200/50",
              },
              {
                icon: Users,
                text: "10,000+ Users",
                subtext: "Healthcare Professionals",
                gradient: "from-purple-500 to-violet-600",
                bgGradient: "from-purple-50/50 to-violet-50/50",
                borderColor: "purple-200/50",
              },
            ].map((item, index) => (
              <HighlightableArrayItem
                key={index}
                dataPath="trustIndicators"
                index={index}
                label="Trust Indicator"
                onElementClick={onElementClick}
                disabled={!onElementClick}
              >
                <motion.div
                  className={`group relative bg-gradient-to-br ${item.bgGradient} backdrop-blur-2xl border border-${item.borderColor} rounded-2xl p-6 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden cursor-pointer min-w-[200px]`}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 2.7 + index * 0.1,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Glassy hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                  {/* Certification Badge */}
                  <div className="relative flex items-center space-x-4">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-sm mb-1 group-hover:text-slate-900 transition-colors">
                        {item.text}
                      </div>
                      <div className="text-xs text-slate-600 group-hover:text-slate-700 transition-colors">
                        {item.subtext}
                      </div>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.2 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </motion.div>
                  </div>

                  {/* Verification Indicator */}
                  <motion.div
                    className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full shadow-sm"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  />
                </motion.div>
              </HighlightableArrayItem>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Floating Analysis Card */}
      <motion.div
        className="absolute bottom-10 right-10 hidden xl:block"
        initial={{ opacity: 0, x: 100, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <motion.div
          className="bg-white/50 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 shadow-[0_20px_70px_rgba(255,63,74,0.1)] max-w-sm hover:bg-white/70 transition-all duration-500 group"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="relative">
              <motion.div
                className="w-3 h-3 bg-red-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 w-3 h-3 bg-red-400 rounded-full"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-sm font-medium text-slate-700">
              Live Analysis
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Activity className="w-4 h-4 text-red-500" />
            </motion.div>
          </div>

          <div className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-red-700 transition-colors">
            Normal Sinus Rhythm
          </div>
          <div className="text-sm text-slate-600 mb-4">Heart Rate: 72 BPM</div>
          <div className="text-xs text-green-600 bg-green-50/50 rounded-full px-3 py-1 inline-block mb-6">
            ✓ Analysis Complete
          </div>

          <div className="relative h-20 bg-gradient-to-r from-red-50/50 to-pink-50/50 rounded-2xl flex items-center justify-center overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-100/20 to-pink-100/20"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <Brain className="w-6 h-6 text-red-600" />
            <span className="ml-2 text-sm text-slate-600 font-medium">
              AI Confidence: 98.7%
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;