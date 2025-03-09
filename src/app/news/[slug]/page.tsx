import { notFound } from "next/navigation";
import { readItem } from "@directus/sdk";
import { ApiEndpoints } from "@/config/app";
import { client } from "@/lib/directus";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { getNavigation, getFooter } from "@/app/actions";
import { BACKEND_URL } from "@/lib/globals";
import { fetchUsers } from "../actions";

async function getArticle(slug: string) {
  try {
    const page = await client.request(readItem(ApiEndpoints.ARTICLES, slug));
    return page;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const page = await getArticle(params.slug);
  return {
    title: page?.articleTitle || "Article",
    description: page?.blurb || "",
    keywords: page?.blurb ? page.blurb.split(" ") : [],
  };
}

export default async function ArticlePage({ params }: any) {
  const { slug } = params;
  const page = await getArticle(slug);
  const navigationProps = await getNavigation();
  const footerProps = await getFooter();

  if (!page) return notFound();

  const users = await fetchUsers([page.user_created]);
  const author = users[page.user_created];
  return (
    <div className="min-h-screen">
      <Navigation data={navigationProps} />

      {page.articleImage && (
        <div className="relative w-full h-[60vh]">
          <Image
            src={`${BACKEND_URL}/assets/${page.articleImage}`}
            alt={page.articleTitle}
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              {page.articleTitle}
            </h1>
            {page.blurb && (
              <p className="mt-4 text-lg md:text-xl max-w-2xl">{page.blurb}</p>
            )}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto py-10 px-6 bg-white shadow-lg -mt-12 relative z-10 mb-12">
        <h2 className="text-3xl font-bold mb-4">{page.articleTitle}</h2>
        <p className="text-sm italic mb-4 mt-2">
          By {author?.first_name ?? "Unknown"} {author?.last_name ?? ""}
        </p>
        <Separator className="mb-6" />
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>

      <Footer navData={navigationProps} footerData={footerProps} />
    </div>
  );
}
