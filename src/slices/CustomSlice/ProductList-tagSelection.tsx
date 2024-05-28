"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Content } from "@prismicio/client";
import "@/app/globals.css";
import Link from "next/link";
import TextHoverable from "@/component/TextHoverable";
import Heading from "@/component/Heading";
import { PrismicImage } from "@prismicio/react";

type ProductListProps = {
  products: Content.ProductDocument[];
  className?: string;
};

export default function ProductList({ products, className }: ProductListProps) {
  // Extract and deduplicate tags
  const allTags = products.flatMap(product => product.tags);
  const uniqueTags = Array.from(new Set(allTags));

  // const selectedTag: string[] = [];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const handleTagClick = (tag: string) => {
    setSelectedTags(prevSelectedTags => {
      if (prevSelectedTags.includes(tag)) {
        // Remove tag if it's already selected
        return prevSelectedTags.filter(t => t !== tag);
      } else {
        // Add tag if it's not selected
        return [...prevSelectedTags, tag];
      }
    });
  };

  const reset = () => {
    setSelectedTags([]);
  };

  return (
    <div className={clsx("", className)}>
      <p className="mt-3 mb-3 text-center">List of tag available:</p>
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
      {uniqueTags.map(tag => (
        <span key={tag} onClick={() => handleTagClick(tag)} className="inline-block">
          <TextHoverable label={tag} className="ml-1 cursor-pointer" active={selectedTags.includes(tag)} />
        </span>
      ))}
      </div>
      <p onClick={reset} className="cursor-pointer text-yellow-500 font-bold hover:underline mt-4 mb-4 text-center">Reset Filter</p>
      <div className="flex flex-wrap gap-2 mt-3 mb-4 justify-center">
        {products
          .filter(product => selectedTags.every(tag => product.tags.includes(tag)))
          .map(product => (
            <Link href={product.uid} passHref key={product.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md">
                <PrismicImage field={product.data.mainimage} />
                {/* <ImageContainer image={product.data.mainimage} width={350} /> */}
                <div className="p-3">
                  <Heading as="h2" size="ss" className="mb-2">
                    {product.data.title}
                  </Heading>
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-200 rounded-full text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {/* show selected tag - for debugging maybe? */}
      {/* <p className="mt-4 text-center">Selected Tags:</p>
      <div className="flex flex-wrap gap-2 justify-center">
      <div className="mt-4">
       {selectedTags.map(tag => (
        <span key={tag} className="group relative inline-block overflow-hidden px-3 py-1 text-base font-bold text-slate-900 rounded-md border-2 border-slate-900 mr-1 bg-yellow-300">
          {tag}
        </span>
        ))}
      </div>
      </div> */}
    </div>
  );
}