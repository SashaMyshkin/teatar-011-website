import { AuthorizationErrorCodes, AuthorizationErrorRegistry } from "@/lib/errors/authErrors";
import { NetworkErrorCodes, NetworkErrorRegistry } from "@/lib/errors/networkError";
import { ServerErrorCodes, ServerErrorRegistry } from "@/lib/errors/serverErrors";
import { ValidationErrorCodes, ValidationErrorRegistry } from "@/lib/errors/validationErrors";

export type AllErrorCodes =
  | AuthorizationErrorCodes
  | ValidationErrorCodes
  | ServerErrorCodes
  | NetworkErrorCodes

export const ErrorRegistry = {
  ...AuthorizationErrorRegistry,
  ...ValidationErrorRegistry,
  ...ServerErrorRegistry,
  ...NetworkErrorRegistry
} as const;

export type ErrorRegistryType = typeof ErrorRegistry;

export type ErrorResponse<TCode extends keyof ErrorRegistryType> = {
  code: TCode;
  message: typeof ErrorRegistry[TCode]["message"];
  type: typeof ErrorRegistry[TCode]["type"];
  // HTTP status is not part of the response body — it's returned separately
};
