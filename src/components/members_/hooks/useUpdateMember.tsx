import { useState } from "react";
import {
  NetworkErrorCodes,
  NetworkErrorRegistry,
} from "@/lib/errors/networkError";
import { AlertColor } from "@mui/material";

export function useUpdateMember() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [success, setSuccess] = useState(false);
  const [end, setEnd] = useState(false);

  const setFeedback = (msg: string, type: AlertColor) => {
    setMessage(msg);
    setSeverity(type);
  };

  const handleServerError = async (res: Response) => {
    try {
      const data = await res.json();
      throw new Error(
        `${NetworkErrorRegistry[NetworkErrorCodes.UnprocessableRequest].message} ${data.details}`
      );
    } catch {
      throw new Error(
        NetworkErrorRegistry[NetworkErrorCodes.MalformedResponse].message
      );
    }
  };

  const submit = async (formData: FormData) => {
    setIsLoading(true);
    setEnd(false);
    setMessage("");

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    try {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED}/update-member`
      );

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      });

      if (res.status !== 200) {
        await handleServerError(res);
      }

      setSuccess(true);
      setFeedback("Podaci su uspešno izmenjeni", "success");

    } catch (err: unknown) {
      const fallback = NetworkErrorRegistry[NetworkErrorCodes.ConnectionFailure].message;
      setFeedback(err instanceof Error ? err.message : fallback, "error");
    } finally {
      setIsLoading(false);
      setEnd(true);
    }
  };

  return { submit, isLoading, message, success, severity, end };
}
