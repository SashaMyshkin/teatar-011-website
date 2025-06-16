import DrawerNavBarAdmin from "@/components/NavBarDrawerAdmin"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <><DrawerNavBarAdmin>
  </DrawerNavBarAdmin>
  <section>{children}</section>
  OVde je 2
  </>)
}