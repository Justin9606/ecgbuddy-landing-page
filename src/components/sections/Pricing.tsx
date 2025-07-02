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
      buttonText: "Start Free Trial",
      buttonLink: "#signup",
      isPopular: false,
      gradient: "from-slate-500 to-slate-600",
      icon: Zap,
      badge: null,
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
        "EMR integration",
        "Team collaboration tools",
        "API access",
        "Data export capabilities",
      ],
      buttonText: "Start Pro Trial",
      buttonLink: "#pro-signup",
      isPopular: true,
      gradient: "from-red-500 to-pink-600",
      icon: Crown,
      badge: "Most Popular",
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
        "Advanced compliance",
        "Custom integrations",
        "On-premise deployment",
        "Training & onboarding",
      ],
      buttonText: "Contact Sales",
      buttonLink: "#contact-sales",
      isPopular: false,
      gradient: "from-purple-500 to-indigo-600",
      icon: Building2,
      badge: "Enterprise",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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
    <section id="pricing-section" className="relative py-24 overflow-hidden">
      {/* Background */}
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-red-100/50 rounded-full px-6 py-3 mb-8 shadow-[0_8px_32px_rgba(255,63,74,0.08)]">
            <CreditCard className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-slate-700">
              Credit-Based Pricing
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
              Choose your plan
            </span>
            <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
              Start analyzing today
            </span>
          </h2>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Flexible credit-based pricing designed for healthcare professionals. Each credit equals one ECG analysis with our advanced AI system.
          </p>

          {/* Enhanced Billing Toggle */}
          <div className="relative inline-flex items-center bg-white/50 backdrop-blur-2xl border border-red-100/50 rounded-2xl p-1.5 shadow-[0_8px_32px_rgba(255,63,74,0.08)] overflow-hidden group">
            {/* Glassy hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            
            <motion.div
              className="absolute inset-y-1.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg transition-all duration-300"
              animate={{
                x: billingCycle === "monthly" ? 4 : "calc(100% - 4px)",
                width: billingCycle === "monthly" ? "calc(50% - 4px)" : "calc(50% - 4px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`relative z-10 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                billingCycle === "yearly"
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              <span>Yearly</span>
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                Save 20%
              </div>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
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
                className={`relative transition-all duration-500 ${
                  plan.isPopular ? "lg:scale-105" : ""
                }`}
                whileHover={{ y: -4 }}
              >
                <div
                  className={`relative bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_20px_60px_rgba(255,63,74,0.15)] group ${
                    plan.isPopular ? "ring-2 ring-red-500/20" : ""
                  }`}
                >
                  {/* Glassy hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                  {/* FIXED: Popular Badge - Proper positioning */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                      <div className={`bg-gradient-to-r ${plan.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-white`}>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{plan.badge}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="relative p-8 pt-12">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <plan.icon className="w-8 h-8 text-white" />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-slate-800 mb-3">
                        {plan.name}
                      </h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {plan.description}
                      </p>

                      {/* Price Display */}
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center space-x-1 mb-2">
                          <span className="text-4xl font-bold text-slate-800">
                            {formatPrice(plan)}
                          </span>
                          {typeof plan.price[billingCycle] === "number" && plan.price[billingCycle] > 0 && (
                            <span className="text-lg text-slate-500">
                              /month
                            </span>
                          )}
                        </div>
                        
                        {billingCycle === "yearly" && yearlySavings && (
                          <div className="text-green-600 text-sm font-medium mb-1">
                            Save {yearlySavings}% annually
                          </div>
                        )}

                        {typeof plan.price[billingCycle] === "number" && billingCycle === "yearly" && plan.price[billingCycle] > 0 && (
                          <div className="text-slate-500 text-sm">
                            Billed ${plan.price[billingCycle]} yearly
                          </div>
                        )}
                      </div>

                      {/* Credits Display */}
                      <div className="bg-white/30 backdrop-blur-sm border border-red-100/40 rounded-2xl p-4 mb-6">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          {plan.credits.amount === "Unlimited" ? (
                            <Infinity className="w-5 h-5 text-slate-600" />
                          ) : plan.credits.amount === "Custom" ? (
                            <Target className="w-5 h-5 text-slate-600" />
                          ) : (
                            <Activity className="w-5 h-5 text-slate-600" />
                          )}
                          <span className="text-lg font-bold text-slate-800">
                            {plan.credits.amount} {plan.credits.amount !== "Unlimited" && plan.credits.amount !== "Custom" && "Credits"}
                          </span>
                        </div>
                        <div className="text-slate-600 text-sm">
                          {plan.credits.description}
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 text-red-500" />
                        What's included
                      </h4>
                      <div className="space-y-3">
                        {plan.features.slice(0, 6).map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-start space-x-3"
                          >
                            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-slate-600 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                        {plan.features.length > 6 && (
                          <div className="text-slate-500 text-sm text-center pt-2">
                            +{plan.features.length - 6} more features
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.a
                      href={plan.buttonLink}
                      className={`relative group w-full ${
                        plan.isPopular
                          ? `bg-gradient-to-r ${plan.gradient} text-white shadow-[0_8px_32px_rgba(255,63,74,0.3)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.4)]`
                          : "bg-white/60 backdrop-blur-sm border border-slate-200/50 text-slate-700 hover:bg-white/80"
                      } px-6 py-4 rounded-2xl font-semibold transition-all duration-500 flex items-center justify-center space-x-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Glassy hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>

                      <span className="relative z-10">{plan.buttonText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;