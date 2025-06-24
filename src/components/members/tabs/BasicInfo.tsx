import { Box, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Form from "@components/members/form/form";
import { useFormReducer } from "@/components/custom-hooks/useFormReducer";
import { memberValidation } from "@/lib/zod/input/createMember";
import { useFieldValidator } from "@/components/custom-hooks/validators";
import { NormalizedUpdateMemberForm } from "@components/members/types";
import { useUpdateMember } from "@/components/members/hooks/useUpdateMember";
import { parse } from "date-fns/parse";
import { format } from "date-fns";
import { useLanguageContext } from "@/components/context/LanguageContext";
import { AutoCloseAlert } from "@/components/alert/AutoCloseAlert";

export default function BasicInfo({
  initialFormState,
}: {
  initialFormState: NormalizedUpdateMemberForm;
}) {
  const { setField, formState, resetFormState } = useFormReducer(initialFormState);
  const { errorState, validateField } = useFieldValidator(
    initialFormState,
    memberValidation
  );
  const { submit, isLoading, message, severity, end } = useUpdateMember();
  const languageContext = useLanguageContext();
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    if (message !== "") {
      setOpenAlert(true);
    }
  }, [end, message]);

  useEffect(() => {
    resetFormState(initialFormState);
  }, [initialFormState,resetFormState]);

  return (
    <React.Fragment>
      <Paper
        component="form"
        sx={{ padding: "1rem", width: "50%", margin: "auto" }}
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);

          const date_of_joining = form.get("date_of_joining");
          if (typeof date_of_joining === "string") {
            const parsed = parse(date_of_joining, "dd. MM. yyyy", new Date());
            form.set("date_of_joining", format(parsed, "yyyy-MM-dd"));
          }

          const date_of_birth = form.get("date_of_birth");
          if (typeof date_of_birth === "string" && date_of_birth !== "") {
            const parsed = parse(date_of_birth, "dd. MM. yyyy", new Date());
            form.set("date_of_birth", format(parsed, "yyyy-MM-dd"));
          }

          form.set("script_id", String(languageContext.scriptId));

          await submit(form);
        }}
      >
        <Form
          manageMemberProps={{
            formState,
            errorState,
            setField,
            validateField,
            action: "update",
          }}
        ></Form>
        <Box sx={{ display: "flex", marginTop: "1rem", gap: "0.5rem" }}>
          <Box sx={{ width: "80%", padding: "0" }}>
            <AutoCloseAlert
              open={openAlert}
              onClose={() => setOpenAlert(false)}
              message={message}
              severity={severity}
              autoHideDuration={3000}
            />
          </Box>
          <Box
            sx={{
              width: "20%",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
        </Box>
      </Paper>
    </React.Fragment>
  );
}
