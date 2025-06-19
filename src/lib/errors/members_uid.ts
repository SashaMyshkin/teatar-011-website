export enum MemberUidErrorCodes {
  IdentifierConflict = -9,
}

export const ErrorMessages: Record<MemberUidErrorCodes, string> = {
  [MemberUidErrorCodes.IdentifierConflict]: "Identifier must be a unique value.",
}
