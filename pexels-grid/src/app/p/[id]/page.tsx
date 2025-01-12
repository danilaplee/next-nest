import { Photo } from "pexels"


export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const p = await params
  const photo = await (await fetch('http://localhost:3000/pexels/'+p.id)).json() as Photo
  return <div 
  className="row-start-3 flex gap-6 flex-wrap items-center justify-center" 
  style={{height:"100%",width:"100%", position:"absolute"}}
  
  >
    <div style={{
      backgroundImage:`url(${photo.src.large2x})`,
      height:"100%",
      width:"100%", 
      position:"absolute",
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat", 
      backgroundAttachment:"fixed",
      backgroundSize:"contain"
    }} />
  </div>
}