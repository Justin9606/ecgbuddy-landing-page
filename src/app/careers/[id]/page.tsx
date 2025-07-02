"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Calendar,
  Heart,
  CheckCircle,
  ArrowRight,
  Building2,
  Users,
  Mail,
  Share2,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { jobPositions, getJobById } from "@/lib/data/jobPositions";
import { notFound } from "next/navigation";

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

const JobDetailPage = ({ params }: JobDetailPageProps) => {
  const jobId = parseInt(params.id);
  const job = getJobById(jobId);

  // If job not found, show 404
  if (!job) {
    notFound();
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "engineering":
        return "from-blue-500 to-indigo-600";
      case "clinical":
        return "from-green-500 to-emerald-600";
      case "design":
        return "from-purple-500 to-violet-600";
      case "data":
        return "from-orange-500 to-red-500";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  const getDepartmentName = (department: string) => {
    switch (department) {
      case "engineering":
        return "Engineering";
      case "clinical":
        return "Clinical";
      case "design":
        return "Design";
      case "data":
        return "Data Science";
      default:
        return "Other";
    }
  };

  // Get related jobs (same department, excluding current job)
  const relatedJobs = jobPositions
    .filter(j => j.department === job.department && j.id !== job.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header with Back Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/careers"
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">Back to Careers</span>
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
              <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <motion.div
              className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getDepartmentColor(job.department)} rounded-xl flex items-center justify-center`}>
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-600">{getDepartmentName(job.department)}</div>
                      <div className="text-xs text-slate-500">Department</div>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl font-bold text-slate-900 mb-4">{job.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-6">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="bg-green-100/50 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Job Description */}
            <motion.div
              className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">About this role</h2>
              <p className="text-slate-700 leading-relaxed text-lg">{job.description}</p>
            </motion.div>

            {/* Requirements */}
            <motion.div
              className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Requirements</h2>
              <div className="space-y-4">
                {job.requirements.map((requirement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 leading-relaxed">{requirement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <motion.div
                className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Other {getDepartmentName(job.department)} roles</h2>
                <div className="space-y-4">
                  {relatedJobs.map((relatedJob, index) => (
                    <Link
                      key={relatedJob.id}
                      href={`/careers/${relatedJob.id}`}
                      className="block p-4 bg-white/50 rounded-2xl border border-slate-200/50 hover:bg-white/70 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900 group-hover:text-red-700 transition-colors">
                            {relatedJob.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                            <span>{relatedJob.location}</span>
                            <span>{relatedJob.type}</span>
                            <span>{relatedJob.salary}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply Card */}
              <motion.div
                className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Apply?</h3>
                  <p className="text-slate-600">Join our mission to revolutionize healthcare</p>
                </div>

                <motion.button
                  className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-[0_8px_32px_rgba(255,63,74,0.3)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.4)] transition-all duration-500 flex items-center justify-center space-x-2 group overflow-hidden mb-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                  <span className="relative z-10">Apply Now</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>

                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-2">
                    Questions about this role?
                  </p>
                  <a 
                    href="mailto:careers@ecgbuddy.ai" 
                    className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>careers@ecgbuddy.ai</span>
                  </a>
                </div>
              </motion.div>

              {/* Company Info */}
              <motion.div
                className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-red-500" />
                  About ARPI
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  ARPI is revolutionizing healthcare through AI-powered ECG analysis. We're a team of passionate engineers, clinicians, and researchers working to improve patient outcomes worldwide.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Team Size</span>
                    <span className="font-semibold text-slate-900">150+ people</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Founded</span>
                    <span className="font-semibold text-slate-900">2020</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Headquarters</span>
                    <span className="font-semibold text-slate-900">Seoul, Korea</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Industry</span>
                    <span className="font-semibold text-slate-900">Healthcare AI</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;