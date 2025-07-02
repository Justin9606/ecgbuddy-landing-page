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
  Lightbulb,
} from "lucide-react";
import { HighlightableElement, HighlightableArrayItem } from "@/components/admin/InteractivePreview";

interface AboutARPIProps {
  onElementClick?: (elementPath: string, elementType: string) => void;
}

const AboutARPI: React.FC<AboutARPIProps> = ({ onElementClick }) => {
  const [activeTab, setActiveTab] = useState<string>("story");

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
      description: "Global reach",
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
      features: ["Patient safety first", "Improved outcomes", "Quality care"],
    },
    {
      icon: Brain,
      title: "Innovation-Driven",
      description:
        "We push the boundaries of AI and machine learning to create breakthrough medical technologies.",
      gradient: "from-purple-500 to-indigo-600",
      features: ["Cutting-edge AI", "Research-backed", "Future-focused"],
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "We maintain the highest standards of data security and regulatory compliance.",
      gradient: "from-emerald-500 to-teal-600",
      features: ["HIPAA compliant", "Bank-level security", "Audit trails"],
    },
    {
      icon: Users,
      title: "Collaborative",
      description:
        "We work closely with healthcare professionals to understand and solve real-world challenges.",
      gradient: "from-blue-500 to-cyan-600",
      features: ["Healthcare partnerships", "User feedback", "Co-creation"],
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Kim Min-jun",
      role: "CEO & Co-founder",
      bio: "Cardiologist and AI researcher with 15+ years of experience in cardiac care and medical technology.",
      avatar: "👨‍⚕️",
      expertise: ["Cardiology", "AI Research", "Medical Technology"],
      education: "MD, Seoul National University",
    },
    {
      name: "Dr. Lee So-young",
      role: "CTO & Co-founder",
      bio: "Former Google AI researcher specializing in medical imaging and machine learning applications.",
      avatar: "👩‍💻",
      expertise: ["Machine Learning", "Medical Imaging", "Software Architecture"],
      education: "PhD Computer Science, KAIST",
    },
    {
      name: "Dr. Park Ji-hoon",
      role: "Chief Medical Officer",
      bio: "Emergency medicine physician with expertise in point-of-care diagnostics and clinical workflows.",
      avatar: "👨‍⚕️",
      expertise: ["Emergency Medicine", "Clinical Workflows", "Diagnostics"],
      education: "MD, Yonsei University",
    },
    {
      name: "Sarah Chen",
      role: "VP of Engineering",
      bio: "Former Apple engineer with 12+ years building scalable healthcare platforms and mobile applications.",
      avatar: "👩‍💼",
      expertise: ["Software Engineering", "Mobile Development", "Healthcare Platforms"],
      education: "MS Computer Science, Stanford",
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
      description: "99.2% accuracy in multi-center clinical trials",
      stats: "1M+ ECGs",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: TrendingUp,
      title: "Market Leader",
      description: "Leading AI ECG platform in Asia-Pacific region",
      stats: "#1 in APAC",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Globe,
      title: "Global Expansion",
      description: "Serving healthcare professionals across 15+ countries",
      stats: "15+ Countries",
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const tabs = [
    { id: "story", name: "Our Story", icon: Building2 },
    { id: "values", name: "Values", icon: Heart },
    { id: "team", name: "Team", icon: Users },
    { id: "achievements", name: "Achievements", icon: Award },
  ];

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
          <HighlightableElement
            dataPath="sectionHeader.badge"
            elementType="text"
            label="Section Badge"
            onElementClick={onElementClick}
            disabled={!onElementClick}
          >
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-8 shadow-sm">
              <Building2 className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">About ARPI Inc.</span>
            </div>
          </HighlightableElement>

          <HighlightableElement
            dataPath="sectionHeader.title"
            elementType="richtext"
            label="Section Title"
            onElementClick={onElementClick}
            disabled={!onElementClick}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="block text-slate-900 mb-2">Leading the future of</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AI-powered healthcare
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
              We are a cutting-edge healthcare technology company focused on developing
              AI-powered solutions that enhance diagnostic accuracy and improve patient
              outcomes.
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
          {companyStats.map((stat, index) => (
            <HighlightableArrayItem
              key={index}
              dataPath="companyStats"
              index={index}
              label="Company Stat"
              onElementClick={onElementClick}
              disabled={!onElementClick}
            >
              <motion.div
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
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-700 font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-slate-500">{stat.description}</div>
              </motion.div>
            </HighlightableArrayItem>
          ))}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "story" && (
              <HighlightableElement
                dataPath="companyInfo"
                elementType="section"
                label="Company Story"
                onElementClick={onElementClick}
                disabled={!onElementClick}
              >
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-12 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">
                          Founded in 2020 by a team of cardiologists and AI researchers, ARPI Inc.
                          was born from a simple yet powerful vision: to democratize access to
                          world-class cardiac care through artificial intelligence.
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-8">
                          Our journey began in the emergency departments of Seoul, where our
                          founders witnessed firsthand the critical need for faster, more accurate
                          ECG interpretation. Today, we're proud to serve healthcare professionals
                          across 15+ countries with our FDA-approved AI platform.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="text-2xl font-bold text-slate-900">2020</div>
                            <div className="text-sm text-slate-600">Founded</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-slate-900">Seoul</div>
                            <div className="text-sm text-slate-600">Headquarters</div>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full h-80 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                          <Building2 className="w-24 h-24 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </HighlightableElement>
            )}

            {activeTab === "values" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <value.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">{value.description}</p>
                      <div className="space-y-2">
                        {value.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <span className="text-sm text-slate-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </HighlightableArrayItem>
                ))}
              </div>
            )}

            {activeTab === "team" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="text-4xl">{member.avatar}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                          <div className="text-blue-600 font-medium mb-2">{member.role}</div>
                          <div className="text-sm text-slate-500">{member.education}</div>
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-6">{member.bio}</p>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-slate-700 mb-2">Expertise:</div>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </HighlightableArrayItem>
                ))}
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 transition-all duration-500 shadow-sm hover:shadow-xl hover:border-slate-300/50 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <motion.div
                          className={`w-16 h-16 bg-gradient-to-br ${achievement.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <achievement.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900">{achievement.stats}</div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">{achievement.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{achievement.description}</p>
                    </motion.div>
                  </HighlightableArrayItem>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutARPI;