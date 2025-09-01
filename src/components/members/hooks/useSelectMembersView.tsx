import { useLanguageContext } from "@/components/context/LanguageContext";
import { debounce } from "lodash";
import React, { useState } from "react";
import { supabaseBrowserClient } from "@/lib/client";
import { PaginationModel, SelectMembersForm, ViewMembers } from "@components/members/types";

export default function useSelectMembersView() {
  const [rows, setRows] = useState<ViewMembers[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguageContext();

  const debouncedFetch = React.useMemo(
    () =>
      debounce(async (formState: SelectMembersForm, paginationModel:PaginationModel) => {
        setIsLoading(true);
        const { name, surname, is_public, uid} = formState;
        const { page, pageSize } = paginationModel;
        const from = page * pageSize;
        const to = from + pageSize - 1;

        try {
          const query = supabaseBrowserClient
            .from("v_members")
            .select("*", {
              count: "exact",
            });

          if(uid) query.eq("member_uid", uid);
          if (name !== "") query.ilike("name", `%${name}%`);
          if (surname !== "") query.ilike("surname", `%${surname}%`);
          if (is_public < 2) query.eq("is_public", is_public);
          
          query.eq("script_id", language.id);
          query.order("is_public", { ascending: false, nullsFirst: false });
          query.order("date_of_joining", {
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
    [language.id]
  );

  return { debouncedFetch, isLoading, rows, rowCount };
}
