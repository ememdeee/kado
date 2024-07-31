import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/component/Bounded";
import Heading from "@/component/Heading";
import KadoPopupSearch from "@/component/KadoPopupSearch";

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
          className="!py-0 lg:py-0 md:py-0 sm:py-0 -mt-20"
      >
      <div className="min-h-screen flex flex-col justify-center">
        <Heading className="mb-4 text-center">
          IsiKado
        </Heading>
        <KadoPopupSearch />
        {/* Main Form */}
        {/* <Form className="mt-6 mb-6"/> */}
      </div>
      </Bounded>
      <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="flex items-center"
      >
        <Heading className="mb-4" size="md">
          {slice.primary.heading}
        </Heading>
        <PrismicRichText field={slice.primary.description}/>
      </Bounded>
      </>
  );
};

export default Hero;