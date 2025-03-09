import { ApiEndpoints } from "@/config/app";
import { client } from "@/lib/directus";
import { readItem, readItems } from "@directus/sdk";
import { notFound } from "next/navigation";

export async function getEvents() {
  try {
    const page = await client.request(
      readItems(ApiEndpoints.EVENTS, { fields: ["*"] })
    );

    return page;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function fetchGalleries() {
  try {
    const galleryFiles = await client.request(
      readItems(ApiEndpoints.EVENT_FILES)
    );

    return galleryFiles;
  } catch (error) {
    console.error(error);
  }
}
