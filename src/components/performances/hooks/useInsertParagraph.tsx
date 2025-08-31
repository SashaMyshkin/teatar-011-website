import { useLanguageContext } from "@/components/context/LanguageContext";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext";
import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";

export default function useInsertParagraph() {
  const { paragraphs, performanceUid, setParagraphs } = usePerformanceContext();
  const { language } = useLanguageContext();

  return async (newParagraph: string) => {
    if (paragraphs && performanceUid) {
      try {
        const selectResult = await supabaseBrowserClient
          .from("performances_about")
          .select("order_number")
          .eq("performance_uid", performanceUid.id)
          .eq("script_id", language.id)
          .order("order_number", { ascending: false })
          .limit(1)
          .maybeSingle();

        const max = unwrap(selectResult);

        const result = await supabaseBrowserClient
          .from("performances_about")
          .insert([
            {
              paragraph: newParagraph,
              performance_uid: performanceUid.id,
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
