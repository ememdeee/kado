import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/component/Bounded";
import Heading from "@/component/Heading";
import Form from "@/component/Form";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = async ({ slice }: HeroProps): Promise <JSX.Element> => {
 
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
        <Form className="mt-6 mb-6"/>
      </Bounded>
      </>
  );
};

export default Hero;