import { ChangeProvider } from "@/components/context/ChangeContext";
import BiographyEditor from "@components/members/tabs/biography/editor/BiographyEditor";

export default function BiographyTab() {
  return (
    <ChangeProvider>
      <BiographyEditor />
    </ChangeProvider>
  );
}
