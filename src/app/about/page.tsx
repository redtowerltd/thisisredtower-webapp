import { Fragment } from "react";

//import { BACKEND_URL } from "@/lib/globals";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { fetchAboutData } from "./actions";
import { getFooter, getNavigation } from "../actions";

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
  //const aboutProps = await fetchAboutData();
  const navigationProps = await getNavigation();
  const footerProps = await getFooter();

  //const assetUrl = `${BACKEND_URL}/assets`;

  return (
    <Fragment>
      <div className="min-h-screen font-[family-name:var(--font-geist-sans)] overflow-auto relative">
        <Navigation data={navigationProps} />
        <main>About</main>
        <Footer navData={navigationProps} footerData={footerProps} />
      </div>
    </Fragment>
  );
}
