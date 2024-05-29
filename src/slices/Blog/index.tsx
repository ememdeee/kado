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
      <Heading className="mb-8">
        {slice.primary.heading}
      </Heading>
      <div className="prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
      </div>

      {/* list blog */}
      <ul className="grid border-b border-b-slate-500 fade-in">
        {blogs.map((blog, index) => (
          <li key={index} className="list-item">
            <Link href={`blog/${blog.uid}`} className="flex flex-col justify-between border-t border-t-slate-500 py-10  text-slate-800 md:flex-row">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">{blog.data.title}</span>
                <div className="flex gap-3 text-yellow-400">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="text-lg font-bold"> {tag} </span>
                  ))}
                </div>
              </div>
              <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">Read More</span>
            </Link>
          </li>
        ))}
      </ul>
    </Bounded>
  );
};

export default ContentIndex;
