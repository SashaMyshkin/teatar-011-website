import { createClient } from "@/lib/server";



export const IdentifierCheck = {
  membersUID: {
    async CheckIfUnique(identifier: string) {
      const supabase = await createClient();
      const {count, error} = await supabase
        .from("members_uid")
        .select(undefined, { count: "exact", head: true })
        .eq("identifier", identifier);

        return {
          isUnique: count === 0,
          error
        }
    },
    /*generateIdentifier(name:string, surname:string){
      const cleanName = toBoldLatin(`${name.toLowerCase().trim()}`);
      const cleanSurname = toBoldLatin(`${surname.toLowerCase().trim()}`);
      return `${cleanName}-${cleanSurname}`;
    },*/
  },
};
