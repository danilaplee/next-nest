"use client";
import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import { Photo, Video } from "pexels";

export default function PhotoImage({
  photoId,
  photo: photoSSR,
  video,
  API_URL
}: {
  photoId: string;
  photo?: Photo;
  video?: boolean;
  API_URL:string;
}) {
  const router = useRouter();
  const goBack = () => router.back();
  const galleryImages = useAppSelector((state) => state.gallery.galleryImages);
  const photoQuery = useQuery({
    queryKey: ["photo", photoId],
    queryFn: async () => {
      try {
        if (photoSSR?.id) return photoSSR.id;
        const galleryImage = galleryImages?.find(
          (i) => i.id === parseInt(photoId, 10),
        );
        if (galleryImage) return galleryImage;
      } catch (err) {
        console.error("err", (err as Error)?.message || err);
      }
      const f = await fetch(API_URL + "pexels/" + photoId);
      return f.json();
    },
    retryDelay: 1000,
  });
  const photo = video ? (photoQuery.data as Video) : (photoQuery.data as Photo);
  return (
    <div
      className="row-start-3 flex gap-6 flex-wrap items-center justify-center"
      style={{
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        position: "fixed",
        zIndex: 1000000,
        cursor: "zoom-out",
        backgroundColor: "rgba(0,0,0,0.7)",
      }}
      onClick={goBack}
    >
      <Button
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          cursor: "pointer",
          zIndex: 1000,
          // fontSize: 32
        }}
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        &lt; Back
      </Button>
      {photo?.id !== undefined ? (
        <>
          {!video ? (
            <div
              style={{
                backgroundImage: `url(${(photo as Photo)?.src?.large2x})`,
                height: "100%",
                width: "100%",
                position: "absolute",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "contain",
              }}
            />
          ) : (
            <video
              src={(photo as Video)?.video_files?.[0]?.link}
              autoPlay={true}
              muted={true}
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "contain",
              }}
            />
          )}
          <div
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              padding: 10,
              borderRadius: 20,
              backgroundColor: "rgba(0,0,0,0.7)",
            }}
          >
            {!video ? (
              <h1>
                {(photo as Photo)?.alt || "Untitled"} by{" "}
                {(photo as Photo)?.photographer}
              </h1>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
