//1100 - 1199 
export enum ValidationErrorCodes {
  MissingField = 1100,
  InvalidFormat = 1101,
  JSONExpected = 1102,
  IdentifierExists = 1103,
  NonExistingIdentifier = 1104
}

export const ValidationErrorRegistry = {
  [ValidationErrorCodes.MissingField]: {
    message: "Required field is missing.",
    type: "ValidationError",
    status: 400,
  },
  [ValidationErrorCodes.InvalidFormat]: {
    message: "Invalid field format.",
    type: "ValidationError",
    status: 422,
  },
  [ValidationErrorCodes.JSONExpected]: {
    message: "JSON is expected in the request body.",
    type: "ValidationError",
    status: 400,
  },
  [ValidationErrorCodes.IdentifierExists]: {
    message: "Member with this identifier already exists.",
    type: "ValidationError",
    status: 422,
  },
  [ValidationErrorCodes.NonExistingIdentifier]: {
    message: "Member with this identifier does not exist.",
    type: "ValidationError",
    status: 422,
  },
} as const;

