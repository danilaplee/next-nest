import Gallery from "@/components/Gallery";
import StorageWrapper from "@/components/StorageWrapper";
import { API_URL } from "@/config";
import { Photos } from "pexels";

export default async function Home() {
  const homeData = (await (await fetch(API_URL + "pexels")).json()) as Photos;
  const photos = homeData?.photos;
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main>
        <StorageWrapper>
          <Gallery photos={photos} />
        </StorageWrapper>
      </main>
    </div>
  );
}
