import { NormalizedUpdateMemberForm, UpdateMemberForm } from "@/components/members_/types";

export function normalizeMemberData(data: UpdateMemberForm): NormalizedUpdateMemberForm {
  return {
    name: data.name ?? "",
    surname: data.surname ?? "",
    identifier: data.identifier ?? "",
    date_of_joining: data.date_of_joining ?? "",
    date_of_birth: data.date_of_birth ?? "",
    membership_status_uid: data.membership_status_uid ?? 6,
    motto: data.motto ?? "",
    email: data.email ?? "",
  };
}
