"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type LanguageContextProps = {
  scriptId: number;
  scriptDescription: string;
};

type LanguageContextType = LanguageContextProps & {
  setLanguage: (language: LanguageContextProps) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguageContext must be used within a LanguageProvider");
  return context;
};

export const LanguageProvider = ({
  children,
  languageContextProps,
}: {
  children: ReactNode;
  languageContextProps: LanguageContextProps;
}) => {
  const [language, setLanguage] = useState<LanguageContextProps>(languageContextProps);

  return (
    <LanguageContext.Provider
      value={{
        ...language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
