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
  Shield,
  Users,
  Clock,
  Heart,
  Brain,
  Activity,
  Target,
  Mail,
  Phone,
  CreditCard,
  Infinity,
} from "lucide-react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const pricingPlans = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started with ECG analysis",
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
      bgGradient: "from-slate-50/50 to-gray-50/50",
      borderColor: "slate-200/50",
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
      bgGradient: "from-red-50/50 to-pink-50/50",
      borderColor: "red-200/50",
      icon: Crown,
      badge: "Most Popular",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Custom solutions for large organizations",
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
        "24/7 dedicated support",
      ],
      buttonText: "Contact Sales",
      buttonLink: "#contact-sales",
      isPopular: false,
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-50/50 to-indigo-50/50",
      borderColor: "purple-200/50",
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

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
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
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-red-100/50 rounded-full px-6 py-3 mb-8 shadow-[0_8px_32px_rgba(255,63,74,0.08)]">
            <CreditCard className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-slate-700">
              Flexible Pricing Plans
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
              Choose your plan
            </span>
            <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
              Start analyzing today
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Flexible credit-based pricing that scales with your needs. Each credit equals one ECG analysis with our advanced AI system.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-full p-1 shadow-[0_8px_32px_rgba(255,63,74,0.08)]">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 relative ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, index) => {
            const isHovered = hoveredPlan === plan.id;
            const yearlySavings = getYearlySavings(plan);

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className={`relative transition-all duration-500 ${
                  plan.isPopular ? "lg:scale-105 lg:-mt-8" : ""
                }`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                whileHover={{ y: -8 }}
              >
                <div
                  className={`relative bg-white/40 backdrop-blur-2xl border border-${plan.borderColor} rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_20px_60px_rgba(255,63,74,0.15)] group ${
                    plan.isPopular ? "ring-2 ring-red-500/20" : ""
                  }`}
                >
                  {/* Glassy hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                  {/* Popular Badge */}
                  {plan.badge && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className={`bg-gradient-to-r ${plan.gradient} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{plan.badge}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="relative p-10">
                    {/* Plan Header */}
                    <div className="text-center mb-10">
                      <motion.div
                        className={`w-20 h-20 bg-gradient-to-br ${plan.gradient} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <plan.icon className="w-10 h-10 text-white" />
                      </motion.div>

                      <h3 className="text-3xl font-bold text-slate-800 mb-4">
                        {plan.name}
                      </h3>
                      <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        {plan.description}
                      </p>

                      {/* Price Display */}
                      <div className="mb-8">
                        <div className="flex items-baseline justify-center space-x-2 mb-2">
                          <span className="text-5xl font-bold text-slate-800">
                            {formatPrice(plan)}
                          </span>
                          {typeof plan.price[billingCycle] === "number" && plan.price[billingCycle] > 0 && (
                            <span className="text-xl text-slate-500">
                              /month
                            </span>
                          )}
                        </div>
                        
                        {billingCycle === "yearly" && yearlySavings && (
                          <div className="text-green-600 text-sm font-medium mb-2">
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
                      <div className={`bg-gradient-to-br ${plan.bgGradient} backdrop-blur-sm border border-${plan.borderColor} rounded-2xl p-6 mb-10`}>
                        <div className="flex items-center justify-center space-x-3 mb-3">
                          {plan.credits.amount === "Unlimited" ? (
                            <Infinity className="w-6 h-6 text-slate-600" />
                          ) : plan.credits.amount === "Custom" ? (
                            <Target className="w-6 h-6 text-slate-600" />
                          ) : (
                            <CreditCard className="w-6 h-6 text-slate-600" />
                          )}
                          <span className="text-xl font-bold text-slate-800">
                            {plan.credits.amount} {plan.credits.amount !== "Unlimited" && plan.credits.amount !== "Custom" && "Credits"}
                          </span>
                        </div>
                        <div className="text-slate-600">
                          {plan.credits.description}
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mb-10">
                      <h4 className="font-semibold text-slate-800 mb-6 flex items-center text-lg">
                        <Sparkles className="w-5 h-5 mr-3 text-red-500" />
                        What's included
                      </h4>
                      <div className="space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-start space-x-4"
                            custom={featureIndex}
                            variants={featureVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                          >
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-slate-600 leading-relaxed">
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
                          ? `bg-gradient-to-r ${plan.gradient} text-white shadow-[0_8px_32px_rgba(255,63,74,0.3)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.4)]`
                          : "bg-white/60 backdrop-blur-sm border border-slate-200/50 text-slate-700 hover:bg-white/80"
                      } px-8 py-5 rounded-2xl font-semibold text-lg transition-all duration-500 flex items-center justify-center space-x-3 overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Glassy hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>

                      <span className="relative z-10">{plan.buttonText}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            {
              icon: Shield,
              title: "Secure & Compliant",
              description: "HIPAA-compliant with bank-level security and end-to-end encryption for all your ECG data.",
              gradient: "from-emerald-500 to-teal-600",
            },
            {
              icon: Clock,
              title: "Lightning Fast",
              description: "Get comprehensive ECG analysis results in under 30 seconds with our optimized AI engine.",
              gradient: "from-amber-500 to-orange-500",
            },
            {
              icon: Users,
              title: "24/7 Support",
              description: "Round-the-clock technical support and dedicated account management for enterprise customers.",
              gradient: "from-blue-500 to-indigo-600",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="relative bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 transition-all duration-500 group shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_20px_60px_rgba(255,63,74,0.15)] overflow-hidden"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Glassy hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

              <motion.div
                className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="relative text-xl font-bold text-slate-800 mb-4 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="relative text-slate-600 leading-relaxed transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative bg-white/30 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-12 max-w-4xl mx-auto shadow-[0_20px_70px_rgba(255,63,74,0.1)] hover:shadow-[0_30px_90px_rgba(255,63,74,0.15)] transition-all duration-700 group overflow-hidden">
            {/* Glassy hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-red-100/50 backdrop-blur-sm border border-red-200/50 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">
                  Questions about pricing?
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 group-hover:text-slate-900 transition-colors duration-300">
                Need help choosing a plan?
              </h3>

              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Our team is here to help you find the perfect plan for your organization's needs and budget.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-[0_8px_32px_rgba(255,63,74,0.3)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.4)] transition-all duration-500 overflow-hidden group flex items-center space-x-2"
                >
                  {/* Glassy hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                  <Mail className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Contact Sales</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-slate-600 hover:text-slate-800 font-medium transition-colors duration-300 flex items-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Schedule a call</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;