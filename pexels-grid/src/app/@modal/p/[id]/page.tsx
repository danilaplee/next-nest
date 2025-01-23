import PhotoImage from "@/components/PhotoImage";
import StorageWrapper from "@/components/StorageWrapper";
import { config } from "@/config";

export default async function PhotoPage({
  params,
  video,
}: {
  params: Promise<{ id: string }>;
  video?: boolean;
}) {
  const p = await params;
  const photo = await (
    await fetch(
      config.SSR_API_URL + (video ? "pexels/video/" : "pexels/") + p.id,
    )
  ).json();
  // console.info("photo", photo, {video});
  return (
    <StorageWrapper>
      <PhotoImage
        photoId={p.id}
        API_URL={config.API_URL}
        photo={photo}
        video={video}
      />
    </StorageWrapper>
  );
}
