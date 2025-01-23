import Gallery from "@/components/Gallery";
import StorageWrapper from "@/components/StorageWrapper";
import { config } from "@/config";
import { Videos } from "pexels";

export default async function SearchResults({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const p = await params;
  const homeData = (await (
    await fetch(config.SSR_API_URL + "pexels/videos/search/" + p.query)
  ).json()) as Videos;
  const photos = homeData?.videos;
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main>
        <StorageWrapper>
          <Gallery photos={photos} query={p.query} video={true} />
        </StorageWrapper>
      </main>
    </div>
  );
}
