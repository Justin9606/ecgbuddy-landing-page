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
} from "lucide-react";
import { HighlightableElement, HighlightableArrayItem } from "@/components/admin/InteractivePreview";

interface MobileDownloadProps {
  onElementClick?: (elementPath: string, elementType: string) => void;
}

const MobileDownload: React.FC<MobileDownloadProps> = ({ onElementClick }) => {
  const [activeApp, setActiveApp] = useState<string>("ios");

  const apps = [
    {
      id: "ios",
      name: "iOS App",
      icon: Apple,
      platform: "iPhone & iPad",
      version: "v2.1.4",
      size: "45.2 MB",
      rating: "4.9",
      downloads: "50K+",
      gradient: "from-slate-600 via-slate-700 to-slate-800",
      qrPlaceholder: "iOS-QR-CODE",
      storeLink: "https://apps.apple.com/app/ecg-buddy",
      features: [
        "Face ID Security",
        "HealthKit Integration",
        "Accurate Analysis",
        "Apple Watch Support",
      ],
    },
    {
      id: "android",
      name: "Android App",
      icon: Play,
      platform: "Android 8.0+",
      version: "v2.1.3",
      size: "38.7 MB",
      rating: "4.8",
      downloads: "100K+",
      gradient: "from-slate-600 via-slate-700 to-slate-800",
      qrPlaceholder: "ANDROID-QR-CODE",
      storeLink:
        "https://play.google.com/store/apps/details?id=com.arpi.ecgbuddy",
      features: [
        "Biometric Security",
        "Google Health Connect",
        "Real-time Processing",
        "Wear OS Support",
      ],
    },
    {
      id: "windows",
      name: "Windows App",
      icon: Monitor,
      platform: "Windows 10/11",
      version: "v1.8.2",
      size: "125.4 MB",
      rating: "4.7",
      downloads: "25K+",
      gradient: "from-slate-600 via-slate-700 to-slate-800",
      qrPlaceholder: "WINDOWS-QR-CODE",
      storeLink: "https://www.microsoft.com/store/apps/ecg-buddy",
      features: [
        "Desktop Integration",
        "Multi-Monitor Support",
        "Batch Processing",
        "Enterprise SSO",
      ],
    },
  ];

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

  const appDetailsVariants = {
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

  const qrCodeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotate: 10,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="mobile-download" className="relative py-32 overflow-hidden">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-red-100/50 rounded-full px-6 py-3 mb-8 shadow-[0_8px_32px_rgba(255,63,74,0.08)]">
            <Smartphone className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-slate-700">
              Mobile & Desktop Apps
            </span>
          </div>

          <HighlightableElement
            dataPath="sectionHeader.title"
            elementType="richtext"
            label="Section Title"
            onElementClick={onElementClick}
            disabled={!onElementClick}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                Take ECG Buddy
              </span>
              <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                everywhere you go
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
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Access powerful ECG analysis on any device. Download our native apps
              for seamless real-time analysis, cloud sync, and platform-specific
              integrations.
            </p>
          </HighlightableElement>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - App Selection & Details */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* App Selector with Enhanced Animations */}
            <motion.div
              className="bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-2 shadow-[0_8px_32px_rgba(255,63,74,0.08)]"
              variants={itemVariants}
            >
              <HighlightableElement
                dataPath="apps"
                elementType="array"
                label="App Selection"
                onElementClick={onElementClick}
                disabled={!onElementClick}
                className="grid grid-cols-3 gap-2"
              >
                {apps.map((app, index) => (
                  <motion.button
                    key={app.id}
                    onClick={() => setActiveApp(app.id)}
                    className={`relative p-6 rounded-2xl transition-all duration-500 group overflow-hidden ${
                      activeApp === app.id
                        ? "bg-white/60 border border-red-200/50 shadow-[0_8px_32px_rgba(255,63,74,0.12)]"
                        : "hover:bg-white/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {/* Glassy hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>

                    <motion.div
                      className={`relative w-12 h-12 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto transition-transform duration-300 shadow-lg`}
                      animate={{
                        scale: activeApp === app.id ? 1.1 : 1,
                        rotate: activeApp === app.id ? 3 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <app.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="relative text-slate-800 font-medium text-sm text-center">
                      {app.name}
                    </div>
                    <div className="relative text-slate-500 text-xs text-center mt-1">
                      {app.platform}
                    </div>

                    {activeApp === app.id && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-red-600/10 to-pink-500/10 border border-red-500/20"
                        layoutId="activeAppBorder"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </HighlightableElement>
            </motion.div>

            {/* Active App Details with Smooth Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeApp}
                variants={appDetailsVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 transition-all duration-500 shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_20px_60px_rgba(255,63,74,0.15)] group overflow-hidden"
              >
                {/* Glassy hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                <div className="relative flex items-start space-x-6 mb-8">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${activeAppData.gradient} rounded-3xl flex items-center justify-center shadow-lg`}
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <activeAppData.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3
                      className="text-2xl font-bold text-slate-800 mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      {activeAppData.name}
                    </motion.h3>
                    <motion.p
                      className="text-slate-600 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {activeAppData.platform}
                    </motion.p>
                    <motion.div
                      className="flex items-center space-x-6 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
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
                    </motion.div>
                  </div>
                </div>

                {/* Features with Staggered Animation */}
                <div className="relative mb-8">
                  <motion.h4
                    className="text-slate-800 font-semibold mb-4 flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <Sparkles className="w-4 h-4 mr-2 text-red-500" />
                    Key Features
                  </motion.h4>
                  <div className="grid grid-cols-2 gap-3">
                    {activeAppData.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        className="flex items-center space-x-2 text-slate-600"
                        custom={index}
                        variants={featureVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <motion.a
                  href={activeAppData.storeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group w-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-[0_8px_32px_rgba(71,85,105,0.3)] hover:shadow-[0_12px_40px_rgba(71,85,105,0.4)] transition-all duration-500 flex items-center justify-center space-x-3 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  {/* Glassy hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>

                  <Download className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Download</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Side - QR Code & Phone Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* QR Code Card with App-Specific Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`qr-${activeApp}`}
                variants={qrCodeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 text-center shadow-[0_20px_70px_rgba(255,63,74,0.1)] transition-all duration-500 group overflow-hidden"
              >
                {/* Glassy hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                <div className="relative inline-flex items-center space-x-2 bg-red-100/50 backdrop-blur-sm border border-red-200/50 rounded-full px-4 py-2 mb-6">
                  <QrCode className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-700">
                    Scan to Download
                  </span>
                </div>

                {/* QR Code Placeholder with Enhanced Animation */}
                <div className="relative mb-8">
                  <motion.div
                    className="w-64 h-64 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-[0_20px_60px_rgba(255,63,74,0.15)] transition-transform duration-500 border border-red-100/30"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <QrCode className="w-24 h-24 text-slate-400 mx-auto mb-4" />
                      </motion.div>
                      <motion.div
                        className="text-slate-600 font-medium text-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                      >
                        {activeAppData.qrPlaceholder}
                      </motion.div>
                      <motion.div
                        className="text-slate-500 text-sm mt-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                      >
                        QR Code will be loaded
                        <br />
                        from admin configuration
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Floating Elements around QR */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-60"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full opacity-40"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>

                <motion.h3
                  className="relative text-2xl font-bold text-slate-800 mb-4 transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  Quick Download
                </motion.h3>
                <motion.p
                  className="relative text-slate-600 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  Point your camera at the QR code to instantly download the{" "}
                  {activeAppData.name}
                  and start analyzing ECGs on your{" "}
                  {activeAppData.platform.toLowerCase()}.
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Floating Stats with Enhanced Animations */}
            <motion.div
              className="absolute -top-8 -left-8 bg-white/50 backdrop-blur-2xl border border-red-100/50 rounded-2xl p-4 shadow-[0_12px_40px_rgba(255,63,74,0.1)]"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-red-600 text-2xl font-bold">175K+</div>
              <div className="text-slate-600 text-sm">Total Downloads</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -right-8 bg-white/50 backdrop-blur-2xl border border-red-100/50 rounded-2xl p-4 shadow-[0_12px_40px_rgba(255,63,74,0.1)]"
              animate={{
                y: [0, -15, 0],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              <div className="text-pink-600 text-2xl font-bold">4.8★</div>
              <div className="text-slate-600 text-sm">Average Rating</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Features Grid with Updated Content */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <HighlightableElement
            dataPath="bottomFeatures"
            elementType="array"
            label="Bottom Features"
            onElementClick={onElementClick}
            disabled={!onElementClick}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Smartphone,
                title: "Cross-Platform Sync",
                description:
                  "Seamlessly sync your ECG data across all devices with real-time cloud synchronization.",
                gradient: "from-red-500 to-pink-600",
              },
              {
                icon: Target,
                title: "Accurate Analysis",
                description:
                  "Get precise ECG interpretations with our advanced AI algorithms trained on millions of cardiac patterns.",
                gradient: "from-pink-500 to-rose-600",
              },
              {
                icon: CheckCircle,
                title: "Native Integration",
                description:
                  "Deep integration with platform-specific features like HealthKit, Google Health, and Windows Hello.",
                gradient: "from-rose-500 to-red-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 transition-all duration-500 group shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_20px_60px_rgba(255,63,74,0.15)] overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Glassy hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                <motion.div
                  className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="relative text-xl font-bold text-slate-800 mb-4 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="relative text-slate-600 leading-relaxed transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </HighlightableElement>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileDownload;