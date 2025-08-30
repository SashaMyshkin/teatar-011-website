import { LanguageProvider } from "@components/context/LanguageContext";
import AppBarDrawer from "@components/admin-app-bar/AppBarDrawer";
import { Body } from "@components/admin-app-bar/Body";
import { AlertProvider } from "@/components/context/AlertContext";

export default async function ProtectedMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LanguageProvider>
        <AppBarDrawer></AppBarDrawer>
        <AlertProvider>
          <Body>{children}</Body>
        </AlertProvider>
      </LanguageProvider>
    </>
  );
}
