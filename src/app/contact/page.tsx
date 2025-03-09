import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { getNavigation, getFooter } from "@/app/actions";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - Red Tower",
  description:
    "Get in touch with us at Red Tower. Reach out via email for inquiries.",
};

export default async function ContactPage() {
  const navigationProps = await getNavigation();
  const footerProps = await getFooter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation data={navigationProps} />

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 mt-4 text-center max-w-lg">
          Have a question or want to get in touch? Feel free to reach out via
          email.
        </p>

        {/* Email Link */}
        <div className="mt-6">
          <Link
            href="mailto:minal@thisisredtower.com"
            className="text-xl font-medium text-red-600 hover:underline"
          >
            minal@thisisredtower.com
          </Link>
        </div>
      </main>

      <Footer navData={navigationProps} footerData={footerProps} />
    </div>
  );
}
