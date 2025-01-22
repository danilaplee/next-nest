
'use server';
import { config } from "@/config";
export async function getServerEnv() {
  'use server';
  return {API_URL:config.API_URL}
}