import Alert from "@components/alert/Alert";
import { AlertProps } from "@components/alert/types";
import {
  Button,
  DialogActions,
  DialogContent,
  Dialog as DialogOriginal,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import Form from "@/components/members/form/form";
import { useCreateMember } from "@/components/members/hooks/useCreateMember";
import { memberValidation } from "@/lib/zod/input/createMember";
import { useFormReducer } from "@components/custom-hooks/useFormReducer";
import { useFieldValidator } from "@components/custom-hooks/validators";
import { DialogProps, NormalizedInsertMemberForm } from "@/components/members/types";
import { parse, format } from "date-fns";
import { useRouter } from "next/navigation";
import { useLanguageContext } from "@/components/context/LanguageContext";

const defaultAlertProps: AlertProps = {
  open: false,
  message: "",
};

export const initialFormState:NormalizedInsertMemberForm = {
  name: "",
  surname: "",
  identifier: "",
  date_of_joining: '',
  membership_status_uid: 5,
};

export default function Dialog({ dialogProps }: { dialogProps: DialogProps }) {
  const router = useRouter();
  const [alertProps, setAlertProps] =
    React.useState<AlertProps>(defaultAlertProps);
  const { submit, isLoading, message, success } = useCreateMember();
  const { setField, resetFormState, formState } =
    useFormReducer(initialFormState);
  const { errorState, validateField, resetErrorsState } = useFieldValidator(
    initialFormState,
    memberValidation
  );
  const [identifier, setIdentifier] = useState("");
  const languageContext = useLanguageContext();

  React.useEffect(() => {
    if (message.open) setAlertProps(message);
  }, [message]);

  React.useEffect(() => {
    if (success) router.push(`/protected/members/${identifier}`);
    //identifier and router added for eslint safety
  }, [success, identifier, router]);

  const handleClose = () => {
    resetErrorsState();
    resetFormState(initialFormState);
    setAlertProps(defaultAlertProps);
    dialogProps.setOpen(false);
  };

  return (
    <DialogOriginal
      disableRestoreFocus
      open={dialogProps.open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);

            const identifier = form.get("identifier");
            setIdentifier(typeof identifier === "string" ? identifier : "");

            const date_of_joining = form.get("date_of_joining");
            if (typeof date_of_joining === "string") {
              const parsed = parse(date_of_joining, "dd. MM. yyyy", new Date());
              form.set("date_of_joining", format(parsed, "yyyy-MM-dd"));
            }

            form.set("script_id", String(languageContext.scriptId));

            await submit(form);
          },
        },
      }}
    >
      <DialogTitle>Osnovni podaci</DialogTitle>
      <DialogContent>
        <Alert alertProps={alertProps}></Alert>
        <Form
          manageMemberProps={{ formState, errorState, setField, validateField, action:"insert" }}
        ></Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Zatvori</Button>
        <Button type="submit" variant="contained" loading={isLoading}>
          Unesi
        </Button>
      </DialogActions>
    </DialogOriginal>
  );
}
