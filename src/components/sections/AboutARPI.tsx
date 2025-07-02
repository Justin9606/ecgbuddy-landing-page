"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Heart,
  Users,
  Award,
  MapPin,
  Calendar,
  TrendingUp,
  Sparkles,
  Star,
  CheckCircle,
  ArrowRight,
  Globe,
  Shield,
  Zap,
  Brain,
  Target,
  Activity,
} from "lucide-react";
import { HighlightableElement, HighlightableArrayItem } from "@/components/admin/InteractivePreview";

interface AboutARPIProps {
  onElementClick?: (elementPath: string, elementType: string) => void;
}

const AboutARPI: React.FC<AboutARPIProps> = ({ onElementClick }) => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const companyStats = [
    {
      icon: Users,
      value: "50+",
      label: "Team Members",
      description: "Healthcare & AI experts",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Globe,
      value: "15+",
      label: "Countries",
      description: "Global healthcare reach",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Award,
      value: "99.2%",
      label: "AI Accuracy",
      description: "Clinical validation",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: Heart,
      value: "1M+",
      label: "ECGs Analyzed",
      description: "Trusted by professionals",
      gradient: "from-red-500 to-pink-600",
    },
  ];

  const companyValues = [
    {
      icon: Heart,
      title: "Patient-Centered",
      description:
        "Every solution we develop prioritizes patient safety and improved healthcare outcomes.",
      gradient: "from-red-500 to-pink-600",
    },
    {
      icon: Brain,
      title: "Innovation First",
      description:
        "We push the boundaries of AI and machine learning to solve complex medical challenges.",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "We maintain the highest standards of data security and regulatory compliance.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Users,
      title: "Collaborative Care",
      description:
        "We believe in empowering healthcare teams through seamless collaboration tools.",
      gradient: "from-blue-500 to-cyan-600",
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Kim Min-jun",
      role: "CEO & Co-founder",
      avatar: "👨‍⚕️",
      bio: "Cardiologist and AI researcher with 15+ years of experience in cardiac care and medical technology.",
      specialties: ["Cardiology", "AI Research", "Medical Devices"],
    },
    {
      name: "Dr. Lee So-young",
      role: "CTO & Co-founder",
      avatar: "👩‍💻",
      bio: "Former Google AI researcher specializing in medical imaging and machine learning applications.",
      specialties: ["Machine Learning", "Medical Imaging", "Software Architecture"],
    },
    {
      name: "Dr. Park Ji-hoon",
      role: "Chief Medical Officer",
      avatar: "👨‍⚕️",
      bio: "Emergency medicine physician with expertise in point-of-care diagnostics and clinical workflows.",
      specialties: ["Emergency Medicine", "Clinical Workflows", "Medical Education"],
    },
    {
      name: "Sarah Chen",
      role: "VP of Engineering",
      avatar: "👩‍💻",
      bio: "Software engineering leader with 12+ years building scalable healthcare platforms.",
      specialties: ["Software Engineering", "Healthcare Platforms", "Team Leadership"],
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: "FDA Approval",
      description: "First Korean AI ECG analysis platform to receive FDA clearance",
      stats: "2023",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: Star,
      title: "Clinical Validation",
      description: "Published in leading cardiology journals with 99.2% accuracy",
      stats: "2022",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: TrendingUp,
      title: "Series A Funding",
      description: "Raised $15M to accelerate global expansion",
      stats: "2023",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Globe,
      title: "Global Expansion",
      description: "Launched in 15 countries across Asia, Europe, and Americas",
      stats: "2024",
      gradient: "from-purple-500 to-violet-600",
    },
  ];

  const tabs = [
    { id: "overview", name: "Overview", icon: Building2 },
    { id: "values", name: "Values", icon: Heart },
    { id: "team", name: "Team", icon: Users },
    { id: "achievements", name: "Achievements", icon: Award },
  ];

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

  const tabContentVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: 30,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn",
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
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-3xl"></div>
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
            <span className="text-sm font-medium text-slate-700">About Us</span>
          </div>

          <HighlightableElement
            dataPath="sectionHeader.title"
            elementType="richtext"
            label="Section Title"
            onElementClick={onElementClick}
            disabled={!onElementClick}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="block text-slate-900 mb-2">About</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ARPI Inc.
              </span>
            </h2>
          </HighlightableElement>

          <HighlightableElement
            dataPath="sectionHeader.description"
            elementType="richtext"
            label="Section Description"
            onElementClick={onElementClick}
            disabled={!onElementClick}
          >
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Leading the future of AI-powered healthcare solutions with innovative
              technology and dedicated expertise.
            </p>
          </HighlightableElement>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <HighlightableElement
            dataPath="companyStats"
            elementType="array"
            label="Company Statistics"
            onElementClick={onElementClick}
            disabled={!onElementClick}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 text-center transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50 group"
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500">{stat.description}</div>
              </motion.div>
            ))}
          </HighlightableElement>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-white/60 backdrop-blur-sm border border-slate-200/50 text-slate-600 hover:bg-white/80 hover:border-slate-300/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <HighlightableElement
                  dataPath="companyInfo"
                  elementType="object"
                  label="Company Information"
                  onElementClick={onElementClick}
                  disabled={!onElementClick}
                >
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-slate-900 mb-6">
                      Our Mission
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      We are a cutting-edge healthcare technology company focused on
                      developing AI-powered solutions that enhance diagnostic accuracy
                      and improve patient outcomes.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Founded in 2020 in Seoul, South Korea, ARPI Inc. has grown to
                      become a trusted partner for healthcare professionals worldwide,
                      with our flagship product ECG Buddy leading the revolution in
                      cardiac care.
                    </p>
                    <div className="grid grid-cols-2 gap-6 mt-8">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-slate-500" />
                        <div>
                          <div className="font-semibold text-slate-900">Founded</div>
                          <div className="text-slate-600">2020</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-slate-500" />
                        <div>
                          <div className="font-semibold text-slate-900">
                            Headquarters
                          </div>
                          <div className="text-slate-600">Seoul, South Korea</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </HighlightableElement>

                <div className="relative">
                  <div className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_20px_70px_rgba(0,0,0,0.1)]">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Building2 className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-slate-900 mb-4">
                        ARPI Inc.
                      </h4>
                      <p className="text-slate-600 leading-relaxed">
                        Advancing healthcare through artificial intelligence and
                        innovative medical technology solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <HighlightableElement
                  dataPath="values"
                  elementType="array"
                  label="Company Values"
                  onElementClick={onElementClick}
                  disabled={!onElementClick}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {companyValues.map((value, index) => (
                    <HighlightableArrayItem
                      key={index}
                      dataPath="values"
                      index={index}
                      label="Company Value"
                      onElementClick={onElementClick}
                      disabled={!onElementClick}
                    >
                      <motion.div
                        className="relative bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50 group"
                        whileHover={{ y: -4 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <motion.div
                          className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <value.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className="text-xl font-bold text-slate-900 mb-4">
                          {value.title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          {value.description}
                        </p>
                      </motion.div>
                    </HighlightableArrayItem>
                  ))}
                </HighlightableElement>
              </div>
            )}

            {activeTab === "team" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <HighlightableElement
                  dataPath="team"
                  elementType="array"
                  label="Team Members"
                  onElementClick={onElementClick}
                  disabled={!onElementClick}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {teamMembers.map((member, index) => (
                    <HighlightableArrayItem
                      key={index}
                      dataPath="team"
                      index={index}
                      label="Team Member"
                      onElementClick={onElementClick}
                      disabled={!onElementClick}
                    >
                      <motion.div
                        className="relative bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50 group"
                        whileHover={{ y: -4 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <div className="text-center mb-6">
                          <div className="text-4xl mb-4">{member.avatar}</div>
                          <h4 className="text-xl font-bold text-slate-900 mb-1">
                            {member.name}
                          </h4>
                          <p className="text-blue-600 font-medium mb-4">
                            {member.role}
                          </p>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                          {member.bio}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty, specIndex) => (
                            <span
                              key={specIndex}
                              className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </HighlightableArrayItem>
                  ))}
                </HighlightableElement>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <HighlightableElement
                  dataPath="achievements"
                  elementType="array"
                  label="Company Achievements"
                  onElementClick={onElementClick}
                  disabled={!onElementClick}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {achievements.map((achievement, index) => (
                    <HighlightableArrayItem
                      key={index}
                      dataPath="achievements"
                      index={index}
                      label="Achievement"
                      onElementClick={onElementClick}
                      disabled={!onElementClick}
                    >
                      <motion.div
                        className="relative bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50 group"
                        whileHover={{ y: -4 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <div className="flex items-start space-x-4">
                          <motion.div
                            className={`w-16 h-16 bg-gradient-to-br ${achievement.gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <achievement.icon className="w-8 h-8 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-xl font-bold text-slate-900">
                                {achievement.title}
                              </h4>
                              <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                {achievement.stats}
                              </span>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </HighlightableArrayItem>
                  ))}
                </HighlightableElement>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutARPI;