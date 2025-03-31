
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, TranslationLanguage } from "@/utils/languageData";
import { STORAGE_KEYS, saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";

interface LanguageContextType {
  language: TranslationLanguage;
  setLanguage: (lang: TranslationLanguage) => void;
  t: (key: string) => string;
}

const defaultLanguage: TranslationLanguage = "en";

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<TranslationLanguage>(
    () => getFromLocalStorage<TranslationLanguage>(STORAGE_KEYS.LANGUAGE, defaultLanguage)
  );

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.LANGUAGE, language);
  }, [language]);

  const setLanguage = (lang: TranslationLanguage) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    if (!translations[language]) {
      return translations[defaultLanguage][key] || key;
    }
    return translations[language][key] || translations[defaultLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
