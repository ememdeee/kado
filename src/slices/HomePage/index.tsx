import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import Link from "next/link";
import ProductList from "./ProductList";

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
        <h1>{slice.primary.heading}</h1>
        <ProductList products={products}/>
      </>
  );
};

export default Hero;