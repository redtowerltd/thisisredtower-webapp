import { ApiEndpoints } from "@/config/app";
import { client } from "@/lib/directus";
import { readAssetRaw, readItems } from "@directus/sdk";

export async function getNavigation() {
  try {
    const data = await client.request(
      readItems(ApiEndpoints.NAVIGATION, {
        fields: ["id", "title", "href", "externalLink"],
      })
    );

    return data;
  } catch (error: any) {
    console.error(
      "Error fetching Events:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getFooter() {
  try {
    const data = await client.request(
      readItems(ApiEndpoints.FOOTER, {
        fields: ["id", "copyright"],
      })
    );

    return data;
  } catch (error: any) {
    console.error(
      "Error fetching Events:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getAllHeroBanner() {
  try {
    const data = await client.request(
      readItems(ApiEndpoints.HERO_BANNER, {
        fields: ["id", "altText", "backgroundImage", "date_created"],
      })
    );

    return data;
  } catch (error: any) {
    console.error(
      "Error fetching Events:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getAllEvents() {
  try {
    const data = await client.request(
      readItems(ApiEndpoints.EVENTS, {
        fields: ["slug", "title", "description", "thumbnail", "date_created"],
      })
    );

    return data;
  } catch (error: any) {
    console.error(
      "Error fetching Events:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getAllClients() {
  try {
    const data = await client.request(
      readItems(ApiEndpoints.CLIENTS, {
        fields: ["slug", "title", "description", "thumbnail", "date_created"],
      })
    );

    return data;
  } catch (error: any) {
    console.error(
      "Error fetching Clients:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function fetchAssets(id: number) {
  const result = await client.request(readAssetRaw(String(id), {}));

  return result;
}
