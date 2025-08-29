import React, { ReactNode, useEffect, useMemo, useState } from "react";
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
  const [isPublic, setIsPublic] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Add useEffect to handle state updates
  useEffect(() => {
    if (memberUidRow) {
      setIsPublic(Boolean(memberUidRow.is_public));
      setIsActive(Boolean(memberUidRow.is_active));
    }
  }, [memberUidRow]);

  // Use useMemo to optimize context value
  const contextValue = useMemo(() => ({
    member_uid: memberUidRow?.id || 0,
    identifier,
    isPublic,
    isActive,
    setIsPublic,
    setIsActive,
  }), [memberUidRow, identifier, isPublic, isActive]);

  if (loading) {
    return <Loading />;
  }

  if (memberUidRow) {
    return (
      <MemberContext.Provider value={contextValue}>
        {children}
      </MemberContext.Provider>
    );
  } else {
    return (
      <Typography color="error">
        Could not provide Member context. The member might not exist.
      </Typography>
    );
  }
}
