/*import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import useSelectPerformances from "../performances/hooks/useSelectPerformances";
import { ViewPerformances } from "../performances/types";

type RolesContextType = {};
interface RolesProviderProps {
  children: ReactNode;
  performance_uid?:number
}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

export function useRolesContext() {
  const context = useContext(RolesContext);
  if (!context)
    throw new Error("useRolesContext must be used within a RolesProvider");
  return context;
}

export function RolesProvider({ children,performance_uid }: RolesProviderProps) {
  const {debouncedFetch, isLoading, rows} = useSelectPerformances();
  const [performances, setPerfomances] = useState<ViewPerformances[]>([]);

  useEffect(()=>{
    debouncedFetch({
      is_public: 1,
      uid:performance_uid
    }, {
      page: 0,
      pageSize: 100,
    })
  }, [debouncedFetch, performance_uid]);

  useEffect(()=>{
    setPerfomances(rows)
  }, [rows])
  return <RolesContext.Provider value={{}}>{children}</RolesContext.Provider>;
}*/
