"use client";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
export function BackButton() {
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <>
      <Button
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          cursor: "pointer",
          zIndex: 1000,
          // fontSize: 32
        }}
        onClick={goBack}
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        &lt; Back
      </Button>
    </>
  );
}
