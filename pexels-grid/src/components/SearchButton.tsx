"use client";
import { useAppDispatch } from "@/store/hooks";
import { setGallery } from "@/store/slices/gallery";
import { setSearchState } from "@/store/slices/search";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
export default function SearchButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div style={{ position: "fixed", top: 20, left: 20 }}>
      <Button
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        onClick={() => {
          dispatch(setSearchState("init"));
          dispatch(setGallery({ photos: [] }));
          router.replace("/search");
        }}
      >
        Search
      </Button>
    </div>
  );
}
