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
  Check,
  Camera,
  BarChart3,
  CheckCircle,
  GraduationCap,
  Presentation,
  UserPlus,
} from "lucide-react";
import { useLanguage } from "@/lib/constants";
import Link from "next/link";
import enTranslations from "@/lib/constants/languages/en.json";
import koTranslations from "@/lib/constants/languages/ko.json";
import { getNavigationData, formatNavigationData } from "@/lib/notion";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // Use the actual language from useLanguage hook instead of local state
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // Navigation data from Notion
  const [navigationData, setNavigationData] = useState<any>(null);
  const [isNavigationLoading, setIsNavigationLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch navigation data from Notion
  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        setIsNavigationLoading(true);
        const response = await fetch(
          `/api/notion/navigation?lang=${language}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.navigation) {
            setNavigationData(data);
          }
        } else {
          console.error("Failed to fetch navigation data");
        }
      } catch (error) {
        console.error("Error fetching navigation data:", error);
      } finally {
        setIsNavigationLoading(false);
      }
    };

    fetchNavigationData();
  }, [language]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (activeDropdown || isLanguageDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown, isLanguageDropdownOpen]);

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

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as "ko" | "en"); // Connect to your existing useLanguage hook
    setIsLanguageDropdownOpen(false);
  };

  // Get languages directly from JSON files
  const languages = [
    ...koTranslations.header.languages,
    ...enTranslations.header.languages,
  ];

  const selectedLang =
    languages.find((lang) => lang.code === language) || languages[0];

  // Map navigation item names to icons
  const iconMap: { [key: string]: any } = {
    "회사 소개": Building2,
    "About ARPI": Building2,
    블로그: FileText,
    Blog: FileText,
    미디어: Camera,
    Media: Camera,
    사용방법: BookOpen,
    "How to Use": BookOpen,
    "분석보고서 해석방법": BarChart3,
    "Report Interpretation": BarChart3,
    "지침 신뢰도 양식": CheckCircle,
    "Reliability Form": CheckCircle,
    FAQ: HelpCircle,
    논문: GraduationCap,
    Publications: GraduationCap,
    학회발표: Presentation,
    "Conference Talks": Presentation,
    "연구자 네트워크": Users,
    "Researcher Network": Users,
    "연구자 신청": UserPlus,
    "Apply as Researcher": UserPlus,
  };

  // Map navigation item names to gradients
  const gradientMap: { [key: string]: string } = {
    "회사 소개": "from-blue-500 to-indigo-600",
    "About ARPI": "from-blue-500 to-indigo-600",
    블로그: "from-emerald-500 to-green-600",
    Blog: "from-emerald-500 to-green-600",
    미디어: "from-purple-500 to-violet-600",
    Media: "from-purple-500 to-violet-600",
    사용방법: "from-red-500 to-pink-600",
    "How to Use": "from-red-500 to-pink-600",
    "분석보고서 해석방법": "from-amber-500 to-orange-500",
    "Report Interpretation": "from-amber-500 to-orange-500",
    "지침 신뢰도 양식": "from-teal-500 to-cyan-600",
    "Reliability Form": "from-teal-500 to-cyan-600",
    FAQ: "from-slate-500 to-slate-600",
    논문: "from-indigo-500 to-blue-600",
    Publications: "from-indigo-500 to-blue-600",
    학회발표: "from-violet-500 to-purple-600",
    "Conference Talks": "from-violet-500 to-purple-600",
    "연구자 네트워크": "from-emerald-500 to-teal-600",
    "Researcher Network": "from-emerald-500 to-teal-600",
    "연구자 신청": "from-rose-500 to-pink-600",
    "Apply as Researcher": "from-rose-500 to-pink-600",
  };

  // Create dynamic mega menu items from Notion data
  const createMegaMenuItems = () => {
    // If navigation data is loading or not available, return fallback
    if (isNavigationLoading || !navigationData) {
      return fallbackMegaMenuItems;
    }

    // Check if navigation data is empty (no items in any category)
    const hasAnyItems =
      navigationData.navigation &&
      (navigationData.navigation.dropdownItems.ARPI.length > 0 ||
        navigationData.navigation.dropdownItems["ECG Buddy"].length > 0 ||
        navigationData.navigation.dropdownItems.Research.length > 0);

    // If no items found, use fallback
    if (!hasAnyItems) {
      return fallbackMegaMenuItems;
    }

    const items: any = {};

    // Create items for each main category
    ["ARPI", "ECG Buddy", "Research"].forEach((category) => {
      const categoryItems =
        navigationData.navigation.dropdownItems[category] || [];

      // If category has no items, use fallback for that category
      if (categoryItems.length === 0) {
        items[category] =
          fallbackMegaMenuItems[category as keyof typeof fallbackMegaMenuItems];
        return;
      }

      items[category] = {
        sections: [
          {
            title: category,
            items: categoryItems.map((item: any) => ({
              name: item.title,
              href: item.url || "#",
              description: item.description || "",
              icon: iconMap[item.title] || Building2,
              isScroll: item.url?.startsWith("#") || false,
              gradient: gradientMap[item.title] || "from-gray-500 to-gray-600",
            })),
          },
        ],
        cta: {
          title:
            category === "ARPI"
              ? language === "ko"
                ? "ARPI에 대해 더 알아보기"
                : "Learn More About ARPI"
              : category === "ECG Buddy"
              ? language === "ko"
                ? "ECG Buddy 시작하기"
                : "Get Started with ECG Buddy"
              : language === "ko"
              ? "연구에 참여하세요"
              : "Join Our Research",
          description:
            category === "ARPI"
              ? language === "ko"
                ? "의료 AI 혁신을 주도하는 ARPI"
                : "Leading medical AI innovation"
              : category === "ECG Buddy"
              ? language === "ko"
                ? "AI 기반 ECG 분석 솔루션"
                : "AI-powered ECG analysis solution"
              : language === "ko"
              ? "의료 AI 연구의 최전선에서"
              : "At the forefront of medical AI research",
          button:
            category === "ARPI"
              ? language === "ko"
                ? "회사 소개 보기"
                : "View Company Info"
              : category === "ECG Buddy"
              ? language === "ko"
                ? "제품 알아보기"
                : "Explore Product"
              : language === "ko"
              ? "연구 참여하기"
              : "Get Involved",
          link:
            category === "ARPI"
              ? "#about-arpi-section"
              : category === "ECG Buddy"
              ? "#features-section"
              : "/apply-researcher",
          isScroll: category !== "Research",
        },
      };
    });

    return items;
  };

  // Fallback navigation for when Notion data is not available
  const fallbackMegaMenuItems = {
    ARPI: {
      sections: [
        {
          title: "Company",
          items: [
            {
              name: language === "ko" ? "회사 소개" : "About ARPI",
              href: "#about-arpi-section",
              description:
                language === "ko"
                  ? "ARPI 회사 소개 및 비전"
                  : "Learn about ARPI's vision and mission",
              icon: Building2,
              isScroll: true,
              gradient: "from-blue-500 to-indigo-600",
            },
            {
              name: language === "ko" ? "블로그" : "Blog",
              href: "/blog",
              description:
                language === "ko"
                  ? "최신 소식 및 업데이트"
                  : "Latest news and updates",
              icon: FileText,
              isScroll: false,
              gradient: "from-emerald-500 to-green-600",
            },
            {
              name: language === "ko" ? "미디어" : "Media",
              href: "/media",
              description:
                language === "ko"
                  ? "언론 보도 및 미디어 자료"
                  : "Press releases and media resources",
              icon: Camera,
              isScroll: false,
              gradient: "from-purple-500 to-violet-600",
            },
          ],
        },
      ],
      cta: {
        title:
          language === "ko"
            ? "ARPI에 대해 더 알아보기"
            : "Learn More About ARPI",
        description:
          language === "ko"
            ? "의료 AI 혁신을 주도하는 ARPI"
            : "Leading medical AI innovation",
        button: language === "ko" ? "회사 소개 보기" : "View Company Info",
        link: "#about-arpi-section",
        isScroll: true,
      },
    },
    "ECG Buddy": {
      sections: [
        {
          title: "Product Features",
          items: [
            {
              name: language === "ko" ? "사용방법" : "How to Use",
              href: "/how-to-use",
              description:
                language === "ko"
                  ? "ECG Buddy 사용 가이드"
                  : "Complete guide to using ECG Buddy",
              icon: BookOpen,
              isScroll: false,
              gradient: "from-red-500 to-pink-600",
            },
            {
              name:
                language === "ko"
                  ? "분석보고서 해석방법"
                  : "Report Interpretation",
              href: "/report-interpretation",
              description:
                language === "ko"
                  ? "ECG 분석 결과 해석 방법"
                  : "Understanding ECG analysis results",
              icon: BarChart3,
              isScroll: false,
              gradient: "from-amber-500 to-orange-500",
            },
            {
              name: language === "ko" ? "지침 신뢰도 양식" : "Reliability Form",
              href: "/reliability-form",
              description:
                language === "ko"
                  ? "진단 신뢰도 평가 양식"
                  : "Diagnostic reliability assessment form",
              icon: CheckCircle,
              isScroll: false,
              gradient: "from-teal-500 to-cyan-600",
            },
            {
              name: "FAQ",
              href: "#faq-section",
              description:
                language === "ko"
                  ? "자주 묻는 질문"
                  : "Frequently asked questions",
              icon: HelpCircle,
              isScroll: true,
              gradient: "from-slate-500 to-slate-600",
            },
          ],
        },
      ],
      cta: {
        title:
          language === "ko"
            ? "ECG Buddy 시작하기"
            : "Get Started with ECG Buddy",
        description:
          language === "ko"
            ? "AI 기반 ECG 분석 솔루션"
            : "AI-powered ECG analysis solution",
        button: language === "ko" ? "제품 알아보기" : "Explore Product",
        link: "#features-section",
        isScroll: true,
      },
    },
    Research: {
      sections: [
        {
          title: "Academic Resources",
          items: [
            {
              name: language === "ko" ? "논문" : "Publications",
              href: "/publications",
              description:
                language === "ko"
                  ? "연구 논문 및 학술 자료"
                  : "Research papers and academic publications",
              icon: GraduationCap,
              isScroll: false,
              gradient: "from-indigo-500 to-blue-600",
            },
            {
              name: language === "ko" ? "학회발표" : "Conference Talks",
              href: "/conference-talks",
              description:
                language === "ko"
                  ? "학회 발표 자료 및 영상"
                  : "Conference presentations and videos",
              icon: Presentation,
              isScroll: false,
              gradient: "from-violet-500 to-purple-600",
            },
            {
              name:
                language === "ko" ? "연구자 네트워크" : "Researcher Network",
              href: "/researcher-network",
              description:
                language === "ko"
                  ? "연구자 협업 네트워크"
                  : "Collaborative research network",
              icon: Users,
              isScroll: false,
              gradient: "from-emerald-500 to-teal-600",
            },
            {
              name: language === "ko" ? "연구자 신청" : "Apply as Researcher",
              href: "/apply-researcher",
              description:
                language === "ko"
                  ? "연구자 협업 신청"
                  : "Join our research collaboration",
              icon: UserPlus,
              isScroll: false,
              gradient: "from-rose-500 to-pink-600",
            },
          ],
        },
      ],
      cta: {
        title: language === "ko" ? "연구에 참여하세요" : "Join Our Research",
        description:
          language === "ko"
            ? "의료 AI 연구의 최전선에서"
            : "At the forefront of medical AI research",
        button: language === "ko" ? "연구 참여하기" : "Get Involved",
        link: "/apply-researcher",
        isScroll: false,
      },
    },
  };

  // Get the current mega menu items (dynamic or fallback)
  const megaMenuItems = createMegaMenuItems();

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
            <Link
              href="/"
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-red-400 via-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-red-400 via-red-500 to-pink-600 rounded-xl opacity-20 blur group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent group-hover:from-red-600 group-hover:via-red-500 group-hover:to-pink-600 transition-all duration-300">
                ECG Buddy
              </span>
            </Link>

            {/* Desktop Navigation with improved focus states */}
            <nav
              className="hidden lg:flex items-center space-x-10"
              ref={dropdownRef}
            >
              {Object.entries(megaMenuItems).map(
                ([key, menu]: [string, any]) => (
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
                      <div className="w-[400px] bg-white rounded-3xl border border-slate-200/80 shadow-[0_20px_70px_rgba(0,0,0,0.15)] p-6 overflow-hidden group">
                        {/* Subtle background animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-slate-50/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-2000 ease-out"></div>

                        <div className="relative">
                          {/* Menu Sections */}
                          <div className="grid grid-cols-1 gap-8">
                            {menu.sections.map(
                              (section: any, sectionIndex: number) => (
                                <div key={sectionIndex}>
                                  <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                                    {section.title}
                                    <Sparkles className="w-3 h-3 ml-2 text-slate-400 opacity-60" />
                                  </h3>
                                  <div className="space-y-1">
                                    {section.items.map(
                                      (item: any, itemIndex: number) =>
                                        item.isScroll ? (
                                          <button
                                            key={itemIndex}
                                            onClick={() => {
                                              setActiveDropdown(null);
                                              scrollToSection(
                                                item.href.replace("#", "")
                                              );
                                            }}
                                            className="group/item flex items-start space-x-3 p-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 w-full text-left"
                                          >
                                            <div
                                              className={`w-8 h-8 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200 shadow-sm`}
                                            >
                                              <item.icon className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <div className="font-medium text-sm mb-1 flex items-center">
                                                {item.name}
                                                {"badge" in item &&
                                                  item.badge && (
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
                                          </button>
                                        ) : (
                                          <a
                                            key={itemIndex}
                                            href={item.href}
                                            onClick={() =>
                                              setActiveDropdown(null)
                                            }
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
                                                {"badge" in item &&
                                                  item.badge && (
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
                                        )
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </nav>

            {/* Enhanced Right Side Actions - Premium Language Dropdown */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Premium Language Dropdown */}
              <div className="relative" ref={languageDropdownRef}>
                <button
                  onClick={() =>
                    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                  }
                  className="relative group bg-white/30 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center space-x-3 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  {/* Glassy hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

                  <div className="relative z-10 flex items-center space-x-2">
                    {/* <Globe className="w-4 h-4 text-slate-600" /> */}
                    <span className="text-sm font-medium text-slate-700">
                      {selectedLang.flag}
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {selectedLang.name}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                        isLanguageDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Language Dropdown Menu */}
                <div
                  className={`absolute top-full right-0 mt-2 transition-all duration-300 ${
                    isLanguageDropdownOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="w-64 bg-white/90 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.15)] p-2 overflow-hidden">
                    {/* Language Options */}
                    <div className="py-2">
                      {languages.map((langItem) => (
                        <button
                          key={langItem.code}
                          onClick={() => handleLanguageChange(langItem.code)}
                          className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50/80 rounded-xl transition-all duration-200 group ${
                            language === langItem.code ? "bg-red-50/50" : ""
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{langItem.flag}</span>
                            <div>
                              <div className="text-sm font-medium text-slate-800">
                                {langItem.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {langItem.name}
                              </div>
                            </div>
                          </div>
                          {language === langItem.code && (
                            <Check className="w-4 h-4 text-red-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
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
              {/* Mobile Language Dropdown */}
              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-xs">
                    <button
                      onClick={() =>
                        setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                      }
                      className="w-full bg-white/50 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center space-x-3">
                        {/* <Globe className="w-4 h-4 text-slate-600" /> */}
                        <span className="text-lg">{selectedLang.flag}</span>
                        <span className="text-sm font-medium text-slate-700">
                          {selectedLang.name}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                          isLanguageDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mobile Language Options */}
                    {isLanguageDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-lg p-2 z-50">
                        {languages.map((langItem) => (
                          <button
                            key={langItem.code}
                            onClick={() => handleLanguageChange(langItem.code)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50/80 rounded-xl transition-all duration-200 ${
                              language === langItem.code ? "bg-red-50/50" : ""
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{langItem.flag}</span>
                              <div>
                                <div className="text-sm font-medium text-slate-800">
                                  {langItem.name}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {langItem.name}
                                </div>
                              </div>
                            </div>
                            {language === langItem.code && (
                              <Check className="w-4 h-4 text-red-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              {Object.entries(megaMenuItems).map(
                ([key, menu]: [string, any], index: number) => (
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
                    {menu.sections.map((section: any, sectionIndex: number) => (
                      <div key={sectionIndex} className="mb-4">
                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                          {section.title}
                        </div>
                        <div className="space-y-1">
                          {section.items.map((item: any, itemIndex: number) => (
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
                                  {"badge" in item && item.badge ? (
                                    <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                                      {String(item.badge)}
                                    </span>
                                  ) : null}
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
                )
              )}

              {/* Mobile Careers */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link
                  href="/careers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left font-semibold text-slate-900 mb-3 flex items-center p-2 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20"
                >
                  Careers
                  <Building2 className="w-4 h-4 ml-2 text-slate-500" />
                </Link>
              </div>

              {/* Mobile Pricing */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("pricing-section");
                  }}
                  className="w-full text-left font-semibold text-slate-900 mb-3 flex items-center p-2 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20"
                >
                  Pricing
                  <Sparkles className="w-4 h-4 ml-2 text-slate-500" />
                </button>
              </div>

              {/* Mobile FAQ */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("faq-section");
                  }}
                  className="w-full text-left font-semibold text-slate-900 mb-3 flex items-center p-2 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20"
                >
                  {t.header.navigation.faq}
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
                  {t.header.navigation.about}
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
