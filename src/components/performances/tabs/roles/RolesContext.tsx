import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import useSelectMembersView from "@components/members/hooks/useSelectMembersView";
import { ViewMembers } from "@components/members/types";

type RolesContextType = {
  membersData: ViewMembers[];
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
  const { debouncedFetch: fetchMembers, rows: membersData } =
    useSelectMembersView();

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

  return (
    <RolesContext.Provider value={{ membersData, }}>
      {children}
    </RolesContext.Provider>
  );
}
