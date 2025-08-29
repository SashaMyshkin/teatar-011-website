import { Database } from "@/lib/database.t";
import { SetFieldFunction } from "@components/custom-hooks/useFormReducer";
import {
  ErrorState,
  ValidateFieldFunction,
} from "@components/custom-hooks/validators";

export interface SelectPerformancesForm {
  title: string;
  is_public: number;
  performance_type_uid: number;
}

export interface SelectPerformancesProps {
  formState: SelectPerformancesForm;
  setField: SetFieldFunction<SelectPerformancesForm>;
}
export type PerformanceType =
  Database["public"]["Tables"]["performances_types"]["Row"];

export type ViewPerformances =
  Database["public"]["Views"]["v_performances"]["Row"];

export type DialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TablePerformancesUID =
  Database["public"]["Tables"]["performances_uid"]["Row"];

export type TablePerformances =
  Database["public"]["Tables"]["performances"]["Row"];

export type BasicInfoForm =
  Pick<
      TablePerformancesUID,
      "identifier" | "date_of_premiere" | "performance_type_uid"
    >
  & Pick<TablePerformances, "title" | "slogan">;

export type BasicInfoProps = {
  formState: BasicInfoForm;
  errorState: ErrorState<BasicInfoForm>;
  setField: SetFieldFunction<BasicInfoForm>;
  validateField: ValidateFieldFunction<BasicInfoForm>;
};
