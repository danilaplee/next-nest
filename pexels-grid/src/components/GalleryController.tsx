"use client";
import { API_URL } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setGallery, setVisibleRange } from "@/store/slices/gallery";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { Photo } from "pexels";
import { useEffect } from "react";
const visibleBuffer = window.innerWidth > 700 ? 3000 : 1000;
const getColumnWidth = () => {
  let columnWidth =
    window.innerWidth < 1536 ? window.innerWidth * 0.33 : window.innerWidth / 4;
  if (window.innerWidth < 1280) columnWidth = window.innerWidth / 2;

  if (window.innerWidth < 640) columnWidth = window.innerWidth;
  return columnWidth;
};
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
    // console.info("set initial gallery", photos);

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
        // console.info("update gallery", nphotos);
        dispatch(setGallery({ photos: nphotos }));
        calculateVisibleRange(true, nphotos);
        return nphotos;
      } catch (err) {
        // console.error("pagination error", err);
      }
    },
    enabled: (typeof page === "number" && !isNaN(page)) || query !== undefined,
    retryDelay: 1000,
  });

  let columnWidth = getColumnWidth();

  // Helper: Calculate visible range based on scroll position
  const calculateVisibleRange = (force?: boolean, nphotos?: Photo[]) => {
    const container = document.getElementsByTagName("html")[0];
    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const maxScroll = scrollHeight - window.innerHeight;
    if (!force && visibleRange.visibleEnd !== 0 && scrollTop < maxScroll) {
      const topThreshold = visibleRange.visibleEnd - visibleBuffer * 0.2;
      const bottomThreshold = visibleRange.visibleStart;
      // console.info({scrollTop, topThreshold, bottomThreshold})
      // if (scrollTop <= topThreshold) return;
      if (scrollTop <= topThreshold && scrollTop >= bottomThreshold) return;
    }
    // console.info({ maxScroll, scrollTop, offsetTop });
    const photoList =
      nphotos || (galleryPhotos.length ? galleryPhotos : photos);
    let startIndex: number | undefined = undefined;
    let endIndex = photoList.length;
    const visibleStart = scrollTop - visibleBuffer;
    const visibleEnd = scrollTop + visibleBuffer;
    const numColumns = Math.floor(window.innerWidth / columnWidth);
    const heights = Array(numColumns).fill(0);
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
        if (galleryHeight >= visibleStart && startIndex === undefined) {
          startIndex = index;
        }
        if (galleryHeight >= visibleEnd) {
          // console.info("visibleHeight", galleryHeight, index);
          // console.info('endIndex', index)
          endIndex = index;
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
      visibleStart,
      visibleEnd,
    };
    // if (
    //   visibleRange.start !== nvisible.start ||
    //   visibleRange.end !== nvisible.end
    // ) {
    // console.info(nvisible);
    dispatch(setVisibleRange(nvisible));
    // }

    return nvisible;
  };

  useEffect(() => {
    // const container = document.getElementsByTagName("html")[0];
    // container.scrollTo({top:})
    const listener = () => {
      const photoList = galleryPhotos.length ? galleryPhotos : photos;
      const visible = calculateVisibleRange();
      if (
        !galleryQuery.isLoading &&
        !galleryQuery.isError &&
        (visible?.end as number) >= photoList.length - 10
      ) {
        const nextPage =
          typeof page === "number" && !isNaN(page) ? page + 1 : "2";
        router.push("?page=" + nextPage, { scroll: false });
      }
    };

    if (!initialDispatch) calculateVisibleRange();

    const resizeListener = () => calculateVisibleRange();
    window.addEventListener("scroll", listener);
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("scroll", listener);
      window.removeEventListener("resize", resizeListener);
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
