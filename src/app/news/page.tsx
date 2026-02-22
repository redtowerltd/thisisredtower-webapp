import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { BACKEND_URL } from "@/lib/globals";

import { fetchNewsData, fetchUsers, fetchAllArticles } from "./actions";
import { getFooter, getNavigation } from "../actions";
import ParallaxCta from "@/components/ParallaxCta/ParallaxCta";

export async function generateMetadata() {
  const news = await fetchNewsData();

  return {
    title: news.seoTitle,
    description: news.seoDescription,
    keywords: news.seoTags,
    openGraph: {
      title: news.seoTitle,
      description: news.seoDescription,
    },
  };
}

export default async function NewsListPage() {
  const newsProps = await fetchNewsData();
  const articles = await fetchAllArticles();
  const navigationProps = await getNavigation();
  const footerProps = await getFooter();

  const userIds =
    (articles && articles.map((article) => article.user_created)) || [];
  const users = await fetchUsers(userIds);

  const assetUrl = `${BACKEND_URL}/assets`;

  return (
    <Fragment>
      <Navigation data={navigationProps} />
      <main>
        <ParallaxCta
          backgroundImage={`${BACKEND_URL}/assets/${newsProps.heroImage}`}
          text={newsProps.title}
        />
        <section>{newsProps && <p>{newsProps.description}</p>}</section>
        <section>
          <div className="container px-5 py-24 mx-auto max-w-7xl">
            <div className="flex flex-wrap -m-4">
              {articles && articles.length > 0 ? (
                articles.map((item: any, i: number) => {
                  const author = users[item.user_created];

                  return (
                    <div key={i} className="xl:w-1/3 md:w-1/2 p-4">
                      <div className="text-white bg-[#ce1211] p-6">
                        <Link href={`/news/${item.slug}`}>
                          <Image
                            className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 w-full object-cover object-center mb-6 hover:scale-120"
                            src={`${assetUrl}/${item.articleImage}`}
                            width={500}
                            height={500}
                            alt={item.articleTitle}
                          />
                          <h2 className="text-2xl font-semibold title-font mb-4 uppercase">
                            {item.articleTitle}
                          </h2>
                          <p className="text-sm italic mb-2">
                            By {author?.first_name ?? "Unknown"}{" "}
                            {author?.last_name ?? ""}
                          </p>
                          <p className="leading-relaxed text-base">
                            {item.blurb}
                          </p>
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-4xl text-white text-center p-8">
                  No Articles
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer navData={navigationProps} footerData={footerProps} />
    </Fragment>
  );
}
