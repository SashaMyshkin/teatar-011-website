import { useLanguageContext } from "@/components/context/LanguageContext";
import { BasicInfoForm } from "@/components/performances/types";
import { supabaseBrowserClient } from "@lib/client";

export async function insertBasicInfo(basicInfo: BasicInfoForm) {
  const {s} = useLanguageContext()
  const { identifier, performance_type_uid, date_of_premiere } = basicInfo;
  const uidInsertionResult = await supabaseBrowserClient
    .from("performances_uid")
    .insert({
      identifier,
      performance_type_uid,
      date_of_premiere,
      is_public: 0,
    }).select().single();

    if(uidInsertionResult.error){
      return;
    }

    const performance_uid = uidInsertionResult.data.id

    
}
