import { useLanguageContext } from "@/components/context/LanguageContext";
import { unwrap } from "@/lib/errors/supabaseError";
import { supabaseBrowserClient } from "@lib/client";
import { useState } from "react";
import { BasicInfoFormFields } from "@components/members/types";

export function useUpdateBasicInfo() {
  const { language } = useLanguageContext();
  const [success, setSuccess] = useState(false);

  return async (member_uid: number, basicInfo: BasicInfoFormFields) => {
    try {
      const {
        identifier,
        name,
        surname,
        motto,
        date_of_joining,
        date_of_birth,
        membership_status_uid,
        email,
      } = basicInfo;

      const uidInsertionResult = await supabaseBrowserClient
        .from("members_uid")
        .update({
          identifier,
          date_of_joining,
          date_of_birth,
          membership_status_uid,
          email,
        })
        .eq("id", member_uid);

      unwrap(uidInsertionResult);

      const res = await supabaseBrowserClient
        .from("members")
        .update({ name, surname, motto })
        .eq("member_uid", member_uid)
        .eq("script_id", language.id);

      unwrap(res);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      console.log(err);
    }

    return success;
  };
}
