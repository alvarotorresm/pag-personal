import { kv } from "@vercel/kv";

function isKvAvailable(): boolean {
  return (
    Boolean(process.env.KV_REST_API_URL) &&
    Boolean(process.env.KV_REST_API_TOKEN)
  );
}

export async function incrementPageView(key: string): Promise<number> {
  if (!isKvAvailable()) return 0;
  try {
    return await kv.incr(key);
  } catch {
    return 0;
  }
}

export const kvKeys = {
  clase: (slug: string) => `pageviews:clase:${slug}`,
  tema: (tema: string) => `pageviews:tema:${tema}`,
};
