import { ApiEndpoints } from "@/config/app";
import { client } from "@/lib/directus";
import { readItems, readSingleton, readUser } from "@directus/sdk";

export async function fetchNewsData() {
  try {
    const data = await client.request(readSingleton(ApiEndpoints.NEWS));

    return data;
  } catch (error: any) {
    console.error(
      "Error fetching Events:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getAllArticles() {
  try {
    const page = await client.request(
      readItems(ApiEndpoints.ARTICLES, {
        fields: [
          "slug",
          "articleTitle",
          "articleImage",
          "blurb",
          "content",
          "status",
          "user_created",
        ],
        filter: {
          status: {
            _eq: "published",
          },
        },
      })
    );

    return page;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUsers(userIds: string[]) {
  try {
    const uniqueUserIds = [...new Set(userIds)];

    const users = await Promise.all(
      uniqueUserIds.map(async (id) => {
        try {
          const user = await client.request(
            readUser(id, { fields: ["id", "first_name", "last_name"] })
          );

          return { ...user };
        } catch (error) {
          console.error(`Error fetching user ${id}:`, error);
          return { id, first_name: "Unknown", last_name: "" };
        }
      })
    );

    // Convert to a lookup object { userId: userData }
    return users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as Record<string, any>);
  } catch (error) {
    console.error("Error fetching users:", error);
    return {};
  }
}
