"use client";

import React, { useRef, useState, useEffect } from "react";
import { asImageSrc, isFilled } from "@prismicio/client";
import { Content } from "@prismicio/client";
import "@/app/globals.css";
import Link from "next/link";
import TextHoverable from "@/component/TextHoverable";
import ImageContainer from "@/component/ImageContainer";
import Heading from "@/component/Heading";

type ProductListProps = {
  products: Content.ProductDocument[];
};

export default function ProductList({ products }: ProductListProps) {
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
    <>
      <p className="mt-3 mb-3">List of tag available:</p>
      {uniqueTags.map(tag => (
        <span key={tag} onClick={() => handleTagClick(tag)} className="inline-block">
          <TextHoverable label={tag} className="ml-1" active={selectedTags.includes(tag)} />
        </span>
      ))}
      <div className="flex gap-2 mt-3">
        {products
          .filter(product => selectedTags.every(tag => product.tags.includes(tag)))
          .map(product => (
            <Link href={product.uid} passHref>
              <ImageContainer image={product.data.mainimage} width={350} />
              <Heading as="h2" size="ss" className="mt-2" key={product.id}>
                {product.data.title}
              </Heading>
                {product.tags.map(tag => (
                  <span key={tag}> {tag} </span>
                ))}
            </Link>
          ))}
      </div>
      <p className="mt-4">
        Selected Tag: {selectedTags.map(tag => (
          <span key={tag}>-{tag}</span>
        ))}
      </p>
      <p onClick={reset}>Reset Filter</p>
    </>
  );
}
