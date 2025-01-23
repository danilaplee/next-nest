'use client';

import { getServerEnv } from "./getServerEnv";

export let dynamicConfig: undefined | Awaited<ReturnType<typeof getServerEnv>> = undefined
getServerEnv().then((c)=>{
  dynamicConfig = c
})