import { Fragment } from "react";
import Image from "next/image";

import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { fetchAboutData, fetchStaffData } from "./actions";
import { getFooter, getNavigation } from "../actions";
import ParallaxCta from "@/components/ParallaxCta/ParallaxCta";
import { BACKEND_URL } from "@/lib/globals";
import ParallaxStaff from "@/components/ParallaxStaff/ParallaxStaff";

export async function generateMetadata() {
  const about = await fetchAboutData();

  return {
    title: about.seoTitle,
    description: about.seoDescription,
    keywords: about.seoTags,
    openGraph: {
      title: about.seoTitle,
      description: about.seoDescription,
    },
  };
}

export default async function About() {
  const aboutProps = await fetchAboutData();
  const staffProps = await fetchStaffData();
  const navigationProps = await getNavigation();
  const footerProps = await getFooter();

  return (
    <Fragment>
      <div className="min-h-screen font-[family-name:var(--font-geist-sans)] overflow-auto relative">
        <Navigation data={navigationProps} />
        <main>
          <ParallaxCta
            backgroundImage={`${BACKEND_URL}/assets/${aboutProps.heroImage}`}
            text={aboutProps.title}
          />

          <section className="text-white">
            <div className="container mx-auto px-8 py-20 text-lg md:text-2xl">
              <p>{aboutProps.description}</p>
            </div>
          </section>

          <section className="text-white">
            <div className="container mx-auto px-8 py-20 text-lg md:text-2xl">
              <h2 className="text-6xl uppercase text-center">Meet the Team</h2>
            </div>
          </section>

          {staffProps &&
            staffProps.map((item, i) => {
              return (
                <Fragment>
                  <ParallaxStaff
                    key={i}
                    backgroundImage={`${BACKEND_URL}/assets/${item.photo}`}
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                  />
                  <section className="text-white">
                    <div className="container mx-auto px-8 py-20 text-lg">
                      <h3 className="uppercase text-5xl mb-6">{item.name}</h3>
                      {item.job && <span>{item.job}</span>}
                      <p>{item.bio}</p>
                    </div>
                  </section>
                </Fragment>
              );
            })[0]}

          <ParallaxStaff
            backgroundImage={`${BACKEND_URL}/assets/${aboutProps.heroImage}`}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
            side="right"
          />

          <section className="py-20 grid gap-14 container mx-auto">
            {staffProps &&
              staffProps.slice(1).map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-8 text-white ${
                    i % 2 === 0 ? "" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-2/6">
                    <Image
                      className="object-cover aspect-square"
                      src={`${BACKEND_URL}/assets/${item.photo}`}
                      alt={`Profile photo of staff member ${item.name}`}
                      width={800}
                      height={800}
                    />
                  </div>
                  <div className="w-4/6 text-lg">
                    <h3 className="uppercase text-5xl mb-6">{item.name}</h3>
                    {item.job && <span>{item.job}</span>}
                    <p>{item.bio}</p>
                  </div>
                </div>
              ))}
          </section>
        </main>
        <Footer navData={navigationProps} footerData={footerProps} />
      </div>
    </Fragment>
  );
}
