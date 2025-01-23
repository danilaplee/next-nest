"use client";
import { SearchModal } from "@/components/SearchModal";
import StorageWrapper from "@/components/StorageWrapper";

export default function Search() {
  return (
    <StorageWrapper>
      <SearchModal video={true} />
    </StorageWrapper>
  );
}
