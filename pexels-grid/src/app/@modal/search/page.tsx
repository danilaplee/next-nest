'use client'
import { useRouter } from 'next/navigation'
import { Button, Description, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'

export default function SearchModal() {
  const router = useRouter()
  const goBack = () => router.back()
  return <div
    className="row-start-3 flex gap-6 flex-wrap items-center justify-center"
    style={{ height: "100%", width: "100%", top: 0, left: 0, position: "fixed", backgroundColor: "rgba(0,0,0,0.7)" }}
    // onClick={goBack}
  >
  <Button
    style={{
      position: "absolute",
      top: 20,
      left: 20,
      cursor: "pointer",
      zIndex: 1000,
      fontSize: 32
    }}
    className="rounded py-2 px-4 text-sm text-white"
  >&lt; Back</Button>
      <Dialog open={true} as="div" className="relative z-10 focus:outline-none" onClose={goBack}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Search Photos
              </DialogTitle>
              <Field>
                <Input
                  autoFocus={true}
                  placeholder='Search Query'
                  className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                  )}
                />
              </Field>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={goBack}
                >
                  Search
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
  </div>
}