import { notFound } from "next/navigation";
import { readItem } from "@directus/sdk";
import { ApiEndpoints } from "@/config/app";
import { client } from "@/lib/directus";

async function getClients(slug: string) {
  try {
    const page = await client.request(readItem(ApiEndpoints.CLIENTS, slug));

    return page;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export default async function ClientPage({ params }: any) {
  const { slug } = params;
  const page = await getClients(slug);

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.description }}></div>
    </div>
  );
}
