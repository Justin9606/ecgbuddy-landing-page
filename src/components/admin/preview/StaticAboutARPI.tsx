"use client";

import React from "react";
import { Building2, MapPin, Globe } from "lucide-react";
import { getSectionContent } from "@/lib/admin/contentProvider";
import { getIconComponent } from "@/lib/utils/icons";
import type { AboutARPIContent } from "@/lib/admin/types";

export const StaticAboutARPI: React.FC = () => {
  const content = getSectionContent<AboutARPIContent>('aboutARPI');

  return (
    <section className="relative py-16 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-8">
            <Building2 className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">
              About Our Company
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            <span className="block text-slate-900 mb-2">
              {content.sectionHeader.title}
            </span>
          </h2>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {content.sectionHeader.description}
          </p>
        </div>

        {/* Company Info */}
        <div className="mb-12">
          <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900">
                      {content.companyInfo.name}
                    </h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full mt-2" />
                  </div>
                </div>
                
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {content.companyInfo.description}
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-slate-50 rounded-2xl">
                    <div className="text-2xl font-bold text-slate-800 mb-1">
                      {content.companyInfo.founded}
                    </div>
                    <div className="text-sm text-slate-600">Founded</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-2xl">
                    <div className="text-2xl font-bold text-slate-800 mb-1">
                      {content.companyInfo.employees}
                    </div>
                    <div className="text-sm text-slate-600">Employees</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-2 mb-6">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">
                    {content.companyInfo.location}
                  </span>
                </div>
                
                <div className="w-64 h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl mx-auto flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                    <div className="text-slate-600 font-medium">
                      Global Headquarters
                    </div>
                    <div className="text-slate-500 text-sm mt-2">
                      {content.companyInfo.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        {content.values.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Values</h3>
              <p className="text-lg text-slate-600">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.values.map((value, index) => {
                const IconComponent = getIconComponent(value.icon);
                return (
                  <div
                    key={index}
                    className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 text-center"
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
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Team */}
        {content.team.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Leadership Team</h3>
              <p className="text-lg text-slate-600">Meet the experts behind ECG Buddy</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 text-center"
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {content.achievements.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Key Achievements</h3>
              <p className="text-lg text-slate-600">Milestones in our journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.achievements.map((achievement, index) => {
                const IconComponent = getIconComponent(achievement.icon);
                return (
                  <div
                    key={index}
                    className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 text-center"
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
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};