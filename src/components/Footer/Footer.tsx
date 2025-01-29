import Link from "next/link";
import { Josefin_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Facebook, Instagram } from "lucide-react";

const josefinSans = Josefin_Sans({
  weight: "300",
  subsets: ["latin"],
});

interface FooterProps {
  navData: any;
  footerData: any;
}

export default function Footer(props: FooterProps) {
  const { navData, footerData } = props;
  //  <Image src="/logo.jpg" alt="" width={20} height={30} />
  return (
    <footer className="w-full bg-[#ce1211] flex flex-col justify-center px-12 py-[8rem]">
      <div className="flex align-center justify-center text-normal text-white mb-10 gap-6">
        <Link
          className="transition-all duration-300 hover:scale-125"
          href="https://facebook.com/"
        >
          <Facebook />
        </Link>
        <Link
          className="transition-all duration-300 hover:scale-125"
          href="https://twitter.com/"
        >
          <Instagram />
        </Link>
      </div>
      <nav>
        <ul
          className={cn(
            "flex flex-col md:flex-row gap-8 group justify-center items-center text-white",
            josefinSans.className
          )}
        >
          {navData &&
            navData.map((item: any, i: number) => {
              return (
                <li
                  key={i}
                  className="uppercase text-5xl opacity-100 group-hover:opacity-30 hover:!opacity-100 transition-opacity duration-300 my-2 md:my-0"
                >
                  <Link
                    href={item.href}
                    target={item.externalLink ? "_blank" : undefined}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
      <div className="text-sm text-white text-center mt-8 uppercase">
        {footerData.copyright}
      </div>
    </footer>
  );
}
