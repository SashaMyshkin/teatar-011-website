"use client"

import { useFormReducer } from "@/components/custom-hooks/useFormReducer";
import { PerformanceProvider } from "@/components/performances/context/PerformanceContext";
import SearchBarPerformances from "@/components/performances/data-grid/SearchBarPerformances";
import TablePerformances from "@/components/performances/data-grid/TablePerformances";
import { SelectPerformancesForm } from "@/components/performances/types";
import React from "react";

const initialState:SelectPerformancesForm = {
  title: "",
  is_public: 1,
  performance_type_uid: 1
}

export default function Performances() {
  const {formState,setField} = useFormReducer(initialState);

  return (
    <PerformanceProvider>
      <SearchBarPerformances formState={formState} setField={setField}></SearchBarPerformances>
      <TablePerformances {...formState} ></TablePerformances>
    </PerformanceProvider>
  );
}
