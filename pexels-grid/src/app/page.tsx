import Gallery from "@/components/Gallery";
import { Photos } from "pexels";

export default async function Home() {
  const homeData = (await (
    await fetch("http://localhost:3000/pexels")
  ).json()) as Photos;
  const photos = homeData?.photos;
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main>
        <Gallery photos={photos} />
      </main>
    </div>
  );
}
