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
      <div className="w-fit mx-auto grid gap-y-20 gap-x-14 mt-10 mb-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
        {products
          .filter(product => tags.every(tag => product.tags.includes(tag)))
          .map((product, index) => (
            <Link href={product.uid} passHref key={product.id} className={`max-w-72 w-full zoomOut`} style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                {product.data.images?.[0] && (
                  <PrismicImage field={product.data.images[0].image} className="h-80 object-cover rounded-t-xl" />
                )}
                <div className="px-4 py-3">
                  <Heading as="h2" size="ss" className="mb-2">
                    {product.data.title}
                  </Heading>
                  <span className='text-xl font-bold'>Rp. {product.data.price}</span> 
                  <TextHoverable label="Details" className="mt-5" />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
