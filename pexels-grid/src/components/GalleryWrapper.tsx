"use client";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Gallery from "./Gallery";
import { Photo } from "pexels";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

export default function GalleryWrapper({ photos }: { photos: Photo[] }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Gallery photos={photos} />
      </QueryClientProvider>
    </Provider>
  );
}
