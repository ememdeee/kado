"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ProductList from "./ProductList";
import Bounded from "@/component/Bounded";
import Heading from "@/component/Heading";
import { useSearchParams } from 'next/navigation';

/**
 * Props for `GalleryIndex`.
 */
export type GalleryIndexProps = SliceComponentProps<Content.GalleryIndexSlice>;

/**
 * Component for "GalleryIndex" Slices.
 */
const GalleryIndex = async ({ slice }: GalleryIndexProps): Promise <JSX.Element> => {
  let tags: string[] = []; //ini dari querrystring yg di kriim dari index
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  console.log(q)
  if (typeof q === 'string') {
      tags = q.split(' ');
      console.log("Query: ", tags);
    }
  const client = createClient()
  const documents = await client.getAllByEveryTag(tags) //or getAllByType('product') to get all
  const products = documents.filter(doc => doc.type === "product");

  return (
    <>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}>
          <Heading>{slice.primary.heading}</Heading>
          <PrismicRichText field={slice.primary.description} />
          <ProductList products={products as Content.ProductDocument[]} className="mt-4" />
          {/* <p>Query String List {tags.join(", ")}</p> */}
      </Bounded>
    </>
  );
};

export default GalleryIndex;