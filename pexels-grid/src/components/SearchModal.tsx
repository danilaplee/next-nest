"use client";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
} from "@headlessui/react";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setQuery, setSearchState } from "@/store/slices/search";
import { useRef } from "react";
export function SearchModal() {
  const router = useRouter();
  const goBack = () => router.back();
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.query);
  const searchState = useAppSelector((state) => state.search.searchState);
  const doSearch = async () => {
    if (typeof searchQuery === "string") {
      router.push("/search/" + encodeURIComponent(searchQuery));
      dispatch(setSearchState("loaded"));
    }
  };
  const dialogRef = useRef<HTMLElement | null>(null);
  if (searchState === "loaded") return <></>;
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
    >
      <Dialog
        ref={dialogRef}
        open={true}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => dispatch(setSearchState("loaded"))}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Search Photos
              </DialogTitle>
              <Field>
                <Input
                  autoFocus={true}
                  value={searchQuery}
                  onChange={(event) =>
                    dispatch(setQuery(event.currentTarget.value))
                  }
                  placeholder="Search Query"
                  className={clsx(
                    "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  )}
                />
              </Field>
              <div className="mt-4" style={{ gap: 10, display: "flex" }}>
                <Button
                  onClick={goBack}
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  &lt; Back
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={doSearch}
                >
                  Search
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
