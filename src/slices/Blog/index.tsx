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
      <Heading className="mb-4" size="md">
        {slice.primary.heading}
      </Heading>
      <div className="prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
      </div>

      {/* list blog */}
      <ul className="grid border-b border-b-slate-500 fade-in p-0">
      {blogs.map((blog, index) => (
        <li key={index} className="list-item list-none m-0">
          <Link href={`blog/${blog.uid}`} 
            className="group flex flex-col justify-between border-t border-t-slate-500 py-10 text-slate-800 md:flex-row relative overflow-hidden">
            
            {/* Highlight element */}
            <span className="absolute bottom-0 left-0 h-1 w-full bg-yellow-300 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>

            <div className="flex flex-col">
              <span className="text-3xl font-bold transition-colors duration-300 ease-in-out group-hover:text-yellow-500">
                {blog.data.title}
              </span>
              <div className="flex gap-3 text-yellow-400">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="text-lg font-bold"> {tag} </span>
                ))}
              </div>
            </div>
            
            <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0 transition duration-300 ease-in-out group-hover:text-yellow-500 group-hover:underline">
              Read More
            </span>
          </Link>
        </li>
      ))}
    </ul>
    </Bounded>
  );
};

export default ContentIndex;
