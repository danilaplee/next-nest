import PhotoPage from "@/app/@modal/p/[id]/page";
export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <PhotoPage params={params} />;
}
