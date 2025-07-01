"use client";

import React from "react";
import { Building2, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import { getSectionContent } from "@/lib/admin/contentProvider";
import type { FooterContent } from "@/lib/admin/types";

export const StaticFooter: React.FC = () => {
  const content = getSectionContent<FooterContent>('footer');

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        {/* Brand Section */}
        <div className="lg:col-span-1">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-2xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">{content.companyInfo.name}</span>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-md">
            {content.companyInfo.description}
          </p>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-slate-400">
              <div className="w-8 h-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm">{content.contactInfo.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400">
              <div className="w-8 h-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-sm">{content.contactInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400">
              <div className="w-8 h-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-sm">{content.contactInfo.address}</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        {content.sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              {section.title}
              <span className="w-4 h-4 ml-2 text-red-400 opacity-60">✨</span>
            </h3>
            <ul className="space-y-3">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <div className="text-slate-400 hover:text-red-400 transition-all duration-300">
                    <div className="font-medium text-sm mb-1 flex items-center">
                      {link.name}
                      {link.external && (
                        <span className="w-3 h-3 ml-1 opacity-50">↗</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">
                      {link.description}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-700/50">
        <div className="text-slate-400 mb-4 md:mb-0 text-center md:text-left">
          <div className="text-sm">
            {content.legal.copyright}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            ECG Buddy is a product of {content.companyInfo.name}.
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-3">
          {content.socialLinks.map((social, index) => {
            const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
              Twitter,
              Linkedin,
              Github,
            };
            const IconComponent = iconMap[social.icon] || Github;
            
            return (
              <div
                key={index}
                className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-slate-400"
              >
                <IconComponent className="w-4 h-4" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};