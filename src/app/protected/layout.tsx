import { LanguageProvider } from "@components/context/LanguageContext";
import AppBarDrawer from "@components/admin-app-bar/AppBarDrawer";
import { Body } from "@components/admin-app-bar/Body";
import { createClient } from "@/lib/server";
import { Typography } from "@mui/material";
import { AlertProvider } from "@/components/context/AlertContext";

export default async function ProtectedMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("scripts")
    .select("*")
    .eq("default", 1)
    .single();
  return (
    <>
      {data != null ? (
        <LanguageProvider
          languageContextProps={{
            scriptId: data.id,
            scriptDescription: data.description,
          }}
        >
          <AppBarDrawer></AppBarDrawer>
          <AlertProvider>
            <Body>{children}</Body>
          </AlertProvider>
        </LanguageProvider>
      ) : (
        <Typography>No default script. Cannot process further.</Typography>
      )}
    </>
  );
}
