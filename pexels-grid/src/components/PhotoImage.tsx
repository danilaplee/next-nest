"use client";
import { useRouter } from "next/navigation";
import { Photo } from "pexels";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
// import Link from 'next/link';

export default function PhotoImage({ photoId }: { photoId: number }) {
  const router = useRouter();
  const goBack = () => router.back();
  const photoQuery = useQuery({
    queryKey: ["photo", photoId],
    queryFn: async () => {
      const f = await fetch("http://localhost:3000/pexels/" + photoId);
      return f.json();
    },
    retryDelay: 1000,
  });
  const photo = photoQuery.data;
  return (
    <div
      className="row-start-3 flex gap-6 flex-wrap items-center justify-center"
      style={{
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        position: "fixed",
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
      <div
        style={{
          backgroundImage: `url(${photo?.src?.large2x})`,
          height: "100%",
          width: "100%",
          position: "absolute",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
        }}
      />
    </div>
  );
}
