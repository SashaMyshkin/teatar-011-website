import { Database } from "@/lib/database.t";
import { SetFieldFunction } from "@components/custom-hooks/useFormReducer"

export interface SelectPerformancesForm {
  title:string,
  is_public:number,
  performance_type_uid:number
}

export interface SelectPerformancesProps {
  formState: SelectPerformancesForm
  setField: SetFieldFunction<SelectPerformancesForm>
}
export type PerformanceType =
  Database["public"]["Tables"]["performances_types"]["Row"];

export type ViewPerformances = Database["public"]["Views"]["v_performances"]["Row"];