import { ChangeProvider } from "@/components/context/ChangeContext";
import BiographyEditor from "@/components/members_/tabs/biography/editor/BiographyEditor";

export default function BiographyTab() {
  return (
    <ChangeProvider>
      <BiographyEditor />
    </ChangeProvider>
  );
}
