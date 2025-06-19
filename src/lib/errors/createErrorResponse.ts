import { ErrorRegistry, ErrorResponse } from "./errorTypes";

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
