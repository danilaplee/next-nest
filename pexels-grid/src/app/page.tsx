import Gallery from "@/components/Gallery";
import GalleryWrapper from "@/components/GalleryWrapper";
import { Photos } from "pexels";

export default async function Home() {
  const homeData = (await (
    await fetch("http://localhost:3000/pexels")
  ).json()) as Photos;
  const photos = homeData?.photos;
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main>
        <GalleryWrapper photos={photos} />
      </main>
    </div>
  );
}
