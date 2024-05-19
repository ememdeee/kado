import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import Link from "next/link";

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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <>
      {slice.primary.heading}
      <p>List Product disini</p>
      {products.map((product, index) => (
        <li key={index}>
          <Link href={product.uid}>
            {product.data.title} -             
            {product.tags.map((tag, index) => (
              <span key={index}> {tag} </span>
            ))}
          </Link>
        </li>
      ))}
      </>
    </section>
  );
};

export default Hero;
