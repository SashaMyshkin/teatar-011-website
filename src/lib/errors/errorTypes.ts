import { AuthorizationErrorCodes, AuthorizationErrorRegistry } from "./authErrors";
import { ServerErrorCodes, ServerErrorRegistry } from "./serverErrors";
import { ValidationErrorCodes, ValidationErrorRegistry } from "./validationErrors";

export type AllErrorCodes =
  | AuthorizationErrorCodes
  | ValidationErrorCodes
  | ServerErrorCodes;

export const ErrorRegistry = {
  ...AuthorizationErrorRegistry,
  ...ValidationErrorRegistry,
  ...ServerErrorRegistry,
} as const;

export type ErrorRegistryType = typeof ErrorRegistry;

export type ErrorResponse<TCode extends keyof ErrorRegistryType> = {
  code: TCode;
  message: typeof ErrorRegistry[TCode]["message"];
  type: typeof ErrorRegistry[TCode]["type"];
  // HTTP status is not part of the response body — it's returned separately
};
