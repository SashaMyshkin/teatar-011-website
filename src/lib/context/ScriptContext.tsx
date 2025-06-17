// lib/context/ScriptContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";



type ScriptContextType = {
  allowedScripts: Script[];
  addAllowedScript: (script: Script) => void;
};

const ScriptContext = createContext<ScriptContextType | null>(null);

export function ScriptContextProvider({
  children,
  initialScripts = [],
}: {
  children: ReactNode;
  initialScripts?: Script[];
}) {
  const [allowedScripts, setAllowedScripts] = useState<Script[]>(initialScripts);

  const addAllowedScript = (script: Script) => {
    setAllowedScripts(prev => [...prev, script]);
  };

  return (
    <ScriptContext.Provider value={{ allowedScripts, addAllowedScript }}>
      {children}
    </ScriptContext.Provider>
  );
}

export function useScriptContext() {
  const context = useContext(ScriptContext);
  if (!context) throw new Error("useScriptContext must be used within ScriptContextProvider");
  return context;
}
