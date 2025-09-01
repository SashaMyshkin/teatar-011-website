import { useLanguageContext } from "@/components/context/LanguageContext";
import { useMemberContext } from "@components/members/context/MemberContext";
import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";

export default function useInsertParagraph() {
  const { memberUid, paragraphs, setParagraphs } = useMemberContext();
  const { language } = useLanguageContext();

  return async (newParagraph: string) => {
    if (paragraphs && memberUid) {
      try {
        const selectResult = await supabaseBrowserClient
          .from("members_biographies")
          .select("order_number")
          .eq("member_uid", memberUid.id)
          .eq("script_id", language.id)
          .order("order_number", { ascending: false })
          .limit(1)
          .maybeSingle();

        const max = unwrap(selectResult);

        const result = await supabaseBrowserClient
          .from("members_biographies")
          .insert([
            {
              paragraph: newParagraph,
              member_uid: memberUid.id,
              script_id: language.id,
              order_number: max ? max.order_number + 1 : 1,
            },
          ])
          .select("*")
          .single();
        const data = unwrap(result);
        const newParagraphsState = [...paragraphs, data];
        setParagraphs(newParagraphsState);
      } catch (err) {
        console.log(err);
      }
    }
  };
}
