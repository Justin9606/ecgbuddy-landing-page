"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = string; // Dynamic from Notion

interface LanguageOption {
  code: string;
  name: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any; // Dynamic translations object
  availableLanguages: LanguageOption[];
  contentAvailability: { [key: string]: string[] };
  isLoading: boolean;
  isContentAvailable: (url: string, lang?: Language) => boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Helper function to detect browser language and find matching language in Notion
const detectBrowserLanguage = (
  availableLanguages: LanguageOption[]
): string => {
  // Get browser language
  const browserLang = navigator.language || navigator.languages?.[0] || "en";

  // Common language mappings
  const languageMap: { [key: string]: string[] } = {
    English: ["en", "en-US", "en-GB", "en-CA", "en-AU"],
    Korean: ["ko", "ko-KR"],
    한국어: ["ko", "ko-KR"],
    Spanish: ["es", "es-ES", "es-MX", "es-AR"],
    Español: ["es", "es-ES", "es-MX", "es-AR"],
    French: ["fr", "fr-FR", "fr-CA"],
    Français: ["fr", "fr-FR", "fr-CA"],
    German: ["de", "de-DE", "de-AT", "de-CH"],
    Deutsch: ["de", "de-DE", "de-AT", "de-CH"],
    Japanese: ["ja", "ja-JP"],
    日本語: ["ja", "ja-JP"],
    Chinese: ["zh", "zh-CN", "zh-TW", "zh-HK"],
    中文: ["zh", "zh-CN", "zh-TW", "zh-HK"],
    Portuguese: ["pt", "pt-PT", "pt-BR"],
    Português: ["pt", "pt-PT", "pt-BR"],
    Italian: ["it", "it-IT"],
    Italiano: ["it", "it-IT"],
    Dutch: ["nl", "nl-NL"],
    Nederlands: ["nl", "nl-NL"],
    Russian: ["ru", "ru-RU"],
    Русский: ["ru", "ru-RU"],
  };

  // Find matching language in available languages
  for (const lang of availableLanguages) {
    const browserCodes = languageMap[lang.name] || [];

    // Check exact match first
    if (browserCodes.includes(browserLang)) {
      return lang.name;
    }

    // Check language code without region (e.g., "en" from "en-US")
    const browserLangCode = browserLang.split("-")[0];
    if (browserCodes.some((code) => code.split("-")[0] === browserLangCode)) {
      return lang.name;
    }
  }

  // Fallback to English if available, otherwise first available language
  const englishLang = availableLanguages.find(
    (lang) => lang.name === "English" || lang.code === "en"
  );

  return englishLang
    ? englishLang.name
    : availableLanguages[0]?.name || "English";
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("English"); // Will be updated based on browser detection
  const [translations, setTranslations] = useState<any>({});
  const [availableLanguages, setAvailableLanguages] = useState<
    LanguageOption[]
  >([]);
  const [contentAvailability, setContentAvailability] = useState<{
    [key: string]: string[];
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [languageInitialized, setLanguageInitialized] = useState(false);

  // Load available languages from Notion
  useEffect(() => {
    const loadAvailableLanguages = async () => {
      try {
        const response = await fetch("/api/notion/languages");
        const data = await response.json();
        if (data.success) {
          setAvailableLanguages(data.data);
        }
      } catch (error) {
        console.error("Error loading available languages:", error);
        // Fallback to empty array - let Notion determine languages
        setAvailableLanguages([]);
      }
    };

    loadAvailableLanguages();
  }, []);

  // Set default language based on browser detection or saved preference
  useEffect(() => {
    if (availableLanguages.length > 0 && !languageInitialized) {
      // Check if user has saved language preference
      const savedLanguage = localStorage.getItem("ecg-buddy-language");

      if (savedLanguage) {
        // Use saved preference if it's still available
        const isStillAvailable = availableLanguages.some(
          (lang) => lang.name === savedLanguage
        );
        if (isStillAvailable) {
          setLanguage(savedLanguage);
        } else {
          // Saved language no longer available, detect browser language
          const detectedLanguage = detectBrowserLanguage(availableLanguages);
          setLanguage(detectedLanguage);
        }
      } else {
        // No saved preference, detect browser language
        const detectedLanguage = detectBrowserLanguage(availableLanguages);
        setLanguage(detectedLanguage);
      }

      setLanguageInitialized(true);
    }
  }, [availableLanguages, languageInitialized]);

  // Load content availability from Notion
  useEffect(() => {
    const loadContentAvailability = async () => {
      try {
        const response = await fetch("/api/notion/content-availability");
        const data = await response.json();
        if (data.success) {
          setContentAvailability(data.data);
        }
      } catch (error) {
        console.error("Error loading content availability:", error);
      }
    };

    loadContentAvailability();
  }, []);

  // Load translations when language changes
  useEffect(() => {
    if (!languageInitialized) return; // Don't load translations until language is properly initialized

    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/notion/translations?lang=${language}`
        );
        const data = await response.json();
        if (data.success) {
          setTranslations(data.data);
        } else {
          // Fallback to empty object if no translations found
          setTranslations({});
        }
      } catch (error) {
        console.error("Error loading translations:", error);
        setTranslations({});
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language, languageInitialized]);

  // Save language preference to localStorage
  useEffect(() => {
    if (languageInitialized && !isLoading) {
      localStorage.setItem("ecg-buddy-language", language);
    }
  }, [language, isLoading, languageInitialized]);

  // Helper function to check if content is available in a specific language
  const isContentAvailable = (url: string, lang?: Language): boolean => {
    const targetLanguage = lang || language;

    // Find the language name from available languages
    const targetLang = availableLanguages.find(
      (l) => l.code === targetLanguage
    );
    if (!targetLang) return false;

    const availability = contentAvailability[url] || [];
    return availability.includes(targetLang.name);
  };

  const value = {
    language,
    setLanguage,
    t: translations,
    availableLanguages,
    contentAvailability,
    isLoading,
    isContentAvailable,
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

export type { Language, LanguageOption };
