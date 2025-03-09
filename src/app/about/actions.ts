import { ApiEndpoints } from "@/config/app";
import { client } from "@/lib/directus";
import { readItems, readSingleton } from "@directus/sdk";

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

export async function fetchStaffData() {
  try {
    const page = await client.request(
      readItems(ApiEndpoints.STAFF, {
        fields: ["name", "job", "bio", "photo"],
      })
    );

    return page;
  } catch (error) {
    console.error(error);
  }
}
