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
  const tags = ["makanan", "komputer"]; //ini harusnya dari querry string ex: /search?q=makanan+komputer
  const client = createClient()
  const products = await client.getAllByType('product')
  // const products = await client.getAllByEveryTag(tags)

  return (
    <>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}>
          <Heading>{slice.primary.heading}</Heading>
          <PrismicRichText field={slice.primary.description} />
          <ProductList products={products} className="mt-4" />
          <p>Query String List list</p>
          <p>{tags}</p>
          {/* map right here: */}
      </Bounded>
    </>
  );
};

export default GalleryIndex;