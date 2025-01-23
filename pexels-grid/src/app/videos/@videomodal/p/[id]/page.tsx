import PhotoImage from "@/components/PhotoImage";
import StorageWrapper from "@/components/StorageWrapper";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  return (
    <StorageWrapper>
      <div>
        <PhotoImage photoId={p.id} video={true} />
      </div>
    </StorageWrapper>
  );
}
