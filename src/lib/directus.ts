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
  heroImage: string;
  title: string;
  description: string;
}

export interface Staff {
  id: number;
  status: string;
  name: string;
  job: string;
  bio: string;
  photo: any;
}

export interface Navigation {
  id: number;
  title: string;
  href: string;
  externalLink: boolean;
}

export interface News {
  id: number;
  seoTitle: string;
  seoDescription: string;
  seoTags: string;
  title: string;
  description: string;
  heroImage: string;
}

export interface Footer {
  id: number;
  copyright: string;
}

export interface HeroBanner {
  id: number;
  title: string;
  hideTitle: boolean;
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
  gallery: any[];
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

export interface Articles {
  id: number;
  status: string;
  slug: string;
  articleTitle: string;
  articleImage: any;
  blurb: string;
  content: string;
  user_created: string;
  date_created: string;
}

interface Schema {
  Home: Home;
  About: About;
  Staff_Profiles: Staff[];
  Navigation: Navigation[];
  Footer: Footer[];
  Articles: Articles[];
  Hero_Banner: HeroBanner[];
  Events: Events[];
  Events_files_1: any[];
  Clients: Clients[];
  News: News;
}

export const client = createDirectus<Schema>(String(BACKEND_URL)).with(rest());
