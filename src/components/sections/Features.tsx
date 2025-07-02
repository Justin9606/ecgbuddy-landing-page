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

const Features = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const features = [
    {
      id: "ai-powered-analysis",
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms trained on millions of ECG patterns for unprecedented accuracy and reliability.",
      gradient: "from-violet-500 via-purple-600 to-indigo-600",
      stats: "99.2% Accuracy",
      highlight: "Deep Learning",
      category: "ai",
      benefits: [
        "Real-time interpretation",
        "Continuous learning",
        "Pattern recognition",
      ],
      rating: 4.9,
      badge: "Most Popular",
    },
    {
      id: "real-time-processing",
      icon: Clock,
      title: "Real-time Processing",
      description:
        "Get comprehensive ECG analysis results in under 30 seconds with our optimized cloud processing engine.",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      stats: "<30s Processing",
      highlight: "Lightning Fast",
      category: "performance",
      benefits: ["Instant results", "Cloud optimization", "Batch processing"],
      rating: 4.8,
      badge: "Speed Champion",
    },
    {
      id: "medical-grade-security",
      icon: Shield,
      title: "Medical Grade Security",
      description:
        "HIPAA-compliant infrastructure with end-to-end encryption ensuring complete patient data protection.",
      gradient: "from-emerald-500 via-teal-600 to-cyan-600",
      stats: "HIPAA Compliant",
      highlight: "Enterprise Security",
      category: "security",
      benefits: ["End-to-end encryption", "Audit trails", "Access controls"],
      rating: 5.0,
      badge: "Gold Standard",
    },
    {
      id: "team-collaboration",
      icon: Users,
      title: "Team Collaboration",
      description:
        "Enable seamless collaboration between cardiologists, nurses, and healthcare teams with shared workspaces.",
      gradient: "from-rose-500 via-pink-600 to-red-600",
      stats: "50+ Team Members",
      highlight: "Real-time Sync",
      category: "collaboration",
      benefits: ["Shared workspaces", "Role-based access", "Real-time updates"],
      rating: 4.7,
      badge: "Team Favorite",
    },
    {
      id: "advanced-analytics",
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Comprehensive reporting with trend analysis, risk stratification, and predictive insights for better outcomes.",
      gradient: "from-blue-500 via-indigo-600 to-purple-600",
      stats: "15+ Report Types",
      highlight: "Predictive AI",
      category: "analytics",
      benefits: ["Trend analysis", "Risk scoring", "Custom reports"],
      rating: 4.6,
      badge: "Data Driven",
    },
    {
      id: "clinical-integration",
      icon: Stethoscope,
      title: "Clinical Integration",
      description:
        "Seamlessly integrate with existing EMR systems and clinical workflows without disrupting your practice.",
      gradient: "from-slate-600 via-gray-700 to-slate-800",
      stats: "200+ Integrations",
      highlight: "EMR Compatible",
      category: "integration",
      benefits: ["EMR integration", "API access", "Workflow automation"],
      rating: 4.8,
      badge: "Universal",
    },
  ];

  const categories = [
    { id: "all", name: "All Features", count: features.length },
    {
      id: "ai",
      name: "AI & ML",
      count: features.filter((f) => f.category === "ai").length,
    },
    {
      id: "performance",
      name: "Performance",
      count: features.filter((f) => f.category === "performance").length,
    },
    {
      id: "security",
      name: "Security",
      count: features.filter((f) => f.category === "security").length,
    },
    {
      id: "collaboration",
      name: "Collaboration",
      count: features.filter((f) => f.category === "collaboration").length,
    },
    {
      id: "analytics",
      name: "Analytics",
      count: features.filter((f) => f.category === "analytics").length,
    },
    {
      id: "integration",
      name: "Integration",
      count: features.filter((f) => f.category === "integration").length,
    },
  ];

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
    <section className="relative py-32 overflow-hidden">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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

          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="block text-slate-900 mb-2">
              Professional-grade tools
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              for modern healthcare
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive suite of advanced features designed to enhance
            diagnostic accuracy and streamline cardiac care workflows for
            healthcare professionals.
          </p>
        </motion.div>

        {/* Clean Category Filter */}
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
                ({category.count})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Clean, Professional Card Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {filteredFeatures.map((feature, index) => (
              <motion.div
                key={`${feature.id}-${activeTab}`}
                variants={itemVariants}
                layout
                className="group relative bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header with Icon and Badge */}
                <div className="relative p-8 pb-6">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
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
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
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
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                    </motion.div>
                  </div>
                </div>

                {/* Subtle Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
