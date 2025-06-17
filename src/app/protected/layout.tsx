import DrawerNavBarAdmin from "@/components/NavBarDrawerAdmin";
import ScriptContextWrapper from "@/lib/context/ScriptContextWrapper";
import { createClient } from "@/lib/server";
export default async function BlogLayout({
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
      <DrawerNavBarAdmin></DrawerNavBarAdmin>
      <ScriptContextWrapper initialScripts={initialScripts}>
        {children}
      </ScriptContextWrapper>
    </>
  );
}
