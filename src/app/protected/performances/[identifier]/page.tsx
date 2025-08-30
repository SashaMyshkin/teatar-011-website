"use client";

import { PerformanceProvider } from "@/components/performances/context/PerformanceContext";
import PerformanceTabs from "@/components/performances/tabs/PerformanceTabs";
import { useParams } from "next/navigation";

export default function Performance() {
  const { identifier } = useParams() as { identifier: string };

  return (
    <PerformanceProvider identifier={identifier}>
      <PerformanceTabs/>
    </PerformanceProvider>
  );
}
