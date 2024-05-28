// src/slices/search/index.tsx 

import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import ProductList from "./ProductList";
import Bounded from "@/component/Bounded";
import Heading from "@/component/Heading";

/**
 * Props for `GalleryIndex`.
 */
export type GalleryIndexProps = {
  tags?: string[];
};

/**
 * Component for "GalleryIndex".
 */
const GalleryIndex = async ({ tags = [] }: GalleryIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const products = await client.getAllByEveryTag(tags); // Adjust this line to fit your actual data fetching logic

  return (
    <>
      <Bounded>
        <Heading>Gallery</Heading>
        <p>{tags}</p>
        <ProductList products={products as Content.ProductDocument[]} className="mt-4" />
      </Bounded>
    </>
  );
};

export default GalleryIndex;
