"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'en' | 'id';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  // Opsional: Simpan pilihan bahasa di browser agar tidak hilang saat refresh
  useEffect(() => {
    const savedLang = localStorage.getItem('jamudex_lang') as Lang;
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const newLang = prev === 'en' ? 'id' : 'en';
      localStorage.setItem('jamudex_lang', newLang);
      return newLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};