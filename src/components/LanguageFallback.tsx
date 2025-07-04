"use client";

import React from "react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { Globe, AlertCircle } from "lucide-react";

interface LanguageFallbackProps {
  requestedUrl: string;
  availableLanguages: string[];
  fallbackLanguage?: string;
}

const LanguageFallback: React.FC<LanguageFallbackProps> = ({
  requestedUrl,
  availableLanguages,
  fallbackLanguage = "en",
}) => {
  const {
    language,
    setLanguage,
    availableLanguages: contextLanguages,
  } = useLanguage();

  const handleLanguageSwitch = (langCode: string) => {
    setLanguage(langCode); // Dynamic language - no type casting needed
  };

  const getLanguageName = (code: string) => {
    const lang = contextLanguages.find((l) => l.code === code);
    return lang ? lang.name : code;
  };

  const getLanguageIcon = () => {
    return <Globe className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-200">
        <div className="mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Content Not Available
          </h1>
          <p className="text-slate-600">
            This content is not available in{" "}
            <strong>{getLanguageName(language)}</strong>.
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-slate-500">
            Available in these languages:
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {availableLanguages.map((langCode) => (
              <button
                key={langCode}
                onClick={() => handleLanguageSwitch(langCode)}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20"
              >
                <Globe className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">
                  {getLanguageName(langCode)}
                </span>
              </button>
            ))}
          </div>

          {fallbackLanguage &&
            availableLanguages.includes(fallbackLanguage) && (
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleLanguageSwitch(fallbackLanguage)}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  <Globe className="w-4 h-4" />
                  <span>Switch to {getLanguageName(fallbackLanguage)}</span>
                </button>
              </div>
            )}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <a
            href="/"
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            ← Back to homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default LanguageFallback;
