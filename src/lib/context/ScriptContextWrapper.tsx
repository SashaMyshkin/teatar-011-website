// app/ClientWrapper.tsx
"use client";

import { ScriptContextProvider } from "@/lib/context/ScriptContext"; // adjust path
import { ReactNode } from "react";

export default function ClientWrapper({ children, initialScripts }: { children: ReactNode, initialScripts: Script[] }) {
  return (
    <ScriptContextProvider initialScripts={initialScripts}>
      {children}
    </ScriptContextProvider>
  );
}
