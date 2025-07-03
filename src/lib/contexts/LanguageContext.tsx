"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "@/lib/constants/languages/en.json";
import koTranslations from "@/lib/constants/languages/ko.json";

type Language = "en" | "ko";
type Translations = typeof enTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "ecg-buddy-language"
    ) as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ko")) {
      setLanguage(savedLanguage);
    }
    setIsLoading(false);
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("ecg-buddy-language", language);
    }
  }, [language, isLoading]);

  const translations = language === "ko" ? koTranslations : enTranslations;

  const value = {
    language,
    setLanguage,
    t: translations,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export type { Language, Translations };
