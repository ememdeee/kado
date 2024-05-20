import Bounded from "@/component/Bounded";
import Heading from "@/component/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ContactUs`.
 */
export type ContactUsProps = SliceComponentProps<Content.ContactUsSlice>;

/**
 * Component for "ContactUs" Slices.
 */
const ContactUs = ({ slice }: ContactUsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading>
      {slice.primary.heading}
      </Heading>
      <PrismicRichText field={slice.primary.description}/>
    </Bounded>
  );
};

export default ContactUs;
