import Bounded from "@/component/Bounded";
import Heading from "@/component/Heading";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({ slice }: ContentIndexProps): Promise <JSX.Element> => {
  const client = createClient()
  const blogs = await client.getAllByType('blog')
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading>
        {slice.primary.heading}
      </Heading>
      <PrismicRichText field={slice.primary.description} />

      {/* list blog */}
      {blogs.map((blog, index) => (
        <li key={index}>
          <Link href={`blog/${blog.uid}`}>
            {blog.data.title} -
            {blog.tags.map((tag, index) => (
              <span key={index}> {tag} </span>
            ))}
          </Link>
        </li>
      ))}
    </Bounded>
  );
};

export default ContentIndex;
