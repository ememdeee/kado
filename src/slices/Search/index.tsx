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
  tags: string[];
};

/**
 * Component for "GalleryIndex" Slices.
 */
const GalleryIndex = async ({ slice, tags }: GalleryIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const products = await client.getAllByType('product');
  // const products = await client.getAllByEveryTag(tags);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <Heading>{slice.primary.heading}</Heading>
      <PrismicRichText field={slice.primary.description} />
      <ProductList products={products} className="mt-4" />
      <p>Query String List:</p>
      <p>{tags}</p>
    </Bounded>
  );
};

export default GalleryIndex;

export const getServerSideProps = async (context: any) => {
  const { q } = context.query;
  const tags = typeof q === 'string' ? q.split("+") : [];

  // Debugging output
  console.log('Query parameter:', q);
  console.log('Tags array:', tags);

  return {
    props: {
      tags
    }
  };
};
