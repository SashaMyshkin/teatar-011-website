import { useLanguageContext } from "@/components/context/LanguageContext";
import { debounce } from "lodash";
import React from "react";
import {
  SelectPerformancesForm,
  ViewPerformances,
} from "@/components/performances/types";
import { supabaseBrowserClient } from "@/lib/client";

export default function useSelectPerformances() {
  const [rows, setRows] = React.useState<ViewPerformances[]>([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const { language } = useLanguageContext();
  const { id: scriptId } = language;

  const debouncedFetch = React.useMemo(
    () =>
      debounce(async (formState: SelectPerformancesForm, paginationModel) => {
        setIsLoading(true);
        const { title, performance_type_uid, is_public, uid, is_active } =
          formState;
        const { page, pageSize } = paginationModel;
        const from = page * pageSize;
        const to = from + pageSize - 1;

        try {
          const query = supabaseBrowserClient
            .from("v_performances")
            .select("*", {
              count: "exact",
            });

          if (uid) query.eq("performance_uid", uid);
          if (!(title === undefined) && title !== "") query.ilike("title", `%${title}%`);
          if (!(is_public === undefined) && is_public < 2)
            query.eq("is_public", is_public);
          
          if (performance_type_uid)
            query.eq("performance_type_uid", performance_type_uid);
          query.eq("script_id", scriptId);
          query.order("is_public", { ascending: false, nullsFirst: false });
          query.order("date_of_premiere", {
            ascending: false,
            nullsFirst: false,
          });
          query.range(from, to);

          const { data, count, error } = await query;

          if (count) setRowCount(count);

          if (data) setRows(data);

          if (error)
            throw new Error(
              `${error.name}: ${error.message}; ${error.details}; ${error.cause}`
            );
        } catch (err) {
          console.log(
            "Greška prilikom preuzimanja podataka o predstavama.",
            err
          );
        } finally {
          setIsLoading(false);
        }
      }, 300),
    [scriptId]
  );

  return { debouncedFetch, isLoading, rows, rowCount };
}
