import { SliceZone } from "@prismicio/react";
import { Content } from "@prismicio/client";

import { components } from "@/slices";


import Bounded from "./Bounded";
import Heading from "./Heading";

export default function ContentBody({
  page,
}: {
  page: Content.BlogDocument;
}) {
  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-50 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1" size="md">{page.data.title}</Heading>
        <div className="flex gap-4 text-yellow-400 mt-1 mb-3 md:mt-3 md:mb-4">
          {page.tags.map((tag, index) => (
            <span key={index} className="text-xl font-bold">
              {tag}
            </span>
          ))}
        </div>
        <p className="border-b border-slate-600 text-xl font-bold">
          {page.data.date}
        </p>
        <div className="prose-lg prose-invert mt-8 w-full max-w-none md:mt-10">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
