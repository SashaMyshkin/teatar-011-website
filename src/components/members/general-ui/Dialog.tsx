import {
  Button,
  DialogActions,
  DialogContent,
  Dialog as DialogOriginal,
  DialogTitle,
} from "@mui/material";
import { DialogProps } from "@components/members/types";
import BasicInfoForm from "@components/members/forms/BasicInfoForm";
import { useFormReducer } from "@/components/custom-hooks/useFormReducer";
import { useFieldValidator } from "@/components/custom-hooks/validators";
import { format } from "date-fns";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BasicInfoFormFields } from "../types";
import { memberValidation } from "@/lib/zod/input/createMember";
import { useInsertBasicInfo } from "../hooks/useInsertBasicInfo";

const initialFormState: BasicInfoFormFields = {
  name: "",
  surname: "",
  motto: "",
  identifier: "",
  date_of_joining: format(new Date(), "yyyy-MM-dd"),
  date_of_birth: format(new Date(), "yyyy-MM-dd"),
  membership_status_uid: 5,
  email: "",
};

export default function Dialog({ open, setOpen }: DialogProps) {
  const { setField, resetFormState, formState } =
    useFormReducer(initialFormState);
  const { errorState, validateField, resetErrorsState } = useFieldValidator(
    initialFormState,
    memberValidation
  );
  const [submitting, setSubmitting] = useState(false);
  const submitForm = useInsertBasicInfo();
  const router = useRouter();

  const handleClose = () => {
    resetErrorsState();
    resetFormState(initialFormState);
    setOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await submitForm(formState)
    router.push(`/protected/members/${formState.identifier}`);
  };

  return (
    <DialogOriginal
      open={open}
      disableRestoreFocus
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit,
        },
      }}
      sx={{zIndex:102}}
    >
      <DialogTitle>Osnovni podaci</DialogTitle>
      <DialogContent>
        <BasicInfoForm
          formState={formState}
          errorState={errorState}
          setField={setField}
          validateField={validateField}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Zatvori</Button>
        <Button type="submit" variant="contained" loading={submitting}>
          Unesi
        </Button>
      </DialogActions>
    </DialogOriginal>
  );
}
