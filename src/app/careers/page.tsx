"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Clock,
  Users,
  Heart,
  Brain,
  Code,
  Palette,
  BarChart3,
  Shield,
  Rocket,
  Star,
  Award,
  Globe,
  Coffee,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowLeft,
  Building2,
  Sparkles,
  Calendar,
  DollarSign,
  Briefcase,
  GraduationCap,
  Home,
  Plane,
  Gift,
  Plus,
  Filter,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";

const CareersPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Job positions data - REMOVED featured and urgent badges
  const jobPositions = [
    {
      id: 1,
      title: "Senior AI/ML Engineer",
      department: "engineering",
      location: "Seoul, Korea",
      type: "Full-time",
      experience: "5+ years",
      salary: "$120K - $180K",
      description: "Lead the development of our next-generation AI models for ECG analysis and cardiac diagnostics.",
      requirements: [
        "PhD/MS in Computer Science, AI, or related field",
        "5+ years experience in machine learning",
        "Expertise in TensorFlow, PyTorch, or similar",
        "Experience with medical data and healthcare AI",
        "Strong Python and cloud computing skills"
      ],
      benefits: ["Stock options", "Health insurance", "Flexible hours", "Remote work"],
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Senior Frontend Developer",
      department: "engineering",
      location: "Seoul, Korea",
      type: "Full-time",
      experience: "4+ years",
      salary: "$90K - $140K",
      description: "Build beautiful, responsive user interfaces for our healthcare platform using React and Next.js.",
      requirements: [
        "BS in Computer Science or equivalent",
        "4+ years React/Next.js experience",
        "Expert in TypeScript, Tailwind CSS",
        "Experience with healthcare/medical UIs",
        "Strong design sensibility"
      ],
      benefits: ["Stock options", "Health insurance", "Learning budget", "Gym membership"],
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "Clinical Research Specialist",
      department: "clinical",
      location: "Seoul, Korea",
      type: "Full-time",
      experience: "3+ years",
      salary: "$70K - $110K",
      description: "Lead clinical validation studies and collaborate with medical institutions to improve our AI algorithms.",
      requirements: [
        "MD, PhD, or MS in Biomedical Sciences",
        "3+ years clinical research experience",
        "Experience with cardiology/ECG analysis",
        "Strong statistical analysis skills",
        "Regulatory compliance knowledge"
      ],
      benefits: ["Health insurance", "Conference budget", "Research grants", "Flexible schedule"],
      posted: "3 days ago"
    },
    {
      id: 4,
      title: "Product Designer",
      department: "design",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "$80K - $120K",
      description: "Design intuitive healthcare experiences that help medical professionals save lives.",
      requirements: [
        "Bachelor's in Design or equivalent",
        "3+ years product design experience",
        "Proficiency in Figma, Adobe Creative Suite",
        "Healthcare/medical design experience preferred",
        "Strong user research skills"
      ],
      benefits: ["Remote work", "Design tools budget", "Health insurance", "Unlimited PTO"],
      posted: "5 days ago"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "engineering",
      location: "Seoul, Korea",
      type: "Full-time",
      experience: "4+ years",
      salary: "$100K - $150K",
      description: "Build and maintain our cloud infrastructure to ensure 99.9% uptime for critical healthcare services.",
      requirements: [
        "BS in Computer Science or equivalent",
        "4+ years DevOps/Infrastructure experience",
        "Expert in AWS, Kubernetes, Docker",
        "Experience with healthcare compliance (HIPAA)",
        "Strong automation and monitoring skills"
      ],
      benefits: ["Stock options", "Health insurance", "On-call compensation", "Training budget"],
      posted: "1 day ago"
    },
    {
      id: 6,
      title: "Data Scientist",
      department: "data",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "$95K - $135K",
      description: "Analyze large-scale medical data to improve our AI models and generate clinical insights.",
      requirements: [
        "PhD/MS in Statistics, Data Science, or related",
        "3+ years data science experience",
        "Expert in Python, R, SQL",
        "Experience with medical/healthcare data",
        "Strong statistical modeling skills"
      ],
      benefits: ["Remote work", "Conference budget", "Health insurance", "Research time"],
      posted: "1 week ago"
    }
  ];

  const departments = [
    { id: "all", name: "All Departments", count: jobPositions.length },
    { id: "engineering", name: "Engineering", count: jobPositions.filter(job => job.department === "engineering").length },
    { id: "clinical", name: "Clinical", count: jobPositions.filter(job => job.department === "clinical").length },
    { id: "design", name: "Design", count: jobPositions.filter(job => job.department === "design").length },
    { id: "data", name: "Data Science", count: jobPositions.filter(job => job.department === "data").length },
  ];

  const locations = [
    { id: "all", name: "All Locations" },
    { id: "seoul", name: "Seoul, Korea" },
    { id: "remote", name: "Remote" },
  ];

  // Filter jobs based on selected filters and search
  const filteredJobs = jobPositions.filter(job => {
    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === "all" || 
      (selectedLocation === "seoul" && job.location.includes("Seoul")) ||
      (selectedLocation === "remote" && job.location === "Remote");
    const matchesSearch = searchQuery === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDepartment && matchesLocation && matchesSearch;
  });

  const teamStats = [
    { label: "Team Members", value: "150+", icon: Users },
    { label: "Countries", value: "12", icon: Globe },
    { label: "Average Experience", value: "8 years", icon: Award },
    { label: "Retention Rate", value: "94%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header with Back Navigation - UPDATED: Changed to ARPI Careers */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">Back to Home</span>
              </Link>
              <div className="w-px h-6 bg-slate-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-800">ARPI Careers</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">{filteredJobs.length} open positions</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* SIMPLIFIED Hero Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-white to-pink-50/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-red-100/50 rounded-full px-6 py-3 mb-6 shadow-[0_8px_32px_rgba(255,63,74,0.08)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Briefcase className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-slate-700">Join Our Mission</span>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                Shape the future
              </span>
              <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                of healthcare AI
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join a passionate team working to revolutionize cardiac care through cutting-edge AI technology. Help us save lives and improve patient outcomes worldwide.
            </motion.p>

            {/* REMOVED "Watch Our Story" button - Only one CTA now */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-[0_8px_32px_rgba(255,63,74,0.3)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.4)] transition-all duration-500 flex items-center space-x-3 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                <span className="relative z-10">View Open Positions</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </div>

          {/* SIMPLIFIED Team Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {teamStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-xl p-4 text-center shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_20px_60px_rgba(255,63,74,0.15)] transition-all duration-500 group"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-xs text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions - MAIN FOCUS */}
      <section id="open-positions" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Open Positions
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Find your perfect role and help us revolutionize healthcare technology
            </p>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search positions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-300/50 transition-all duration-300"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center space-x-2 bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-2xl px-6 py-3 hover:bg-white/80 transition-all duration-300"
                >
                  <Filter className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-700">Filters</span>
                  {(selectedDepartment !== "all" || selectedLocation !== "all") && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </button>
              </div>

              {/* Filter Panel */}
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-2xl p-6 mb-6 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Department Filter */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">Department</label>
                        <div className="space-y-2">
                          {departments.map((dept) => (
                            <button
                              key={dept.id}
                              onClick={() => setSelectedDepartment(dept.id)}
                              className={`w-full text-left px-4 py-2 rounded-xl transition-all duration-300 ${
                                selectedDepartment === dept.id
                                  ? "bg-red-100 text-red-700 border border-red-200"
                                  : "bg-white/50 text-slate-600 hover:bg-white/80"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{dept.name}</span>
                                <span className="text-sm opacity-60">({dept.count})</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Location Filter */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">Location</label>
                        <div className="space-y-2">
                          {locations.map((location) => (
                            <button
                              key={location.id}
                              onClick={() => setSelectedLocation(location.id)}
                              className={`w-full text-left px-4 py-2 rounded-xl transition-all duration-300 ${
                                selectedLocation === location.id
                                  ? "bg-red-100 text-red-700 border border-red-200"
                                  : "bg-white/50 text-slate-600 hover:bg-white/80"
                              }`}
                            >
                              {location.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {(selectedDepartment !== "all" || selectedLocation !== "all") && (
                      <div className="mt-4 pt-4 border-t border-slate-200/50">
                        <button
                          onClick={() => {
                            setSelectedDepartment("all");
                            setSelectedLocation("all");
                          }}
                          className="text-red-600 hover:text-red-700 font-medium transition-colors"
                        >
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Job Listings - REMOVED all badges and "Save for Later" button */}
          <div className="space-y-6">
            <AnimatePresence>
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 group"
                  whileHover={{ y: -2 }}
                >
                  {/* Card Content */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Job Info */}
                      <div className="lg:col-span-2">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-red-700 transition-colors duration-300">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{job.experience}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                          <p className="text-slate-600 leading-relaxed mb-4">
                            {job.description}
                          </p>

                          {/* Benefits */}
                          <div className="flex flex-wrap gap-2">
                            {job.benefits.slice(0, 4).map((benefit, benefitIndex) => (
                              <span
                                key={benefitIndex}
                                className="bg-green-100/50 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Apply Section - REMOVED "Save for Later" button */}
                      <div className="lg:col-span-1">
                        <div className="bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 h-fit">
                          <div className="text-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                              <Rocket className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-bold text-slate-800 mb-2">Ready to Apply?</h4>
                            <p className="text-sm text-slate-600">
                              Join our mission to revolutionize healthcare
                            </p>
                          </div>

                          <motion.button
                            className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-[0_8px_32px_rgba(255,63,74,0.3)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.4)] transition-all duration-500 flex items-center justify-center space-x-2 group overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                            <span className="relative z-10">Apply Now</span>
                            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                          </motion.button>

                          <div className="mt-3 pt-3 border-t border-slate-200/50 text-center">
                            <p className="text-xs text-slate-500">
                              Questions? Email us at{" "}
                              <a href="mailto:careers@ecgbuddy.ai" className="text-red-600 hover:text-red-700">
                                careers@ecgbuddy.ai
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* No Results */}
            {filteredJobs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">No positions found</h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your search criteria or check back later for new opportunities.
                </p>
                <button
                  onClick={() => {
                    setSelectedDepartment("all");
                    setSelectedLocation("all");
                    setSearchQuery("");
                  }}
                  className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* SIMPLIFIED CTA Section */}
      <section className="py-16 bg-gradient-to-br from-red-50/30 via-white to-pink-50/20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 shadow-[0_20px_70px_rgba(255,63,74,0.1)] hover:shadow-[0_30px_90px_rgba(255,63,74,0.15)] transition-all duration-700 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Don't see the perfect role?
              </h2>
              
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We're always looking for exceptional talent. Send us your resume and tell us how you'd like to contribute.
              </p>
              
              <motion.button
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-[0_8px_32px_rgba(255,63,74,0.3)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.4)] transition-all duration-500 flex items-center space-x-2 mx-auto group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                <span className="relative z-10">Send Your Resume</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;