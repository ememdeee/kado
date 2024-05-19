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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.heading}
      <PrismicRichText field={slice.primary.description} />
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
    </section>
  );
};

export default ContentIndex;
