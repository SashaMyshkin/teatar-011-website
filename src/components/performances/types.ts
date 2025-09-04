import { Database } from "@/lib/database.t";
import { SetFieldFunction } from "@components/custom-hooks/useFormReducer";
import {
  ErrorState,
  ValidateFieldFunction,
} from "@components/custom-hooks/validators";

//DB types
export type PerformancesTypesRow =
  Database["public"]["Tables"]["performances_types"]["Row"];

export type ViewPerformances =
  Database["public"]["Views"]["v_performances"]["Row"];

export type TablePerformancesUID =
  Database["public"]["Tables"]["performances_uid"]["Row"];

export type TablePerformances =
  Database["public"]["Tables"]["performances"]["Row"];

export type BasicInfoForm = Pick<
  TablePerformancesUID,
  "identifier" | "date_of_premiere" | "performance_type_uid"
> &
  Pick<TablePerformances, "title" | "slogan">;
export type TablePerformancesAbout =
  Database["public"]["Tables"]["performances_about"]["Row"];
export type RolesRow = Database["public"]["Views"]["v_roles"]["Row"];
export type RolesMembersRow =
  Database["public"]["Views"]["v_roles_members"]["Row"];

//Props
export type DialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export interface SelectPerformancesProps {
  formState: SelectPerformancesForm;
  setField: SetFieldFunction<SelectPerformancesForm>;
}
export interface UseSelectPerformanceUidProps {
  identifier?: string;
  id?: number;
}
export interface UseSelectPerformanceProps {
  performanceUid?: number;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface UseSelectParagraphsProps {
  performanceUid?: number;
}
export interface ParagraphCardProps {
  index: number;
  dragHandle: React.ReactNode;
}
export interface RoleMemberCardProps {
  dragHandle: React.ReactNode;
  index: number;
}
export interface RoleCardProps {
  index: number;
  dragHandle: React.ReactNode;
}
export interface UseSelectRolesProps {
  performanceId?: number;
}

//Other types
export type BasicInfoProps = {
  formState: BasicInfoForm;
  errorState: ErrorState<BasicInfoForm>;
  setField: SetFieldFunction<BasicInfoForm>;
  validateField: ValidateFieldFunction<BasicInfoForm>;
};

export interface SelectPerformancesForm {
  title?: string;
  is_public?: number;
  performance_type_uid?: number;
  uid?: number;
  is_active?: number;
}
