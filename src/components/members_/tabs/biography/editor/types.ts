import { SubmitResult } from "@/components/custom-hooks/useSubmit"


export type BasicTextEditorProps = {
  paragraphs:Paragraph[] | null,
  manageInsert:SubmitResult
  manageUpdate:SubmitResult
  manageDelete:SubmitResult
  loading:boolean
}

export type Paragraph = {
  id:number,
  paragraph:string,
  order_number:number | null,
  script_id:number
}

export type ParagraphCardProps = {
  id: string | number;
  initialText: string;
  dragHandle?: React.ReactNode;
};