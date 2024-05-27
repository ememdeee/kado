import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Product from "@/component/Product";

type Params = { uid: string };

async function fetchDocument(uid: string, client: any) {
  try {
    const page = await client.getByUID("page", uid);
    return { type: "page", document: page };
  } catch (e) {
    try {
      const product = await client.getByUID("product", uid);
      return { type: "product", document: product };
    } catch (e) {
      return null;
    }
  }
}
export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const result = await fetchDocument(params.uid, client);
   
    if (!result) {
      notFound();
    };
    
    const { type, document } = result;
    

  return (
    <>
      {type === "product" && <Product document={document} />}
      <SliceZone slices={document.data.slices} components={components} />
      {/* <SliceZone slices={document.data.slices} components={components}  /> */}
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const result = await fetchDocument(params.uid, client);

  if (!result) {
    notFound();
  }

  const { document } = result;

  return {
    title: document.data.meta_title,
    description: document.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page");
  const products = await client.getAllByType("product");

  return [
    ...pages.map((page) => ({ uid: page.uid })),
    ...products.map((product) => ({ uid: product.uid })),
  ];
}