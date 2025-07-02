"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Star,
  Zap,
  Crown,
  Building2,
  ArrowRight,
  Sparkles,
  CreditCard,
  Infinity,
  Target,
  Activity,
  Shield,
  Brain,
  Users,
  TrendingUp,
  Award,
  Rocket,
} from "lucide-react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const pricingPlans = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for individual doctors getting started",
      price: {
        monthly: 0,
        yearly: 0,
      },
      credits: {
        amount: 10,
        period: "daily",
        description: "10 ECG analyses per day",
      },
      features: [
        "10 daily ECG analyses",
        "Basic AI interpretation", 
        "Standard processing speed",
        "Email support",
        "Mobile app access",
        "Basic reporting",
      ],
      buttonText: "Get Started Free",
      buttonLink: "#signup",
      isPopular: false,
      gradient: "from-slate-500 to-slate-600",
      bgGradient: "from-slate-50/50 to-slate-100/30",
      icon: Zap,
      badge: null,
      borderColor: "border-slate-200/50",
      textColor: "text-slate-700",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Advanced features for healthcare professionals",
      price: {
        monthly: 99,
        yearly: 990, // 2 months free
      },
      credits: {
        amount: "Unlimited",
        period: "monthly", 
        description: "Unlimited ECG analyses",
      },
      features: [
        "Unlimited ECG analyses",
        "Advanced AI interpretation",
        "Priority processing (<15s)",
        "24/7 priority support",
        "All platform access",
        "Advanced reporting & analytics",
      ],
      buttonText: "Start Pro Trial",
      buttonLink: "#pro-signup",
      isPopular: true,
      gradient: "from-red-500 to-pink-600",
      bgGradient: "from-red-50/50 to-pink-50/30",
      icon: Crown,
      badge: "Most Popular",
      borderColor: "border-red-200/50",
      textColor: "text-red-700",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Custom solutions for hospitals & health systems",
      price: {
        monthly: "Custom",
        yearly: "Custom",
      },
      credits: {
        amount: "Custom",
        period: "unlimited",
        description: "Custom credit allocation",
      },
      features: [
        "Custom credit allocation",
        "White-label solutions", 
        "Dedicated infrastructure",
        "Custom AI model training",
        "Dedicated account manager",
        "SLA guarantees",
      ],
      buttonText: "Contact Sales",
      buttonLink: "#contact-sales",
      isPopular: false,
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-50/50 to-indigo-50/30",
      icon: Building2,
      badge: "Enterprise",
      borderColor: "border-purple-200/50",
      textColor: "text-purple-700",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const formatPrice = (plan: typeof pricingPlans[0]) => {
    if (typeof plan.price[billingCycle] === "string") {
      return plan.price[billingCycle];
    }
    
    if (plan.price[billingCycle] === 0) {
      return "Free";
    }
    
    const price = plan.price[billingCycle] as number;
    if (billingCycle === "yearly") {
      return `$${Math.round(price / 12)}`;
    }
    return `$${price}`;
  };

  const getYearlySavings = (plan: typeof pricingPlans[0]) => {
    if (typeof plan.price.monthly === "string" || typeof plan.price.yearly === "string") {
      return null;
    }
    
    const monthlyCost = plan.price.monthly * 12;
    const yearlyCost = plan.price.yearly;
    const savings = monthlyCost - yearlyCost;
    
    if (savings > 0) {
      return Math.round((savings / monthlyCost) * 100);
    }
    return null;
  };

  return (
    <section id="pricing-section" className="relative py-32 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/40 via-white to-pink-50/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,63,74,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,122,0.05),transparent_50%)]"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,63,74,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,63,74,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
          }}
        ></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Premium Badge */}
          <motion.div
            className="inline-flex items-center space-x-3 bg-white/70 backdrop-blur-3xl border border-red-100/60 rounded-full px-8 py-4 mb-8 shadow-[0_20px_70px_rgba(255,63,74,0.1)] hover:shadow-[0_25px_80px_rgba(255,63,74,0.15)] transition-all duration-700 group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <motion.div
                className="w-3 h-3 bg-red-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 w-3 h-3 bg-red-400 rounded-full"
                animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <CreditCard className="w-5 h-5 text-red-500" />
            <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
              Flexible Credit-Based Pricing
            </span>
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-red-500" />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-6xl md:text-8xl font-bold mb-8 leading-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Choose your
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              perfect plan
            </motion.span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Transparent pricing designed for healthcare professionals. 
            <span className="font-medium text-slate-800"> Each credit equals one ECG analysis</span> with our 
            <span className="font-medium bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"> advanced AI system</span>.
          </motion.p>

          {/* Enhanced Toggle */}
          <motion.div
            className="relative inline-flex items-center bg-white/80 backdrop-blur-3xl border border-slate-200/60 rounded-3xl p-2 shadow-[0_20px_70px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.12)] transition-all duration-700"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              className="absolute bg-gradient-to-r from-red-500 via-red-600 to-pink-600 rounded-2xl shadow-xl"
              animate={{
                x: billingCycle === "monthly" ? 8 : "calc(100% - 8px)",
              }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 35,
                mass: 0.8
              }}
              style={{
                width: "calc(50% - 8px)",
                height: "calc(100% - 16px)",
                top: "8px",
              }}
            />
            
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 px-10 py-4 rounded-2xl text-base font-bold transition-all duration-500 min-w-[140px] ${
                billingCycle === "monthly"
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`relative z-10 px-10 py-4 rounded-2xl text-base font-bold transition-all duration-500 flex items-center justify-center space-x-3 min-w-[140px] ${
                billingCycle === "yearly"
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              <span>Yearly</span>
              <motion.div 
                className={`text-xs px-3 py-1 rounded-full font-bold transition-all duration-300 whitespace-nowrap ${
                  billingCycle === "yearly" 
                    ? "bg-white/25 text-white backdrop-blur-sm" 
                    : "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                }`}
                animate={{
                  scale: billingCycle === "yearly" ? 1 : [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: billingCycle === "yearly" ? 0 : Infinity,
                }}
              >
                Save 20%
              </motion.div>
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, index) => {
            const yearlySavings = getYearlySavings(plan);

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className={`relative transition-all duration-700 ${
                  plan.isPopular ? "lg:scale-110 lg:-mt-8" : ""
                }`}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Floating Badge */}
                <AnimatePresence>
                  {plan.badge && (
                    <motion.div
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-30"
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.3,
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      <div className={`bg-gradient-to-r ${plan.gradient} text-white px-8 py-3 rounded-full text-sm font-bold shadow-2xl border-4 border-white backdrop-blur-sm`}>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{plan.badge}</span>
                          <Sparkles className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Card */}
                <div
                  className={`relative bg-white/60 backdrop-blur-3xl border-2 ${plan.borderColor} rounded-3xl overflow-hidden transition-all duration-700 shadow-[0_20px_70px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.15)] group ${
                    plan.isPopular ? "ring-4 ring-red-500/20 border-red-300/50" : ""
                  }`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} opacity-50`}></div>
                  
                  {/* Animated Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500 ease-out"></div>

                  <div className="relative p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <motion.div
                        className={`w-20 h-20 bg-gradient-to-br ${plan.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl`}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 5,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <plan.icon className="w-10 h-10 text-white" />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-slate-800 mb-3">
                        {plan.name}
                      </h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {plan.description}
                      </p>

                      {/* Price Display */}
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center space-x-2 mb-2">
                          <span className="text-5xl font-bold text-slate-800">
                            {formatPrice(plan)}
                          </span>
                          {typeof plan.price[billingCycle] === "number" && plan.price[billingCycle] > 0 && (
                            <span className="text-xl text-slate-500 font-medium">
                              /month
                            </span>
                          )}
                        </div>
                        
                        {billingCycle === "yearly" && yearlySavings && (
                          <motion.div 
                            className="inline-flex items-center space-x-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                          >
                            <TrendingUp className="w-3 h-3" />
                            <span>Save {yearlySavings}% annually</span>
                          </motion.div>
                        )}

                        {typeof plan.price[billingCycle] === "number" && billingCycle === "yearly" && plan.price[billingCycle] > 0 && (
                          <div className="text-slate-500 text-sm mt-2">
                            Billed ${plan.price[billingCycle]} yearly
                          </div>
                        )}
                      </div>

                      {/* Credits Display */}
                      <div className={`bg-gradient-to-br ${plan.bgGradient} backdrop-blur-sm border-2 ${plan.borderColor} rounded-2xl p-4 mb-6`}>
                        <div className="flex items-center justify-center space-x-3 mb-2">
                          {plan.credits.amount === "Unlimited" ? (
                            <Infinity className={`w-5 h-5 ${plan.textColor}`} />
                          ) : plan.credits.amount === "Custom" ? (
                            <Target className={`w-5 h-5 ${plan.textColor}`} />
                          ) : (
                            <Activity className={`w-5 h-5 ${plan.textColor}`} />
                          )}
                          <span className="text-xl font-bold text-slate-800">
                            {plan.credits.amount} {plan.credits.amount !== "Unlimited" && plan.credits.amount !== "Custom" && "Credits"}
                          </span>
                        </div>
                        <div className="text-slate-600 text-sm font-medium">
                          {plan.credits.description}
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mb-8">
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-red-500" />
                        What's included
                      </h4>
                      <div className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-start space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: 0.1 * featureIndex,
                              duration: 0.5
                            }}
                          >
                            <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5 shadow-lg">
                              <Check className="w-3 h-3 text-white font-bold" />
                            </div>
                            <span className="text-slate-700 leading-relaxed font-medium">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.a
                      href={plan.buttonLink}
                      className={`relative group w-full ${
                        plan.isPopular
                          ? `bg-gradient-to-r ${plan.gradient} text-white shadow-[0_20px_60px_rgba(255,63,74,0.3)] hover:shadow-[0_25px_70px_rgba(255,63,74,0.4)]`
                          : "bg-white/80 backdrop-blur-sm border-2 border-slate-200/50 text-slate-700 hover:bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.15)]"
                      } px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 flex items-center justify-center space-x-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-red-500/20`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Glassy hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                      <span className="relative z-10">{plan.buttonText}</span>
                      <motion.div
                        className="relative z-10"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Shield,
                title: "HIPAA Compliant",
                description: "Enterprise-grade security",
                gradient: "from-emerald-500 to-teal-600",
              },
              {
                icon: Award,
                title: "FDA Approved",
                description: "Medical device certification",
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                icon: Users,
                title: "10,000+ Users",
                description: "Trusted by healthcare professionals",
                gradient: "from-purple-500 to-violet-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-4 bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.1)] transition-all duration-500 group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-800">{item.title}</div>
                  <div className="text-sm text-slate-600">{item.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </section>
  );
};

export default Pricing;