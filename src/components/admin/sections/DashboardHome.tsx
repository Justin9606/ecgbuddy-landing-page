"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Users,
  Eye,
  TrendingUp,
  Clock,
  Edit,
  Globe,
  Download,
  Heart,
  Sparkles,
  Calendar,
  BarChart3,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import { AdminSection } from "../AdminDashboard";

interface DashboardHomeProps {
  onSectionChange: (section: AdminSection) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onSectionChange }) => {
  const stats = [
    {
      label: "Page Views",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      color: "blue",
    },
    {
      label: "Active Sessions",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "green",
    },
    {
      label: "Content Updates",
      value: "23",
      change: "+4",
      trend: "up",
      icon: Edit,
      color: "purple",
    },
    {
      label: "System Health",
      value: "99.9%",
      change: "Optimal",
      trend: "stable",
      icon: Activity,
      color: "emerald",
    },
  ];

  const recentActivity = [
    {
      action: "Updated Hero Section",
      user: "Admin User",
      time: "2 minutes ago",
      icon: Heart,
      color: "red",
    },
    {
      action: "Modified Features Content",
      user: "Admin User",
      time: "15 minutes ago",
      icon: Sparkles,
      color: "purple",
    },
    {
      action: "Updated Download App Section",
      user: "Admin User",
      time: "1 hour ago",
      icon: Download,
      color: "blue",
    },
    {
      action: "Published FAQ Changes",
      user: "Admin User",
      time: "2 hours ago",
      icon: Globe,
      color: "green",
    },
  ];

  const quickActions = [
    {
      title: "Edit Hero Section",
      description: "Update main landing content",
      icon: Heart,
      color: "red",
      action: "hero" as AdminSection,
    },
    {
      title: "Manage Features",
      description: "Add or modify product features",
      icon: Sparkles,
      color: "purple",
      action: "features" as AdminSection,
    },
    {
      title: "Update Download App",
      description: "Modify app download section",
      icon: Download,
      color: "blue",
      action: "mobile-download" as AdminSection,
    },
    {
      title: "Manage FAQ",
      description: "Update questions and answers",
      icon: BarChart3,
      color: "green",
      action: "faq" as AdminSection,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Welcome back! 👋
            </h2>
            <p className="text-gray-600">
              Manage your ECG Buddy landing page content and monitor site performance.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700">
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
              </div>
              <div
                className={`flex items-center space-x-1 text-xs ${
                  stat.trend === "up"
                    ? "text-green-600"
                    : stat.trend === "down"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
                <span className="font-medium">{stat.change}</span>
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                Recent Activity
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-8 h-8 bg-${activity.color}-100 rounded-lg flex items-center justify-center`}>
                    <activity.icon className={`w-4 h-4 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {activity.action}
                    </div>
                    <div className="text-xs text-gray-500">
                      by {activity.user} • {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-gray-500" />
              Quick Actions
            </h3>
          </div>

          <div className="p-4">
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={action.title}
                  onClick={() => onSectionChange(action.action)}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className={`w-8 h-8 bg-${action.color}-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className={`w-4 h-4 text-${action.color}-600`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-gray-800 transition-colors">
                      {action.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {action.description}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Site Status */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center">
            <Globe className="w-4 h-4 mr-2 text-gray-500" />
            Site Performance
          </h3>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            View Details
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-green-600 mb-1">99.9%</div>
            <div className="text-xs text-gray-600">Uptime</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-blue-600 mb-1">1.2s</div>
            <div className="text-xs text-gray-600">Load Time</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-purple-600 mb-1">95</div>
            <div className="text-xs text-gray-600">Performance Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};