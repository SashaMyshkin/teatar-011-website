import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import useSelectPerformances from "@components/performances/hooks/useSelectPerformances";
import { ViewPerformances } from "@components/performances/types";
import useSelectMembersView from "@components/members/hooks/useSelectMembersView";
import { ViewMembers } from "@components/members/types";

type RolesContextType = {
  performancesData: ViewPerformances[] | null;
  membersData: ViewMembers[] | null;
};
interface RolesProviderProps {
  children: ReactNode;
}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

export function useRolesContext() {
  const context = useContext(RolesContext);
  if (!context)
    throw new Error("useRolesContext must be used within a RolesProvider");
  return context;
}

export function RolesProvider({ children }: RolesProviderProps) {
  const { debouncedFetch: fetchPerformances, rows: performancesData } =
    useSelectPerformances();
  const { debouncedFetch: fetchMembers, rows: membersData } =
    useSelectMembersView();

  useEffect(() => {
    fetchPerformances(
      {
        is_public: 1,
      },
      {
        page: 0,
        pageSize: 100,
      }
    );
  }, []);

  useEffect(() => {
    fetchMembers(
      {
        is_public: 1,
      },
      {
        page: 0,
        pageSize: 100,
      }
    );
  }, []);

  console.log("membersData", membersData)

  return (
    <RolesContext.Provider value={{ membersData, performancesData }}>
      {children}
    </RolesContext.Provider>
  );
}
