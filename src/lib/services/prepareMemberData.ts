import { Database } from "@/lib/database.t";

type MemberInsert = Database["public"]["Tables"]["members"]["Insert"];
type ScriptSelect = Database["public"]["Tables"]["scripts"]["Row"];

export function generateLocalizedMemberRecords(
  data: MemberInsert,
  scripts: ScriptSelect[]
):MemberInsert[] {
  return scripts.map((script) => {
    return {
      member_uid: data.member_uid,
      name: script.id === data.script_id ? data.name : null,
      surname: script.id === data.script_id ? data.surname : null,
      motto: null,
      script_id: script.id,
    };
  });
}

export function getMemberDataFromValidationResponse (){

}
