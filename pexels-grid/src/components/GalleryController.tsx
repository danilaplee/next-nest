"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
// import { useRouter, } from "next/compat/router";
import { Photo } from "pexels";
import { RefObject, useEffect, useRef } from "react";

export default function GalleryController({
  galleryRef,
}: {
  galleryRef: RefObject<HTMLDivElement | null>;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const page = parseInt(params.get("page") as string, 10);
  useEffect(() => {
    const scrollable = document.getElementsByTagName("html")[0];
    const listener = () => {
      const height = scrollable?.scrollHeight;
      const top = scrollable?.scrollTop;
      if (height - window.innerHeight * 2 < top) {
        const nextPage =
          typeof page === "number" && !isNaN(page) ? page + 1 : "2";
        router.push("?page=" + nextPage, { scroll: false });
      }
    };
    window?.addEventListener("scrollend", listener);
    return () => {
      window.removeEventListener("scrollend", listener);
    };
  }, [galleryRef.current]);
  return <></>;
}
