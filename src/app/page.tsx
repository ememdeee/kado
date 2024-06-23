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
      canonical: page.data.canonical ? page.data.canonical: 'https://isikado.com/',
    },
    robots: robotsContent,
  };
}