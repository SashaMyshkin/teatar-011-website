import { format } from "date-fns";
import { BasicInfoForm as BasicInfoFormType } from "@components/performances/types";
import { useFormReducer } from "@/components/custom-hooks/useFormReducer";
import { useFieldValidator } from "@/components/custom-hooks/validators";
import { FormEvent, useEffect, useState } from "react";
import { basicInfoFormValidation } from "@/lib/zod/performances/basic-info-form";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext";
import BasicInfoForm from "@components/performances/forms/BasicInfoForm";
import { Box, Button } from "@mui/material";
import _ from "lodash";
import { useUpdateBasicInfo } from "@components/performances/hooks/useUpdateBasicInfo";

const initialFormState: BasicInfoFormType = {
  title: "",
  identifier: "",
  date_of_premiere: format(new Date(), "yyyy-MM-dd"),
  performance_type_uid: 1,
  slogan: "",
};

export default function BasicDataTab() {
  const { setField, resetFormState, formState } =
    useFormReducer(initialFormState);
  const { errorState, validateField } = useFieldValidator(
    initialFormState,
    basicInfoFormValidation
  );
  const [dbState, setDbState] = useState<BasicInfoFormType>(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const { performanceUid, performance, setPerformanceUid, setPerformance } =
    usePerformanceContext();

  const submitForm = useUpdateBasicInfo();

  useEffect(() => {
    if (performanceUid && performance) {
      const data = {
        title: performance.title,
        identifier: performanceUid.identifier,
        date_of_premiere: format(performanceUid.date_of_premiere, "yyyy-MM-dd"),
        performance_type_uid: performanceUid.performance_type_uid,
        slogan: performance.slogan,
      };
      resetFormState(data);
      setDbState(data);
    }
  }, [performanceUid, performance]);

  const handleCancel = () => resetFormState(dbState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (performanceUid) {
      setSubmitting(true);
      await submitForm(performanceUid.id, formState);
      setPerformance((elem) => {
        if (!elem) return null;
        return {
          ...elem,
          slogan: formState.slogan,
          title: formState.title,
        };
      });
      setPerformanceUid((elem) => {
        if (!elem) return null;
        return {
          ...elem,
          identifier: formState.identifier,
          date_of_premiere: formState.date_of_premiere,
          performance_type_uid: formState.performance_type_uid,
        };
      });
      //setDbState(formState);
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
      {performanceUid && performance && (
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
          >
            Otkaži
          </Button>
        </Box>
      )}
    </Box>
  );
}
