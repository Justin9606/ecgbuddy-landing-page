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
import { EditableWrapper } from "@/components/admin/EditableWrapper";

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
      ],
      buttonText: "Contact Sales",
      buttonLink: "#contact-sales",
      isPopular: false,
      gradient: "from-purple-500 to-indigo-600",
      icon: Building2,
      badge: "Enterprise",
    },
  ];

  const categories = [
    { id: "all", name: "All Features", count: pricingPlans.length },
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

  // Pricing Card Component
  const PricingCard: React.FC<{ plan: typeof pricingPlans[0]; index: number; dynamicContent?: any; dynamicStyles?: any }> = ({ 
    plan, 
    index, 
    dynamicContent, 
    dynamicStyles 
  }) => {
    // Use dynamic content if available, otherwise fall back to original plan data
    const cardData = dynamicContent || plan;
    const cardStyles = dynamicStyles || {};
    
    const yearlySavings = getYearlySavings(cardData);

    return (
      <motion.div
        variants={cardVariants}
        className={`relative transition-all duration-500 ${
          cardData.isPopular ? "lg:scale-105" : ""
        }`}
        whileHover={{ y: -4 }}
      >
        {/* Badge positioned ABOVE the card with proper z-index */}
        {cardData.badge && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className={`bg-gradient-to-r ${cardData.gradient} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-white`}>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-current" />
                <span>{cardData.badge}</span>
              </div>
            </div>
          </div>
        )}

        <div
          className={`relative bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_20px_60px_rgba(255,63,74,0.15)] group ${
            cardData.isPopular ? "ring-2 ring-red-500/20" : ""
          }`}
        >
          {/* Glassy hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

          <div className="relative p-6">
            {/* Plan Header */}
            <div className="text-center mb-6">
              <motion.div
                className={`w-14 h-14 bg-gradient-to-br ${cardData.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <cardData.icon className="w-7 h-7 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {cardData.name}
              </h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                {cardData.description}
              </p>

              {/* Price Display */}
              <div className="mb-4">
                <div className="flex items-baseline justify-center space-x-1 mb-1">
                  <span className="text-3xl font-bold text-slate-800">
                    {formatPrice(cardData)}
                  </span>
                  {typeof cardData.price[billingCycle] === "number" && cardData.price[billingCycle] > 0 && (
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

                {typeof cardData.price[billingCycle] === "number" && billingCycle === "yearly" && cardData.price[billingCycle] > 0 && (
                  <div className="text-slate-500 text-sm">
                    Billed ${cardData.price[billingCycle]} yearly
                  </div>
                )}
              </div>

              {/* Credits Display */}
              <div className="bg-white/30 backdrop-blur-sm border border-red-100/40 rounded-2xl p-3 mb-4">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  {cardData.credits.amount === "Unlimited" ? (
                    <Infinity className="w-4 h-4 text-slate-600" />
                  ) : cardData.credits.amount === "Custom" ? (
                    <Target className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Activity className="w-4 h-4 text-slate-600" />
                  )}
                  <span className="text-lg font-bold text-slate-800">
                    {cardData.credits.amount} {cardData.credits.amount !== "Unlimited" && cardData.credits.amount !== "Custom" && "Credits"}
                  </span>
                </div>
                <div className="text-slate-600 text-sm">
                  {cardData.credits.description}
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="mb-6">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center text-sm">
                <Sparkles className="w-4 h-4 mr-2 text-red-500" />
                What's included
              </h4>
              <div className="space-y-2">
                {cardData.features.map((feature: string, featureIndex: number) => (
                  <div
                    key={featureIndex}
                    className="flex items-start space-x-2"
                  >
                    <div className="flex-shrink-0 w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-2.5 h-2.5 text-green-600" />
                    </div>
                    <span className="text-slate-600 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href={cardData.buttonLink}
              className={`relative group w-full ${
                cardData.isPopular
                  ? `bg-gradient-to-r ${cardData.gradient} text-white shadow-[0_8px_32px_rgba(255,63,74,0.3)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.4)]`
                  : "bg-white/60 backdrop-blur-sm border border-slate-200/50 text-slate-700 hover:bg-white/80"
              } px-6 py-3 rounded-2xl font-semibold transition-all duration-500 flex items-center justify-center space-x-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500/20`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glassy hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>

              <span className="relative z-10">{cardData.buttonText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="pricing-section" className="relative py-20 overflow-hidden">
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <EditableWrapper
            id="pricing-badge"
            type="text"
            label="Pricing Badge"
            content={{
              text: "Credit-Based Pricing"
            }}
            styles={{
              fontSize: "text-sm",
              fontWeight: "font-medium",
              color: "slate-700"
            }}
            metadata={{
              parent: "pricing-section",
              editable: true
            }}
          >
            <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-red-100/50 rounded-full px-6 py-3 mb-6 shadow-[0_8px_32px_rgba(255,63,74,0.08)]">
              <CreditCard className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-slate-700">
                Credit-Based Pricing
              </span>
            </div>
          </EditableWrapper>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <EditableWrapper
              id="pricing-title-part1"
              type="text"
              label="Pricing Title Part 1"
              content={{
                text: "Choose your plan"
              }}
              styles={{
                fontSize: "text-4xl md:text-5xl",
                fontWeight: "font-bold",
                color: "from-slate-900 via-slate-800 to-slate-700"
              }}
              metadata={{
                parent: "pricing-section",
                editable: true
              }}
            >
              <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                Choose your plan
              </span>
            </EditableWrapper>
            <EditableWrapper
              id="pricing-title-part2"
              type="text"
              label="Pricing Title Part 2"
              content={{
                text: "Start analyzing today"
              }}
              styles={{
                fontSize: "text-4xl md:text-5xl",
                fontWeight: "font-bold",
                color: "from-red-600 via-red-500 to-pink-600"
              }}
              metadata={{
                parent: "pricing-section",
                editable: true
              }}
            >
              <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                Start analyzing today
              </span>
            </EditableWrapper>
          </h2>

          <EditableWrapper
            id="pricing-subtitle"
            type="text"
            label="Pricing Subtitle"
            content={{
              text: "Flexible credit-based pricing designed for healthcare professionals. Each credit equals one ECG analysis with our advanced AI system."
            }}
            styles={{
              fontSize: "text-lg",
              color: "slate-600"
            }}
            metadata={{
              parent: "pricing-section",
              editable: true
            }}
          >
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Flexible credit-based pricing designed for healthcare professionals. Each credit equals one ECG analysis with our advanced AI system.
            </p>
          </EditableWrapper>

          {/* COMPLETELY FIXED: Monthly/Yearly Toggle */}
          <div className="relative inline-flex items-center bg-white/90 backdrop-blur-2xl border border-slate-200/60 rounded-2xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            {/* Sliding Background */}
            <motion.div
              className="absolute bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg"
              animate={{
                x: billingCycle === "monthly" ? 8 : "calc(100% - 8px)",
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                mass: 0.8
              }}
              style={{
                width: "calc(50% - 8px)",
                height: "calc(100% - 16px)",
                top: "8px",
              }}
            />
            
            {/* Monthly Button */}
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 min-w-[140px] ${
                billingCycle === "monthly"
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Monthly
            </button>

            {/* Yearly Button */}
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`relative z-10 px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 min-w-[140px] ${
                billingCycle === "yearly"
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Yearly
            </button>

            {/* Save 20% Badge - Positioned outside the toggle */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">
              Save 20%
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards with proper badge spacing */}
        <div className="relative">
          {/* Add extra top margin to accommodate badges */}
          <div className="mt-16">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {pricingPlans.map((plan, index) => (
                <EditableWrapper
                  key={plan.id}
                  id={`pricing-card-${plan.id}`}
                  type="card"
                  label={`${plan.name} Plan Card`}
                  content={{
                    name: plan.name,
                    description: plan.description,
                    price: plan.price,
                    credits: plan.credits,
                    features: plan.features,
                    buttonText: plan.buttonText,
                    buttonLink: plan.buttonLink,
                    isPopular: plan.isPopular,
                    badge: plan.badge,
                    icon: plan.icon
                  }}
                  styles={{
                    gradient: plan.gradient,
                    iconBackground: plan.gradient
                  }}
                  metadata={{
                    parent: "pricing-section",
                    planId: plan.id,
                    planType: plan.name.toLowerCase(),
                    editable: true
                  }}
                >
                  <PricingCard plan={plan} index={index} />
                </EditableWrapper>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;