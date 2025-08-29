import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { PerformanceType } from "@components/performances/types";
import { useSelectTypes } from "@components/performances/hooks/useSelectTypes";
import Loading from "@/components/loading/Loading";

type PerformanceContextType = {
  performanceTypes: PerformanceType[];
  /*setPerformanceTypes: Dispatch<SetStateAction<PerformanceType[] | null>>;*/
};

const PerformanceContext = createContext<PerformanceContextType | undefined>(
  undefined
);

export function usePerformanceContext(){
  const context = useContext(PerformanceContext);
    if (!context)
      throw new Error("usePerformanceContext must be used within a PerformanceProvider");
    return context;
}

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [performanceTypes, setPerformanceTypes] = useState<
    PerformanceType[] | null
  >(null);
  const { types } = useSelectTypes();

  useEffect(() => {
    if (types) setPerformanceTypes(types);
  }, [types]);

  if (!performanceTypes) return <Loading />;

  return (
    <PerformanceContext.Provider value={{ performanceTypes }}>
      {children}
    </PerformanceContext.Provider>
  );
}
