import PhotoImage from "@/components/PhotoImage";
import { Photo } from "pexels";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const photo = (await (
    await fetch("http://localhost:3000/pexels/" + p.id)
  ).json()) as Photo;
  return <PhotoImage photo={photo} />;
}
