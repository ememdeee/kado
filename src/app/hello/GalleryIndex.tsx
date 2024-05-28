"use client";

import { Content } from "@prismicio/client";
import ProductList from "./ProductList";
import Bounded from "@/component/Bounded";
import Heading from "@/component/Heading";

interface GalleryIndexProps {
  tags: string[];
  products: Content.ProductDocument[];
}

/**
 * Component for "GalleryIndex" Slices.
 */
const GalleryIndex = ({ tags, products }: GalleryIndexProps): JSX.Element => {
  // No need to fetch data here since it's passed from Home
  return (
    <>
      <Bounded>
        <Heading>Heading</Heading>
        <ProductList products={products} className="mt-4" />
      </Bounded>
    </>
  );
};

export default GalleryIndex;
