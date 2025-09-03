"use client"
import Roles from "@/components/roles/Roles";
import { RolesProvider } from "@/components/roles/RolesContext";


export default function RolesPage() {

  return (
    <RolesProvider>
      <Roles></Roles>
    </RolesProvider>
  );
}
