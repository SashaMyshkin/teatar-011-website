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
  RolesMembersRow,
  RolesRow,
  TablePerformances,
  TablePerformancesAbout,
  TablePerformancesUID,
} from "@components/performances/types";
import { useSelectTypes } from "@components/performances/hooks/useSelectTypes";
import Loading from "@/components/loading/Loading";
import useSelectPerformanceUid from "@components/performances/hooks/useSelectPerformanceUid";
import useSelectPerformance from "@components/performances/hooks/useSelectPerformance";
import useSelectParagraphs from "@components/performances/hooks/useSelectParagraphs";
import useSelectRoles from "@components/performances/hooks/useSelectRoles";

type PerformanceContextType = {
  performanceTypes: PerformanceType[];

  performanceUid: TablePerformancesUID | null;
  setPerformanceUid: Dispatch<SetStateAction<TablePerformancesUID | null>>;

  performance: TablePerformances | null;
  setPerformance: Dispatch<SetStateAction<TablePerformances | null>>;

  paragraphs: TablePerformancesAbout[] | null;
  setParagraphs: Dispatch<SetStateAction<TablePerformancesAbout[] | null>>;

  rolesMembers: RolesMembersRow[];
  setRolesMembers: Dispatch<SetStateAction<RolesMembersRow[]>>;
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

  const { performanceUidData } = useSelectPerformanceUid({ identifier });
  const [performanceUid, setPerformanceUid] =
    useState<TablePerformancesUID | null>(null);

  const { performanceData } = useSelectPerformance({
    performanceUid: performanceUid?.id,
  });
  const [performance, setPerformance] = useState<TablePerformances | null>(
    null
  );

  const { paragraphsData } = useSelectParagraphs({
    performanceUid: performanceUid?.id,
  });
  const [paragraphs, setParagraphs] = useState<TablePerformancesAbout[] | null>(
    null
  );

  const {rolesData} = useSelectRoles({performanceId:performanceUid?.id});
  const [rolesMembers, setRolesMembers] = useState<RolesMembersRow[]>([]);

  useEffect(() => {
    if (types) setPerformanceTypes(types);
  }, [types]);

  useEffect(() => {
    if (performanceUidData) setPerformanceUid(performanceUidData);
  }, [performanceUidData]);

  useEffect(() => {
    if (paragraphsData) setParagraphs(paragraphsData);
  }, [paragraphsData]);

  useEffect(() => {
    if (performanceData) setPerformance(performanceData);
  }, [performanceData]);

   useEffect(() => {
    console.log("rolesDataChanged", rolesData)
    if (rolesData) setRolesMembers(rolesData);
  }, [rolesData]);

  if (!performanceTypes) return <Loading />;

  return (
    <PerformanceContext.Provider
      value={{
        performanceTypes,
        setPerformanceUid,
        performanceUid,
        setPerformance,
        performance,
        paragraphs,
        setParagraphs,
        rolesMembers,
        setRolesMembers
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}
