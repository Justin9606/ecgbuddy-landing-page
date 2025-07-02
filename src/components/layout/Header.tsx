"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Heart,
  Globe,
  ChevronDown,
  ArrowUpRight,
  User,
  Zap,
  Shield,
  Brain,
  Activity,
  Sparkles,
  Play,
  FileText,
  Users,
  BookOpen,
  Headphones,
  HelpCircle,
  Building2,
} from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("KOR");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleDropdownClick = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const megaMenuItems = {
    Product: {
      sections: [
        {
          title: "Core Features",
          items: [
            {
              name: "AI Analysis Engine",
              href: "#ai-analysis",
              description: "Advanced machine learning for ECG interpretation",
              icon: Brain,
              badge: "New",
              gradient: "from-purple-500 to-purple-600",
            },
            {
              name: "Real-time Processing",
              href: "#real-time",
              description: "Instant ECG analysis in under 30 seconds",
              icon: Zap,
              gradient: "from-amber-500 to-orange-500",
            },
            {
              name: "Medical Grade Security",
              href: "#security",
              description: "HIPAA-compliant with end-to-end encryption",
              icon: Shield,
              gradient: "from-emerald-500 to-green-600",
            },
            {
              name: "Clinical Integration",
              href: "#integration",
              description: "Seamless EMR and workflow integration",
              icon: Activity,
              gradient: "from-blue-500 to-indigo-600",
            },
          ],
        },
        {
          title: "Platforms",
          items: [
            {
              name: "Web Dashboard",
              href: "#web",
              description: "Full-featured browser experience",
              icon: Globe,
              gradient: "from-cyan-500 to-blue-500",
            },
            {
              name: "Mobile Apps",
              href: "#mobile",
              description: "iOS, Android & Windows applications",
              icon: Heart,
              gradient: "from-red-500 to-pink-600",
            },
          ],
        },
      ],
      cta: {
        title: "Ready to get started?",
        description: "Try ECG Buddy free for 14 days",
        button: "Start Free Trial",
        link: "#trial",
      },
    },
    Solutions: {
      sections: [
        {
          title: "By Use Case",
          items: [
            {
              name: "Emergency Medicine",
              href: "#emergency",
              description: "Rapid diagnosis in critical situations",
              icon: Zap,
              gradient: "from-red-500 to-red-600",
            },
            {
              name: "Cardiology Practice",
              href: "#cardiology",
              description: "Comprehensive cardiac care workflows",
              icon: Heart,
              gradient: "from-rose-500 to-pink-600",
            },
            {
              name: "Remote Monitoring",
              href: "#remote",
              description: "Continuous patient monitoring solutions",
              icon: Activity,
              gradient: "from-teal-500 to-cyan-600",
            },
            {
              name: "Research & Clinical Trials",
              href: "#research",
              description: "Advanced analytics for research teams",
              icon: Brain,
              gradient: "from-violet-500 to-purple-600",
            },
          ],
        },
        {
          title: "By Organization",
          items: [
            {
              name: "Hospitals & Health Systems",
              href: "#hospitals",
              description: "Enterprise-grade solutions",
              icon: Users,
              gradient: "from-indigo-500 to-blue-600",
            },
            {
              name: "Private Practice",
              href: "#practice",
              description: "Streamlined tools for smaller teams",
              icon: User,
              gradient: "from-emerald-500 to-teal-600",
            },
          ],
        },
      ],
      cta: {
        title: "Need a custom solution?",
        description: "Talk to our enterprise team",
        button: "Contact Sales",
        link: "#sales",
      },
    },
    Resources: {
      sections: [
        {
          title: "Learn",
          items: [
            {
              name: "Documentation",
              href: "#docs",
              description: "Complete guides and API reference",
              icon: BookOpen,
              gradient: "from-slate-500 to-slate-600",
            },
            {
              name: "Video Tutorials",
              href: "#tutorials",
              description: "Step-by-step video guides",
              icon: Play,
              gradient: "from-orange-500 to-red-500",
            },
            {
              name: "Best Practices",
              href: "#best-practices",
              description: "Clinical workflow optimization",
              icon: Sparkles,
              gradient: "from-yellow-500 to-amber-500",
            },
            {
              name: "Case Studies",
              href: "#case-studies",
              description: "Real-world implementation stories",
              icon: FileText,
              gradient: "from-blue-500 to-cyan-500",
            },
          ],
        },
        {
          title: "Support",
          items: [
            {
              name: "Help Center",
              href: "#help",
              description: "Find answers to common questions",
              icon: Headphones,
              gradient: "from-green-500 to-emerald-500",
            },
            {
              name: "Community Forum",
              href: "#community",
              description: "Connect with other users",
              icon: Users,
              gradient: "from-purple-500 to-violet-500",
            },
          ],
        },
      ],
      cta: {
        title: "Still need help?",
        description: "Our support team is here 24/7",
        button: "Contact Support",
        link: "#support",
      },
    },
    Careers: {
      sections: [
        {
          title: "Open Positions",
          items: [
            {
              name: "Software Engineers",
              href: "#engineering",
              description: "Build the future of healthcare AI",
              icon: Brain,
              gradient: "from-blue-500 to-indigo-600",
            },
            {
              name: "Clinical Specialists",
              href: "#clinical",
              description: "Bridge technology and medicine",
              icon: Heart,
              gradient: "from-red-500 to-pink-600",
            },
            {
              name: "Product Designers",
              href: "#design",
              description: "Design intuitive healthcare experiences",
              icon: Sparkles,
              gradient: "from-purple-500 to-violet-600",
            },
            {
              name: "Data Scientists",
              href: "#data",
              description: "Advance AI-powered diagnostics",
              icon: Activity,
              gradient: "from-emerald-500 to-teal-600",
            },
          ],
        },
        {
          title: "Why ARPI",
          items: [
            {
              name: "Mission-Driven Work",
              href: "#mission",
              description: "Make a real impact on patient care",
              icon: Heart,
              gradient: "from-rose-500 to-red-600",
            },
            {
              name: "Growth Opportunities",
              href: "#growth",
              description: "Advance your career with us",
              icon: Users,
              gradient: "from-amber-500 to-orange-500",
            },
          ],
        },
      ],
      cta: {
        title: "Ready to join us?",
        description: "Explore open positions and apply today",
        button: "View All Jobs",
        link: "#jobs",
      },
    },
  };

  return (
    <>
      {/* Backdrop blur overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled
            ? "bg-white/70 backdrop-blur-2xl border-b border-red-100/50 shadow-[0_8px_32px_rgba(255,63,74,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo with improved hover state */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-red-400 via-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-red-400 via-red-500 to-pink-600 rounded-xl opacity-20 blur group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent group-hover:from-red-600 group-hover:via-red-500 group-hover:to-pink-600 transition-all duration-300">
                ECG Buddy
              </span>
            </div>

            {/* Desktop Navigation with improved focus states */}
            <nav
              className="hidden lg:flex items-center space-x-1"
              ref={dropdownRef}
            >
              {Object.entries(megaMenuItems).map(([key, menu]) => (
                <div key={key} className="relative">
                  <button
                    onClick={() => handleDropdownClick(key)}
                    className={`flex items-center space-x-1 px-4 py-2 text-slate-700 hover:text-slate-900 transition-all duration-200 font-medium rounded-lg hover:bg-red-50/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:bg-red-50/50 ${
                      activeDropdown === key
                        ? "bg-red-50/50 text-slate-900"
                        : ""
                    }`}
                  >
                    <span>{key}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === key ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* COMPLETELY OPAQUE Mega Menu Dropdown */}
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-300 ${
                      activeDropdown === key
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="w-[800px] bg-white rounded-3xl border border-slate-200/80 shadow-[0_20px_70px_rgba(0,0,0,0.15)] p-8 overflow-hidden group">
                      {/* Subtle background animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-slate-50/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-2000 ease-out"></div>

                      <div className="relative grid grid-cols-3 gap-8">
                        {/* Menu Sections */}
                        <div className="col-span-2 grid grid-cols-2 gap-8">
                          {menu.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                                {section.title}
                                <Sparkles className="w-3 h-3 ml-2 text-slate-400 opacity-60" />
                              </h3>
                              <div className="space-y-1">
                                {section.items.map((item, itemIndex) => (
                                  <a
                                    key={itemIndex}
                                    href={item.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="group/item flex items-start space-x-3 p-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20"
                                  >
                                    <div
                                      className={`w-8 h-8 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200 shadow-sm`}
                                    >
                                      <item.icon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-sm mb-1 flex items-center">
                                        {item.name}
                                        {item.badge && (
                                          <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full animate-pulse">
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-xs text-slate-500 leading-relaxed">
                                        {item.description}
                                      </div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 flex-shrink-0 text-slate-400" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Enhanced CTA Section */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100/80 rounded-2xl p-6 border border-slate-200/60 relative overflow-hidden group/cta">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                          <div className="relative text-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover/cta:scale-110 group-hover/cta:rotate-3 transition-all duration-300">
                              <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">
                              {menu.cta.title}
                            </h3>
                            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                              {menu.cta.description}
                            </p>
                            <a
                              href={menu.cta.link}
                              onClick={() => setActiveDropdown(null)}
                              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                            >
                              <span>{menu.cta.button}</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* FAQ Navigation - Direct Click with focus state */}
              <button
                onClick={() => scrollToSection("faq-section")}
                className="flex items-center space-x-1 px-4 py-2 text-slate-700 hover:text-slate-900 transition-all duration-200 font-medium rounded-lg hover:bg-red-50/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:bg-red-50/50"
              >
                <span>FAQ</span>
              </button>

              {/* About ARPI Navigation - Direct Click with focus state */}
              <button
                onClick={() => scrollToSection("about-arpi-section")}
                className="flex items-center space-x-1 px-4 py-2 text-slate-700 hover:text-slate-900 transition-all duration-200 font-medium rounded-lg hover:bg-red-50/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:bg-red-50/50"
              >
                <span>About Us</span>
              </button>
            </nav>

            {/* Enhanced Right Side Actions - Polished Glassy Language Toggle */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Premium Glassy Language Toggle */}
              <div className="relative bg-white/30 backdrop-blur-md border border-white/20 rounded-full p-1 flex items-center space-x-1 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group overflow-hidden">
                {/* Glassy hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                
                <button
                  onClick={() => handleLanguageChange("KOR")}
                  className={`relative z-10 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    selectedLanguage === "KOR"
                      ? "text-slate-900 bg-white/70 shadow-sm hover:shadow-md"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  KOR
                </button>
                <button
                  onClick={() => handleLanguageChange("ENG")}
                  className={`relative z-10 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    selectedLanguage === "ENG"
                      ? "text-slate-900 bg-white/70 shadow-sm hover:shadow-md"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  ENG
                </button>
              </div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 transition-colors rounded-lg hover:bg-red-50/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Enhanced Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-500 ease-out ${
              isMobileMenuOpen
                ? "max-h-[80vh] opacity-100 pb-6"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="bg-white/80 backdrop-blur-2xl rounded-2xl border border-slate-200/80 shadow-[0_20px_70px_rgba(0,0,0,0.15)] mt-4 p-6 max-h-[70vh] overflow-y-auto">
              {/* Mobile Language Toggle */}
              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center justify-center">
                  <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-full p-1 flex items-center space-x-1 shadow-sm">
                    <button
                      onClick={() => handleLanguageChange("KOR")}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                        selectedLanguage === "KOR"
                          ? "text-slate-900 bg-white/80 shadow-sm"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                      }`}
                    >
                      한국어
                    </button>
                    <button
                      onClick={() => handleLanguageChange("ENG")}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                        selectedLanguage === "ENG"
                          ? "text-slate-900 bg-white/80 shadow-sm"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              {Object.entries(megaMenuItems).map(([key, menu], index) => (
                <div
                  key={key}
                  className={`${
                    index > 0 ? "mt-6 pt-6 border-t border-slate-100" : ""
                  }`}
                >
                  <div className="font-semibold text-slate-900 mb-3 flex items-center">
                    {key}
                    <ChevronDown className="w-4 h-4 ml-2 text-slate-500" />
                  </div>
                  {menu.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-4">
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                        {section.title}
                      </div>
                      <div className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <a
                            key={itemIndex}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center space-x-3 p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20"
                          >
                            <div
                              className={`w-8 h-8 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}
                            >
                              <item.icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm flex items-center">
                                {item.name}
                                {item.badge && (
                                  <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">
                                {item.description}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Mobile FAQ */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("faq-section");
                  }}
                  className="w-full text-left font-semibold text-slate-900 mb-3 flex items-center p-2 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20"
                >
                  FAQ
                  <HelpCircle className="w-4 h-4 ml-2 text-slate-500" />
                </button>
              </div>

              {/* Mobile About ARPI */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("about-arpi-section");
                  }}
                  className="w-full text-left font-semibold text-slate-900 mb-3 flex items-center p-2 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20"
                >
                  About Us
                  <Building2 className="w-4 h-4 ml-2 text-slate-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;