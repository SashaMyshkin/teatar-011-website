import React, { FormEvent, useEffect, useState } from "react";
import BasicInfoForm from "@components/members/forms/BasicInfoForm";
import { useMemberContext } from "@components/members/context/MemberContext";
import { BasicInfoFormFields } from "@components/members/types";
import { format } from "date-fns";
import { useFormReducer } from "@/components/custom-hooks/useFormReducer";
import { useFieldValidator } from "@/components/custom-hooks/validators";
import { memberValidation } from "@/lib/zod/input/createMember";
import { Box, Button } from "@mui/material";
import _ from "lodash";
import { useUpdateBasicInfo } from "@components/members/hooks/useUpdateBasicInfo";

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

export default function BasicDataTab() {
  const { memberUid, member, setMember, setMemberUid } = useMemberContext();
  const { setField, resetFormState, formState } =
    useFormReducer(initialFormState);
  const { errorState, validateField } = useFieldValidator(
    initialFormState,
    memberValidation
  );
  const [dbState, setDbState] = useState<BasicInfoFormFields>(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const submitForm = useUpdateBasicInfo();

  useEffect(() => {
    if (memberUid && member) {
      const data = {
        name: member.name,
        surname: member.surname,
        motto: member.motto,
        identifier: memberUid.identifier,
        date_of_joining: format(memberUid.date_of_joining, "yyyy-MM-dd"), // format(new Date(), "yyyy-MM-dd"),
        date_of_birth: format(
          memberUid.date_of_birth ?? new Date(),
          "yyyy-MM-dd"
        ),
        membership_status_uid: memberUid.membership_status_uid,
        email: memberUid.email,
      };
      resetFormState(data);
      setDbState(data);
    }
  }, [memberUid, member]);

  const handleCancel = () => resetFormState(dbState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (memberUid) {
      setSubmitting(true);
      await submitForm(memberUid.id, formState);
      setMember((elem) => {
        if (!elem) return null;
        return {
          ...elem,
          name: formState.name,
          surname: formState.surname,
          motto: formState.motto,
        };
      });
      setMemberUid((elem) => {
        if (!elem) return null;
        return {
          ...elem,
          identifier: formState.identifier,
          date_of_joining: formState.date_of_joining,
          date_of_birth: formState.date_of_birth,
          membership_status_uid: formState.membership_status_uid,
          email: formState.email,
        };
      });
      setDbState(formState);
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
        width: "25rem",
        margin: "auto",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <BasicInfoForm
        formState={formState}
        errorState={errorState}
        setField={setField}
        validateField={validateField}
      />
      {memberUid && member && (
        <Box sx={{ display: "flex", gap: "0.9rem" }}>
          <Button
            variant="contained"
            fullWidth
            disabled={_.isEqual(dbState, formState)}
            color="primary"
            type="submit"
            sx={{ flexGrow: 1 }}
            loading={submitting}
          >
            Sačuvaj
          </Button>
          <Button
            variant="contained"
            fullWidth
            type="button"
            color="secondary"
            sx={{ flexGrow: 1 }}
            onClick={handleCancel}
            disabled={_.isEqual(dbState, formState)}
          >
            Otkaži
          </Button>
        </Box>
      )}
    </Box>
  );
}
