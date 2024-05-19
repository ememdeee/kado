import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `GalleryIndex`.
 */
export type GalleryIndexProps = SliceComponentProps<Content.GalleryIndexSlice>;

/**
 * Component for "GalleryIndex" Slices.
 */
const GalleryIndex = ({ slice }: GalleryIndexProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <>
        {slice.primary.filters}
      </>
    </section>
  );
};

export default GalleryIndex;
