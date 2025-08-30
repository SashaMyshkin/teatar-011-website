import { format } from "date-fns";
import { BasicInfoForm as BasicInfoFormType } from "@components/performances/types";
import { useFormReducer } from "@/components/custom-hooks/useFormReducer";
import { useFieldValidator } from "@/components/custom-hooks/validators";
import { useEffect, useState } from "react";
import { basicInfoFormValidation } from "@/lib/zod/performances/basic-info-form";
import { usePerformanceContext } from "../../context/PerformanceContext";
import BasicInfoForm from "../../forms/BasicInfoForm";
import { Box, Button } from "@mui/material";

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
  const { errorState, validateField, resetErrorsState } = useFieldValidator(
    initialFormState,
    basicInfoFormValidation
  );
  const [submitting, setSubmitting] = useState(false);
  const { performanceUid, performance } = usePerformanceContext();

  useEffect(() => {
    if (performanceUid && performance) {
      resetFormState({
        title: performance.title,
        identifier: performanceUid.identifier,
        date_of_premiere: format(performanceUid.date_of_premiere, "yyyy-MM-dd"),
        performance_type_uid: performanceUid.performance_type_uid,
        slogan: performance.slogan,
      });
    }
  }, [performanceUid, performance]);

  return (
    <Box sx={{ display: "flex",flexDirection:"column", justifyContent: "center", gap:"1rem", width:"25rem", margin:"auto" }} component="form">
      <BasicInfoForm
        formState={formState}
        errorState={errorState}
        setField={setField}
        validateField={validateField}
      />
      { performanceUid && performance && <Button variant="contained" fullWidth>Sačuvaj</Button>}
    </Box>
  );
}
