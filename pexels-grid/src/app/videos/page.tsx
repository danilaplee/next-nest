import Gallery from "@/components/Gallery";
import StorageWrapper from "@/components/StorageWrapper";
import { config } from "@/config";
import { Videos } from "pexels";

export default async function Home() {
  const homeData = (await (
    await fetch(config.SSR_API_URL + "pexels/videos/search/cats")
  ).json()) as Videos;
  const photos = homeData?.videos;
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main>
        <StorageWrapper>
          <Gallery photos={photos} video={true} />
        </StorageWrapper>
      </main>
    </div>
  );
}
