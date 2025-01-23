"use client";
import Link from "next/link";
import { Photo, Video } from "pexels";
import GalleryController from "./GalleryController";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function Gallery({
  photos,
  query,
  video,
}: {
  photos: Photo[] | Video[];
  query?: string;
  video?: boolean;
}) {
  const galleryPhotos = useAppSelector((state) => state.gallery.visiblePhotos);
  const offsetTop = useAppSelector(
    (state) => state.gallery.visibleRange.visibleStart,
  );
  const router = useRouter();
  return (
    <>
      {query ? (
        <div style={{ position: "fixed", top: 20, left: 20, zIndex: 10000 }}>
          <Button
            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            onClick={() => router.replace("/")}
          >
            Home
          </Button>
        </div>
      ) : null}
      <div
        className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4"
        style={{
          overflow: "scroll",
          paddingTop: offsetTop > 0 ? offsetTop : 0,
        }}
      >
        {galleryPhotos?.map((media) => (
          <Link
            key={media.id}
            href={video ? `/videos/p/${media.id}` : `/p/${media.id}`}
            shallow
            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <img
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              src={(media as Photo).src?.medium || (media as Video)?.image}
              width={720}
              height={480}
              loading="lazy"
              sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            25vw"
            />
          </Link>
        ))}
        <GalleryController video={video} photos={photos} query={query} />
      </div>
    </>
  );
}
