import Gallery from "@/components/Gallery";
import Link from "next/link";
import { Photos } from "pexels";

export default async function Home({
  params,
}: {
  params: Promise<{ page: number }>;
}) {
  const p = await params;
  const page = p.page;
  const urlPath = page && page > 1 ? "pexels/curated/" + page : "pexels";
  const homeQuery = (await (
    await fetch("http://localhost:3000/" + urlPath)
  ).json()) as Photos;
  const photos = homeQuery?.photos;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
      <main className="">
        <Gallery photos={photos} />
      </main>
    </div>
  );
}
