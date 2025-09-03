import Controls from "@components/roles/Controls";
import Content from "./Content";
import { useState } from "react";

export default function Roles() {
   const [performanceUid, setPerformanceUid] = useState(0);
  return (
    <>
      <Controls performanceUid={performanceUid} setPerformanceUid={setPerformanceUid}></Controls>
      <Content performanceUid={performanceUid}></Content>
    </>
  );
}
