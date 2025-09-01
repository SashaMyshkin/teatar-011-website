import React from "react";
import { Box, Button, Paper } from "@mui/material";
import { format, parse } from "date-fns";

import Form from "@/components/members_/form/form";
import { useFormReducer } from "@/components/custom-hooks/useFormReducer";
import { useFieldValidator } from "@/components/custom-hooks/validators";
import { useUpdateMember } from "@/components/members_/hooks/useUpdateMember";
import { useLanguageContext } from "@/components/context/LanguageContext";
import { useAlert } from "@/components/context/AlertContext";

import { NormalizedUpdateMemberForm } from "@/components/members_/types";
import { memberValidation } from "@/lib/zod/input/createMember";

type Props = {
  initialFormState: NormalizedUpdateMemberForm;
};

export default function BasicInfoForm({ initialFormState }: Props) {
  const {showAlert} = useAlert();
  const formReducer = useFormReducer(initialFormState);
  const formValidator = useFieldValidator(initialFormState, memberValidation);
  const { submit, isLoading, message, severity, } = useUpdateMember();
  const {language} = useLanguageContext();
  

  React.useEffect(() => {
    if (message !== "") {
      showAlert(message, severity);
    }
  }, [message, severity, showAlert]);

  function normalizeDateField(form: FormData, fieldName: string) {
    const dateStr = form.get(fieldName);
    if (typeof dateStr === "string" && dateStr.trim() !== "") {
      const parsedDate = parse(dateStr, "dd. MM. yyyy", new Date());
      form.set(fieldName, format(parsedDate, "yyyy-MM-dd"));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    normalizeDateField(form, "date_of_joining");
    normalizeDateField(form, "date_of_birth");

    form.set("script_id", String(language.id));

    await submit(form);
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ padding: "1rem", width: "50%", margin: "auto" }}
      elevation={0}
    >
      <Form
        manageMemberProps={{
          ...formReducer,
          ...formValidator,
          action: "update",
        }}
      />

      <Box
        sx={{
          width: "100%",
          padding: 0,
          display: "flex",
          justifyContent: "end",
          marginTop: 2,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="small"
          loading={isLoading}
        >
          Sačuvaj
        </Button>
      </Box>
    </Paper>
  );
}
