"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
// import { useRouter, } from "next/compat/router";
import { Photo } from "pexels";
import { useEffect, useRef } from "react";
import GalleryController from "./GalleryController";

export default function Gallery({ photos }: { photos: Photo[] }) {
  const galleryRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4"
      style={{ overflow: "scroll" }}
      ref={galleryRef}
    >
      {photos?.map(({ id, src }) => (
        <Link
          key={id}
          href={`/p/${id}`}
          // shallow
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
      <GalleryController galleryRef={galleryRef} />
    </div>
  );
}
