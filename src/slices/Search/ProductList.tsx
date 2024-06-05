"use client";

import React from "react";
import clsx from "clsx";
import { Content } from "@prismicio/client";
import "@/app/globals.css";
import Link from "next/link";
import TextHoverable from "@/component/TextHoverable";
import Heading from "@/component/Heading";
import { PrismicImage } from "@prismicio/react";
import { useSearchParams } from "next/navigation";

type ProductListProps = {
  products: Content.ProductDocument[];
  className?: string;
};

export default function ProductList({ products, className }: ProductListProps) {
  let tags: string[] = []; //ini dari querrystring yg di kriim dari index
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  console.log(q)
  if (typeof q === 'string') {
    tags = q.split(' ');
    console.log("Query: ", tags);
  }

  return (
    <div className={clsx("", className)}>
      <div className="w-fit mx-auto grid gap-y-4 gap-x-4 mt-10 mb-5 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 justify-items-center">
        {products
          .filter(product => tags.every(tag => product.tags.includes(tag)))
          .map((product, index) => (
            <Link href={product.uid} passHref key={product.id} className={`max-w-60 w-full zoomOut`} style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="h-full flex flex-col bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                {product.data.images?.[0] && (
                  <PrismicImage field={product.data.images[0].image} className="w-full max-w-60 h-auto aspect-square object-cover rounded-t-xl" />
                )}
                <div className="px-2 md:px-4 py-3 flex flex-col h-full">
                  <Heading as="h2" size="ssss" className="mb-auto heading-limit-2-lines">
                    {product.data.title}
                  </Heading>
                  <span className='mt-2 text-lg md:text-xl font-bold'>Rp. {product.data.price}</span> 
                  <TextHoverable label="Details" className="mt-5" />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
