import Bounded from "@/component/Bounded";
import Button from "@/component/Button";
import Heading from "@/component/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
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
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading className="col-start-1">
          {slice.primary.heading}
        </Heading>

        <div className="prose-lg prose-slate prose-invert col-start-1">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <Button
          linkField={slice.primary.button_link}
          label={slice.primary.button_text}
        />
        <div className="row-start-1 max-w-sm md:col-start-2 md:row-end-3">
          <PrismicNextImage
            field={slice.primary.avatar}
            className="avatar-image h-full w-full object-cover rounded-lg zoomOut"
            imgixParams={{ q: 90 }}
          />
        </div>
      </div>
    </Bounded>
  );
};

export default ContactUs;
