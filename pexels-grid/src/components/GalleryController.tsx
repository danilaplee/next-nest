"use client";
import { API_URL } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setGallery, setVisibleRange } from "@/store/slices/gallery";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { Photo, Photos } from "pexels";
import { useCallback, useEffect, useState } from "react";

const buffer = 2000; // Add buffer for smoother lazy loading
export default function GalleryController({
  photos,
  query,
}: {
  photos: Photo[];
  query?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const page = parseInt(params.get("page") as string, 10);
  const galleryPhotos = useAppSelector((state) => state.gallery.galleryImages);
  const visibleRange = useAppSelector((state) => state.gallery.visibleRange);
  const initialDispatch = useAppSelector(
    (state) => state.gallery.initalDispatch,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (initialDispatch) return;
    console.info("set initial gallery", photos);

    dispatch(setGallery({ photos, initial: true }));
  }, [photos, initialDispatch]);
  const galleryQuery = useQuery({
    queryKey: ["gallery", page, query],
    queryFn: async () => {
      try {
        const uri = query
          ? `${API_URL}pexels/search/${query}?page=${page || 1}`
          : API_URL + "pexels/curated/" + page;
        const f = await fetch(uri);
        const d = await f.json();
        const photoFiltered =
          d?.photos?.filter(
            (p: Photo) =>
              galleryPhotos.find((i) => i.id === p.id) === undefined,
          ) || [];
        const nphotos = [...galleryPhotos, ...photoFiltered];
        console.info("update gallery", nphotos);
        dispatch(setGallery({ photos: nphotos }));
        calculateVisibleRange(true, nphotos);
        return nphotos;
      } catch (err) {
        console.error("pagination error", err);
      }
    },
    enabled: (typeof page === "number" && !isNaN(page)) || query !== undefined,
    retryDelay: 1000,
  });

  let columnWidth =
    window.innerWidth < 1536 ? window.innerWidth * 0.33 : window.innerWidth / 4;
  if (window.innerWidth < 1280) columnWidth = window.innerWidth / 2;

  if (window.innerWidth < 640) columnWidth = window.innerWidth;

  // Helper: Calculate visible range based on scroll position
  const calculateVisibleRange = (force?: boolean, nphotos?: Photos[]) => {
    const container = document.getElementsByTagName("html")[0];
    const scrollTop = container.scrollTop;
    if (!force && visibleRange.visibleEnd !== 0) {
      const topThreshold = visibleRange.visibleEnd - buffer;
      const bottomThreshold = visibleRange.offsetTop + buffer;
      // console.info({topThreshold, bottomThreshold, scrollTop})
      if (scrollTop < topThreshold) return;
      if (scrollTop < topThreshold && scrollTop > bottomThreshold) return;
    }
    const photoList =
      nphotos || (galleryPhotos.length ? galleryPhotos : photos);
    // console.info('scrollTop', scrollTop, photoList.length)
    // Find visible columns based on scroll position
    let startIndex: number | undefined = undefined;
    let endIndex = photoList.length;
    let offsetTop = 0;
    let visibleEnd = scrollTop + window.innerHeight + buffer;
    const numColumns = Math.floor(window.innerWidth / columnWidth); // At least 1 column
    const heights = Array(numColumns).fill(0); // Initialize column heights to 0
    let column = 0;
    photoList?.find((photo, index) => {
      try {
        if (!photo?.width || !photo?.height) return; // Skip invalid photos
        const aspectRatio = photo.height / photo.width;
        const height = columnWidth * aspectRatio;
        if (heights[column]) {
          heights[column].height += height;
        } else {
          heights[column] = { height };
        }
        const galleryHeight = heights[column].height;
        const startVisibleHeight = scrollTop - buffer;
        const endVisibleHeight = scrollTop + window.innerHeight + buffer;
        // console.info('visibleHeight', startVisibleHeight, endVisibleHeight)
        if (galleryHeight > startVisibleHeight && startIndex === undefined) {
          offsetTop = startVisibleHeight;
          startIndex = index;
        }
        if (galleryHeight > endVisibleHeight) {
          // console.info('endIndex', index)
          endIndex = index;
          visibleEnd = endVisibleHeight;
          return endIndex;
        }
        column++;
        if (column > numColumns - 1) column = 0;
      } catch (err) {
        console.error("error", (err as Error).message);
      }
    });
    const nvisible = {
      start: startIndex || 0,
      end: endIndex,
      offsetTop,
      visibleEnd,
    };
    // Convert column indices to photo indices
    dispatch(setVisibleRange(nvisible));
    return nvisible;
  };

  useEffect(() => {
    const scrollable = document.getElementsByTagName("html")[0];
    const listener = () => {
      const height = scrollable?.scrollHeight;
      const top = scrollable?.scrollTop;
      const photoList = galleryPhotos.length ? galleryPhotos : photos;
      const visible = calculateVisibleRange();
      if (
        height - window.innerHeight * 2 < top &&
        !galleryQuery.isLoading &&
        !galleryQuery.isError &&
        visible?.end === photoList.length
      ) {
        const nextPage =
          typeof page === "number" && !isNaN(page) ? page + 1 : "2";
        router.push("?page=" + nextPage, { scroll: false });
      }
    };
    calculateVisibleRange();
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [
    page,
    galleryQuery.isLoading,
    galleryQuery.isError,
    router,
    calculateVisibleRange,
    galleryPhotos,
    visibleRange,
    photos,
  ]);

  return <></>;
}
