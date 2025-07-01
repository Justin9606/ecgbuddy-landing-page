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
import { getSectionContent } from "@/lib/admin/contentProvider";
import { getIconComponent } from "@/lib/utils/icons";
import type { HeroContent } from "@/lib/admin/types";

interface HeroProps {
  isAdminView?: boolean;
  content?: HeroContent;
}

const Hero: React.FC<HeroProps> = ({ isAdminView = false, content }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [heroContent, setHeroContent] = useState<HeroContent | null>(content || null);

  // Load content from admin or use defaults (only if not in admin view)
  useEffect(() => {
    if (isAdminView || content) {
      setHeroContent(content || null);
      return;
    }

    const loadContent = () => {
      try {
        const loadedContent = getSectionContent<HeroContent>('hero');
        setHeroContent(loadedContent);
      } catch (error) {
        console.error('Error loading hero content:', error);
        // Fallback to default content
        setHeroContent({
          mainHeading: {
            line1: "Revolutionize",
            line2: "ECG Analysis",
          },
          subtitle: "Transform complex cardiac data into clear, actionable insights with our AI-powered platform trusted by healthcare professionals worldwide.",
          testimonials: [
            {
              text: "ECG Buddy has revolutionized our emergency department workflow",
              author: "Dr. Sarah Kim",
              role: "Emergency Medicine, Seoul National University Hospital",
              avatar: "👩‍⚕️",
              hospital: "Seoul National University Hospital",
              rating: 5,
            },
          ],
          ctaButtons: {
            primary: { text: "Start Analysis", link: "#mobile-download" },
            secondary: { text: "Watch Demo", link: "#demo" },
          },
          metrics: [
            { label: "Analyses Today", value: "1,247", icon: "Activity", color: "red" },
            { label: "Active Users", value: "892", icon: "Users", color: "pink" },
            { label: "Accuracy Rate", value: "99.2%", icon: "Target", color: "rose" },
          ],
          trustIndicators: [
            {
              icon: "Award",
              text: "FDA Approved",
              subtext: "Medical Device",
              gradient: "from-emerald-500 to-teal-600",
            },
          ],
        });
      }
    };

    loadContent();

    // Listen for content updates (only if not in admin view)
    const handleContentUpdate = () => {
      loadContent();
    };

    window.addEventListener('adminContentUpdate', handleContentUpdate);
    window.addEventListener('storage', handleContentUpdate);

    return () => {
      window.removeEventListener('adminContentUpdate', handleContentUpdate);
      window.removeEventListener('storage', handleContentUpdate);
    };
  }, [isAdminView, content]);

  // Mouse movement effects (disabled in admin view)
  useEffect(() => {
    if (isAdminView) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isAdminView]);

  // Testimonial rotation (disabled in admin view)
  useEffect(() => {
    if (isAdminView || !heroContent?.testimonials?.length) return;
    
    const interval = window.setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % heroContent.testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAdminView, heroContent?.testimonials?.length]);

  const handleStartAnalysis = () => {
    if (isAdminView) return;
    
    const element = document.getElementById("mobile-download");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Show loading state while content loads (only if not in admin view)
  if (!heroContent && !isAdminView) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50/30 via-white to-pink-50/20 pt-24">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading content...</p>
        </div>
      </section>
    );
  }

  // Use default content if none provided
  const defaultContent: HeroContent = {
    mainHeading: { line1: "Revolutionize", line2: "ECG Analysis" },
    subtitle: "Transform complex cardiac data into clear, actionable insights.",
    testimonials: [],
    ctaButtons: {
      primary: { text: "Start Analysis", link: "#mobile-download" },
      secondary: { text: "Watch Demo", link: "#demo" },
    },
    metrics: [],
    trustIndicators: [],
  };

  const activeContent = heroContent || defaultContent;
  const testimonials = activeContent.testimonials || [];
  const currentTestimonialData = testimonials[currentTestimonial] || testimonials[0];

  const staticMetrics = activeContent.metrics || [];

  return (
    <section className={`relative ${isAdminView ? 'py-16' : 'min-h-screen pt-24'} flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50/30 via-white to-pink-50/20`}>
      {/* Background Grid - Simplified for admin view */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 63, 74, 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
            animation: isAdminView ? "none" : "gridMove 20s linear infinite",
          }}
        ></div>
      </div>

      {/* Floating Orbs - Simplified for admin view */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isAdminView ? 2 : 6)].map((_, i) => (
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
            animate={isAdminView ? {} : {
              x: mousePosition.x * 0.02 * (i + 1),
              y: mousePosition.y * 0.02 * (i + 1),
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={isAdminView ? {} : {
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
          {/* Floating Badge - Simplified for admin view */}
          <motion.div
            className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-red-100/50 rounded-full px-6 py-3 mb-12 shadow-[0_8px_32px_rgba(255,63,74,0.08)]"
            initial={isAdminView ? {} : { opacity: 0, y: -20 }}
            animate={isAdminView ? {} : { opacity: 1, y: 0 }}
            transition={isAdminView ? {} : { duration: 0.8, ease: "easeOut" }}
            whileHover={isAdminView ? {} : { scale: 1.05 }}
          >
            <div className="relative">
              <motion.div
                className="w-2 h-2 bg-red-400 rounded-full"
                animate={isAdminView ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={isAdminView ? {} : { duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-sm font-medium text-slate-700">
              Trusted by 10,000+ Healthcare Professionals
            </span>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-red-500" />
              <Sparkles className="w-4 h-4 text-red-500" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            className="mb-8"
            initial={isAdminView ? {} : { opacity: 0, y: 30 }}
            animate={isAdminView ? {} : { opacity: 1, y: 0 }}
            transition={isAdminView ? {} : { duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className={`${isAdminView ? 'text-4xl md:text-6xl' : 'text-6xl md:text-8xl'} font-bold leading-none mb-4`}>
              <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                {activeContent.mainHeading.line1}
              </span>
              <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                {activeContent.mainHeading.line2}
              </span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto opacity-60" />
          </motion.div>

          {/* Subtitle */}
          <motion.div
            className={`${isAdminView ? 'text-lg' : 'text-xl md:text-2xl'} text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed font-light`}
            initial={isAdminView ? {} : { opacity: 0, y: 20 }}
            animate={isAdminView ? {} : { opacity: 1, y: 0 }}
            transition={isAdminView ? {} : { duration: 0.8, delay: 0.8 }}
            dangerouslySetInnerHTML={{ __html: activeContent.subtitle }}
          />

          {/* Testimonial Carousel */}
          {testimonials.length > 0 && (
            <motion.div
              className="mb-12 max-w-3xl mx-auto"
              initial={isAdminView ? {} : { opacity: 0, y: 30 }}
              animate={isAdminView ? {} : { opacity: 1, y: 0 }}
              transition={isAdminView ? {} : { duration: 0.8, delay: 1 }}
            >
              <div className="bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-2xl p-6 shadow-[0_8px_32px_rgba(255,63,74,0.08)]">
                {currentTestimonialData && (
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <span className="text-2xl">{currentTestimonialData.avatar}</span>
                    <div className="text-left">
                      <p className="text-slate-700 font-medium italic">
                        "{currentTestimonialData.text}"
                      </p>
                      <div className="text-sm text-slate-500 mt-2 flex items-center space-x-2">
                        <span className="font-semibold">{currentTestimonialData.author}</span>
                        <span>•</span>
                        <span>{currentTestimonialData.role}</span>
                        <div className="flex items-center ml-2">
                          {[...Array(currentTestimonialData.rating || 5)].map((_, i) => (
                            <Sparkles key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Dots - Only show if not admin view and multiple testimonials */}
                {!isAdminView && testimonials.length > 1 && (
                  <div className="flex justify-center space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? "bg-red-500"
                            : "bg-slate-300 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Metrics Dashboard */}
          {staticMetrics.length > 0 && (
            <motion.div
              className="mb-12 max-w-4xl mx-auto"
              initial={isAdminView ? {} : { opacity: 0, y: 30 }}
              animate={isAdminView ? {} : { opacity: 1, y: 0 }}
              transition={isAdminView ? {} : { duration: 0.8, delay: 1.2 }}
            >
              <div className="grid grid-cols-3 gap-6">
                {staticMetrics.map((metric, index) => {
                  const IconComponent = getIconComponent(metric.icon);
                  return (
                    <div
                      key={`static-metric-${index}`}
                      className="bg-white/30 backdrop-blur-2xl border border-red-100/50 rounded-2xl p-4 text-center"
                    >
                      <div className="flex items-center justify-center mb-2">
                        <IconComponent className={`w-5 h-5 text-${metric.color}-500`} />
                      </div>
                      <div className={`text-2xl font-bold text-${metric.color}-600`}>
                        {metric.value}
                      </div>
                      <div className="text-sm text-slate-600">{metric.label}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20"
            initial={isAdminView ? {} : { opacity: 0, y: 30 }}
            animate={isAdminView ? {} : { opacity: 1, y: 0 }}
            transition={isAdminView ? {} : { duration: 0.8, delay: 1.4 }}
          >
            <button
              onClick={handleStartAnalysis}
              className="group relative bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-[0_8px_32px_rgba(255,63,74,0.3)] transition-all duration-500 flex items-center space-x-3 overflow-hidden"
              disabled={isAdminView}
            >
              <span className="relative z-10">{activeContent.ctaButtons.primary.text}</span>
              <ArrowRight className="w-5 h-5 relative z-10" />
            </button>

            <button
              className="group relative bg-white/60 backdrop-blur-2xl border border-red-100/50 text-slate-700 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3 shadow-[0_8px_32px_rgba(255,63,74,0.08)] overflow-hidden"
              disabled={isAdminView}
            >
              <Play className="w-5 h-5 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">{activeContent.ctaButtons.secondary.text}</span>
            </button>
          </motion.div>

          {/* Trust Indicators */}
          {activeContent.trustIndicators.length > 0 && (
            <motion.div
              className="mt-20 flex flex-wrap items-center justify-center gap-6"
              initial={isAdminView ? {} : { opacity: 0, y: 30 }}
              animate={isAdminView ? {} : { opacity: 1, y: 0 }}
              transition={isAdminView ? {} : { duration: 1, delay: 2.5 }}
            >
              {activeContent.trustIndicators.map((item, index) => {
                const IconComponent = getIconComponent(item.icon);
                return (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-emerald-50/50 to-teal-50/50 backdrop-blur-2xl border border-emerald-200/50 rounded-2xl p-6 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden cursor-pointer min-w-[200px]"
                  >
                    <div className="relative flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-800 text-sm mb-1">
                          {item.text}
                        </div>
                        <div className="text-xs text-slate-600">
                          {item.subtext}
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>

      {/* Custom Animation Styles - Only if not admin view */}
      {!isAdminView && (
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
      )}
    </section>
  );
};

export default Hero;