"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Award,
  Heart,
  Brain,
  Shield,
  Target,
  Sparkles,
  TrendingUp,
  Globe,
  Calendar,
  MapPin,
  Mail,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { getSectionContent } from "@/lib/admin/contentProvider";
import { getIconComponent } from "@/lib/utils/icons";
import type { AboutARPIContent } from "@/lib/admin/types";

interface AboutARPIProps {
  isAdminView?: boolean;
  content?: AboutARPIContent;
}

const AboutARPI: React.FC<AboutARPIProps> = ({ isAdminView = false, content }) => {
  const [aboutContent, setAboutContent] = React.useState<AboutARPIContent | null>(content || null);

  // Load content from admin or use defaults (only if not in admin view)
  React.useEffect(() => {
    if (isAdminView || content) {
      setAboutContent(content || null);
      return;
    }

    const loadContent = () => {
      try {
        const loadedContent = getSectionContent<AboutARPIContent>('aboutARPI');
        setAboutContent(loadedContent);
      } catch (error) {
        console.error('Error loading About ARPI content:', error);
        // Fallback to default content
        setAboutContent({
          sectionHeader: {
            title: "About ARPI Inc.",
            description: "Leading the future of AI-powered healthcare solutions with innovative technology and dedicated expertise.",
          },
          companyInfo: {
            name: "ARPI Inc.",
            description: "We are a cutting-edge healthcare technology company focused on developing AI-powered solutions that enhance diagnostic accuracy and improve patient outcomes.",
            founded: "2020",
            location: "Seoul, South Korea",
            employees: "50+",
          },
          values: [
            {
              icon: "Heart",
              title: "Patient-Centered",
              description: "Every solution we develop prioritizes patient safety and improved healthcare outcomes.",
              gradient: "from-red-500 to-pink-600",
            },
          ],
          team: [
            {
              name: "Dr. Kim Min-jun",
              role: "CEO & Co-founder",
              avatar: "👨‍⚕️",
              bio: "Cardiologist and AI researcher with 15+ years of experience in cardiac care and medical technology.",
            },
          ],
          achievements: [
            {
              icon: "Award",
              title: "FDA Approval",
              description: "First Korean AI ECG analysis platform to receive FDA clearance",
              stats: "2023",
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
  if (!aboutContent && !isAdminView) {
    return (
      <section className="relative py-32 overflow-hidden">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading About ARPI content...</p>
        </div>
      </section>
    );
  }

  // Use default content if none provided
  const defaultContent: AboutARPIContent = {
    sectionHeader: {
      title: "About ARPI Inc.",
      description: "Leading the future of AI-powered healthcare solutions.",
    },
    companyInfo: {
      name: "ARPI Inc.",
      description: "Healthcare technology company focused on AI-powered solutions.",
      founded: "2020",
      location: "Seoul, South Korea",
      employees: "50+",
    },
    values: [],
    team: [],
    achievements: [],
  };

  const activeContent = aboutContent || defaultContent;

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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about-arpi-section" className={`relative ${isAdminView ? 'py-16' : 'py-32'} overflow-hidden`}>
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
          initial={isAdminView ? {} : { opacity: 0, y: 30 }}
          whileInView={isAdminView ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={isAdminView ? {} : { duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-8 shadow-sm">
            <Building2 className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">
              About Our Company
            </span>
          </div>

          <h2 className={`${isAdminView ? 'text-3xl md:text-5xl' : 'text-5xl md:text-6xl'} font-bold mb-8 leading-tight`}>
            <span className="block text-slate-900 mb-2">
              {activeContent.sectionHeader.title}
            </span>
          </h2>

          <p className={`${isAdminView ? 'text-lg' : 'text-xl'} text-slate-600 max-w-3xl mx-auto leading-relaxed`}>
            {activeContent.sectionHeader.description}
          </p>
        </motion.div>

        {/* Company Info */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 md:p-12 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900">
                      {activeContent.companyInfo.name}
                    </h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full mt-2"></div>
                  </div>
                </div>
                
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {activeContent.companyInfo.description}
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-slate-50 rounded-2xl">
                    <div className="text-2xl font-bold text-slate-800 mb-1">
                      {activeContent.companyInfo.founded}
                    </div>
                    <div className="text-sm text-slate-600">Founded</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-2xl">
                    <div className="text-2xl font-bold text-slate-800 mb-1">
                      {activeContent.companyInfo.employees}
                    </div>
                    <div className="text-sm text-slate-600">Employees</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-2 mb-6">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">
                    {activeContent.companyInfo.location}
                  </span>
                </div>
                
                <div className="w-64 h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl mx-auto flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                    <div className="text-slate-600 font-medium">
                      Global Headquarters
                    </div>
                    <div className="text-slate-500 text-sm mt-2">
                      {activeContent.companyInfo.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Values */}
        {activeContent.values.length > 0 && (
          <motion.div
            className="mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Values</h3>
              <p className="text-lg text-slate-600">The principles that guide everything we do</p>
            </div>

            <div className={`grid grid-cols-1 ${isAdminView ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8`}>
              {activeContent.values.map((value, index) => {
                const IconComponent = getIconComponent(value.icon);
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300"
                    whileHover={isAdminView ? {} : { y: -5 }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4">
                      {value.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Team */}
        {activeContent.team.length > 0 && (
          <motion.div
            className="mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Leadership Team</h3>
              <p className="text-lg text-slate-600">Meet the experts behind ECG Buddy</p>
            </div>

            <div className={`grid grid-cols-1 ${isAdminView ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8`}>
              {activeContent.team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={isAdminView ? {} : { y: -5 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    {member.avatar}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-slate-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Achievements */}
        {activeContent.achievements.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Key Achievements</h3>
              <p className="text-lg text-slate-600">Milestones in our journey</p>
            </div>

            <div className={`grid grid-cols-1 ${isAdminView ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8`}>
              {activeContent.achievements.map((achievement, index) => {
                const IconComponent = getIconComponent(achievement.icon);
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300"
                    whileHover={isAdminView ? {} : { y: -5 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      {achievement.stats}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4">
                      {achievement.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {achievement.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutARPI;