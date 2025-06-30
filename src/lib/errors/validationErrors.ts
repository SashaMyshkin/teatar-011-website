// 1100 - 1199 
export enum ValidationErrorCodes {
  MissingField = 1100,
  InvalidFormat = 1101,
  JSONExpected = 1102,
  IdentifierExists = 1103,
  NonExistingIdentifier = 1104,
  InvalidID = 1105,
  MissingParameter = 1106,
  InvalidParameterFormat = 1107,
}

export const ValidationErrorRegistry = {
  [ValidationErrorCodes.MissingField]: {
    message: "A required field is missing.",
    type: "ValidationError",
    status: 400,
  },
  [ValidationErrorCodes.InvalidFormat]: {
    message: "Invalid field format.",
    type: "ValidationError",
    status: 422,
  },
  [ValidationErrorCodes.JSONExpected]: {
    message: "A JSON object is expected in the request body.",
    type: "ValidationError",
    status: 400,
  },
  [ValidationErrorCodes.IdentifierExists]: {
    message: "A member with this identifier already exists.",
    type: "ValidationError",
    status: 422,
  },
  [ValidationErrorCodes.NonExistingIdentifier]: {
    message: "A member with this identifier does not exist.",
    type: "ValidationError",
    status: 422,
  },
  [ValidationErrorCodes.InvalidID]: {
    message: "The ID has an invalid format.",
    type: "ValidationError",
    status: 422,
  },
  [ValidationErrorCodes.MissingParameter]: {
    message: "The URL parameter is missing.",
    type: "ValidationError",
    status: 400,
  },
  [ValidationErrorCodes.InvalidParameterFormat]: {
    message: "The URL parameter has an invalid format.",
    type: "ValidationError",
    status: 400,
  },
} as const;
