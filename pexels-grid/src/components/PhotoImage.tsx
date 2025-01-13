'use client'
import { useRouter } from 'next/navigation'
import { Photo } from "pexels";
import { Button } from '@headlessui/react'
// import Link from 'next/link';

export default function PhotoImage({ photo }: { photo: Photo }) {
  const router = useRouter()
  const goBack = () => router.back()
  return <div
    className="row-start-3 flex gap-6 flex-wrap items-center justify-center"
    style={{ height: "100%", width: "100%", top: 0, left: 0, position: "fixed", backgroundColor: "rgba(0,0,0,0.7)" }}
    onClick={goBack}
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
    <div style={{
      backgroundImage: `url(${photo?.src?.large2x})`,
      height: "100%",
      width: "100%",
      position: "absolute",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundSize: "contain"
    }} />
  </div>
}