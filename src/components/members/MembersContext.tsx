import React, { ReactNode } from "react";
import { MemberContextProps } from "@components/members/types";
import { useSelectMemberByIdentifier } from "@components/members/hooks/useSelectMemberByIdentifier";
import Loading from "@components/loading/Loading";
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";

const MemberContext = React.createContext<MemberContextProps | undefined>(
  undefined
);

export const useMemberContext = () => {
  const context = React.useContext(MemberContext);
  if (!context)
    throw new Error("useMemberContext must be used within a MemberProvider");
  return context;
};

export function MemberProvider({ children }: { children: ReactNode }) {
  const { identifier } = useParams() as { identifier: string };
  const { memberUidRow, loading } = useSelectMemberByIdentifier(identifier);

  if (loading) {
    return <Loading />;
  }

  return memberUidRow ? (
    <MemberContext.Provider
      value={{
        member_uid: memberUidRow.id,
        identifier,
        isPublic: Boolean(memberUidRow.is_public),
        isActive: Boolean(memberUidRow.is_active),
      }}
    >
      {children}
    </MemberContext.Provider>
  ) : (
    <Typography color="error">
      Could not provide Member context. The member might not exist.
    </Typography>
  );
}
