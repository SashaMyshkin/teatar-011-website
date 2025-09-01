"use client"
import { MemberProvider } from "@/components/members_/MembersContext";
import MemberTabs from "@/components/members_/tabs/MemberTabs";
import React from "react";

export default function Home() {
  return (
    <MemberProvider>
      <MemberTabs></MemberTabs>
    </MemberProvider>
  );
}
