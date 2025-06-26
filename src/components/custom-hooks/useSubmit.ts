import { useState } from "react";
import { AlertColor } from "@mui/material";
import {
  NetworkErrorCodes,
  NetworkErrorRegistry,
} from "@/lib/errors/networkError";
import { getErrorMessage } from "@/lib/errors/createErrorResponse";

export type SubmitResult<TResponse = unknown> = {
  submit: (
    payload: Record<string, any> | FormData,
    id?: number | null
  ) => Promise<void>;
  isLoading: boolean;
  message: string;
  success: boolean;
  severity: AlertColor;
  completed: boolean;
  data: TResponse | null;
};

export function useSubmit<TResponse = unknown>(
  endpoint: string,
  method: "POST" | "PUT" | "DELETE" | "GET" = "POST",
  successMessage = "The request was successfully handled by server.",
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED
): SubmitResult<TResponse> {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [success, setSuccess] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [data, setData] = useState<TResponse | null>(null);

  const submit = async (
    payload: Record<string, any> | FormData,
    id?: number | null
  ) => {
    setIsLoading(true);
    setCompleted(false);
    setMessage("");
    setSuccess(false);
    setData(null);

    try {
      const isFormData = payload instanceof FormData;
      const url = new URL(
        `${baseUrl}/${endpoint}${
          id !== null && id !== undefined ? `/${id}` : ""
        }`
      );

      const res = await fetch(url.toString(), {
        method,
        headers: isFormData
          ? undefined
          : { "Content-Type": "application/json" },
        body: isFormData ? payload : JSON.stringify(payload),
      });

      if (!res.ok) {
        let errData;
        try {
          errData = await res.json();
        } catch {
          throw new Error(
            NetworkErrorRegistry[NetworkErrorCodes.MalformedResponse].message
          );
        }

        const detailedMessage = `${
          NetworkErrorRegistry[NetworkErrorCodes.UnprocessableRequest].message
        } ${getErrorMessage(Number(errData.code))} ${errData.details || ""}`;
        throw new Error(detailedMessage.trim());
      }

      const contentType = res.headers.get("content-type");
      const isJson = contentType?.includes("application/json");
      const responseData = isJson ? await res.json() : null;

      setData(responseData);
      setSuccess(true);
      setMessage(successMessage);
      setSeverity("success");
    } catch (err: any) {
      const fallback =
        NetworkErrorRegistry[NetworkErrorCodes.ConnectionFailure].message;
      setMessage(err instanceof Error ? err.message : fallback);
      setSeverity("error");
      console.error("Submit error:", err);
    } finally {
      setIsLoading(false);
      setCompleted(true);
    }
  };

  return { submit, isLoading, message, success, severity, completed, data };
}
