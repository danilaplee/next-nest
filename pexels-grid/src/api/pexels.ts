import { getServerEnv } from "@/utils/getServerEnv";

export const getGallery = async (query?:string, page?:number, video?:boolean) => {
  const API_URL = (await getServerEnv()).API_URL;
  let uri = query
    ? `${API_URL}pexels/search/${query}?page=${page || 1}`
    : API_URL + "pexels/curated/" + (page || '');
  if (video) {
    uri = `${API_URL}pexels/videos/search/${query || "cats"}?page=${page || 1}`;
  }
  const f = await fetch(uri);
  const d = await f.json();
  return d
}