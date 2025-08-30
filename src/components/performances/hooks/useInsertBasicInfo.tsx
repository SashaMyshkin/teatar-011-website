import { useLanguageContext } from "@/components/context/LanguageContext";
import { BasicInfoForm } from "@/components/performances/types";
import { unwrap } from "@/lib/errors/supabaseError";
import { supabaseBrowserClient } from "@lib/client";
import { useState } from "react";

export function useInsertBasicInfo() {
  const { languages, language } = useLanguageContext();
  const [success, setSuccess] = useState(false);

  return async (basicInfo: BasicInfoForm) => {
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
        .insert([{
          identifier,
          performance_type_uid,
          date_of_premiere,
          is_public: 0,
        }])
        .select()
        .single();

      const { id: performance_uid } = unwrap(uidInsertionResult);

      const performanceLocals = languages.map((elem) => {
        return elem.id === language.id
          ? {
              title,
              slogan,
              script_id: elem.id,
              performance_uid,
            }
          : { title: null, slogan: null, script_id: elem.id, performance_uid };
      });

      const res = await supabaseBrowserClient
        .from("performances")
        .insert(performanceLocals);

      unwrap(res);
      setSuccess(true)
    } catch (err) {
      setSuccess(false);
      console.log(err);
    }

    return success;
  };


}
