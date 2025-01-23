"use client";
import { useRouter } from "next/navigation";
import { Photo, Video } from "pexels";

export function PhotoContent({
  video,
  photo,
}: {
  video?: boolean;
  photo: Photo | Video;
}) {
  const router = useRouter();
  const goBack = () => router.back();
  if (video) {
    return (
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
        crossOrigin="anonymous"
        loop={true}
        onClick={goBack}
      />
    );
  }
  return (
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
      onClick={goBack}
    />
  );
}
