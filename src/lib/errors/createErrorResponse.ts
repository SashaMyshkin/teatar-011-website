import { ErrorRegistry, ErrorResponse } from "@lib/errors/errorTypes";

export function createErrorResponse<TCode extends keyof typeof ErrorRegistry>(
  code: TCode
): {
  status: typeof ErrorRegistry[TCode]["status"];
  body: ErrorResponse<TCode>;
} {
  const { message, type, status } = ErrorRegistry[code];
  return {
    status,
    body: {
      code,
      message,
      type,
    },
  };
}

function isKnownErrorCode(code: number): code is keyof typeof ErrorRegistry {
  return code in ErrorRegistry;
}

export function getErrorMessage(code: number){
  return isKnownErrorCode(code) ? ErrorRegistry[code].message : "Unknown error code."
}


