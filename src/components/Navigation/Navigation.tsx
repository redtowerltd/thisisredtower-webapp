"use client";

import Image from "next/image";
import Link from "next/link";
import { Josefin_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Fragment, useState } from "react";

const josefinSans = Josefin_Sans({
  weight: "300",
  subsets: ["latin"],
});

interface NavigationProps {
  data: any;
}

export default function Navigation(props: NavigationProps) {
  const { data } = props;

  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <header className="w-full h-14 bg-[#ce1211] flex items-center p-4 shadow z-[50]">
        <Image src="/logo.jpg" width={20} height={30} alt="Red Tower Logo" />
        <h1
          className={cn(
            "!font-semibold text-xl uppercase text-white ms-4 mt-1",
            josefinSans.className
          )}
        >
          This is Red Tower
        </h1>

        <div className="hidden md:block ms-auto">
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

        <div className="block md:hidden ms-auto">
          <button className="text-white my-1" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <div
        className={cn(
          "!fixed flex flex-col md:hidden top-0 absolute bg-[#ce1211] z-[99] w-full h-full overflow-hidden transform-all duration-500",
          {
            "translate-y-full": !open,
            "-translate-y-0": open,
          }
        )}
      >
        <div className="flex w-full">
          <Image
            className="ms-2 p-3"
            src="/logo.jpg"
            width={50}
            height={15}
            alt="Red Tower Logo"
          />
          <button
            className="text-white p-8 ms-auto"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <nav className="my-auto">
          <ul
            className={cn(
              "flex flex-col gap-8 group justify-center items-center text-white mb-8",
              josefinSans.className
            )}
          >
            {data &&
              data.map((item: any, i: number) => {
                return (
                  <li
                    key={i}
                    className="uppercase text-4xl opacity-100 group-hover:opacity-30 hover:!opacity-100 transition-opacity duration-300 my-2 md:my-0"
                  >
                    <Link
                      href={item.href}
                      target={item.externalLink ? "_blank" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
    </Fragment>
  );
}
