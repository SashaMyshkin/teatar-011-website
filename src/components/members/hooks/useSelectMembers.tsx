import { debounce } from "lodash";
import React from "react";
import { SelectMembersForm } from "@components/members/types";
import { useLanguageContext } from "@/components/context/LanguageContext";

export default function useSelectMembers() {
  const [rows, setRows] = React.useState([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const languageContext = useLanguageContext()

  const debouncedFetch = React.useMemo(
    () =>
      debounce((paginationModel, formState:SelectMembersForm) => {
        const {name, surname, is_public} = formState;
        const url = new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED}`
        );
        url.pathname += "views/members/";
        url.searchParams.set("script_id", String(languageContext.scriptId));
        url.searchParams.set("page", String(paginationModel.page));
        url.searchParams.set("pageSize", String(paginationModel.pageSize));
        if (name.length > 0) url.searchParams.set("name", name);
        if (surname.length > 0) url.searchParams.set("surname", surname);
        if (is_public !== 2) url.searchParams.set("is_public", String(is_public));

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setRows(data.rows);
            setRowCount(data.rowCount);
            setIsLoading(false);
          })
          .catch((err) => {
            setRows([]);
            setRowCount(0);
            setIsLoading(false);
            console.log(err);
          });

        setIsLoading(true);
      }, 400),
    [languageContext.scriptId] // only create once
  );

  return {debouncedFetch, isLoading, rows, rowCount}
}
