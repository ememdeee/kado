"use client";

import React from "react";
import clsx from "clsx";
import { Content } from "@prismicio/client";
import "@/app/globals.css";
import { useSearchParams } from "next/navigation";
import ProductBox from "@/component/ProductBox";

type ProductListProps = {
  products: Content.ProductDocument[];
  className?: string;
};

export default function ProductList({ products, className }: ProductListProps) {
  let tags: string[] = []; //ini dari querrystring yg di kriim dari index
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  console.log(q)

  let minPrice = 0;
  let maxPrice = 999999999;

  if (typeof q === 'string') {
    tags = q.split(' ');
    // Find and extract max,min price, removing it from the tags array
    const maxIndex = tags.findIndex(tag => tag.startsWith('Max_'));
    if (maxIndex !== -1) {
      maxPrice = parseInt(tags.splice(maxIndex, 1)[0].replace('Max_', ''), 10);
    }
    const minIndex = tags.findIndex(tag => tag.startsWith('Min_'));
    if (minIndex !== -1) {
      minPrice = parseInt(tags.splice(minIndex, 1)[0].replace('Min_', ''), 10);
    }

    console.log("Query: ", tags);
    console.log("Min: ", minPrice);
    console.log("Max: ", maxPrice);
  }

  return (
    <div className={clsx("", className)}>
      <div className="w-fit mx-auto grid gap-y-4 gap-x-4 mt-10 mb-5 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 justify-items-center">
        {products
          .filter(product => 
            tags.every(tag => product.tags.includes(tag)) &&
            (product.data.price_new !== null && 
            product.data.price_new >= minPrice &&
            product.data.price_new <= maxPrice)
          )
          .map((product, index) => (
            <ProductBox product={product} index={index} key={product.id} />
          ))}
      </div>
    </div>
  );
}