import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Award, Target, ArrowUpRight, CheckCircle, Sparkles, Heart, Brain, Shield, Activity, Globe, Zap } from 'lucide-react';

const AboutARPI = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const partnerships = [
    {
      id: 1,
      name: 'Seoul National University Hospital',
      type: 'Research Partner',
      description: 'Collaborative research and clinical validation for AI-powered cardiac diagnostics',
      year: '2022',
      projects: '15+ Studies',
      status: 'Active',
      icon: Brain,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50/50 to-indigo-50/30',
      borderColor: 'blue-200/40',
      logo: '🏥' // Placeholder - will be replaced with actual logo
    },
    {
      id: 2,
      name: 'Samsung Medical Center',
      type: 'Clinical Partner',
      description: 'Real-world deployment and testing of ECG analysis systems',
      year: '2023',
      projects: '8+ Trials',
      status: 'Active',
      icon: Heart,
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-50/50 to-pink-50/30',
      borderColor: 'red-200/40',
      logo: '🏥' // Placeholder - will be replaced with actual logo
    },
    {
      id: 3,
      name: 'Asan Medical Center',
      type: 'Technology Partner',
      description: 'AI algorithm development and optimization for cardiac care',
      year: '2023',
      projects: '12+ Projects',
      status: 'Active',
      icon: Zap,
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50/50 to-orange-50/30',
      borderColor: 'amber-200/40',
      logo: '🏥' // Placeholder - will be replaced with actual logo
    },
    {
      id: 4,
      name: 'Korean Medical Association',
      type: 'Industry Partner',
      description: 'Standards development and advocacy for medical AI adoption',
      year: '2024',
      projects: '5+ Initiatives',
      status: 'Active',
      icon: Shield,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50/50 to-teal-50/30',
      borderColor: 'emerald-200/40',
      logo: '🏛️' // Placeholder - will be replaced with actual logo
    },
    {
      id: 5,
      name: 'Yonsei Severance Hospital',
      type: 'Research Partner',
      description: 'Advanced cardiac imaging and AI integration research',
      year: '2024',
      projects: '6+ Studies',
      status: 'Active',
      icon: Activity,
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50/50 to-violet-50/30',
      borderColor: 'purple-200/40',
      logo: '🏥' // Placeholder - will be replaced with actual logo
    },
    {
      id: 6,
      name: 'Korea University Medical Center',
      type: 'Clinical Partner',
      description: 'Large-scale clinical trials and validation studies',
      year: '2024',
      projects: '10+ Trials',
      status: 'Active',
      icon: Globe,
      gradient: 'from-cyan-500 to-blue-600',
      bgGradient: 'from-cyan-50/50 to-blue-50/30',
      borderColor: 'cyan-200/40',
      logo: '🏥' // Placeholder - will be replaced with actual logo
    }
  ];

  const CARDS_TO_SHOW = 4;
  const SLIDE_INTERVAL = 4000;

  // Auto-sliding logic with smooth infinite loop
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentSlide(prev => (prev + 1) % partnerships.length);
      }, SLIDE_INTERVAL);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, partnerships.length]);

  // Get visible cards with infinite loop logic
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < CARDS_TO_SHOW; i++) {
      const index = (currentSlide + i) % partnerships.length;
      cards.push(partnerships[index]);
    }
    return cards;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const visibleCards = getVisibleCards();

  return (
    <section id="about-arpi-section" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-white to-gray-50/20"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-rose-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Strategic Partnerships Section */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-full px-6 py-3 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <Users className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Strategic Partnerships</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="block text-slate-900 mb-2">
                Collaborating with premier
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                healthcare institutions
              </span>
            </h3>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Working together to advance medical AI and improve patient outcomes worldwide
            </p>
          </div>

          {/* Enhanced Sliding Partnership Cards */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Cards Container with Smooth Sliding */}
            <div className="overflow-hidden rounded-3xl">
              <motion.div 
                className="flex gap-6"
                animate={{ 
                  x: `${-currentSlide * (100 / CARDS_TO_SHOW)}%`
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }}
                style={{ width: `${(partnerships.length * 100) / CARDS_TO_SHOW}%` }}
              >
                {partnerships.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    className={`relative bg-gradient-to-br ${partner.bgGradient} backdrop-blur-2xl border border-${partner.borderColor} rounded-3xl p-8 transition-all duration-700 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] group overflow-hidden cursor-pointer`}
                    style={{ width: `${100 / CARDS_TO_SHOW}%`, flexShrink: 0 }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    {/* Glassy hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                    
                    {/* Partner Logo Placeholder */}
                    <div className="relative flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-white/40">
                          {partner.logo}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <partner.icon className="w-4 h-4 text-slate-600" />
                            <span className="text-sm font-medium text-slate-600">{partner.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 font-medium">{partner.status}</span>
                          </div>
                        </div>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500 opacity-80" />
                    </div>

                    {/* Partner Info */}
                    <div className="relative mb-6">
                      <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300">
                        {partner.name}
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-sm mb-4">
                        {partner.description}
                      </p>
                    </div>

                    {/* Partnership Stats */}
                    <div className="relative flex items-center justify-between mb-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-800">{partner.year}</div>
                        <div className="text-xs text-slate-500">Partnership</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-800">{partner.projects}</div>
                        <div className="text-xs text-slate-500">Active</div>
                      </div>
                    </div>

                    {/* Partnership Status */}
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50/50 backdrop-blur-sm rounded-full px-3 py-1">
                        <CheckCircle className="w-3 h-3" />
                        <span className="text-xs font-medium">Active Partnership</span>
                      </div>
                      <motion.div
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Elegant Navigation Dots */}
            <div className="flex justify-center mt-12 space-x-3">
              {partnerships.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'bg-slate-800 scale-125' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {index === currentSlide && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-slate-800"
                      layoutId="activeDot"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Subtle Progress Indicator */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="h-1 bg-slate-200/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-slate-600 to-slate-800 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: `${((currentSlide + 1) / partnerships.length) * 100}%`
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>Partnership {currentSlide + 1}</span>
                <span>{partnerships.length} Total</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutARPI;