"use client";

import { useFormReducer } from "@/components/custom-hooks/useFormReducer";
import { MemberProvider } from "@/components/members/context/MemberContext";
import SearchBar from "@/components/members/data-grid/SearchBar";
import Table from "@/components/members/data-grid/Table";
import { SelectMembersForm } from "@/components/members/types";
import React from "react";

const initialState: SelectMembersForm = {
  name: "",
  surname: "",
  is_public: 1,
};

export default function Members() {
  const { formState, setField } = useFormReducer(initialState);
  return (
    <React.Fragment>
      <MemberProvider>
        <SearchBar formState={formState} setField={setField}></SearchBar>
        <Table formState={formState} setField={setField}></Table>
      </MemberProvider>
    </React.Fragment>
  );
}
