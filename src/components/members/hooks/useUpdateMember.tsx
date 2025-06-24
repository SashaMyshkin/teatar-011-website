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

  const submit = async (formData: FormData) => {
    setIsLoading(true);
    setEnd(false);
    setMessage("");
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    const handleResponseMessage = (message: string, severity:AlertColor) => {
      setMessage(message);
      setSeverity(severity);
    };

    console.log(Object.fromEntries(formData.entries()))

    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED}`);
      url.pathname += "/update-member";

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      });

      if (res.status !== 200) {
        let serverResponse;
        try {
          serverResponse = await res.json();
        } catch {
          throw new Error(
            NetworkErrorRegistry[NetworkErrorCodes.MalformedResponse].message
          );
        }

        throw new Error(
          `${
            NetworkErrorRegistry[NetworkErrorCodes.UnprocessableRequest].message
          } ${serverResponse.details}`
        );
      }
      setSuccess(true);
      handleResponseMessage("Podaci su uspešno izmenjeni", "success")
    } catch (err: unknown) {
      const fallbackMsg =
        NetworkErrorRegistry[NetworkErrorCodes.ConnectionFailure].message;
      handleResponseMessage(err instanceof Error ? err.message : fallbackMsg, "error");
    } finally {
      setIsLoading(false);
    }

    setEnd(true)
  };

  
  return { submit, isLoading, message, success, severity, end };
}
