// src/slices/search/index.tsx 

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ProductList from "./ProductList";
import Bounded from "@/component/Bounded";
import Heading from "@/component/Heading";

/**
 * Props for `GalleryIndex`.
 */
export type GalleryIndexProps = SliceComponentProps<Content.GalleryIndexSlice> & {
  tags?: string[];
};

/**
 * Component for "GalleryIndex" Slices.
 */
const GalleryIndex = async ({ slice, tags=[] }: GalleryIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const products = await client.getAllByEveryTag(tags);

  return (
    <>
      <Bounded>
        <Heading>heading</Heading>
        <p>{tags}</p>
        {/* <ProductList products={products as Content.ProductDocument[]} className="mt-4" /> */}
        {/* <p>Query String List {tags.join(", ")}</p> */}
      </Bounded>
    </>
  );
};

export default GalleryIndex;