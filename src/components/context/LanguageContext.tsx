"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import useSelectLanguages from "../languages/hooks/useSelectLanguages";
import Loading from "../loading/Loading";
import { Language } from "../languages/types";

export type LanguageContextType = {
  languages: Language[];
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  return context;
};

const defaultState: Language = {
  default: 1,
  description: "Latinica",
  id: 2,
  name: "sr-Latn",
  status_id: 1,
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(defaultState);
  const { loading, languages, error } = useSelectLanguages();

  useEffect(() => {
    if (languages) {
      const defaultLanguage = languages.find((elem) => elem.default === 1);
      setLanguage(defaultLanguage ?? defaultState);
    }
  }, [languages]);

  if (loading) return <Loading></Loading>;
  if(error) return <>We could not fetch languages object.</>

  return (
    <LanguageContext.Provider value={{ languages, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
};
