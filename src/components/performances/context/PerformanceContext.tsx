import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  PerformanceType,
  TablePerformances,
  TablePerformancesUID,
} from "@components/performances/types";
import { useSelectTypes } from "@components/performances/hooks/useSelectTypes";
import Loading from "@/components/loading/Loading";
import useSelectPerformanceUid from "@components/performances/hooks/useSelectPerformanceUid";
import useSelectPerformance from "@components/performances/hooks/useSelectPerformance";

type PerformanceContextType = {
  performanceTypes: PerformanceType[];
  performanceUid?:TablePerformancesUID | null;
  performance?:TablePerformances | null;
  setPerformanceUid: Dispatch<SetStateAction<TablePerformancesUID | null>>;
  setPerformance: Dispatch<SetStateAction<TablePerformances | null>>;
};

interface PerformanceProviderProps {
  children: ReactNode;
  identifier?: string;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(
  undefined
);

export function usePerformanceContext() {
  const context = useContext(PerformanceContext);
  if (!context)
    throw new Error(
      "usePerformanceContext must be used within a PerformanceProvider"
    );
  return context;
}

export function PerformanceProvider({
  children,
  identifier,
}: PerformanceProviderProps) {
  const { types } = useSelectTypes();
  const [performanceTypes, setPerformanceTypes] = useState<
    PerformanceType[] | null
  >(null);

  const { performanceUidData } =
    useSelectPerformanceUid({ identifier });
  const [performanceUid, setPerformanceUid] =
    useState<TablePerformancesUID | null>(null);

  const { performanceData } =
    useSelectPerformance({ performanceUid: performanceUid?.id });
  const [performance, setPerformance] = useState<TablePerformances | null>(
    null
  );

  useEffect(() => {
    if (types) setPerformanceTypes(types);
  }, [types]);

  useEffect(() => {
    if (performanceUidData) setPerformanceUid(performanceUidData);
  }, [performanceUidData]);

  useEffect(() => {
    if (performanceData) setPerformance(performanceData);
  }, [performanceData]);

  if (!performanceTypes) return <Loading />;

  return (
    <PerformanceContext.Provider value={{ performanceTypes, performance, performanceUid,setPerformance, setPerformanceUid }}>
      {children}
    </PerformanceContext.Provider>
  );
}
