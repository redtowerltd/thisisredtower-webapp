import { Fragment } from "react";
import Navigation from "@/components/Navigation/Navigation";
import { getFooter, getNavigation } from "../actions";
import Footer from "@/components/Footer/Footer";
import { getEvents, fetchGalleries } from "./actions";
import { BACKEND_URL } from "@/lib/globals";
import Gallery from "@/components/Gallery/Gallery";

export default async function EventPage() {
  const page = await getEvents();
  const navigationProps = await getNavigation();
  const footerProps = await getFooter();
  const fetchGalleryItem = await fetchGalleries();

  const assetUrl = `${BACKEND_URL}/assets`;

  if (!fetchGalleryItem) {
    return null;
  }

  return (
    <Fragment>
      <div className="min-h-screen font-[family-name:var(--font-geist-sans)] overflow-auto relative">
        <Navigation data={navigationProps} />
        <main>
          {page.map((event, i) => {
            const eventGallery = fetchGalleryItem
              .filter((galleryItem) => event.gallery.includes(galleryItem.id))
              .map(
                (galleryItem) => `${assetUrl}/${galleryItem.directus_files_id}`
              );

            return (
              <div key={i}>
                <div className="text-white py-20">
                  <h2
                    className="text-center text-6xl mb-8 uppercase"
                    id={event.slug}
                  >
                    {event.title}
                  </h2>
                  <p className="text-center text-2xl uppercase">
                    {event.description}
                  </p>
                </div>

                <Gallery images={eventGallery} title={event.title} />
              </div>
            );
          })}
        </main>
        <Footer navData={navigationProps} footerData={footerProps} />
      </div>
    </Fragment>
  );
}
