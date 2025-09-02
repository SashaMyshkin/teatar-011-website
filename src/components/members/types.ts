import { Database } from "@/lib/database.t";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { SetFieldFunction } from "@components/custom-hooks/useFormReducer";
import { ErrorState, ValidateFieldFunction } from "@components/custom-hooks/validators";

//DATABASE TYPES

export type MembershipStatusesRow =
  Database["public"]["Tables"]["members_membership_status"]["Row"];

export type MembersUidRow = Database["public"]["Tables"]["members_uid"]["Row"];

export type MembersRow = Database["public"]["Tables"]["members"]["Row"];

export type ViewMembers = Database["public"]["Views"]["v_members"]["Row"];

export type MembersBiographies =
  Database["public"]["Tables"]["members_biographies"]["Row"];

//Props

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


export interface ParagraphCardProps {
  index: number;
  dragHandle: React.ReactNode;
}

export type UseSelectParagraphsProps = {
  memberUid?: number;
};

export type useSelectMemberProps = {
  memberUid?: number;
};

export type UseSelectMemberUidProps = {
  id?: number;
  identifier?: string;
};

export interface MemberProviderProps {
  children: ReactNode;
  identifier?: string;
}

export type SearchBarProps = {
  formState: SelectMembersForm;
  setField: SetFieldFunction<SelectMembersForm>;
};

export type DialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type BasicInfoFormProps = {
  formState: BasicInfoFormFields;
  errorState: ErrorState<BasicInfoFormFields>;
  setField: SetFieldFunction<BasicInfoFormFields>;
  validateField: ValidateFieldFunction<BasicInfoFormFields>;
};

export type TableProps = {
  formState: SelectMembersForm;
  //setField: SetFieldFunction<SelectMembersForm>;
};

//Other types
export type MemberContextType = {
  membershipStatuses: MembershipStatusesRow[];
  memberUid: MembersUidRow | null;
  setMemberUid: Dispatch<SetStateAction<MembersUidRow | null>>;
  member: MembersRow | null;
  setMember: Dispatch<SetStateAction<MembersRow | null>>;
  paragraphs: MembersBiographies[] | null;
  setParagraphs: Dispatch<SetStateAction<MembersBiographies[] | null>>;
};

export type SelectMembersForm = {
  name?: string;
  surname?: string;
  is_public?: number;
  uid?: number;
  is_active?:number
};

export type BasicInfoFormFields = Pick<
  MembersRow,
  "name" | "surname" | "motto"
> &
  Pick<
    MembersUidRow,
    | "identifier"
    | "date_of_joining"
    | "date_of_birth"
    | "membership_status_uid"
    | "email"
  >;

export type PaginationModel = {
  page: number;
  pageSize: number;
};
