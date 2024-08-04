import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ProductList from "./ProductList";
import Bounded from "@/component/Bounded";
import Heading from "@/component/Heading";
import KadoPopupSearch from "@/component/KadoPopupSearch";

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
          {products.length > 0 ? (
            <>            
            <Heading className="mb-4" size="md">{slice.primary.heading}</Heading>
            <PrismicRichText field={slice.primary.description} />
            <ProductList products={products as Content.ProductDocument[]} className="mt-4" />
            </>
          ) : (
            <>
              <Heading className="mb-4" size="md">{slice.primary.heading_empty}</Heading>
              <PrismicRichText field={slice.primary.description_empty} />
              <KadoPopupSearch />
            </>
          )}
      </Bounded>
    </>
  );
};

export default GalleryIndex;