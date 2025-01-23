// "use client";
// import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import { Photo, Video } from "pexels";
import { BackButton } from "./BackButton";
import { PhotoContent } from "./PhotoContent";

export default function PhotoImage({
  photo,
  video,
}: {
  photoId: string;
  photo?: Photo | Video;
  video?: boolean;
  API_URL: string;
}) {
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
      // onClick={goBack}
    >
      <BackButton />
      {photo?.id !== undefined ? (
        <>
          <PhotoContent photo={photo} video={video} />
          <div
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              padding: 10,
              borderRadius: 20,
              // height: "100%",
              // width: "100%",
              backgroundColor: "rgba(0,0,0,0.7)",
            }}
          >
            {!video ? (
              <h1>
                {(photo as Photo)?.alt || "Untitled"} by{" "}
                {(photo as Photo)?.photographer}
              </h1>
            ) : (
              <h1>
                {"Untitled"} by {(photo as Video)?.user.name}
              </h1>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
