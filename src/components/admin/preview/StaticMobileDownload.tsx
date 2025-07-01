"use client";

import React from "react";
import { Smartphone, Download, QrCode, Apple, Play, Monitor, ArrowRight, CheckCircle, Star } from "lucide-react";
import { getSectionContent } from "@/lib/admin/contentProvider";
import { getIconComponent } from "@/lib/utils/icons";
import type { MobileDownloadContent } from "@/lib/admin/types";

export const StaticMobileDownload: React.FC = () => {
  const content = getSectionContent<MobileDownloadContent>('mobileDownload');
  const activeApp = content.apps[0]; // Show first app by default

  return (
    <section className="relative py-16 bg-gradient-to-br from-red-50/30 via-white to-pink-50/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 63, 74, 0.15) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-red-100/50 rounded-full px-6 py-3 mb-8">
            <Smartphone className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-slate-700">
              Mobile & Desktop Apps
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
              {content.sectionHeader.title.split('\n')[0]}
            </span>
            <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
              {content.sectionHeader.title.split('\n')[1] || ''}
            </span>
          </h2>

          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {content.sectionHeader.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - App Details */}
          <div className="space-y-8">
            {/* App Selector */}
            {content.apps.length > 1 && (
              <div className="bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-2">
                <div className={`grid ${content.apps.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2`}>
                  {content.apps.map((app, index) => {
                    const IconComponent = getIconComponent(app.icon);
                    return (
                      <div
                        key={app.id}
                        className={`p-6 rounded-2xl ${
                          index === 0
                            ? "bg-white/60 border border-red-200/50"
                            : "bg-white/30"
                        }`}
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-slate-800 font-medium text-sm text-center">
                          {app.name}
                        </div>
                        <div className="text-slate-500 text-xs text-center mt-1">
                          {app.platform}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Active App Details */}
            {activeApp && (
              <div className="bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${activeApp.gradient} rounded-3xl flex items-center justify-center shadow-lg`}>
                    {React.createElement(getIconComponent(activeApp.icon), { className: "w-10 h-10 text-white" })}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      {activeApp.name}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {activeApp.platform}
                    </p>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-slate-500">
                        <span className="text-slate-800 font-medium">
                          {activeApp.version}
                        </span>{" "}
                        • {activeApp.size}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-slate-800 font-medium">
                          {activeApp.rating}
                        </span>
                        <span className="text-slate-500">
                          ({activeApp.downloads})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-slate-800 font-semibold mb-4 flex items-center">
                    <span className="w-4 h-4 mr-2 text-red-500">✨</span>
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {activeApp.features.map((feature, index) => (
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
                <a
                  href={activeApp.storeLink}
                  className="w-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>

          {/* Right Side - QR Code */}
          <div className="relative">
            <div className="bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-red-100/50 backdrop-blur-sm border border-red-200/50 rounded-full px-4 py-2 mb-6">
                <QrCode className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">
                  Scan to Download
                </span>
              </div>

              {/* QR Code Placeholder */}
              <div className="w-64 h-64 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-lg border border-red-100/30 mb-8">
                <div className="text-center">
                  <QrCode className="w-24 h-24 text-slate-400 mx-auto mb-4" />
                  <div className="text-slate-600 font-medium text-lg">
                    {activeApp?.qrPlaceholder || 'QR-CODE'}
                  </div>
                  <div className="text-slate-500 text-sm mt-2">
                    QR Code will be loaded
                    <br />
                    from admin configuration
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Quick Download
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Point your camera at the QR code to instantly download the{" "}
                {activeApp?.name || 'app'} and start analyzing ECGs.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        {content.bottomFeatures.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.bottomFeatures.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon);
              return (
                <div
                  key={index}
                  className="bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};