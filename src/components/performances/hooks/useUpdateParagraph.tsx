import { supabaseBrowserClient } from "@/lib/client";
import { unwrap } from "@/lib/errors/supabaseError";

interface UpdateParagraphProps {
  id: number;
  paragraph?: string;
  order_number?: number;
}

export default function useUpdateParagraph() {
  return async ({ id, paragraph, order_number }: UpdateParagraphProps) => {
    console.log("order_number",order_number)
    if (!(paragraph || order_number))
      throw new Error(
        "Potrebno je proslediti bar jedan parametar: paragraph ili order_number"
      );

   
      const updateData: Partial<Omit<UpdateParagraphProps, "id">> = {};
      if (paragraph !== undefined) updateData.paragraph = paragraph;
      if (order_number !== undefined) updateData.order_number = order_number;

      const result = await supabaseBrowserClient
        .from("performances_about")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      const data = unwrap(result);
      return data;
   
  };
}
