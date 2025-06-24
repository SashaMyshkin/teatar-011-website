import { ErrorState, ValidateFieldFunction } from "@components/custom-hooks/validators";
import { SetFieldFunction } from "@components/custom-hooks/useFormReducer";
import { Database } from "@/lib/database.t";

export type DialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type V_members = Database["public"]["Views"]["v_members"]["Row"];

type RemoveNull<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};

/*type RemoveUndefined<T> = {
  [K in keyof T]: Exclude<T[K], undefined>;
};*/

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
  V_members,
  | "name"
  | "surname"
  | "identifier"
  | "date_of_joining"
  | "membership_status_uid"
 
>;

export type NormalizedUpdateMemberForm = RemoveNull<UpdateMemberForm>;
export type NormalizedInsertMemberForm = RemoveNull<InsertMemberForm>;

type ManageInsertProps = {
  action: "insert"
  formState: NormalizedInsertMemberForm
  errorState: ErrorState<NormalizedInsertMemberForm>
  setField: SetFieldFunction<NormalizedInsertMemberForm>
  validateField: ValidateFieldFunction<NormalizedInsertMemberForm>
}

type ManageUpdateProps = {
  action: "update"
  formState: NormalizedUpdateMemberForm
  errorState: ErrorState<NormalizedUpdateMemberForm>
  setField: SetFieldFunction<NormalizedUpdateMemberForm>
  validateField: ValidateFieldFunction<NormalizedUpdateMemberForm>
}

export type ManageMemberProps = ManageInsertProps | ManageUpdateProps;

export type SelectMembersForm = {
  name:string,
  surname:string,
  is_public:number
}

export type SelectMembersProps = {
  formState: SelectMembersForm
  setField: SetFieldFunction<SelectMembersForm>
}