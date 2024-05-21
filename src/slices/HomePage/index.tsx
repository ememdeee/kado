import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import Link from "next/link";
import ProductList from "./ProductList";
import Bounded from "@/component/Bounded";
import Heading from "@/component/Heading";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = async ({ slice }: HeroProps): Promise <JSX.Element> => {
  const client = createClient()
  const products = await client.getAllByType('product')


  
  return (
      <>
      <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
      >
        <Heading className="mb-4">
          {slice.primary.heading}
        </Heading>
        <PrismicRichText field={slice.primary.description}/>
        <ProductList products={products} className="mt-4"/>
      </Bounded>
      </>
  );
};

export default Hero;