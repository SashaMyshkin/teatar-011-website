import AppBarDrawer from "@components/admin-app-bar/AppBarDrawer";
import { createClient } from "@/lib/server";
import { Body } from "@components/admin-app-bar/Body";

export default async function ProtectedMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const result = await supabase.from("scripts").select("*").neq("status", 0);
  const initialScripts = result.data;

  if (!initialScripts || initialScripts.length === 0) {
    throw new Error("No scripts found — expected at least one.");
  }

  return (
    <>
      <AppBarDrawer></AppBarDrawer>
      <Body>{children}</Body>
    </>
  );
}
