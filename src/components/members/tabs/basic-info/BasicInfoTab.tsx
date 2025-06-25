import { useParams } from "next/navigation";
import React from "react";
import { useSelectMember } from "@/components/members/hooks/useSelectMember";
import Loading from "@/components/loading/Loading";
import BasicInfoForm from "@/components/members/tabs/basic-info/BasicInfoForm";

export default function BasicInfoTab() {
  const { identifier } = useParams() as { identifier: string };
  const { memberData, loading } = useSelectMember(identifier);

  if(loading){
    return<Loading></Loading>
  }

  return memberData ? <BasicInfoForm initialFormState={memberData}/>:<>No data to display</>

}
