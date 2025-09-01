import { createContext, useContext } from "react";
import { MemberContextType, MemberProviderProps } from "../types";
import useSelectMembershipStatuses from "../hooks/useSelectMembershipStatuses";
import Loading from "@/components/loading/Loading";

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context)
    throw new Error("useMemberContext must be used within a MemberProvider");
  return context;
};

export function MemberProvider({ children }: MemberProviderProps) {
  const {membershipStatuses} = useSelectMembershipStatuses();

  if(!membershipStatuses) return <Loading></Loading>


  return <MemberContext.Provider value={{
    membershipStatuses
  }}>{children}</MemberContext.Provider>;
}
