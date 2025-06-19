//1000-1099
export enum AuthorizationErrorCodes {
  UnauthorizedRequest = 1000,
}

export const AuthorizationErrorRegistry = {
  [AuthorizationErrorCodes.UnauthorizedRequest]: {
    message: "Unauthorized request.",
    type: "AuthorizationError",
    status: 401,
  },
} as const;
