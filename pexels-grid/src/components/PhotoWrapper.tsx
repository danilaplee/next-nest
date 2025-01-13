"use client";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PhotoImage from "./PhotoImage";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

export default function PhotoWrapper({ photoId }: { photoId: string }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PhotoImage photoId={photoId} />
      </QueryClientProvider>
    </Provider>
  );
}
