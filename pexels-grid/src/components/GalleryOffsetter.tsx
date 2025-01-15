import { useAppSelector } from "@/store/hooks";

export default function GalleryOffsetter() {
  const height = useAppSelector(
    (state) => state.gallery.visibleRange.visibleStart,
  );
  return (
    <div
      style={{ width: "100%", height, display: "block", position: "relative" }}
    />
  );
}
