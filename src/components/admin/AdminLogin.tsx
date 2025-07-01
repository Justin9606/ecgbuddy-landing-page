"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(71, 85, 105, 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-slate-200/20 to-gray-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-gray-200/20 to-slate-200/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Login Card */}
        <div className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_20px_70px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.15)] transition-all duration-700 group overflow-hidden">
          {/* Glassy hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />

          {/* Header */}
          <div className="relative text-center mb-8">
            <motion.div
              className="flex items-center justify-center space-x-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">ARPI Admin</h1>
                <p className="text-sm text-slate-500">Content Management</p>
              </div>
            </motion.div>

            <motion.div
              className="inline-flex items-center space-x-2 bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-full px-4 py-2 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Shield className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">
                Secure Access Portal
              </span>
            </motion.div>

            <motion.h2
              className="text-xl font-semibold text-slate-800 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Sign in to Admin Panel
            </motion.h2>
            <motion.p
              className="text-slate-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Manage ECG Buddy landing page content
            </motion.p>
          </div>

          {/* Login Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="relative space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Email Address</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400/50 transition-all duration-300 text-slate-800 placeholder-slate-500"
                  placeholder="admin@arpi.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400/50 transition-all duration-300 text-slate-800 placeholder-slate-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="relative w-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-6 py-3 rounded-2xl font-semibold shadow-[0_8px_32px_rgba(71,85,105,0.3)] hover:shadow-[0_12px_40px_rgba(71,85,105,0.4)] transition-all duration-500 flex items-center justify-center space-x-3 overflow-hidden group disabled:opacity-70"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {/* Glassy hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />

              {isLoading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10">Authenticating...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Sign In</span>
                  <ArrowRight className="w-5 h-5 relative z-10" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Security Notice */}
          <motion.div
            className="relative mt-6 p-4 bg-slate-50/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex items-start space-x-3">
              <Sparkles className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  This is a secure admin portal for ARPI team members only. All
                  access is logged and monitored for security purposes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Demo Credentials */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-4">
            <p className="text-sm text-slate-600 mb-2 font-medium">
              Demo Credentials:
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>Email: admin@arpi.com</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};