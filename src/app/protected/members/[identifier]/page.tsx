"use client"
import { MemberProvider } from "@/components/members/MembersContext";
import MemberTabs from "@/components/members/tabs/MemberTabs";
import React from "react";

export default function Home() {
  return (
    <MemberProvider>
      <MemberTabs></MemberTabs>
    </MemberProvider>
  );
}
