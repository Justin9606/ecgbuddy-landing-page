"use client";

import React from "react";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  ArrowUpRight,
  Sparkles,
  Building2,
} from "lucide-react";
import { getSectionContent } from "@/lib/admin/contentProvider";
import type { FooterContent } from "@/lib/admin/types";

interface FooterProps {
  isAdminView?: boolean;
  content?: FooterContent;
}

const Footer: React.FC<FooterProps> = ({ isAdminView = false, content }) => {
  const [footerContent, setFooterContent] = React.useState<FooterContent | null>(content || null);

  // Load content from admin or use defaults (only if not in admin view)
  React.useEffect(() => {
    if (isAdminView || content) {
      setFooterContent(content || null);
      return;
    }

    const loadContent = () => {
      try {
        const loadedContent = getSectionContent<FooterContent>('footer');
        setFooterContent(loadedContent);
      } catch (error) {
        console.error('Error loading footer content:', error);
        // Fallback to default content
        setFooterContent({
          companyInfo: {
            name: "ARPI Inc.",
            description: "Empowering healthcare professionals with AI-driven ECG analysis for better patient outcomes and streamlined cardiac care.",
            logo: "Building2",
          },
          contactInfo: {
            email: "contact@ecgbuddy.ai",
            phone: "+82 (0)2-1234-5678",
            address: "Seoul, South Korea",
          },
          sections: [
            {
              title: "Product",
              links: [
                { name: "ECG Analysis", href: "#analysis", description: "AI-powered diagnostics" },
                { name: "Features", href: "#features", description: "Complete feature set" },
              ],
            },
          ],
          socialLinks: [
            { platform: "Twitter", href: "#twitter", icon: "Twitter" },
            { platform: "LinkedIn", href: "#linkedin", icon: "Linkedin" },
            { platform: "GitHub", href: "#github", icon: "Github" },
          ],
          legal: {
            copyright: "© 2024 ARPI Inc. All rights reserved.",
            privacyPolicy: "#privacy",
            termsOfService: "#terms",
          },
        });
      }
    };

    loadContent();

    // Listen for content updates (only if not in admin view)
    const handleContentUpdate = () => {
      loadContent();
    };

    window.addEventListener('adminContentUpdate', handleContentUpdate);
    window.addEventListener('storage', handleContentUpdate);

    return () => {
      window.removeEventListener('adminContentUpdate', handleContentUpdate);
      window.removeEventListener('storage', handleContentUpdate);
    };
  }, [isAdminView, content]);

  const scrollToSection = (sectionId: string) => {
    if (isAdminView) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Show loading state while content loads (only if not in admin view)
  if (!footerContent && !isAdminView) {
    return (
      <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center py-20">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading footer content...</p>
        </div>
      </footer>
    );
  }

  // Use default content if none provided
  const defaultContent: FooterContent = {
    companyInfo: {
      name: "ARPI Inc.",
      description: "Healthcare technology company.",
      logo: "Building2",
    },
    contactInfo: {
      email: "contact@ecgbuddy.ai",
      phone: "+82 (0)2-1234-5678",
      address: "Seoul, South Korea",
    },
    sections: [],
    socialLinks: [],
    legal: {
      copyright: "© 2024 ARPI Inc. All rights reserved.",
      privacyPolicy: "#privacy",
      termsOfService: "#terms",
    },
  };

  const activeContent = footerContent || defaultContent;

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 63, 74, 0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Main Footer Content */}
        <div className={`grid grid-cols-1 ${isAdminView ? 'lg:grid-cols-3' : 'lg:grid-cols-5'} gap-12 mb-16`}>
          {/* Brand Section */}
          <div className={isAdminView ? 'lg:col-span-1' : 'lg:col-span-2'}>
            <div className="flex items-center space-x-3 mb-8 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-500/25 group-hover:shadow-slate-500/40 transition-all duration-300 group-hover:scale-110">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-2xl opacity-20 blur group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <span className="text-3xl font-bold text-white">{activeContent.companyInfo.name}</span>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-md">
              {activeContent.companyInfo.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  text: activeContent.contactInfo.email,
                  href: `mailto:${activeContent.contactInfo.email}`,
                },
                {
                  icon: Phone,
                  text: activeContent.contactInfo.phone,
                  href: `tel:${activeContent.contactInfo.phone.replace(/\s/g, '')}`,
                },
                { 
                  icon: MapPin, 
                  text: activeContent.contactInfo.address, 
                  href: "#location" 
                },
              ].map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-slate-400 hover:text-red-400 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all duration-300">
                    <contact.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{contact.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {activeContent.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-bold text-lg mb-8 flex items-center">
                {section.title}
                <Sparkles className="w-4 h-4 ml-2 text-red-400 opacity-60" />
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('#about-arpi-section') ? (
                      <button
                        onClick={() => scrollToSection('about-arpi-section')}
                        className="group flex items-start justify-between text-slate-400 hover:text-red-400 transition-all duration-300 w-full text-left"
                      >
                        <div>
                          <div className="font-medium mb-1 flex items-center">
                            {link.name}
                            {link.external && (
                              <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" />
                            )}
                          </div>
                          <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                            {link.description}
                          </div>
                        </div>
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="group flex items-start justify-between text-slate-400 hover:text-red-400 transition-all duration-300"
                      >
                        <div>
                          <div className="font-medium mb-1 flex items-center">
                            {link.name}
                            {link.external && (
                              <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" />
                            )}
                          </div>
                          <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                            {link.description}
                          </div>
                        </div>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-700/50">
          <div className="text-slate-400 mb-6 md:mb-0 text-center md:text-left">
            <div className="font-medium">
              {activeContent.legal.copyright}
            </div>
            <div className="text-sm text-slate-500 mt-1">
              ECG Buddy is a product of {activeContent.companyInfo.name}.
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {activeContent.socialLinks.map((social, index) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Twitter,
                Linkedin,
                Github,
              };
              const IconComponent = iconMap[social.icon] || Github;
              
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.platform}
                  className="group w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300 hover:scale-110"
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;