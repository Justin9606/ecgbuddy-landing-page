"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Clock,
  Shield,
  Users,
  BarChart3,
  Stethoscope,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Star,
  TrendingUp,
} from "lucide-react";
import { getSectionContent } from "@/lib/admin/contentProvider";
import { getIconComponent } from "@/lib/utils/icons";
import type { FeatureContent } from "@/lib/admin/types";

interface FeaturesProps {
  isAdminView?: boolean;
  content?: FeatureContent;
}

const Features: React.FC<FeaturesProps> = ({ isAdminView = false, content }) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [featuresContent, setFeaturesContent] = useState<FeatureContent | null>(content || null);

  // Load content from admin or use defaults (only if not in admin view)
  React.useEffect(() => {
    if (isAdminView || content) {
      setFeaturesContent(content || null);
      return;
    }

    const loadContent = () => {
      try {
        const loadedContent = getSectionContent<FeatureContent>('features');
        setFeaturesContent(loadedContent);
      } catch (error) {
        console.error('Error loading features content:', error);
        // Fallback to default content
        setFeaturesContent({
          sectionHeader: {
            title: "Professional-grade tools\nfor modern healthcare",
            description: "Comprehensive suite of advanced features designed to enhance diagnostic accuracy and streamline cardiac care workflows for healthcare professionals.",
          },
          categories: [
            { id: "all", name: "All Features" },
            { id: "ai", name: "AI & ML" },
            { id: "performance", name: "Performance" },
            { id: "security", name: "Security" },
            { id: "collaboration", name: "Collaboration" },
            { id: "analytics", name: "Analytics" },
            { id: "integration", name: "Integration" },
          ],
          features: [
            {
              id: "ai-powered-analysis",
              title: "AI-Powered Analysis",
              description: "Advanced machine learning algorithms trained on millions of ECG patterns for unprecedented accuracy and reliability.",
              icon: "Brain",
              gradient: "from-violet-500 via-purple-600 to-indigo-600",
              stats: "99.2% Accuracy",
              highlight: "Deep Learning",
              category: "ai",
              benefits: ["Real-time interpretation", "Continuous learning", "Pattern recognition"],
              rating: 4.9,
              badge: "Most Popular",
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

  // Show loading state while content loads (only if not in admin view)
  if (!featuresContent && !isAdminView) {
    return (
      <section className="relative py-32 overflow-hidden">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading features...</p>
        </div>
      </section>
    );
  }

  // Use default content if none provided
  const defaultContent: FeatureContent = {
    sectionHeader: {
      title: "Professional-grade tools for modern healthcare",
      description: "Comprehensive suite of advanced features designed to enhance diagnostic accuracy.",
    },
    categories: [{ id: "all", name: "All Features" }],
    features: [],
  };

  const activeContent = featuresContent || defaultContent;
  const features = activeContent.features || [];
  const categories = activeContent.categories || [];

  const filteredFeatures =
    activeTab === "all"
      ? features
      : features.filter((feature) => feature.category === activeTab);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={`relative ${isAdminView ? 'py-16' : 'py-32'} overflow-hidden`}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50"></div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Minimal Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-rose-100/30 to-pink-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Clean Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={isAdminView ? {} : { opacity: 0, y: 30 }}
          whileInView={isAdminView ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={isAdminView ? {} : { duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">
              Core Features
            </span>
            <div className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full font-medium">
              {features.length} Available
            </div>
          </div>

          <h2 className={`${isAdminView ? 'text-3xl md:text-4xl' : 'text-5xl md:text-6xl'} font-bold mb-8 leading-tight`}>
            <span 
              className="block text-slate-900 mb-2"
              dangerouslySetInnerHTML={{ __html: activeContent.sectionHeader.title.split('\n')[0] }}
            />
            <span 
              className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              dangerouslySetInnerHTML={{ __html: activeContent.sectionHeader.title.split('\n')[1] || '' }}
            />
          </h2>

          <p 
            className={`${isAdminView ? 'text-lg' : 'text-xl'} text-slate-600 max-w-3xl mx-auto leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: activeContent.sectionHeader.description }}
          />
        </motion.div>

        {/* Clean Category Filter */}
        {!isAdminView && categories.length > 1 && (
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === category.id
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-white/60 backdrop-blur-sm border border-slate-200/50 text-slate-600 hover:bg-white/80 hover:border-slate-300/50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.name}
                <span className="ml-1 text-xs opacity-60">
                  ({category.id === "all" ? features.length : features.filter(f => f.category === category.id).length})
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Clean, Professional Card Layout */}
        <motion.div
          className={`grid grid-cols-1 ${isAdminView ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {filteredFeatures.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon);
              return (
                <motion.div
                  key={`${feature.id}-${activeTab}`}
                  variants={itemVariants}
                  layout
                  className="group relative bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50"
                  whileHover={isAdminView ? {} : { y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header with Icon and Badge */}
                  <div className="relative p-8 pb-6">
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                        whileHover={isAdminView ? {} : { scale: 1.05, rotate: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="bg-slate-100/80 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-xs font-semibold text-slate-700">
                          {feature.badge}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                      {feature.description}
                    </p>

                    {/* Static Stats Display */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-amber-500 fill-current" />
                          <span className="text-sm font-semibold text-slate-700">
                            {feature.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-slate-900">
                          {feature.stats}
                        </div>
                        <div className="text-xs text-slate-500">
                          {feature.highlight}
                        </div>
                      </div>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <motion.div
                          key={benefitIndex}
                          className="flex items-center space-x-2 text-sm text-slate-600"
                          initial={isAdminView ? {} : { opacity: 0, x: -10 }}
                          whileInView={isAdminView ? {} : { opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={isAdminView ? {} : {
                            delay: benefitIndex * 0.05,
                            duration: 0.3,
                          }}
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-8 pb-8">
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                      <span className="text-sm font-medium text-slate-500">
                        Learn more
                      </span>
                      <motion.div
                        whileHover={isAdminView ? {} : { x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Subtle Hover Effect */}
                  {!isAdminView && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none"></div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;