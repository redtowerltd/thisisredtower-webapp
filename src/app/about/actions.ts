import { ApiEndpoints } from "@/config/app";
import { client } from "@/lib/directus";
import { readSingleton } from "@directus/sdk";

export async function fetchAboutData() {
  try {
    const data = await client.request(readSingleton(ApiEndpoints.ABOUT));

    return data;
  } catch (error: any) {
    console.error(
      "Error fetching Events:",
      error.response?.data || error.message
    );
    throw error;
  }
}
