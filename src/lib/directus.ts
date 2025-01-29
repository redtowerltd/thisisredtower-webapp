import { BACKEND_URL } from "./globals";
import { createDirectus, rest } from "@directus/sdk";

export enum DirectusPaths {
  ASSETS = "/assets/",
}

export interface Home {
  id: number;
  seoTitle: string;
  seoDescription: string;
  seoTags: string;
  eventTagline: string;
  eventTaglineBackgroundImage: any;
  clientTagline: string;
  clientTaglineBackgroundImage: any;
}

export interface About {
  id: number;
  seoTitle: string;
  seoDescription: string;
  seoTags: string;
}

export interface Navigation {
  id: number;
  title: string;
  href: string;
  externalLink: boolean;
}

export interface Footer {
  id: number;
  copyright: string;
}

export interface HeroBanner {
  id: number;
  altText: string;
  backgroundImage: any;
  date_created: string;
}

export interface Events {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: any;
  thumbnailUrl: string;
  date_created: string;
}

export interface Clients {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: any;
  thumbnailUrl: string;
  date_created: string;
}

interface Schema {
  Home: Home;
  About: About;
  Navigation: Navigation[];
  Footer: Footer[];
  Hero_Banner: HeroBanner[];
  Events: Events[];
  Clients: Clients[];
}

export const client = createDirectus<Schema>(String(BACKEND_URL)).with(rest());
