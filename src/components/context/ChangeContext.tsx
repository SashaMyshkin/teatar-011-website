// ChangeContext.tsx
"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

type ChangeContextType = {
  changeCount: number;
  notifyChange: () => void;
};

const ChangeContext = createContext<ChangeContextType | undefined>(undefined);

export const ChangeProvider = ({ children }: { children: React.ReactNode }) => {
  const [changeCount, setChangeCount] = useState(0);

  const notifyChange = useCallback(() => {
    setChangeCount((prev) => prev + 1); // trigger a re-render in all consumers
  }, []);

  return (
    <ChangeContext.Provider value={{ changeCount, notifyChange }}>
      {children}
    </ChangeContext.Provider>
  );
};

export const useChangeContext = (): ChangeContextType => {
  const context = useContext(ChangeContext);
  if (!context) {
    throw new Error("useChangeContext must be used within a ChangeProvider");
  }
  return context;
};
