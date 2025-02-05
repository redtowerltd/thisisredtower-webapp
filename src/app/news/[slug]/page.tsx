import { notFound } from "next/navigation";
import { readItem } from "@directus/sdk";
import { ApiEndpoints } from "@/config/app";
import { client } from "@/lib/directus";

async function getArticle(slug: string) {
  try {
    const page = await client.request(readItem(ApiEndpoints.ARTICLES, slug));

    return page;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export default async function ArticlePage({ params }: any) {
  const { slug } = params;
  const page = await getArticle(slug);

  return <div>{page.articleTitle}</div>;
}
