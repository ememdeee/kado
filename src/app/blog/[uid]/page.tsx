import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import ContentBody from "@/component/ContentBody";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("blog", params.uid)
    .catch(() => notFound());

  return <ContentBody page={page} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog", params.uid)
    .catch(() => notFound());

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
      canonical: page.data.canonical ? page.data.canonical: 'https://isikado.com/blog/'+params.uid,
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

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
