// hooks/useCreateMember.ts
import { useState } from "react";
import {
  NetworkErrorCodes,
  NetworkErrorRegistry,
} from "@/lib/errors/networkError";
import {
  ValidationErrorCodes,
  ValidationErrorRegistry,
} from "@/lib/errors/validationErrors";
import { AlertProps } from "@components/alert/types";

export function useCreateMember() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setmessage] = useState<AlertProps>({
    open: false,
    severity: "info",
    message: "Processing...",
  });
  const [success, setSuccess] = useState(false);

  const submit = async (formData: FormData) => {
    setIsLoading(true);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    const handleErrorMessage = (message: string) => {
      setmessage({ open: true, severity: "error", message });
    };

    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED}`);
      url.pathname += "/create-member";

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      });

      if (res.status !== 201) {
        let serverResponse;
        try {
          serverResponse = await res.json();
        } catch {
          throw new Error(
            NetworkErrorRegistry[NetworkErrorCodes.MalformedResponse].message
          );
        }

        if (serverResponse.code === ValidationErrorCodes.IdentifierExists) {
          throw new Error(
            `${
              ValidationErrorRegistry[ValidationErrorCodes.IdentifierExists]
                .message
            }`
          );
        } else {
          throw new Error(
            `${
              NetworkErrorRegistry[NetworkErrorCodes.UnprocessableRequest]
                .message
            } ${serverResponse.details}`
          );
        }
      }
      setSuccess(true);
    } catch (err:unknown) {
      const fallbackMsg =
        NetworkErrorRegistry[NetworkErrorCodes.ConnectionFailure].message;
      handleErrorMessage(err instanceof Error ? err.message : fallbackMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, message, success };
}
