"use client";
import { API_URL } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setGallery } from "@/store/slices/gallery";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { Photo } from "pexels";
import { RefObject, useEffect } from "react";

export default function GalleryController({
  galleryRef,
  photos,
  query,
}: {
  galleryRef: RefObject<HTMLDivElement | null>;
  photos: Photo[];
  query?: string;
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
        const uri = query
          ? `${API_URL}pexels/search/${query}?page=${page}`
          : API_URL + "pexels/curated/" + page;
        const f = await fetch(uri);
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
    retryDelay: 1000,
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
        router.push("?page=" + nextPage, { scroll: false });
      }
    };
    window?.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [page, galleryQuery.isLoading, galleryQuery.isError, router]);
  return <></>;
}
