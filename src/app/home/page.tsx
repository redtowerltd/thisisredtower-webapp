import { Fragment } from "react";

import {
  fetchHomeData,
  getAllClients,
  getAllEvents,
  getAllHeroBanner,
  getNavigation,
} from "../actions";

import ParallaxCta from "@/components/ParallaxCta/ParallaxCta";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import Navigation from "@/components/Navigation/Navigation";
import EventsGrid from "@/components/EventsGrid/EventsGrid";
import { BACKEND_URL } from "@/lib/globals";
import ClientGrid from "@/components/ClientGrid/ClientGrid";

export async function generateMetadata() {
  const home = await fetchHomeData();

  return {
    title: home.seoTitle,
    description: home.seoDescription,
    keywords: home.seoTags,
    openGraph: {
      title: home.seoTitle,
      description: home.seoDescription,
    },
  };
}

export default async function Home() {
  const homeProps = await fetchHomeData();
  const navigationProps = await getNavigation();
  const heroBannerProps = await getAllHeroBanner();
  const eventsProps = await getAllEvents();
  const clientProps = await getAllClients();

  const assetUrl = `${BACKEND_URL}/assets`;

  return (
    <Fragment>
      <div className="min-h-screen font-[family-name:var(--font-geist-sans)] overflow-auto relative">
        <Navigation data={navigationProps} />
        <main>
          <HeroBanner data={heroBannerProps} assetUrl={assetUrl} />

          {/* EVENTS GRID */}
          <ParallaxCta
            backgroundImage={`${BACKEND_URL}/assets/${homeProps.eventTaglineBackgroundImage}`}
            text={homeProps.eventTagline}
          />
          {eventsProps && eventsProps.length > 0 ? (
            <EventsGrid data={eventsProps} assetUrl={assetUrl} />
          ) : (
            <div className="text-4xl text-center p-8">No Events</div>
          )}

          {/* CLIENTS GRID */}
          <ParallaxCta
            backgroundImage={`${BACKEND_URL}/assets/${homeProps.clientTaglineBackgroundImage}`}
            text={homeProps.clientTagline}
          />
          {clientProps && clientProps.length > 0 ? (
            <ClientGrid data={clientProps} assetUrl={assetUrl} />
          ) : (
            <div className="text-4xl text-center p-8">No Clients</div>
          )}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          Footer here
        </footer>
      </div>
    </Fragment>
  );
}
