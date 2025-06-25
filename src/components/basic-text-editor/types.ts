

export type BasicTextEditorProps = {
  paragraphs:Paragraph[] | null,
  loading:boolean
}

export type Paragraph = {
  id:number,
  paragraph:string,
  order_number:number | null,
  script_id:number
}