import PhotoWrapper from "@/components/PhotoWrapper";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const p = await params;
  return <PhotoWrapper photoId={p.id} />;
}
