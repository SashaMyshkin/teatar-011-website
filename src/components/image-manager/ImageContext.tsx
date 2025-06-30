import { createContext, ReactNode } from "react";
import { Area } from "react-easy-crop"

type ImageContextOptions = {
  aspect_ratio:number,
  max_width:number
}

type ImageContextRelations = {
  image_id:number,
  entity_id:number,
  entity_type_id:number,
}

type ImageContextActions = {
  handleUpload:()=>void,
  handleDelete:()=>void
}

type ImageContextProps = {
  alt:string
  width:number,
  height:number,
  url:string, //from server
  path:string,
  bucket:"teatar-011",
}


type ImageContextType = {
  options: ImageContextOptions,
  relations: ImageContextRelations,
  props: ImageContextProps,
  setOptions: React.Dispatch<React.SetStateAction<ImageContextOptions>>,
  setRelations: React.Dispatch<React.SetStateAction<ImageContextRelations>>,
  setProps: React.Dispatch<React.SetStateAction<ImageContextProps>>,
  actions: ImageContextActions,
};


const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageContextProvider ({ children }: { children: ReactNode }){

}