"use server";

import { incrementPageView, kvKeys } from "@/lib/kv";

export async function trackClaseView(slug: string): Promise<number> {
  return incrementPageView(kvKeys.clase(slug));
}

export async function trackTemaView(tema: string): Promise<number> {
  return incrementPageView(kvKeys.tema(tema));
}
