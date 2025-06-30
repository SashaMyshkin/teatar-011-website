// useUser.ts
import { Database } from "@/lib/database.t";
import { useEffect, useState } from "react";

type MembershipStatuses =
  Database["public"]["Tables"]["members_membership_status_uid"]["Row"];

export function useMembershipStatuses() {
  const [membershipStatuses, setMembershipStatuses] = useState<
    MembershipStatuses[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchUser() {
      setLoading(true);
      setError(null);

      try {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL_API_PROTECTED}`
        );
        url.pathname += "/members_membership_status_uid";
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        if (!isCancelled) setMembershipStatuses(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error is not an instance of an error";
        if (!isCancelled) setError(message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchUser();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { membershipStatuses, loading, error };
}
