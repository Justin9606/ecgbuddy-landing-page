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
  Smartphone,
  Heart,
  Sparkles,
  Calendar,
  BarChart3,
} from "lucide-react";

export const DashboardHome: React.FC = () => {
  const stats = [
    {
      label: "Page Views Today",
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
      action: "Updated Mobile App Links",
      user: "Admin User",
      time: "1 hour ago",
      icon: Smartphone,
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
      action: "hero",
    },
    {
      title: "Manage Features",
      description: "Add or modify product features",
      icon: Sparkles,
      color: "purple",
      action: "features",
    },
    {
      title: "Update Mobile Apps",
      description: "Modify app download section",
      icon: Smartphone,
      color: "blue",
      action: "mobile-download",
    },
    {
      title: "View Analytics",
      description: "Check site performance",
      icon: BarChart3,
      color: "green",
      action: "analytics",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome back, Admin! 👋
            </h2>
            <p className="text-slate-600 text-lg">
              Manage your ECG Buddy landing page content and monitor site
              performance.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-2 bg-green-100/50 backdrop-blur-sm border border-green-200/50 rounded-2xl px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-700">
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-500 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div
                className={`flex items-center space-x-1 text-sm ${
                  stat.trend === "up"
                    ? "text-green-600"
                    : stat.trend === "down"
                    ? "text-red-600"
                    : "text-slate-600"
                }`}
              >
                {stat.trend === "up" && <TrendingUp className="w-4 h-4" />}
                <span className="font-medium">{stat.change}</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">
              {stat.value}
            </div>
            <div className="text-slate-600 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div
          className="lg:col-span-2 bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-slate-600" />
              Recent Activity
            </h3>
            <button className="text-sm text-slate-600 hover:text-slate-800 transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 p-4 bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-2xl hover:bg-white/60 transition-all duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-br from-${activity.color}-500 to-${activity.color}-600 rounded-xl flex items-center justify-center shadow-sm`}
                >
                  <activity.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-800">
                    {activity.action}
                  </div>
                  <div className="text-sm text-slate-600">
                    by {activity.user} • {activity.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-slate-600" />
            Quick Actions
          </h3>

          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                className="w-full flex items-center space-x-3 p-4 bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-2xl hover:bg-white/60 transition-all duration-300 text-left group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-800 group-hover:text-slate-900 transition-colors">
                    {action.title}
                  </div>
                  <div className="text-sm text-slate-600">
                    {action.description}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Site Status */}
      <motion.div
        className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-slate-600" />
          Site Status & Performance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
            <div className="text-sm text-slate-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">1.2s</div>
            <div className="text-sm text-slate-600">Load Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">95</div>
            <div className="text-sm text-slate-600">Performance Score</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};