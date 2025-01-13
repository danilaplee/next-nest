import Gallery from "@/components/Gallery";
import StorageWrapper from "@/components/StorageWrapper";
import GalleryWrapper from "@/components/StorageWrapper";
import { Photos } from "pexels";

export default async function SearchResults({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const p = await params;
  const homeData = (await (
    await fetch("http://localhost:3000/pexels/search/" + p.query)
  ).json()) as Photos;
  const photos = homeData?.photos;
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main>
        <StorageWrapper>
          <Gallery photos={photos} isSearch={true} />
        </StorageWrapper>
      </main>
    </div>
  );
}
