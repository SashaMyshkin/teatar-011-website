import { useSelectImages } from "@/components/image-manager/hooks/useSelectImages";
import { usePerformanceContext } from "@components/performances/context/PerformanceContext"
import Gallery from "@/components/image-manager/gallery/Gallery";

export default function PerformanceGallery(){
  const {performanceUid} = usePerformanceContext();
  const {imageData} = useSelectImages({entity_id:performanceUid?.id,type:"image-gallery"});

  if(!imageData) return <></>
  if(!performanceUid) return <></>


  return <Gallery images={imageData} futurePath={`performances/${performanceUid.identifier}/gallery`} entityId={performanceUid.id} />
}