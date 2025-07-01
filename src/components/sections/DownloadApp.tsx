"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Download,
  QrCode,
  Apple,
  Play,
  Monitor,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Star,
  Target,
  Users,
  Shield,
  Brain,
  Globe,
  BarChart3,
} from "lucide-react";
import { getSectionContent } from "@/lib/admin/contentProvider";
import { getIconComponent } from "@/lib/utils/icons";
import type { DownloadAppContent } from "@/lib/admin/types";

interface DownloadAppProps {
  isAdminView?: boolean;
  content?: DownloadAppContent;
}

const DownloadApp: React.FC<DownloadAppProps> = ({ isAdminView = false, content }) => {
  const [activeApp, setActiveApp] = useState<string>("ios");
  const [downloadContent, setDownloadContent] = useState<DownloadAppContent | null>(content || null);

  // Load content from admin or use defaults (only if not in admin view)
  React.useEffect(() => {
    if (isAdminView || content) {
      setDownloadContent(content || null);
      return;
    }

    const loadContent = () => {
      try {
        const loadedContent = getSectionContent<DownloadAppContent>('downloadApp');
        setDownloadContent(loadedContent);
      } catch (error) {
        console.error('Error loading download app content:', error);
        // Fallback to default content
        setDownloadContent({
          sectionHeader: {
            title: "Download ECG Buddy\nfor all your devices",
            description: "Access powerful ECG analysis on any platform. Download our native apps for seamless real-time analysis, cloud sync, and platform-specific integrations across iOS, Android, and Windows.",
          },
          apps: [
            {
              id: "ios",
              name: "ECG Buddy for iOS",
              icon: "Apple",
              platform: "iPhone & iPad",
              version: "v2.1.4",
              size: "45.2 MB",
              rating: "4.9",
              downloads: "50K+",
              gradient: "from-slate-600 via-slate-700 to-slate-800",
              qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5pT1MgUVIgQ29kZTwvdGV4dD4KPC9zdmc+",
              storeLink: "https://apps.apple.com/app/ecg-buddy",
              features: ["Face ID Security", "HealthKit Integration", "Real-time Analysis", "Apple Watch Support"],
              systemRequirements: ["iOS 14.0 or later", "iPhone 8 or newer"],
              releaseNotes: "• Improved AI accuracy\n• Apple Watch support\n• Bug fixes",
            },
          ],
          crossPlatformFeatures: [],
          downloadStats: {
            totalDownloads: "175K+",
            activeUsers: "50K+",
            averageRating: "4.8",
            supportedCountries: "120+",
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

  // Show loading state while content loads (only if not in admin view)
  if (!downloadContent && !isAdminView) {
    return (
      <section className="relative py-32 overflow-hidden">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading download app content...</p>
        </div>
      </section>
    );
  }

  // Use default content if none provided
  const defaultContent: DownloadAppContent = {
    sectionHeader: {
      title: "Download ECG Buddy for all your devices",
      description: "Access powerful ECG analysis on any platform.",
    },
    apps: [],
    crossPlatformFeatures: [],
    downloadStats: {
      totalDownloads: "0",
      activeUsers: "0",
      averageRating: "0",
      supportedCountries: "0",
    },
  };

  const activeContent = downloadContent || defaultContent;
  const apps = activeContent.apps || [];
  const activeAppData = apps.find((app) => app.id === activeApp) || apps[0];

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
    <section id="download-app" className={`relative ${isAdminView ? 'py-16' : 'py-32'} overflow-hidden`}>
      {/* Background with warm medical gradient */}
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
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl animate-pulse"
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
            <Download className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-slate-700">
              Download Apps
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

        {/* Download Stats */}
        {activeContent.downloadStats && (
          <motion.div
            className="mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Total Downloads", value: activeContent.downloadStats.totalDownloads, icon: Download },
                { label: "Active Users", value: activeContent.downloadStats.activeUsers, icon: Users },
                { label: "Average Rating", value: activeContent.downloadStats.averageRating, icon: Star },
                { label: "Countries", value: activeContent.downloadStats.supportedCountries, icon: Globe },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-6 bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-2xl"
                >
                  <stat.icon className="w-8 h-8 text-red-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className={`grid grid-cols-1 ${isAdminView ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-16 items-center mb-20`}>
          {/* App Selection & Details */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* App Selector */}
            {apps.length > 1 && (
              <motion.div
                className="bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-2 shadow-[0_8px_32px_rgba(255,63,74,0.08)]"
                variants={itemVariants}
              >
                <div className={`grid ${apps.length === 2 ? 'grid-cols-2' : apps.length === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
                  {apps.map((app, index) => {
                    const IconComponent = getIconComponent(app.icon);
                    return (
                      <motion.button
                        key={app.id}
                        onClick={() => setActiveApp(app.id)}
                        className={`relative p-6 rounded-2xl transition-all duration-500 group overflow-hidden ${
                          activeApp === app.id
                            ? "bg-white/60 border border-red-200/50 shadow-[0_8px_32px_rgba(255,63,74,0.12)]"
                            : "hover:bg-white/30"
                        }`}
                        whileHover={isAdminView ? {} : { scale: 1.02 }}
                        whileTap={isAdminView ? {} : { scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        disabled={isAdminView}
                      >
                        <motion.div
                          className={`relative w-12 h-12 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto transition-transform duration-300 shadow-lg`}
                          animate={isAdminView ? {} : {
                            scale: activeApp === app.id ? 1.1 : 1,
                            rotate: activeApp === app.id ? 3 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="relative text-slate-800 font-medium text-sm text-center">
                          {app.name}
                        </div>
                        <div className="relative text-slate-500 text-xs text-center mt-1">
                          {app.platform}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Active App Details */}
            {activeAppData && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeApp}
                  initial={isAdminView ? {} : { opacity: 0, x: -30, scale: 0.95 }}
                  animate={isAdminView ? {} : { opacity: 1, x: 0, scale: 1 }}
                  exit={isAdminView ? {} : { opacity: 0, x: 30, scale: 0.95 }}
                  transition={isAdminView ? {} : { duration: 0.6, ease: "easeOut" }}
                  className="relative bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 transition-all duration-500 shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_20px_60px_rgba(255,63,74,0.15)] group overflow-hidden"
                >
                  <div className="relative flex items-start space-x-6 mb-8">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${activeAppData.gradient} rounded-3xl flex items-center justify-center shadow-lg`}
                      initial={isAdminView ? {} : { scale: 0.8, rotate: -10 }}
                      animate={isAdminView ? {} : { scale: 1, rotate: 0 }}
                      transition={isAdminView ? {} : { duration: 0.5, ease: "easeOut" }}
                    >
                      {React.createElement(getIconComponent(activeAppData.icon), { className: "w-10 h-10 text-white" })}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        {activeAppData.name}
                      </h3>
                      <p className="text-slate-600 mb-4">
                        {activeAppData.platform}
                      </p>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-slate-500">
                          <span className="text-slate-800 font-medium">
                            {activeAppData.version}
                          </span>{" "}
                          • {activeAppData.size}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-slate-800 font-medium">
                            {activeAppData.rating}
                          </span>
                          <span className="text-slate-500">
                            ({activeAppData.downloads})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="relative mb-8">
                    <h4 className="text-slate-800 font-semibold mb-4 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-red-500" />
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {activeAppData.features.map((feature, index) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-2 text-slate-600"
                        >
                          <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <motion.a
                    href={activeAppData.storeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group w-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-[0_8px_32px_rgba(71,85,105,0.3)] hover:shadow-[0_12px_40px_rgba(71,85,105,0.4)] transition-all duration-500 flex items-center justify-center space-x-3 overflow-hidden"
                    whileHover={isAdminView ? {} : { scale: 1.02 }}
                    whileTap={isAdminView ? {} : { scale: 0.98 }}
                  >
                    <Download className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Download</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  </motion.a>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>

          {/* QR Code & Phone Mockup - Only show if not admin view */}
          {!isAdminView && activeAppData && (
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* QR Code Card */}
              <div className="relative bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 text-center shadow-[0_20px_70px_rgba(255,63,74,0.1)] transition-all duration-500 group overflow-hidden">
                <div className="relative inline-flex items-center space-x-2 bg-red-100/50 backdrop-blur-sm border border-red-200/50 rounded-full px-4 py-2 mb-6">
                  <QrCode className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-700">
                    Scan to Download
                  </span>
                </div>

                {/* QR Code */}
                <div className="relative mb-8">
                  <div className="w-64 h-64 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-[0_20px_60px_rgba(255,63,74,0.15)] transition-transform duration-500 border border-red-100/30">
                    {activeAppData.qrCode ? (
                      <img
                        src={activeAppData.qrCode}
                        alt={`${activeAppData.name} QR Code`}
                        className="w-full h-full object-contain rounded-3xl"
                      />
                    ) : (
                      <div className="text-center">
                        <QrCode className="w-24 h-24 text-slate-400 mx-auto mb-4" />
                        <div className="text-slate-600 font-medium text-lg">
                          QR Code
                        </div>
                        <div className="text-slate-500 text-sm mt-2">
                          {activeAppData.name}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="relative text-2xl font-bold text-slate-800 mb-4 transition-colors duration-300">
                  Quick Download
                </h3>
                <p className="relative text-slate-600 leading-relaxed">
                  Point your camera at the QR code to instantly download the{" "}
                  {activeAppData.name}
                  and start analyzing ECGs on your{" "}
                  {activeAppData.platform.toLowerCase()}.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Cross-Platform Features Grid */}
        {activeContent.crossPlatformFeatures.length > 0 && (
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {activeContent.crossPlatformFeatures.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon);
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 transition-all duration-500 group shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_20px_60px_rgba(255,63,74,0.15)] overflow-hidden"
                  whileHover={isAdminView ? {} : { y: -5 }}
                >
                  <motion.div
                    className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-lg`}
                    whileHover={isAdminView ? {} : { scale: 1.1, rotate: 5 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="relative text-xl font-bold text-slate-800 mb-4 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="relative text-slate-600 leading-relaxed transition-colors duration-300">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DownloadApp;