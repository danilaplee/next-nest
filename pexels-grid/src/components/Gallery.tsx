"use client";
import Link from "next/link";
import { Photo } from "pexels";
import { useMemo, useRef } from "react";
import GalleryController from "./GalleryController";
import { useAppSelector } from "@/store/hooks";

export default function Gallery({
  photos,
  isSearch,
}: {
  photos: Photo[];
  isSearch?: true;
}) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryPhotos = useAppSelector((state) => state.gallery.galleryImages);
  const photoMerge = galleryPhotos?.length > 0 ? galleryPhotos : photos;
  return (
    <div
      className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4"
      style={{ overflow: "scroll" }}
      ref={galleryRef}
    >
      {photoMerge?.map(({ id, src }) => (
        <Link
          key={id}
          href={`/p/${id}`}
          shallow
          className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
        >
          <img
            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
            style={{ transform: "translate3d(0, 0, 0)" }}
            src={src.medium}
            width={720}
            height={480}
            sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            25vw"
          />
        </Link>
      ))}
      <GalleryController galleryRef={galleryRef} photos={photos} />
    </div>
  );
}
