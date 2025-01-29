import { notFound } from "next/navigation";
import { readItem } from "@directus/sdk";
import { ApiEndpoints } from "@/config/app";
import { client } from "@/lib/directus";

async function getEvent(slug: string) {
  try {
    const page = await client.request(readItem(ApiEndpoints.EVENTS, slug));

    return page;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export default async function EventPage({ params }: any) {
  const { slug } = params;
  const page = await getEvent(slug);

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.description }}></div>
    </div>
  );
}
