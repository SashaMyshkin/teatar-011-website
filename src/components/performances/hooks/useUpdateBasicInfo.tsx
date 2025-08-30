import { useLanguageContext } from "@/components/context/LanguageContext";
import { BasicInfoForm } from "@/components/performances/types";
import { unwrap } from "@/lib/errors/supabaseError";
import { supabaseBrowserClient } from "@lib/client";
import { useState } from "react";

export function useUpdateBasicInfo() {
  const { language } = useLanguageContext();
  const [success, setSuccess] = useState(false);

  return async (performance_uid:number, basicInfo: BasicInfoForm) => {
    try {
      const {
        identifier,
        performance_type_uid,
        date_of_premiere,
        title,
        slogan,
      } = basicInfo;

      const uidInsertionResult = await supabaseBrowserClient
        .from("performances_uid")
        .update({
          identifier,
          performance_type_uid,
          date_of_premiere,
        }).eq("id", performance_uid)
        

      unwrap(uidInsertionResult);

  

      const res = await supabaseBrowserClient
        .from("performances")
        .update({slogan, title})
        .eq("performance_uid", performance_uid)
        .eq("script_id", language.id);

      unwrap(res);
      setSuccess(true)
    } catch (err) {
      setSuccess(false);
      console.log(err);
    }

    return success;
  };


}
