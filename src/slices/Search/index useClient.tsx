import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ProductList from "./ProductList";
import Bounded from "@/component/Bounded";
import Heading from "@/component/Heading";

/**
 * Props for `GalleryIndex`.
 */
export type GalleryIndexProps = SliceComponentProps<Content.GalleryIndexSlice>;

/**
 * Component for "GalleryIndex" Slices.
 */
const GalleryIndex = async ({ slice }: GalleryIndexProps): Promise <JSX.Element> => {
  const client = createClient()
  const products = await client.getAllByType('product') //or getAllByEveryTag(tags) to get all

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