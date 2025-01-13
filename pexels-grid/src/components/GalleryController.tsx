"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setGallery } from "@/store/slices/gallery";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
// import { useRouter, } from "next/compat/router";
import { Photo } from "pexels";
import { RefObject, useEffect, useRef } from "react";

export default function GalleryController({
  galleryRef,
  photos,
}: {
  galleryRef: RefObject<HTMLDivElement | null>;
  photos: Photo[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const page = parseInt(params.get("page") as string, 10);
  const galleryPhotos = useAppSelector((state) => state.gallery.galleryImages);
  const dispatch = useAppDispatch();
  const galleryQuery = useQuery({
    queryKey: ["gallery", page],
    queryFn: async () => {
      try {
        if (galleryPhotos.length === 0) {
          dispatch(setGallery({ photos }));
        }
        const f = await fetch("http://localhost:3000/pexels/curated/" + page);
        const d = await f.json();
        const photoFiltered = d?.photos?.filter(
          (p: Photo) => galleryPhotos.find((i) => i.id === p.id) === undefined,
        );
        if (photoFiltered)
          dispatch(
            setGallery({ photos: [...galleryPhotos, ...photoFiltered] }),
          );
        return d;
      } catch (err) {
        console.error("pagination error", err);
      }
    },
    enabled: typeof page === "number" && !isNaN(page),
    retryDelay(failureCount, error) {
      return 1000;
    },
  });
  useEffect(() => {
    const scrollable = document.getElementsByTagName("html")[0];
    const listener = () => {
      const height = scrollable?.scrollHeight;
      const top = scrollable?.scrollTop;
      if (
        height - window.innerHeight * 2 < top &&
        !galleryQuery.isLoading &&
        !galleryQuery.isError
      ) {
        const nextPage =
          typeof page === "number" && !isNaN(page) ? page + 1 : "2";
        console.info("next page", nextPage);
        router.push("?page=" + nextPage, { scroll: false });
        // galleryQuery.refetch();
      }
    };
    window?.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [
    galleryRef.current,
    page,
    galleryQuery.isLoading,
    galleryQuery.isError,
    router,
  ]);
  return <></>;
}
