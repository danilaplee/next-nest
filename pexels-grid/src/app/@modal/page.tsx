import { Button } from "@headlessui/react";
import Link from "next/link";

export default function DefaultModal() {
  return <>
    <div style={{position:"fixed", top:20, left:20, fontSize:32}}>
      <Link href="/search">Search</Link>
    </div>
  </>
}