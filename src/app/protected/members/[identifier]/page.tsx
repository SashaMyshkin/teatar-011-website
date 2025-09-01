"use client";
import { MemberProvider } from "@components/members/context/MemberContext";
import MemberTabs from "@/components/members/tabs/MemberTabs";
import React from "react";
import { useParams } from "next/navigation";

export default function Home() {
  const { identifier } = useParams() as { identifier: string };
  return (
    <MemberProvider identifier={identifier}>
      <MemberTabs></MemberTabs>
    </MemberProvider>
  );
}
