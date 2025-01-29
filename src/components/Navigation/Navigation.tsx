import Image from "next/image";
import Link from "next/link";
import { Josefin_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const josefinSans = Josefin_Sans({
  weight: "300",
  subsets: ["latin"],
});

interface NavigationProps {
  data: any;
}

export default function Navigation(props: NavigationProps) {
  const { data } = props;

  return (
    <header className="w-full h-14 bg-[#ce1211] flex items-center p-4 shadow sticky top-0">
      <Image src="/logo.jpg" alt="" width={20} height={30} />
      <h1 className="font-bold text-xl uppercase text-white ms-4">
        This is Red Tower
      </h1>

      <div className="ms-auto">
        <nav>
          <ul
            className={cn(
              "flex gap-8 group items-center text-white mt-1",
              josefinSans.className
            )}
          >
            {data &&
              data.map((item: any, i: number) => {
                return (
                  <li
                    key={i}
                    className="uppercase text-2xl opacity-100 group-hover:opacity-30 hover:!opacity-100 transition-opacity duration-300"
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
      </div>
    </header>
  );
}
