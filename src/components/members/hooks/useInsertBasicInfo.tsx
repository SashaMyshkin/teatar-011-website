import { useLanguageContext } from "@/components/context/LanguageContext";
import { BasicInfoFormFields } from "@/components/members/types";
import { unwrap } from "@/lib/errors/supabaseError";
import { supabaseBrowserClient } from "@lib/client";
import { useState } from "react";

export function useInsertBasicInfo() {
  const { languages, language } = useLanguageContext();
  const [success, setSuccess] = useState(false);

  return async (basicInfo: BasicInfoFormFields) => {
    try {
      const {
        identifier,
        date_of_joining,
        date_of_birth,
        membership_status_uid,
        email,
        name,
        surname,
        motto,
      } = basicInfo;

      const uidInsertionResult = await supabaseBrowserClient
        .from("members_uid")
        .insert([
          {
            identifier,
            date_of_joining,
            date_of_birth,
            membership_status_uid,
            email,
            is_public: 0,
          },
        ])
        .select()
        .single();

      const { id: member_uid } = unwrap(uidInsertionResult);

      const performanceLocals = languages.map((elem) => {
        return elem.id === language.id
          ? {
              name,
              surname,
              motto,
              script_id: elem.id,
              member_uid,
            }
          : {
              name: null,
              surname: null,
              motto: null,
              script_id: elem.id,
              member_uid,
            };
      });

      const res = await supabaseBrowserClient
        .from("members")
        .insert(performanceLocals);

      unwrap(res);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      console.log(err);
    }

    return success;
  };
}
