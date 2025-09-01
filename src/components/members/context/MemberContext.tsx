import { createContext, useContext, useEffect, useState } from "react";
import {
  MemberContextType,
  MemberProviderProps,
  MembersBiographies,
  MembersRow,
  MembersUidRow,
} from "@components/members/types";
import useSelectMembershipStatuses from "@components/members/hooks/useSelectMembershipStatuses";
import Loading from "@components/loading/Loading";
import useSelectMemberUid from "@components/members/hooks/useSelectMemberUid";
import useSelectMember from "@components/members/hooks/useSelectMember";
import useSelectParagraphs from "@components/members/hooks/useSelectParagraphs";

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context)
    throw new Error("useMemberContext must be used within a MemberProvider");
  return context;
};

export function MemberProvider({ children, identifier }: MemberProviderProps) {
  const { membershipStatuses } = useSelectMembershipStatuses();

  const { memberUidData } = useSelectMemberUid({ identifier: identifier });
  const [memberUid, setMemberUid] = useState<MembersUidRow | null>(null);

  const { memberData } = useSelectMember({ memberUid: memberUid?.id });
  const [member, setMember] = useState<MembersRow | null>(null);

    const { paragraphsData } = useSelectParagraphs({
      memberUid: memberUid?.id,
    });
    const [paragraphs, setParagraphs] = useState<MembersBiographies[] | null>(
      null
    );

  useEffect(() => {
    setMemberUid(memberUidData);
  }, [memberUidData]);

  useEffect(() => {
    setMember(memberData);
  }, [memberData]);

    useEffect(() => {
      if (paragraphsData) setParagraphs(paragraphsData);
    }, [paragraphsData]);

  if (!membershipStatuses) return <Loading></Loading>;

  return (
    <MemberContext.Provider
      value={{
        membershipStatuses,
        
        memberUid,
        setMemberUid,
        member,
        setMember,
        paragraphs,
        setParagraphs
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}
