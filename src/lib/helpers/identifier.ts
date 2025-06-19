import { createClient } from "@/lib/server";
import { toBoldLatin } from "@/lib/helpers/cyrillcLatin";



export const identifier = {
  membersUID: {
    async isUnique(identifier: string) {
      const supabase = await createClient();
      const {count} = await supabase
        .from("members_uid")
        .select(undefined, { count: "exact", head: true })
        .eq("identifier", identifier);
        return count === 0
    },
    generateIdentifier(name:string, surname:string){
      const cleanName = toBoldLatin(`${name.toLowerCase().trim()}`);
      const cleanSurname = toBoldLatin(`${surname.toLowerCase().trim()}`);
      return `${cleanName}-${cleanSurname}`;
    },
  },
};
