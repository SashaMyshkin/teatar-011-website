import React from "react";
import Content from "@components/performances/tabs/roles/Content";
import Controles from "@components/performances/tabs/roles/Controles";
import { RolesProvider } from "./RolesContext";

export default function Roles() {
  return (
    <RolesProvider>
      <Controles></Controles>
      <Content></Content>
    </RolesProvider>
  );
}
