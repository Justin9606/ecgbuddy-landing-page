import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Heart, Zap, Shield, Sparkles, Activity, Brain, Users, Award, TrendingUp, Target, Clock, BarChart3, CheckCircle, Globe, Star } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Testimonial rotation with user controls
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartAnalysis = () => {
    const element = document.getElementById('mobile-download');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const testimonials = [
    {
      text: "ECG Buddy has revolutionized our emergency department workflow",
      author: "Dr. Sarah Kim",
      role: "Emergency Medicine, Seoul National University Hospital",
      avatar: "👩‍⚕️",
      hospital: "Seoul National University Hospital",
      rating: 5
    },
    {
      text: "The AI accuracy is remarkable - it's like having a cardiologist available 24/7",
      author: "Dr. Michael Chen",
      role: "Cardiology, Samsung Medical Center",
      avatar: "👨‍⚕️",
      hospital: "Samsung Medical Center",
      rating: 5
    },
    {
      text: "Integration with our EMR system was seamless and intuitive",
      author: "Dr. Lisa Park",
      role: "Internal Medicine, Asan Medical Center",
      avatar: "👩‍⚕️",
      hospital: "Asan Medical Center",
      rating: 5
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-24">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Minimal Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-[0.03]"
            style={{
              background: `linear-gradient(135deg, ${
                i % 3 === 0 ? '#3b82f6, #8b5cf6' : 
                i % 3 === 1 ? '#8b5cf6, #ec4899' : 
                '#ec4899, #f59e0b'
              })`,
              left: `${20 + (i * 25)}%`,
              top: `${15 + (i * 20)}%`,
            }}
            animate={{
              x: mousePosition.x * 0.01 * (i + 1),
              y: mousePosition.y * 0.01 * (i + 1),
              scale: [1, 1.1, 1],
            }}
            transition={{
              x: { duration: 0.8 },
              y: { duration: 0.8 },
              scale: { duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center">
          {/* Trust Badge */}
          <motion.div 
            className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-12 shadow-sm group cursor-pointer mt-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <motion.div 
                className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
              Trusted by 10,000+ Healthcare Professionals Worldwide
            </span>
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4 text-slate-600" />
              <Award className="w-4 h-4 text-slate-600" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold leading-none mb-4">
              <motion.span 
                className="block text-slate-900"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Revolutionize
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                ECG Analysis
              </motion.span>
            </h1>
            <motion.div 
              className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto opacity-60"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Transform complex cardiac data into clear, actionable insights with our 
            <span className="font-semibold text-slate-800"> AI-powered platform</span> trusted by 
            <span className="font-semibold text-blue-600"> healthcare professionals worldwide</span>.
          </motion.p>

          {/* Testimonial Carousel */}
          <motion.div 
            className="mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center space-x-4 mb-4"
                >
                  <span className="text-2xl">{testimonials[currentTestimonial].avatar}</span>
                  <div className="text-left">
                    <p className="text-slate-700 font-medium italic">"{testimonials[currentTestimonial].text}"</p>
                    <div className="text-sm text-slate-500 mt-2 flex items-center space-x-2">
                      <span className="font-semibold">{testimonials[currentTestimonial].author}</span>
                      <span>•</span>
                      <span>{testimonials[currentTestimonial].role}</span>
                      <div className="flex items-center ml-2">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-500 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-slate-600' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* REDESIGNED: Professional Metrics Dashboard */}
          <motion.div 
            className="mb-12 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {/* Main Stats Card */}
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 shadow-lg mb-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-slate-100/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                  <Activity className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Live Platform Statistics</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Real-time Performance Metrics</h3>
                <p className="text-slate-600">Updated every minute from our global healthcare network</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Analyses Today */}
                <motion.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2">1,247</div>
                  <div className="text-sm font-medium text-slate-700 mb-1">ECG Analyses Today</div>
                  <div className="text-xs text-slate-500 flex items-center justify-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span>+12% from yesterday</span>
                  </div>
                </motion.div>

                {/* Active Users */}
                <motion.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2">892</div>
                  <div className="text-sm font-medium text-slate-700 mb-1">Active Users Now</div>
                  <div className="text-xs text-slate-500 flex items-center justify-center space-x-1">
                    <Globe className="w-3 h-3 text-blue-500" />
                    <span>Across 45 countries</span>
                  </div>
                </motion.div>

                {/* Accuracy Rate */}
                <motion.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-current" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2">99.2%</div>
                  <div className="text-sm font-medium text-slate-700 mb-1">Diagnostic Accuracy</div>
                  <div className="text-xs text-slate-500 flex items-center justify-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>FDA validated</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Secondary Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Avg Response Time', value: '<30s', icon: Clock, color: 'from-orange-500 to-red-500' },
                { label: 'Hospitals Connected', value: '500+', icon: Heart, color: 'from-red-500 to-pink-500' },
                { label: 'AI Confidence', value: '98.7%', icon: Brain, color: 'from-indigo-500 to-purple-500' },
                { label: 'Uptime', value: '99.9%', icon: Shield, color: 'from-teal-500 to-cyan-500' }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  className="bg-white/50 backdrop-blur-sm border border-slate-200/40 rounded-xl p-4 text-center hover:bg-white/70 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-lg font-bold text-slate-900">{metric.value}</div>
                  <div className="text-xs text-slate-600">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.button 
              onClick={handleStartAnalysis}
              className="group relative bg-slate-900 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-500 flex items-center space-x-3 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
              <span className="relative z-10">Start Analysis</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 relative z-10" />
              </motion.div>
            </motion.button>
            
            <motion.button 
              className="group relative bg-white/60 backdrop-blur-sm border border-slate-200/50 text-slate-700 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3 shadow-sm hover:shadow-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
              <Play className="w-5 h-5 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="flex flex-wrap items-center justify-center space-x-8 opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 2 }}
          >
            {[
              { icon: Award, text: 'FDA Approved' },
              { icon: Shield, text: 'HIPAA Compliant' },
              { icon: Globe, text: 'Global Network' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center space-x-2 text-slate-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.2 + index * 0.1 }}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Analysis Card */}
      <motion.div 
        className="absolute bottom-10 right-10 hidden xl:block"
        initial={{ opacity: 0, x: 100, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <motion.div 
          className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-lg max-w-sm hover:bg-white/80 transition-all duration-500 group"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <motion.div 
                className="w-3 h-3 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-sm font-medium text-slate-700">Live Analysis</span>
            <Activity className="w-4 h-4 text-slate-600" />
          </div>
          
          <div className="text-xl font-bold text-slate-900 mb-2">
            Normal Sinus Rhythm
          </div>
          <div className="text-sm text-slate-600 mb-4">Heart Rate: 72 BPM</div>
          <div className="text-xs text-emerald-700 bg-emerald-100/80 rounded-full px-3 py-1 inline-block mb-4">
            ✓ Analysis Complete
          </div>
          
          <div className="relative h-16 bg-slate-50/80 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-slate-600 mr-2" />
            <span className="text-sm text-slate-700 font-medium">AI Confidence: 98.7%</span>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;