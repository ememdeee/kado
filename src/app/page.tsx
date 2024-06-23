import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  let robotsContent;
  if (page.data.index === "No Index") {
    robotsContent = "noindex";
  } else {
    robotsContent = "index";
  }

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    alternates: {
      canonical: page.data.canonical ? page.data.canonical: 'https://isikado.com',
    },
    robots: robotsContent,
    icons: {
      icon: [
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icon.ico', sizes: 'any', type: 'image/x-icon' },
      ],
      apple: '/apple-touch-icon.png',
      other: [
        { rel: 'manifest', url: '/site.webmanifest' },
        { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' },
      ]
    },
    applicationName: "Isi Kado", // Optional: to specify the app name
  };
}