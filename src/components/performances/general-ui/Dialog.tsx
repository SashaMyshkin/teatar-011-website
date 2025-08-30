import {
  Button,
  DialogActions,
  DialogContent,
  Dialog as DialogOriginal,
  DialogTitle,
} from "@mui/material";
import {
  BasicInfoForm as BasicInfoFormProps,
  DialogProps,
} from "@components/performances/types";
import BasicInfoForm from "@components/performances/forms/BasicInfoForm";
import { useFormReducer } from "@/components/custom-hooks/useFormReducer";
import { useFieldValidator } from "@/components/custom-hooks/validators";
import { basicInfoFormValidation } from "@/lib/zod/performances/basic-info-form";
import { format } from "date-fns";
import { FormEvent, useState } from "react";
import { useInsertBasicInfo } from "../hooks/useInsertBasicInfo";
import { useRouter } from "next/navigation";

const initialFormState: BasicInfoFormProps = {
  title: "",
  identifier: "",
  date_of_premiere: format(new Date(), "yyyy-MM-dd"),
  performance_type_uid: 1,
  slogan: "",
};

export default function Dialog({ open, setOpen }: DialogProps) {
  const { setField, resetFormState, formState } =
    useFormReducer(initialFormState);
  const { errorState, validateField, resetErrorsState } = useFieldValidator(
    initialFormState,
    basicInfoFormValidation
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
    router.push(`/protected/performances/${formState.identifier}`);
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
