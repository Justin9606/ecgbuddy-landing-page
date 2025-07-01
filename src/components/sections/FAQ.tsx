"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  HelpCircle,
  Sparkles,
  Shield,
  Zap,
  Users,
  FileText,
  Clock,
  Brain,
  Heart,
  CheckCircle,
} from "lucide-react";
import { getSectionContent } from "@/lib/admin/contentProvider";
import { getIconComponent } from "@/lib/utils/icons";
import type { FAQContent } from "@/lib/admin/types";

interface FAQProps {
  isAdminView?: boolean;
  content?: FAQContent;
}

const FAQ: React.FC<FAQProps> = ({ isAdminView = false, content }) => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default
  const [faqContent, setFaqContent] = useState<FAQContent | null>(content || null);

  // Load content from admin or use defaults (only if not in admin view)
  React.useEffect(() => {
    if (isAdminView || content) {
      setFaqContent(content || null);
      return;
    }

    const loadContent = () => {
      try {
        const loadedContent = getSectionContent<FAQContent>('faq');
        setFaqContent(loadedContent);
      } catch (error) {
        console.error('Error loading FAQ content:', error);
        // Fallback to default content
        setFaqContent({
          sectionHeader: {
            title: "Got questions?\nWe have answers",
            description: "Everything you need to know about ECG Buddy, from getting started to advanced features and enterprise solutions.",
          },
          categories: [
            {
              title: "Getting Started",
              icon: "HelpCircle",
              gradient: "from-red-500 to-pink-600",
              questions: [
                {
                  question: "How does ECG Buddy work?",
                  answer: "ECG Buddy uses advanced AI algorithms trained on millions of ECG patterns to analyze your cardiac data.",
                  highlights: ["AI-powered analysis", "Under 30 seconds", "Clinical recommendations"],
                },
              ],
            },
          ],
          bottomCTA: {
            title: "We're here to help",
            description: "Can't find what you're looking for? Our support team is available 24/7 to answer any questions about ECG Buddy.",
            primaryButton: "Contact Support",
            secondaryButton: "Schedule a demo",
          },
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

  const toggleItem = (index: number) => {
    if (isAdminView) return; // Disable interactions in admin view
    
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Show loading state while content loads (only if not in admin view)
  if (!faqContent && !isAdminView) {
    return (
      <section className="relative py-32 overflow-hidden">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading FAQ content...</p>
        </div>
      </section>
    );
  }

  // Use default content if none provided
  const defaultContent: FAQContent = {
    sectionHeader: {
      title: "Got questions? We have answers",
      description: "Everything you need to know about ECG Buddy.",
    },
    categories: [],
    bottomCTA: {
      title: "We're here to help",
      description: "Contact our support team for assistance.",
      primaryButton: "Contact Support",
      secondaryButton: "Schedule a demo",
    },
  };

  const activeContent = faqContent || defaultContent;
  const faqCategories = activeContent.categories || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const answerVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="faq-section" className={`relative ${isAdminView ? 'py-16' : 'py-32'} overflow-hidden`}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-white to-pink-50/20"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 63, 74, 0.15) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={isAdminView ? {} : { opacity: 0, y: 30 }}
          whileInView={isAdminView ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={isAdminView ? {} : { duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-red-100/50 rounded-full px-6 py-3 mb-8 shadow-[0_8px_32px_rgba(255,63,74,0.08)]">
            <HelpCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-slate-700">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className={`${isAdminView ? 'text-3xl md:text-5xl' : 'text-5xl md:text-7xl'} font-bold mb-8 leading-tight`}>
            <span 
              className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2"
              dangerouslySetInnerHTML={{ __html: activeContent.sectionHeader.title.split('\n')[0] }}
            />
            <span 
              className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent"
              dangerouslySetInnerHTML={{ __html: activeContent.sectionHeader.title.split('\n')[1] || '' }}
            />
          </h2>

          <p 
            className={`${isAdminView ? 'text-lg' : 'text-xl'} text-slate-600 max-w-4xl mx-auto leading-relaxed font-light`}
            dangerouslySetInnerHTML={{ __html: activeContent.sectionHeader.description }}
          />
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          className={`grid grid-cols-1 ${isAdminView ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-8`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = getIconComponent(category.icon);
            return (
              <motion.div
                key={categoryIndex}
                variants={categoryVariants}
                className="relative bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_20px_60px_rgba(255,63,74,0.15)] transition-all duration-500 group overflow-hidden"
              >
                {/* Category Header */}
                <div className="relative flex items-center space-x-4 mb-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      {category.title}
                    </h3>
                    <div
                      className={`h-1 w-20 bg-gradient-to-r ${category.gradient} rounded-full mt-2`}
                    ></div>
                  </div>
                </div>

                {/* Questions */}
                <div className="relative space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 10 + faqIndex; // Unique index across all categories
                    const isOpen = openItems.includes(globalIndex);

                    return (
                      <motion.div
                        key={faqIndex}
                        variants={itemVariants}
                        className="bg-white/30 backdrop-blur-sm border border-red-100/40 rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300"
                      >
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          disabled={isAdminView}
                          className={`w-full p-6 text-left flex items-center justify-between group ${
                            isAdminView ? 'cursor-default' : 'cursor-pointer'
                          }`}
                        >
                          <span className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors pr-4">
                            {faq.question}
                          </span>
                          <motion.div
                            animate={isAdminView ? {} : { rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex-shrink-0"
                          >
                            {isOpen ? (
                              <Minus className="w-5 h-5 text-red-600" />
                            ) : (
                              <Plus className="w-5 h-5 text-slate-500 group-hover:text-red-600 transition-colors" />
                            )}
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {(isOpen || isAdminView) && (
                            <motion.div
                              variants={isAdminView ? {} : answerVariants}
                              initial={isAdminView ? {} : "hidden"}
                              animate={isAdminView ? {} : "visible"}
                              exit={isAdminView ? {} : "hidden"}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6">
                                <div className="text-slate-600 leading-relaxed mb-4">
                                  {faq.answer}
                                </div>

                                {/* Highlights */}
                                <div className="flex flex-wrap gap-2">
                                  {faq.highlights.map(
                                    (highlight, highlightIndex) => (
                                      <motion.span
                                        key={highlightIndex}
                                        initial={isAdminView ? {} : { opacity: 0, scale: 0.8 }}
                                        animate={isAdminView ? {} : { opacity: 1, scale: 1 }}
                                        transition={isAdminView ? {} : {
                                          delay: highlightIndex * 0.1,
                                          duration: 0.3,
                                          ease: "easeOut",
                                        }}
                                        className="inline-flex items-center space-x-1 bg-red-100/50 backdrop-blur-sm border border-red-200/50 rounded-full px-3 py-1 text-xs font-medium text-red-700"
                                      >
                                        <CheckCircle className="w-3 h-3" />
                                        <span>{highlight}</span>
                                      </motion.span>
                                    )
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={isAdminView ? {} : { opacity: 0, y: 30 }}
          whileInView={isAdminView ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={isAdminView ? {} : { duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative bg-white/30 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-12 max-w-4xl mx-auto shadow-[0_20px_70px_rgba(255,63,74,0.1)] hover:shadow-[0_30px_90px_rgba(255,63,74,0.15)] transition-all duration-700 group overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-red-100/50 backdrop-blur-sm border border-red-200/50 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">
                  Still have questions?
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 group-hover:text-slate-900 transition-colors duration-300">
                {activeContent.bottomCTA.title}
              </h3>

              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                {activeContent.bottomCTA.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button
                  whileHover={isAdminView ? {} : { scale: 1.05 }}
                  whileTap={isAdminView ? {} : { scale: 0.95 }}
                  className="relative bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-[0_8px_32px_rgba(255,63,74,0.3)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.4)] transition-all duration-500 overflow-hidden group"
                  disabled={isAdminView}
                >
                  <span className="relative z-10">{activeContent.bottomCTA.primaryButton}</span>
                </motion.button>

                <motion.button
                  whileHover={isAdminView ? {} : { scale: 1.05 }}
                  whileTap={isAdminView ? {} : { scale: 0.95 }}
                  className="text-slate-600 hover:text-slate-800 font-medium transition-colors duration-300"
                  disabled={isAdminView}
                >
                  {activeContent.bottomCTA.secondaryButton}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;