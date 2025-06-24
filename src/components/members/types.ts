import { ErrorState, ValidateFieldFunction } from "@components/custom-hooks/validators";
import { SetFieldFunction } from "@components/custom-hooks/useFormReducer";
import { Database } from "@/lib/database.t";

export type DialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type V_members = Database["public"]["Views"]["v_members"]["Row"];
type MembersUID = Database["public"]["Tables"]["members_uid"]["Insert"];
type Members = Database["public"]["Tables"]["members"]["Insert"];
type Members_uid_join_members = MembersUID & Members

export type UpdateMemberForm = Pick<
  V_members,
  | "name"
  | "surname"
  | "identifier"
  | "date_of_joining"
  | "date_of_birth"
  | "membership_status_uid"
  | "motto"
  | "email"
>;

export type InsertMemberForm = Pick<
  Members_uid_join_members,
  | "name"
  | "surname"
  | "identifier"
  | "date_of_joining"
  | "membership_status_uid"
 
>;

type ManageInsertProps = {
  action: "insert"
  formState: InsertMemberForm
  errorState: ErrorState<InsertMemberForm>
  setField: SetFieldFunction<InsertMemberForm>
  validateField: ValidateFieldFunction<InsertMemberForm>
}

type ManageUpdateProps = {
  action: "update"
  formState: UpdateMemberForm
  errorState: ErrorState<UpdateMemberForm>
  setField: SetFieldFunction<UpdateMemberForm>
  validateField: ValidateFieldFunction<UpdateMemberForm>
}

export type ManageMemberProps = ManageInsertProps | ManageUpdateProps;