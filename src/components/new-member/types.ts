import { ErrorState, ValidateFieldFunction } from "@/components/custom-hooks/validators";
import { SetFieldFunction } from "@/components/custom-hooks/useFormReducer";

export type DialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MemberForm = {
  name:string
  surname:string
  identifier:string
  dateOfJoining:Date,
  membershipStatus:string
}

export type CreateMemberProps = {
  formState:MemberForm
  errorState:ErrorState<MemberForm>
  setField:SetFieldFunction<MemberForm>
  validateField:ValidateFieldFunction<MemberForm>
}
