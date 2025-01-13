import Gallery from "@/components/Gallery";
import StorageWrapper from "@/components/StorageWrapper";
import { API_URL } from "@/config";
import { Photos } from "pexels";

export default async function SearchResults({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const p = await params;
  const homeData = (await (
    await fetch(API_URL + "pexels/search/" + p.query)
  ).json()) as Photos;
  const photos = homeData?.photos;
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main>
        <StorageWrapper>
          <Gallery photos={photos} query={p.query} />
        </StorageWrapper>
      </main>
    </div>
  );
}
